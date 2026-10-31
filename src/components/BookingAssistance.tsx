"use client";
import Link from "next/link";
import { useState } from "react";
import { TreeEvergreen } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";

export function BookingAssistance() {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.get("name"),phone:data.get("phone"),source:"Подбор дома на главной"})});
      if (!response.ok) throw new Error("Delivery failed");
      setStatus("sent"); form.reset();
    } catch { setStatus("error"); }
  }
  return <section id="help" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
    <div className="relative overflow-hidden rounded-[2rem] border border-[#d49a5a]/25 bg-[#163122] px-5 py-14 sm:px-12 sm:py-20">
      <TreeEvergreen aria-hidden="true" weight="thin" className="pointer-events-none absolute -bottom-12 -left-20 h-80 w-80 text-[#d49a5a]/10" />
      <TreeEvergreen aria-hidden="true" weight="thin" className="pointer-events-none absolute -top-12 -right-12 h-80 w-80 rotate-180 text-[#d49a5a]/10" />
      <div className="relative mx-auto max-w-2xl text-center">
        <TreeEvergreen size={38} weight="thin" className="mx-auto text-[#d49a5a]" />
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Осталось выбрать даты</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Поможем подобрать ваш дом</h2>
        <p className="mt-4 leading-relaxed text-[#d6e0d9]">Оставьте контакты — подберём дом для вашей поездки, поможем с бронированием и ответим на вопросы.</p>
        {status === "sent" ? <p role="status" className="mt-8 rounded-2xl border border-[#d49a5a]/40 p-6">Спасибо! Заявка отправлена. Мы свяжемся с вами.</p> : <form onSubmit={submit} className="mt-8 space-y-4 text-left">
          <label className="block text-sm">Ваше имя<input name="name" required maxLength={100} autoComplete="given-name" placeholder="Как к вам обращаться" className="mt-2 h-14 w-full rounded-xl border border-white/25 bg-[#0a1911]/40 px-4 outline-none focus:border-[#d49a5a]" /></label>
          <label className="block text-sm">Телефон<input name="phone" type="tel" required minLength={10} maxLength={30} autoComplete="tel" placeholder="+7 (___) ___-__-__" className="mt-2 h-14 w-full rounded-xl border border-white/25 bg-[#0a1911]/40 px-4 outline-none focus:border-[#d49a5a]" /></label>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-[#d6e0d9]"><input type="checkbox" required name="consent" className="mt-1 h-4 w-4 shrink-0 accent-[#d49a5a]" /><span>Согласен(на) на обработку персональных данных и с <Link href="/privacy-policy" className="underline">политикой обработки персональных данных</Link>.</span></label>
          {status === "error" && <p role="alert" className="rounded-xl bg-red-950/50 p-3 text-sm text-red-200">Не удалось отправить заявку. Пожалуйста, позвоните нам: <a href={SITE_CONFIG.phoneHref} className="underline">{SITE_CONFIG.phoneDisplay}</a>.</p>}
          <button type="submit" disabled={status === "sending"} className="min-h-14 w-full cursor-pointer rounded-full bg-[#d49a5a] px-6 py-4 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] disabled:opacity-60">{status === "sending" ? "Отправляем…" : "Получить помощь с бронированием"}</button>
        </form>}
      </div>
    </div>
  </section>;
}
