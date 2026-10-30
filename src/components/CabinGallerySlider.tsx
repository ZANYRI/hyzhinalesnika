"use client";

import React, { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";

interface CabinGallerySliderProps {
  images: { src: string; alt: string }[];
}

export function CabinGallerySlider({ images }: CabinGallerySliderProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const total = images.length;

  function prev() {
    setCurrent((c) => (c - 1 + total) % total);
  }

  function next() {
    setCurrent((c) => (c + 1) % total);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + total) % total);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % total);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, total]);

  return (
    <div>
      {/* Main Bordered Photo Frame */}
      <div className="relative overflow-hidden rounded-[9px] border-[2.5px] border-[#90754b] bg-[#0a1d12]">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Увеличить фотографию"
          className="block aspect-[16/10] w-full overflow-hidden focus:outline-none cursor-zoom-in"
        >
          <img
            src={images[current]?.src}
            alt={images[current]?.alt}
            className="h-full w-full object-cover transition duration-300"
          />
        </button>

        {/* Left Circular Gold Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Предыдущее фото"
          className="absolute top-1/2 left-4 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full bg-[#90754b]/85 text-white shadow-md transition hover:bg-[#90754b] cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Right Circular Gold Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Следующее фото"
          className="absolute top-1/2 right-4 flex h-[46px] w-[46px] -translate-y-1/2 items-center justify-center rounded-full bg-[#90754b]/85 text-white shadow-md transition hover:bg-[#90754b] cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots below frame (matching live wrapping dots) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 px-4">
        {images.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Фото ${idx + 1} из ${total}`}
            aria-current={idx === current}
            className={`h-[15px] w-[15px] rounded-full transition cursor-pointer ${
              idx === current
                ? "bg-[#90754b] opacity-100"
                : "bg-[#90754b]/35 hover:bg-[#90754b]/65"
            }`}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии дома"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Закрыть"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее фото"
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#90754b] text-2xl text-white shadow-lg transition hover:bg-[#a68859] cursor-pointer"
          >
            ‹
          </button>

          <div
            className="max-h-[88vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[current]?.src}
              alt={images[current]?.alt}
              className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее фото"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#90754b] text-2xl text-white shadow-lg transition hover:bg-[#a68859] cursor-pointer"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
