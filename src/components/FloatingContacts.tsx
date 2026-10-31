"use client";
import { useEffect, useRef, useState } from "react";
import { ChatCircleDots, X } from "@phosphor-icons/react";
import { SocialLinks } from "./SocialLinks";
import { SITE_CONFIG } from "@/data/site";

export function FloatingContacts() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); };
  }, [open]);
  return <div ref={root} className="fixed right-4 bottom-5 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
    {open && <div id="contact-channels" aria-label="Способы связи" className="w-64 max-w-[calc(100vw-2rem)] rounded-3xl border border-white/15 bg-[#102419] p-5 shadow-2xl">
      <p className="font-moderustic text-lg font-bold">Мы на связи</p><p className="mt-1 mb-4 text-xs leading-relaxed text-[#a8b9ae]">Поможем выбрать дом и даты отдыха.</p>
      <SocialLinks className="flex flex-col gap-2" />
      <a className="mt-4 block text-center text-sm text-[#d49a5a]" href={SITE_CONFIG.phoneHref}>{SITE_CONFIG.phoneDisplay}</a>
    </div>}
    <button ref={trigger} type="button" aria-expanded={open} aria-controls="contact-channels" aria-label={open ? "Закрыть мессенджеры" : "Открыть мессенджеры"} onClick={() => setOpen(!open)} className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-[#d49a5a]/50 bg-[#efe7d8] text-[#163122] shadow-xl transition hover:scale-105">
      {open ? <X size={25} /> : <ChatCircleDots size={28} />}
    </button>
  </div>;
}
