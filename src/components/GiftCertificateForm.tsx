"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ContactConsentFields } from "./ContactConsentFields";
import { contactConsentSelection } from "@/data/consents";
import { SITE_CONFIG } from "@/data/site";
import {
  GIFT_CERTIFICATE_AMOUNTS, GIFT_CERTIFICATE_DESIGNS, GIFT_CERTIFICATE_FORMATS, GIFT_CERTIFICATE_MIN_AMOUNT,
  GIFT_CERTIFICATE_SOURCE, GIFT_COVER_INPUT_LIMIT, GIFT_COVER_INPUT_TYPES, GIFT_COVER_MAX_EDGE,
  GIFT_COVER_UPLOAD_LIMIT, GIFT_CUSTOM_DESIGN, parseGiftCertificate, type GiftCertificateDesign,
} from "@/data/special-offers";
import { trackMetricaGoal } from "@/lib/metrica";
import { seasonalImage } from "@/lib/season";

const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-accent";

async function prepareCover(file: File) {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, GIFT_COVER_MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error("Canvas unavailable");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.9, 0.78, 0.64, 0.5]) {
      const image = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (image && image.size <= GIFT_COVER_UPLOAD_LIMIT) return image;
    }
    throw new Error("Cover size exceeds limit");
  } finally {
    bitmap.close();
  }
}

