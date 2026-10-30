"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "./Icons";

interface CallbackModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export function CallbackModal({
  open,
  onClose,
  title = "Обратная связь",
}: CallbackModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#f5f6f2] p-7 text-[#23220b] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-[#555] transition hover:bg-black/5 hover:text-black cursor-pointer"
          aria-label="Закрыть"
        >
          <CloseIcon className="w-4 h-4" />
        </button>

        <h3 className="font-moderustic text-2xl font-bold text-[#0e2618]">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-[#4b4b4b]">
          Оставьте заявку и наши специалисты свяжутся с Вами в самое ближайшее
          время
        </p>

        {status === "sent" ? (
          <div className="mt-6 rounded-xl bg-[#d9decc] p-5 text-center text-[#0e2618]">
            <p className="font-semibold text-lg">Спасибо! Форма отправлена</p>
            <p className="mt-1 text-sm text-[#35463b]">
              Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setName("");
                setPhone("");
                onClose();
              }}
              className="mt-4 rounded-xl bg-[#396448] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2e533b] cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2c2c2c]">
                Ваше имя: <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван"
                className="mt-1 w-full rounded-xl border border-[#c7ccb9] bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#396448]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2c2c2c]">
                Телефон: <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="mt-1 w-full rounded-xl border border-[#c7ccb9] bg-white px-4 py-2.5 text-sm text-black outline-none transition focus:border-[#396448]"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[#4b4b4b] cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#396448]"
              />
              <span>
                Я ознакомлен(а) с{" "}
                <Link
                  href="/users/agreement"
                  onClick={onClose}
                  className="underline text-[#396448] hover:text-[#0e2618]"
                >
                  пользовательским соглашением
                </Link>{" "}
                и{" "}
                <Link
                  href="/privacy-policy"
                  onClick={onClose}
                  className="underline text-[#396448] hover:text-[#0e2618]"
                >
                  политикой обработки персональных данных
                </Link>{" "}
                *
              </span>
            </label>

            {status === "error" && (
              <p className="text-xs text-red-600">
                Не удалось отправить заявку. Пожалуйста, позвоните нам по номеру{" "}
                +7 (928) 020-10-01.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-xl bg-[#90754b] py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#a68859] disabled:opacity-60 cursor-pointer"
            >
              {status === "submitting" ? "Отправка..." : "Отправить"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
