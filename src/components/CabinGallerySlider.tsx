"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  CaretLeft,
  CaretRight,
  CornersOut,
  X,
} from "@phosphor-icons/react";
import { PhotoDots } from "./PhotoDots";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface CabinGallerySliderProps {
  images: { src: string; alt: string }[];
}

export function CabinGallerySlider({ images }: CabinGallerySliderProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const reduce = useReducedMotion();
  const lightboxRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }

  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lightboxRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        const controls = Array.from(lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        const first=controls[0], last=controls[controls.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus();}
      }
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + total) % total);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % total);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus({preventScroll:true});
    };
  }, [lightboxOpen, total]);

  const activeImage = images[current] ?? images[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#102419] p-3 sm:p-4">
      {/* Main Architectural Photo Stage */}
      <div className="relative grid gap-3 overflow-hidden rounded-2xl bg-[#08140d] lg:grid-cols-[2fr_1fr]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Открыть фотографию во весь экран"
          className="block aspect-[16/11] w-full overflow-hidden focus:outline-none cursor-zoom-in lg:row-span-2 lg:aspect-[16/10]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage?.src}
              src={activeImage?.src}
              alt={activeImage?.alt}
              initial={reduce ? false : { opacity: 0.25, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0.2 }}
              transition={{ duration: 0.28 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
        </button>

        {[1, 2].map(offset => {
          const index=(current+offset)%total;
          return <button key={offset} type="button" onClick={()=>{setCurrent(index);setLightboxOpen(true);}} aria-label={`Открыть фото ${index+1} во весь экран`} className="relative hidden min-h-0 overflow-hidden rounded-xl lg:block">
            <img src={images[index].src} alt={images[index].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition hover:scale-105"/>
            {offset===2 && <span className="absolute right-3 bottom-3 rounded-full bg-[#0a1911]/80 px-3 py-2 text-xs text-white">Все {total} фото ↗</span>}
          </button>;
        })}

        <button
          type="button"
          onClick={prev}
          aria-label="Предыдущее фото"
          className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0a1911]/75 text-[#f3f5f0] backdrop-blur-md transition hover:border-[#d49a5a] hover:text-[#d49a5a] active:scale-[0.98] cursor-pointer"
        >
          <CaretLeft size={18} weight="bold" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Следующее фото"
          className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0a1911]/75 text-[#f3f5f0] backdrop-blur-md transition hover:border-[#d49a5a] hover:text-[#d49a5a] active:scale-[0.98] cursor-pointer"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>

      <PhotoDots total={total} current={current} onSelect={setCurrent} />

      {/* Controls Bar */}
      <div className="mt-1 flex items-center justify-between px-1 text-xs text-[#a8b9ae]">
        <span>
          Кадр <strong className="text-[#f3f5f0]">{current + 1}</strong> из{" "}
          {total}
        </span>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="inline-flex items-center gap-1.5 font-medium text-[#d6e0d9] transition hover:text-[#d49a5a] cursor-pointer"
        >
          <CornersOut size={15} />
          <span>Во весь экран</span>
        </button>
      </div>


      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#06100b]/92 p-4 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии дома"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#f3f5f0] transition hover:bg-white/20 cursor-pointer"
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее фото"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#102419]/90 text-[#f3f5f0] shadow-lg transition hover:border-[#d49a5a] hover:text-[#d49a5a] cursor-pointer"
          >
            <CaretLeft size={22} weight="bold" />
          </button>

          <div
            className="max-h-[88vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage?.src}
              alt={activeImage?.alt}
              className="max-h-[84vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-xs text-[#a8b9ae]">
              {activeImage?.alt} ({current + 1} / {total})
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее фото"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#102419]/90 text-[#f3f5f0] shadow-lg transition hover:border-[#d49a5a] hover:text-[#d49a5a] cursor-pointer"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
