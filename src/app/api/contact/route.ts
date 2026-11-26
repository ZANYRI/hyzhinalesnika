import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { validateContactConsents, consentEvidence, ConsentValidationError } from "@/lib/contact-consents";
import { recordContactEvent } from "@/lib/contact-journal";
import {
  GIFT_CERTIFICATE_DESIGNS, GIFT_CERTIFICATE_FORMATS, GIFT_CERTIFICATE_SOURCE, GIFT_CERTIFICATE_VALIDITY_YEARS,
  GIFT_COVER_MAX_EDGE, GIFT_COVER_UPLOAD_LIMIT, GIFT_CUSTOM_DESIGN, parseGiftCertificate,
} from "@/data/special-offers";

const MAX_PAYLOAD_BYTES = 8192;
const COVER_FILENAME = "cover.jpg";
const COVER_CONTENT_TYPE = "image/jpeg";
const MAX_TELEGRAM_CAPTION = 1024;
class ContactBodyTooLarge extends Error {}

async function readContactBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const includesFile = /^multipart\/form-data(?:\s*;|$)/i.test(contentType);
  const maxBytes = includesFile ? GIFT_COVER_UPLOAD_LIMIT + 2 * MAX_PAYLOAD_BYTES : MAX_PAYLOAD_BYTES;
  if (Number(request.headers.get("content-length")) > maxBytes) throw new ContactBodyTooLarge();
  let received = 0;
  const stream = request.body?.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      received += chunk.byteLength;
      if (received > maxBytes) throw new ContactBodyTooLarge();
      controller.enqueue(chunk);
    },
  }));
  const buffer = await new Response(stream).arrayBuffer();
  let raw: string;
  let cover: File | null = null;
  if (includesFile) {
    const form = await new Response(buffer, { headers: { "Content-Type": contentType } }).formData();
    const payloads = form.getAll("payload");
    const attachments = form.getAll("cover");
    const [payload] = payloads;
    const [attachment] = attachments;
    if (payloads.length !== 1 || attachments.length !== 1 || typeof payload !== "string" ||
      !attachment || typeof attachment === "string") throw new Error("Invalid multipart body");
    raw = payload;
    cover = attachment;
    if (Buffer.byteLength(raw, "utf8") > MAX_PAYLOAD_BYTES || cover.size > GIFT_COVER_UPLOAD_LIMIT) throw new ContactBodyTooLarge();
  } else raw = new TextDecoder().decode(buffer);
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
  return { body: parsed as Record<string, unknown>, cover };
}

async function validateCover(file: File) {
  if (file.type !== COVER_CONTENT_TYPE || !file.size) throw new Error("Invalid cover");
  const image = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: GIFT_COVER_MAX_EDGE ** 2, failOn: "warning" });
  const { format, width, height } = await image.metadata();
  if (format !== "jpeg" || !width || !height || Math.max(width, height) > GIFT_COVER_MAX_EDGE) throw new Error("Invalid cover");
  return image.autoOrient().jpeg({ quality: 90 }).toBuffer();
}