export function GiftCertificateForm() {
  const [amount, setAmount] = useState("10000");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [design, setDesign] = useState<GiftCertificateDesign>("winter");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [format, setFormat] = useState("electronic");
  const [cover, setCover] = useState<{ image: Blob; url: string; name: string } | null>(null);
  const [preparingCover, setPreparingCover] = useState(false);
  const [coverError, setCoverError] = useState("");
  const customDesign = design === GIFT_CUSTOM_DESIGN.id;
  const previewSource = customDesign ? cover?.url : seasonalImage(GIFT_CERTIFICATE_DESIGNS[design].image);

  useEffect(() => {
    if (cover) return () => URL.revokeObjectURL(cover.url);
  }, [cover]);

  const shownAmount = Number(amount === "custom" ? customAmount : amount);
  const amountLabel = Number.isSafeInteger(shownAmount) && shownAmount >= GIFT_CERTIFICATE_MIN_AMOUNT
    ? `${shownAmount.toLocaleString("ru-RU")} ₽` : "от 10 000 ₽";

  async function selectCover(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file || preparingCover) return;
    const acceptedType = GIFT_COVER_INPUT_TYPES.some(type => file.type === type);
    if (!acceptedType && (file.type || !/\.(jpe?g|png|webp)$/i.test(file.name))) {
      setCoverError("Выберите изображение в формате JPG, PNG или WebP.");
      return;
    }
    if (file.size > GIFT_COVER_INPUT_LIMIT) {
      setCoverError("Выберите изображение размером до 12 МБ.");
      return;
    }
    setCoverError("");
    setPreparingCover(true);
    try {
      const image = await prepareCover(file);
      setCover({ image, url: URL.createObjectURL(image), name: file.name });
      setDesign(GIFT_CUSTOM_DESIGN.id);
    } catch {
      setCoverError("Не удалось обработать фото. Попробуйте сохранить его в JPG или выберите другое.");
    } finally {
      setPreparingCover(false);
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || preparingCover) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("callbackConsent") !== "on") return;
    const selectedAmount = data.get("giftAmount");
    const giftCertificate = parseGiftCertificate({
      amount: Number(selectedAmount === "custom" ? data.get("giftCustomAmount") : selectedAmount),
      format: data.get("giftFormat"),
      design: data.get("giftDesign") ?? undefined,
      message: data.get("giftMessage") ?? undefined,
      recipient: data.get("giftRecipient") ?? undefined,
    });
    if (!giftCertificate) {
      setErrorMessage("Выберите формат и укажите номинал от 10 000 ₽ целым числом.");
      setStatus("error");
      return;
    }
    const usesCover = giftCertificate.design === GIFT_CUSTOM_DESIGN.id;
    if (usesCover && !cover) {
      setCoverError("Выберите фото для своей обложки.");
      return;
    }
    setStatus("sending");
    setErrorMessage("");
    try {
      const payload = JSON.stringify({
        name: data.get("name"), phone: data.get("phone"), source: GIFT_CERTIFICATE_SOURCE,
        giftCertificate, consents: contactConsentSelection(data),
      });
      const options: RequestInit = { method: "POST", headers: { "Content-Type": "application/json" }, body: payload };
      if (usesCover && cover) {
        const upload = new FormData();
        upload.set("payload", payload);
        upload.set("cover", cover.image, "cover.jpg");
        options.body = upload;
        delete options.headers;
      }
      const response = await fetch("/api/contact", options);
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Не удалось отправить заявку. Позвоните нам.");
      }
      setStatus("sent");
      setCover(null);
      form.reset();
      trackMetricaGoal("callback_sent", { form: "gift_certificate" });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Не удалось отправить заявку.");
      setStatus("error");
    }
  }

  if (status === "sent") return <div data-tone="light" role="status" aria-live="polite" className="rounded-3xl border border-line bg-white p-6 sm:p-8">
    <h3 className="font-moderustic text-2xl font-semibold">Заявка на сертификат отправлена</h3>
    <p className="mt-4 leading-relaxed text-muted">Менеджер свяжется с вами, уточнит детали и поможет оформить покупку.</p>
  </div>;

  return <form data-tone="light" onSubmit={submit} aria-label="Заявка на покупку подарочного сертификата" className="gift-builder">
    <aside className="gift-preview-column">
      <div className="gift-preview-sticky">
        <p className="gift-overline">Ваш подарок</p>
        <div className="gift-preview" data-testid="gift-preview">
          {previewSource && <Image src={previewSource} alt="" fill unoptimized={customDesign} sizes="(min-width: 1024px) 550px, 100vw" className="gift-preview-photo" />}
          <div className="gift-preview-shade" />
          <div className="gift-preview-content">
            <span className="gift-brand">ХИЖИНА ЛЕСНИКА<span>АРХЫЗ · БУКОВЫЙ ЛЕС</span></span>
            <div><p className="gift-preview-caption">Подарочный сертификат</p><p className="gift-preview-title">Время для<br />самого важного</p></div>
            <div className="gift-preview-bottom"><strong data-testid="gift-preview-amount">{amountLabel}</strong><span>Отдых в горах<br />Действует 1 год</span></div>
          </div>
        </div>
        {(recipient || message) && <div className="gift-note"><p className="gift-note-to">{recipient ? `Получатель: ${recipient}` : "С теплом и заботой"}</p>{message && <p className="gift-note-message">{message}</p>}</div>}
        <div className="gift-preview-details"><span>От 10 000 ₽</span><span>Срок — 1 год</span><span>{GIFT_CERTIFICATE_FORMATS[format as keyof typeof GIFT_CERTIFICATE_FORMATS]}</span></div>
        <p className="gift-preview-help">Подарите поездку в Архыз: тихие вечера, прогулки по лесу и уютный дом среди гор.</p>
      </div>
    </aside>
    <div className="gift-options">
      <fieldset disabled={status === "sending"} className="gift-fields disabled:opacity-70">
        <fieldset className="gift-step">
          <legend className="gift-step-heading"><span>01</span>Выберите номинал</legend>
          <p className="gift-step-description">Сумма, которую можно использовать на проживание.</p>
          <div className="gift-amounts">
            {GIFT_CERTIFICATE_AMOUNTS.map(value => <label className="gift-choice" key={value}>
              <input type="radio" name="giftAmount" value={value} checked={amount === String(value)} onChange={event => setAmount(event.target.value)} />
              <span>{value.toLocaleString("ru-RU")} ₽</span>
            </label>)}
            <label className="gift-choice"><input type="radio" name="giftAmount" value="custom" checked={amount === "custom"} onChange={event => setAmount(event.target.value)} /><span>Своя сумма</span></label>
          </div>
          {amount === "custom" && <label className="mt-4 block text-sm font-medium">Ваш номинал, ₽<input name="giftCustomAmount" type="number" min={GIFT_CERTIFICATE_MIN_AMOUNT} max={Number.MAX_SAFE_INTEGER} step={1} required inputMode="numeric" value={customAmount} onChange={event => setCustomAmount(event.target.value)} placeholder="От 10 000 ₽" className={fieldClass} /></label>}
        </fieldset>
        <fieldset className="gift-step">
          <legend className="gift-step-heading"><span>02</span>Выберите оформление</legend>
          <div className="gift-designs">
            {Object.entries(GIFT_CERTIFICATE_DESIGNS).map(([value, item]) => <label className="gift-design" key={value}>
              <input type="radio" name="giftDesign" value={value} checked={design === value} onChange={() => setDesign(value as GiftCertificateDesign)} />
              <span className="gift-design-image"><Image src={seasonalImage(item.image)} alt="" fill sizes="(min-width: 1024px) 160px, 30vw" className="object-cover" /><span className="gift-design-check" aria-hidden="true">✓</span></span>
              <span className="gift-design-name">{item.title}</span>
            </label>)}
          </div>
          <div className="gift-upload">
            {cover && <label className="gift-upload-selection"><input type="radio" name="giftDesign" value={GIFT_CUSTOM_DESIGN.id} checked={customDesign} onChange={() => setDesign(GIFT_CUSTOM_DESIGN.id)} /><span>{GIFT_CUSTOM_DESIGN.title}<small>{cover.name}</small></span></label>}
            <div className="gift-upload-actions">
              <label className="gift-upload-button">
                <input type="file" accept={GIFT_COVER_INPUT_TYPES.join(",")} disabled={preparingCover} onChange={selectCover} aria-describedby="gift-cover-help" className="sr-only" />
                {preparingCover ? "Готовим фото…" : cover ? "Заменить фото" : "Загрузить своё фото"}
              </label>
              {cover && <button type="button" className="gift-upload-remove" disabled={preparingCover} onClick={() => {
                setCover(null);
                setCoverError("");
                if (customDesign) setDesign("winter");
              }}>Удалить фото</button>}
            </div>
            <p id="gift-cover-help" className="gift-upload-help">JPG, PNG или WebP до 12 МБ. Фото для обложки уйдёт менеджеру вместе с заявкой.</p>
            {coverError && <p role="alert" className="gift-upload-error">{coverError}</p>}
          </div>
        </fieldset>
        <div className="gift-step">
          <h3 className="gift-step-heading"><span>03</span>Добавьте тёплые слова</h3>
          <label className="mt-4 block text-sm font-medium">Кому подарок <span className="font-normal text-muted">· по желанию</span><input name="giftRecipient" maxLength={100} value={recipient} onChange={event => setRecipient(event.target.value)} placeholder="Имя получателя" className={fieldClass} /></label>
          <label className="mt-4 block text-sm font-medium">Ваше поздравление <span className="font-normal text-muted">· по желанию</span><textarea name="giftMessage" maxLength={600} rows={4} value={message} onChange={event => setMessage(event.target.value)} placeholder="Пусть впереди будет больше счастливых моментов…" className={`${fieldClass} resize-y`} /></label>
          <p className="mt-1 text-right text-xs text-muted">{message.length} / 600</p>
        </div>
        <fieldset className="gift-step">
          <legend className="gift-step-heading"><span>04</span>Выберите формат</legend>
          <div className="gift-formats">
            {Object.entries(GIFT_CERTIFICATE_FORMATS).map(([value, label]) => <label key={value} className="gift-choice gift-format">
              <input type="radio" name="giftFormat" value={value} checked={format === value} onChange={event => setFormat(event.target.value)} required /><span><strong>{label}</strong><small>{value === "electronic" ? "Удобно отправить близкому" : "Для вручения лично"}</small></span>
            </label>)}
          </div>
        </fieldset>
        <div className="gift-step">
          <h3 className="gift-step-heading"><span>05</span>Оформите подарок</h3>
          <p className="gift-step-description">Оставьте свои контакты. Менеджер свяжется с вами, согласует оплату и получение сертификата.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">Ваше имя<input name="name" required maxLength={100} autoComplete="given-name" placeholder="Как к вам обращаться" className={fieldClass} /></label>
            <label className="block text-sm font-medium">Телефон<input name="phone" type="tel" required minLength={10} maxLength={30} autoComplete="tel" placeholder="+7 (___) ___-__-__" className={fieldClass} /></label>
          </div>
          <div className="gift-total"><span>Номинал сертификата</span><strong>{amountLabel}</strong></div>
          <ContactConsentFields />
        </div>
      </fieldset>
      {status === "error" && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900">{errorMessage} <a href={SITE_CONFIG.phoneHref} className="underline">{SITE_CONFIG.phoneDisplay}</a></p>}
      <button type="submit" disabled={status === "sending" || preparingCover} className="min-h-12 w-full cursor-pointer rounded-full bg-action px-6 py-4 text-sm font-semibold text-on-action transition hover:bg-action-hover disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Отправляем…" : "Заказать сертификат"}</button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted">Оформление покупки с менеджером. Срок действия — один год.</p>
    </div>
  </form>;
}
