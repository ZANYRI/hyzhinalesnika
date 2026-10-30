"use client";

import React, { useState } from "react";
import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {HOME_FAQ.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-[18px] bg-[#d9decc] text-[#454743] transition"
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-5 px-7 py-5 text-left transition hover:bg-[#cfd5c0] cursor-pointer"
            >
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#90754b] p-2">
                <img
                  src="/images/home/faq-check.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="font-moderustic text-[18px] leading-snug font-medium text-[#525550] sm:text-[19px]">
                {item.question}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-[#90754b]/20 px-7 pt-3 pb-6 pl-[88px] font-moderustic text-[15.5px] leading-relaxed text-[#2d302c]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
