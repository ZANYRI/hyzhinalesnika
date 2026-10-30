"use client";

import React, { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {HOME_FAQ.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-2xl border transition ${
              isOpen
                ? "border-[#d49a5a]/45 bg-[#163122]"
                : "border-white/10 bg-[#102419] hover:border-white/20"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
            >
              <span className="font-moderustic text-base font-bold leading-snug text-[#f3f5f0] sm:text-lg">
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
                  isOpen
                    ? "border-[#d49a5a] bg-[#d49a5a] text-[#0a1911]"
                    : "border-white/15 bg-white/5 text-[#f3f5f0]"
                }`}
              >
                {isOpen ? (
                  <Minus size={16} weight="bold" />
                ) : (
                  <Plus size={16} weight="bold" />
                )}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                >
                  <div className="border-t border-white/10 px-6 pt-4 pb-6 text-sm leading-relaxed text-[#a8b9ae] sm:text-[15px]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
