"use client";

import React, { useState } from "react";
import { PhoneCall, TelegramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import { CallbackModal } from "./CallbackModal";

export function AboutContactActions() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setCallbackOpen(true)}
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-[#d49a5a] px-6 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] cursor-pointer"
        >
          <PhoneCall size={18} weight="bold" />
          <span>Обратный звонок</span>
        </button>

        <a
          href={SITE_CONFIG.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#163122]/75 px-5 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a] active:scale-[0.98]"
        >
          <WhatsappLogo size={18} />
          <span>WhatsApp</span>
        </a>

        <a
          href={SITE_CONFIG.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-[#163122]/75 px-5 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a] active:scale-[0.98]"
        >
          <TelegramLogo size={18} />
          <span>Telegram</span>
        </a>
      </div>

      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
}
