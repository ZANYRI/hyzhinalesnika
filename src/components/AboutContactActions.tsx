"use client";

import React, { useState } from "react";
import { ChatCircle, InstagramLogo, PhoneCall, TelegramLogo, WhatsappLogo } from "@phosphor-icons/react";
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
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full bg-action px-6 text-sm font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] cursor-pointer"
        >
          <PhoneCall size={18} weight="bold" />
          <span>Обратный звонок</span>
        </button>

        <a
          href={SITE_CONFIG.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-soft/75 px-5 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent active:scale-[0.98]"
        >
          <WhatsappLogo size={18} />
          <span>WhatsApp</span>
        </a>

        <a
          href={SITE_CONFIG.telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-soft/75 px-5 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent active:scale-[0.98]"
        >
          <TelegramLogo size={18} />
          <span>Telegram</span>
        </a>

        <a
          href={SITE_CONFIG.maxHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-soft/75 px-5 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent active:scale-[0.98]"
        >
          <ChatCircle size={18} />
          <span>MAX</span>
        </a>

        <a
          href={SITE_CONFIG.instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-soft/75 px-5 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent active:scale-[0.98]"
        >
          <InstagramLogo size={18} />
          <span>Instagram</span>
        </a>
      </div>

      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
}
