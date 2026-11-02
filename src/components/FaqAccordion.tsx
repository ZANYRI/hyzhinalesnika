"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    function openQuestion(event: Event) {
      if ((event as CustomEvent<string>).detail === "pets") {
        setOpenIdx(HOME_FAQ.findIndex(item => item.question === "Можно ли приезжать с питомцами?"));
      }
    }
    window.addEventListener("hyzhina:open-faq", openQuestion);
    // Covers a direct link opened before this component hydrates.
    if (window.location.hash === "#faq-pets") openQuestion(new CustomEvent("hyzhina:open-faq", { detail: "pets" }));
    return () => window.removeEventListener("hyzhina:open-faq", openQuestion);
  }, []);

  return (
    <div className="grid items-start gap-3 md:grid-cols-2">
      {HOME_FAQ.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            id={item.question === "Можно ли приезжать с питомцами?" ? "faq-pets" : undefined}
            key={item.question}
            className={`scroll-mt-28 overflow-hidden rounded-2xl border transition ${
              isOpen
                ? "border-[#d49a5a]/45 bg-[#1d3b2b]"
                : "border-white/10 bg-[#173024] hover:border-white/20"
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
                    ? "border-[#d49a5a] bg-[#d49a5a] text-[#102219]"
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
                  <div className="whitespace-pre-line border-t border-white/10 px-6 pt-4 pb-6 text-sm leading-relaxed text-[#a8b9ae] sm:text-[15px]">
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
