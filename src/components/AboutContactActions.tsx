"use client";

import React, { useState } from "react";
import { SITE_CONFIG } from "@/data/site";
import { PhoneSignalIcon } from "./Icons";
import { CallbackModal } from "./CallbackModal";

export function AboutContactActions() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <div className="mt-7 flex flex-wrap items-center gap-4 xl:flex-nowrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            aria-label="Заказать обратный звонок"
            className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#e8ece8] text-[#555] shadow-sm transition hover:scale-105 cursor-pointer"
          >
            <PhoneSignalIcon className="h-[21px] w-[21px]" />
          </button>
          <div>
            <a
              href={SITE_CONFIG.phoneHref}
              className="block whitespace-nowrap font-moderustic text-[18px] font-bold text-white transition hover:text-[#dbd0bf]"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <span className="block whitespace-nowrap font-moderustic text-[13px] font-medium text-white/90">
              {SITE_CONFIG.address}
            </span>
          </div>
        </div>

        <a
          href="#booking"
          className="inline-flex h-[64px] shrink-0 items-center justify-center rounded-[12px] bg-[#90754b] px-7 font-moderustic text-[12.5px] font-bold uppercase tracking-wider text-white transition hover:bg-[#a68859]"
        >
          ЗАБРОНИРОВАТЬ
        </a>
      </div>

      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
}

export function AdvantageContactCard() {
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between rounded-[22px] bg-[#2a2c29] px-6 py-10 text-center text-white">
        <div>
          <h3 className="font-moderustic text-[21px] leading-snug font-extrabold uppercase tracking-tight text-white">
            ОЦЕНИТЕ НАШИ ПРЕИМУЩЕСТВА ПЕРВЫМИ
          </h3>
          <p className="mt-3 font-moderustic text-[13px] leading-relaxed uppercase text-white/55">
            ПОЗВОНИТЕ ПО НОМЕРУ ТЕЛЕФОНА ИЛИ НАПИШИТЕ В WHATSAPP
          </p>
        </div>

        <div className="my-7 flex items-center gap-3.5 text-left">
          <button
            type="button"
            onClick={() => setCallbackOpen(true)}
            aria-label="Заказать обратный звонок"
            className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#e8ece8] text-[#555] transition hover:scale-105 cursor-pointer"
          >
            <PhoneSignalIcon className="h-[22px] w-[22px]" />
          </button>
          <div>
            <a
              href={SITE_CONFIG.phoneHref}
              className="block font-moderustic text-[17.5px] font-bold text-white transition hover:text-[#dbd0bf]"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <span className="block font-moderustic text-[13px] text-white/65">
              {SITE_CONFIG.address}
            </span>
          </div>
        </div>

        <a
          href={SITE_CONFIG.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[68px] min-w-[165px] items-center justify-center rounded-[12px] bg-[#90754b] px-8 font-moderustic text-[13.5px] font-bold uppercase tracking-wider text-white transition hover:bg-[#a68859]"
        >
          НАПИСАТЬ
        </a>
      </div>

      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
}