function clean(value: unknown, length: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, length) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  let cover: File | null;
  try {
    ({ body, cover } = await readContactBody(request));
  } catch (error) {
    if (error instanceof ContactBodyTooLarge) {
      return NextResponse.json({ ok: false, error: "Заявка слишком большая. Попробуйте выбрать фото меньшего размера." }, { status: 413 });
    }
    return NextResponse.json({ ok: false, error: "Некорректный формат заявки" }, { status: 400 });
  }

  let consents: ReturnType<typeof validateContactConsents>;
  try { consents = validateContactConsents(body.consents); }
  catch (error) {
    if (error instanceof ConsentValidationError) return NextResponse.json({ ok: false, error: error.message }, { status: error.status });
    return NextResponse.json({ ok: false, error: "Не удалось проверить согласие" }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const source = body.giftCertificate !== undefined ? GIFT_CERTIFICATE_SOURCE : clean(body.source, 200) || "Обратная связь";
  const isGiftRequest = body.giftCertificate !== undefined || source === GIFT_CERTIFICATE_SOURCE;
  const giftCertificate = isGiftRequest ? parseGiftCertificate(body.giftCertificate) : null;
  if (isGiftRequest && !giftCertificate) {
    return NextResponse.json({ ok: false, error: "Выберите формат сертификата и укажите номинал от 10 000 ₽ целым числом." }, { status: 400 });
  }
  const usesCustomCover = giftCertificate?.design === GIFT_CUSTOM_DESIGN.id;
  if (usesCustomCover !== Boolean(cover)) {
    return NextResponse.json({ ok: false, error: "Прикрепите фото для своего оформления или выберите готовую обложку." }, { status: 400 });
  }
  const contactMethod = body.contactMethod === undefined ? "phone" : clean(body.contactMethod, 20);
  const contactHandle = clean(body.contactHandle, 150);
  if (!name || !/^\+?[\d\s()\-]+$/.test(phone) || !/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) {
    return NextResponse.json({ ok: false, error: "Укажите имя и корректный номер телефона" }, { status: 400 });
  }
  if (!["phone", "telegram", "whatsapp", "max"].includes(contactMethod) || (contactMethod !== "phone" && !contactHandle)) {
    return NextResponse.json({ ok: false, error: "Укажите контакт для выбранного мессенджера" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) return NextResponse.json({ ok: false, error: "Приём заявок временно недоступен. Позвоните нам." }, { status: 503 });

  let coverBytes: Buffer | null = null;
  if (cover) {
    try { coverBytes = await validateCover(cover); }
    catch { return NextResponse.json({ ok: false, error: "Не удалось прочитать фото для обложки. Выберите другое изображение." }, { status: 400 }); }
  }

  const id = randomUUID();
  const recordedAt = new Date().toISOString();
  try {
    // Durable evidence must exist before forwarding a contact to the administrator.
    await recordContactEvent("requests", id, {
      schemaVersion: 2, id, recordedAt, name, phone, source, contactMethod, contactHandle,
      ...(giftCertificate ? { giftCertificate: { ...giftCertificate, validityYears: GIFT_CERTIFICATE_VALIDITY_YEARS } } : {}),
      ...(coverBytes ? { giftCover: { name: COVER_FILENAME, contentType: COVER_CONTENT_TYPE, base64: coverBytes.toString("base64") } } : {}),
      consents: consentEvidence(consents, recordedAt),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Не удалось сохранить заявку и согласие. Повторите позже или позвоните нам." }, { status: 503 });
  }

  const messageText = [
    "🌲 Новая заявка с сайта hyzhinalesnika.ru", `Номер: ${id}`, `Форма: ${source}`,
    `Имя: ${name}`, `Телефон: ${phone}`, `Способ связи: ${contactMethod}`,
    ...(contactHandle ? [`Контакт в мессенджере: ${contactHandle}`] : []),
    ...(giftCertificate ? [
      `Номинал сертификата: ${giftCertificate.amount.toLocaleString("ru-RU")} ₽`,
      `Формат сертификата: ${GIFT_CERTIFICATE_FORMATS[giftCertificate.format]}`,
      ...(giftCertificate.design && giftCertificate.design !== GIFT_CUSTOM_DESIGN.id ? [`Дизайн сертификата: ${GIFT_CERTIFICATE_DESIGNS[giftCertificate.design].title}`] : []),
      ...(giftCertificate.recipient ? [`Получатель подарка: ${giftCertificate.recipient}`] : []),
      ...(giftCertificate.message ? [`Поздравление: ${giftCertificate.message}`] : []),
      `Срок действия сертификата: ${GIFT_CERTIFICATE_VALIDITY_YEARS} год`,
    ] : []),
    `Согласие на заявку: да; версия ${consents.callback.document.version}; ${recordedAt}`,
  ].join("\n");

  let delivered = false;
  try {
    const options: RequestInit = {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: messageText }), signal: AbortSignal.timeout(10_000),
    };
    let method = "sendMessage";
    if (coverBytes && giftCertificate) {
      const details = [
        "Подарочный сертификат · своё фото", `Номер: ${id}`,
        `${giftCertificate.amount.toLocaleString("ru-RU")} ₽ · ${GIFT_CERTIFICATE_FORMATS[giftCertificate.format]} · 1 год`,
        `${name} · ${phone}`,
        ...(contactHandle ? [`${contactMethod}: ${contactHandle}`] : []),
        ...(giftCertificate.recipient ? [`Получатель: ${giftCertificate.recipient}`] : []),
      ].join("\n");
      const note = giftCertificate.message ? `\n\n${giftCertificate.message}` : "";
      const available = MAX_TELEGRAM_CAPTION - details.length;
      // The private request journal keeps the full note if Telegram's caption is too short.
      const suffix = note.length > available ? `${note.slice(0, available - 1).trimEnd()}…` : note;
      const document = new FormData();
      document.set("chat_id", chatId);
      document.set("caption", details + suffix);
      document.set("document", new Blob([new Uint8Array(coverBytes)], { type: COVER_CONTENT_TYPE }), COVER_FILENAME);
      method = "sendDocument";
      options.body = document;
      delete options.headers;
    }
    const delivery = await fetch(`https://api.telegram.org/bot${botToken}/${method}`, options);
    const result: unknown = await delivery.json();
    delivered = delivery.ok && !!result && typeof result === "object" && "ok" in result && result.ok === true;
  } catch { /* The stored request remains available if delivery fails. */ }

  try { await recordContactEvent("delivery", id, { id, recordedAt: new Date().toISOString(), status: delivered ? "delivered" : "failed" }); }
  catch { console.error("Contact delivery receipt could not be recorded", id); }

  return delivered ? NextResponse.json({ ok: true, requestId: id })
    : NextResponse.json({ ok: false, error: "Не удалось уведомить администратора. Позвоните нам." }, { status: 502 });
}
