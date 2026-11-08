"use client";

import React, { useState } from "react";
import { ContactConsentFields } from "./ContactConsentFields";
import { contactConsentSelection } from "@/data/consents";
import { CheckCircle, PhoneCall, X } from "@phosphor-icons/react";
import { trackMetricaGoal } from "@/lib/metrica";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function CallbackModal({
  open,
  onClose,
  title = "Обратный звонок",
}: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!name.trim() || !phone.trim() || data.get("callbackConsent") !== "on") return;
    setErrorMessage("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: title, consents: contactConsentSelection(data) }),
      });
      if (res.ok) {
        setStatus("sent");
        trackMetricaGoal("callback_sent", { form: "callback" });
      } else {
        const result = await res.json().catch(() => null);
        setErrorMessage(result?.error || "Не удалось отправить заявку. Позвоните нам: +7 (928) 020-10-01.");
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl border border-line bg-surface p-7 text-ink shadow-[0_24px_64px_rgba(0,0,0,0.6)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-soft text-muted transition hover:border-line hover:text-ink cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-action/15 text-accent">
          <PhoneCall size={22} />
        </div>

        <h3 className="mt-4 font-moderustic text-2xl font-bold tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Оставьте контакты, и администратор базы свяжется с вами для подбора дат
          и дома.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-2xl border border-accent/35 bg-soft p-6 text-center">
            <CheckCircle
              size={36}
              weight="fill"
              className="mx-auto text-accent"
            />
            <p className="mt-3 font-moderustic text-lg font-bold text-ink">
              Заявка принята
            </p>
            <p className="mt-1 text-sm text-muted">
              Свяжемся с вами в ближайшее время.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setPhone("");
                onClose();
              }}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-action px-7 text-sm font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] cursor-pointer"
            >
              Готово
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="callback-name"
                className="text-sm font-medium text-ink"
              >
                Ваше имя
              </label>
              <input
                id="callback-name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Алексей"
                className="h-12 w-full rounded-xl border border-line bg-canvas px-4 text-base sm:text-sm text-ink placeholder:text-muted outline-none transition focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="callback-phone"
                className="text-sm font-medium text-ink"
              >
                Номер телефона
              </label>
              <input
                id="callback-phone"
                name="phone"
                type="tel"
                required
                minLength={10}
                maxLength={30}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="h-12 w-full rounded-xl border border-line bg-canvas px-4 text-base sm:text-sm text-ink placeholder:text-muted outline-none transition focus:border-accent"
              />
            </div>

            <ContactConsentFields />

            {status === "error" && (
              <p className="rounded-xl border border-red-400/30 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200">
                {errorMessage || "Не удалось отправить заявку. Позвоните нам: +7 (928) 020-10-01."}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-action px-6 text-sm font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {status === "submitting" ? "Отправляем..." : "Жду звонка"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
