"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, PhoneCall, X } from "@phosphor-icons/react";

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
  const [agreed, setAgreed] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">(
    "idle"
  );

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !agreed) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: title }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
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
        className="relative w-full max-w-md rounded-3xl border border-white/12 bg-[#102419] p-7 text-[#f3f5f0] shadow-[0_24px_64px_rgba(0,0,0,0.6)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a8b9ae] transition hover:border-white/25 hover:text-[#f3f5f0] cursor-pointer"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d49a5a]/15 text-[#d49a5a]">
          <PhoneCall size={22} />
        </div>

        <h3 className="mt-4 font-moderustic text-2xl font-bold tracking-tight text-[#f3f5f0]">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[#a8b9ae]">
          Оставьте контакты, и администратор базы свяжется с вами для подбора дат
          и дома.
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-2xl border border-[#d49a5a]/35 bg-[#163122] p-6 text-center">
            <CheckCircle
              size={36}
              weight="fill"
              className="mx-auto text-[#d49a5a]"
            />
            <p className="mt-3 font-moderustic text-lg font-bold text-[#f3f5f0]">
              Заявка принята
            </p>
            <p className="mt-1 text-sm text-[#a8b9ae]">
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
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#d49a5a] px-7 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] cursor-pointer"
            >
              Готово
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="callback-name"
                className="text-sm font-medium text-[#f3f5f0]"
              >
                Ваше имя
              </label>
              <input
                id="callback-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Алексей"
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0a1911] px-4 text-sm text-[#f3f5f0] placeholder:text-[#7e9487] outline-none transition focus:border-[#d49a5a]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="callback-phone"
                className="text-sm font-medium text-[#f3f5f0]"
              >
                Номер телефона
              </label>
              <input
                id="callback-phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0a1911] px-4 text-sm text-[#f3f5f0] placeholder:text-[#7e9487] outline-none transition focus:border-[#d49a5a]"
              />
            </div>

            <label className="flex items-start gap-2.5 pt-1 text-xs leading-relaxed text-[#a8b9ae] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#d49a5a]"
              />
              <span>
                Согласен(а) с{" "}
                <Link
                  href="/users/agreement"
                  onClick={onClose}
                  className="text-[#f3f5f0] underline decoration-[#d49a5a]/60 hover:text-[#d49a5a]"
                >
                  пользовательским соглашением
                </Link>{" "}
                и{" "}
                <Link
                  href="/privacy-policy"
                  onClick={onClose}
                  className="text-[#f3f5f0] underline decoration-[#d49a5a]/60 hover:text-[#d49a5a]"
                >
                  политикой обработки персональных данных
                </Link>
              </span>
            </label>

            {status === "error" && (
              <p className="rounded-xl border border-red-400/30 bg-red-950/40 px-3.5 py-2.5 text-xs text-red-200">
                Не удалось отправить заявку. Позвоните нам по номеру +7 (928)
                020-10-01.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d49a5a] px-6 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {status === "submitting" ? "Отправляем..." : "Жду звонка"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
