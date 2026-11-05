import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { validateContactConsents, consentEvidence, ConsentValidationError } from "@/lib/contact-consents";
import { recordContactEvent } from "@/lib/contact-journal";

function clean(value: unknown, length: number) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, length) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > 8192) return NextResponse.json({ ok: false, error: "Заявка слишком большая" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    body = parsed as Record<string, unknown>;
  } catch {
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
  const source = clean(body.source, 200) || "Обратная связь";
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

  const id = randomUUID();
  const recordedAt = new Date().toISOString();
  try {
    // Durable evidence must exist before forwarding a contact to the administrator.
    await recordContactEvent("requests", id, {
      schemaVersion: 2, id, recordedAt, name, phone, source, contactMethod, contactHandle,
      consents: consentEvidence(consents, recordedAt),
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Не удалось сохранить заявку и согласие. Повторите позже или позвоните нам." }, { status: 503 });
  }

  const messageText = [
    "🌲 Новая заявка с сайта hyzhinalesnika.ru", `Номер: ${id}`, `Форма: ${source}`,
    `Имя: ${name}`, `Телефон: ${phone}`, `Способ связи: ${contactMethod}`,
    ...(contactHandle ? [`Контакт в мессенджере: ${contactHandle}`] : []),
    `Согласие на заявку: да; версия ${consents.callback.document.version}; ${recordedAt}`,
  ].join("\n");

  let delivered = false;
  try {
    const delivery = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: messageText }), signal: AbortSignal.timeout(10_000),
    });
    const result: unknown = await delivery.json();
    delivered = delivery.ok && !!result && typeof result === "object" && "ok" in result && result.ok === true;
  } catch { /* The stored request remains available if delivery fails. */ }

  try { await recordContactEvent("delivery", id, { id, recordedAt: new Date().toISOString(), status: delivered ? "delivered" : "failed" }); }
  catch { console.error("Contact delivery receipt could not be recorded", id); }

  return delivered ? NextResponse.json({ ok: true, requestId: id })
    : NextResponse.json({ ok: false, error: "Не удалось уведомить администратора. Позвоните нам." }, { status: 502 });
}
