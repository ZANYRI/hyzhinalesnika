"use client";

import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "./Icons";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 350);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Наверх"
      className="fixed right-5 bottom-20 z-40 flex h-12 w-12 items-center justify-center rounded-[9px] bg-[#90754b] text-white shadow-lg transition hover:bg-[#a68859] sm:bottom-5 cursor-pointer"
    >
      <ChevronUpIcon className="h-4 w-4" />
    </button>
  );
}
