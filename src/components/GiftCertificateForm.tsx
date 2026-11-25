"use client";

import Image from "next/image";
import { useState } from "react";
import { ContactConsentFields } from "./ContactConsentFields";
import { contactConsentSelection } from "@/data/consents";
import { SITE_CONFIG } from "@/data/site";
import {
  GIFT_CERTIFICATE_AMOUNTS, GIFT_CERTIFICATE_DESIGNS, GIFT_CERTIFICATE_FORMATS, GIFT_CERTIFICATE_MIN_AMOUNT,
  GIFT_CERTIFICATE_SOURCE, parseGiftCertificate,
} from "@/data/special-offers";
import { trackMetricaGoal } from "@/lib/metrica";

const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-accent";

export function GiftCertificateForm() {
  const [amount, setAmount] = useState("10000");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [design, setDesign] = useState<keyof typeof GIFT_CERTIFICATE_DESIGNS>("winter");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [format, setFormat] = useState("electronic");
  const shownAmount = Number(amount === "custom" ? customAmount : amount);
  const amountLabel = Number.isSafeInteger(shownAmount) && shownAmount >= GIFT_CERTIFICATE_MIN_AMOUNT
    ? `${shownAmount.toLocaleString("ru-RU")} ₽` : "от 10 000 ₽";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
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
    setStatus("sending");
    setErrorMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), phone: data.get("phone"), source: GIFT_CERTIFICATE_SOURCE,
          giftCertificate, consents: contactConsentSelection(data),
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Не удалось отправить заявку. Позвоните нам.");
      }
      setStatus("sent");
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
          <Image src={GIFT_CERTIFICATE_DESIGNS[design].image} alt="" fill sizes="(min-width: 1024px) 550px, 100vw" className="gift-preview-photo" />
          <div className="gift-preview-shade" />
          <div className="gift-preview-content">
            <span className="gift-brand">ХИЖИНА ЛЕСНИКА<span>АРХЫЗ · БУКОВЫЙ ЛЕС</span></span>
            <div><p className="gift-preview-caption">Подарочный сертификат</p><p className="gift-preview-title">Время для<br />самого важного</p></div>
            <div className="gift-preview-bottom"><strong data-testid="gift-preview-amount">{amountLabel}</strong><span>Отдых в горах<br />Действует 1 год</span></div>
          </div>
        </div>
        {(recipient || message) && <div className="gift-note"><p className="gift-note-to">{recipient ? `Для ${recipient}` : "С теплом и заботой"}</p>{message && <p className="gift-note-message">{message}</p>}</div>}
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
              <input type="radio" name="giftDesign" value={value} checked={design === value} onChange={() => setDesign(value as keyof typeof GIFT_CERTIFICATE_DESIGNS)} />
              <span className="gift-design-image"><Image src={item.image} alt="" fill sizes="(min-width: 1024px) 160px, 30vw" className="object-cover" /><span className="gift-design-check" aria-hidden="true">✓</span></span>
              <span className="gift-design-name">{item.title}</span>
            </label>)}
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
      <button type="submit" disabled={status === "sending"} className="min-h-12 w-full cursor-pointer rounded-full bg-action px-6 py-4 text-sm font-semibold text-on-action transition hover:bg-action-hover disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Отправляем…" : "Заказать сертификат"}</button>
      <p className="mt-3 text-center text-xs leading-relaxed text-muted">Оформление покупки с менеджером. Срок действия — один год.</p>
    </div>
  </form>;
}
