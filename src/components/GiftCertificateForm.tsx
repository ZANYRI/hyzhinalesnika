"use client";

import { useState } from "react";
import { ContactConsentFields } from "./ContactConsentFields";
import { contactConsentSelection } from "@/data/consents";
import { SITE_CONFIG } from "@/data/site";
import {
  GIFT_CERTIFICATE_AMOUNTS, GIFT_CERTIFICATE_FORMATS, GIFT_CERTIFICATE_MIN_AMOUNT,
  GIFT_CERTIFICATE_SOURCE, parseGiftCertificate,
} from "@/data/special-offers";
import { trackMetricaGoal } from "@/lib/metrica";

const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink outline-none focus:border-accent";

export function GiftCertificateForm() {
  const [amount, setAmount] = useState("10000");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  return <form data-tone="light" onSubmit={submit} aria-label="Заявка на покупку подарочного сертификата" className="space-y-5 rounded-3xl border border-line bg-white p-6 sm:p-8">
    <div>
      <h3 className="font-moderustic text-2xl font-semibold">Заказать сертификат</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">Выберите номинал и формат. Свяжемся с вами для оформления покупки.</p>
    </div>
    <fieldset disabled={status === "sending"} className="space-y-5 disabled:opacity-70">
      <label className="block text-sm font-medium">Номинал сертификата
        <select name="giftAmount" value={amount} onChange={event => setAmount(event.target.value)} className={fieldClass}>
          {GIFT_CERTIFICATE_AMOUNTS.map(value => <option key={value} value={value}>{value.toLocaleString("ru-RU")} ₽</option>)}
          <option value="custom">Свой номинал</option>
        </select>
      </label>
      {amount === "custom" && <label className="block text-sm font-medium">Сумма, ₽
        <input name="giftCustomAmount" type="number" min={GIFT_CERTIFICATE_MIN_AMOUNT} max={Number.MAX_SAFE_INTEGER} step={1} required inputMode="numeric" placeholder="От 10 000 ₽" className={fieldClass} />
      </label>}
      <fieldset>
        <legend className="text-sm font-medium">Формат сертификата</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {Object.entries(GIFT_CERTIFICATE_FORMATS).map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm has-[:checked]:border-accent has-[:checked]:bg-soft">
            <input type="radio" name="giftFormat" value={value} defaultChecked={value === "electronic"} required className="h-4 w-4 accent-action" />
            {label}
          </label>)}
        </div>
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">Ваше имя
          <input name="name" required maxLength={100} autoComplete="given-name" placeholder="Как к вам обращаться" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium">Телефон
          <input name="phone" type="tel" required minLength={10} maxLength={30} autoComplete="tel" placeholder="+7 (___) ___-__-__" className={fieldClass} />
        </label>
      </div>
      <ContactConsentFields />
    </fieldset>
    {status === "error" && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900">{errorMessage} <a href={SITE_CONFIG.phoneHref} className="underline">{SITE_CONFIG.phoneDisplay}</a></p>}
    <button type="submit" disabled={status === "sending"} className="min-h-12 w-full cursor-pointer rounded-full bg-action px-6 py-4 text-sm font-semibold text-on-action transition hover:bg-action-hover disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Отправляем…" : "Оставить заявку на сертификат"}</button>
  </form>;
}
