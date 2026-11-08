"use client";
import { ContactConsentFields } from "./ContactConsentFields";
import { contactConsentSelection } from "@/data/consents";
import { useState } from "react";
import { TreeEvergreen } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import { trackMetricaGoal } from "@/lib/metrica";

export function BookingAssistance() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("callbackConsent") !== "on") return;
    setErrorMessage("");
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.get("name"),phone:data.get("phone"),source:"Помощь с подбором дома",consents:contactConsentSelection(data)})});
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Не удалось отправить заявку. Пожалуйста, позвоните нам.");
      }
      setStatus("sent"); form.reset();
      trackMetricaGoal("callback_sent", { form: "booking_assistance" });
    } catch (error) { setErrorMessage(error instanceof Error ? error.message : "Не удалось отправить заявку."); setStatus("error"); }
  }
  return <section id="help" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 py-16 sm:px-6 sm:py-20">
    <div data-tone="emerald" className="relative overflow-hidden rounded-[2rem] bg-action px-5 py-14 sm:px-12 sm:py-20">
      <TreeEvergreen aria-hidden="true" weight="thin" className="pointer-events-none absolute -bottom-12 -left-20 h-80 w-80 text-accent/10" />
      <TreeEvergreen aria-hidden="true" weight="thin" className="pointer-events-none absolute -top-12 -right-12 h-80 w-80 rotate-180 text-accent/10" />
      <div className="relative mx-auto max-w-2xl text-center">
        <TreeEvergreen size={38} weight="thin" className="mx-auto text-accent" />
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-accent">Осталось выбрать даты</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Поможем подобрать ваш дом</h2>
        <p className="mt-4 leading-relaxed text-muted">Оставьте контакты – подберём дом для вашей поездки, поможем с бронированием и ответим на вопросы.</p>
        {status === "sent" ? <p role="status" className="mt-8 rounded-2xl border border-accent/40 p-6">Спасибо! Заявка отправлена. Мы свяжемся с вами.</p> : <form data-tone="light" onSubmit={submit} className="mt-8 space-y-4 rounded-2xl bg-white p-5 text-left sm:p-7">
          <label className="block text-sm">Ваше имя<input name="name" required maxLength={100} autoComplete="given-name" placeholder="Как к вам обращаться" className="mt-2 h-14 w-full rounded-xl border border-line bg-canvas/40 px-4 outline-none focus:border-accent" /></label>
          <label className="block text-sm">Телефон<input name="phone" type="tel" required minLength={10} maxLength={30} autoComplete="tel" placeholder="+7 (___) ___-__-__" className="mt-2 h-14 w-full rounded-xl border border-line bg-canvas/40 px-4 outline-none focus:border-accent" /></label>
          <ContactConsentFields />
          {status === "error" && <p role="alert" className="rounded-xl bg-red-950/50 p-3 text-sm text-red-200">{errorMessage} <a href={SITE_CONFIG.phoneHref} className="underline">{SITE_CONFIG.phoneDisplay}</a>.</p>}
          <button type="submit" disabled={status === "sending"} className="min-h-14 w-full cursor-pointer rounded-full bg-action px-6 py-4 text-sm font-semibold text-on-action transition hover:bg-action-hover disabled:opacity-60">{status === "sending" ? "Отправляем…" : "Получить помощь с бронированием"}</button>
        </form>}
      </div>
    </div>
  </section>;
}
