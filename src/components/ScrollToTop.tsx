"use client";

import React, { useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

export function ScrollToTop() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 420;
    setVisible((prev) => (prev === next ? prev : next));
  });

  if (!visible) return null;

  return (
    <motion.button
      type="button"
      initial={reduce ? false : { opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className="fixed right-5 bottom-20 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#163122]/90 text-[#f3f5f0] shadow-[0_14px_34px_rgba(0,0,0,0.45)] backdrop-blur-md transition hover:border-[#d49a5a]/60 hover:bg-[#d49a5a] hover:text-[#0a1911] active:scale-[0.98] sm:bottom-6 cursor-pointer"
    >
      <ArrowUp size={20} weight="bold" />
    </motion.button>
  );
}
