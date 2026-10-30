"use client";

import React, { useEffect, useState } from "react";
import { HOME_GALLERY } from "@/data/home";
import { CloseIcon } from "./Icons";

export function GalleryMarquee() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowRight") {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev + 1) % HOME_GALLERY.length
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIdx((prev) =>
          prev === null
            ? null
            : (prev - 1 + HOME_GALLERY.length) % HOME_GALLERY.length
        );
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIdx]);

  const doubled = [...HOME_GALLERY, ...HOME_GALLERY];

  return (
    <>
      <div className="relative w-full overflow-hidden py-2">
        <div
          className="marquee-track gap-6"
          style={{ ["--marquee-duration" as string]: "46s" }}
        >
          {doubled.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              type="button"
              onClick={() => setLightboxIdx(idx % HOME_GALLERY.length)}
              aria-label={`Открыть фото: ${item.alt}`}
              className="group relative h-[380px] w-[265px] shrink-0 overflow-hidden rounded-[26px] focus:outline-none sm:h-[465px] sm:w-[308px] cursor-pointer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
          onClick={() => setLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото галереи"
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Закрыть"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 cursor-pointer"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx(
                (lightboxIdx - 1 + HOME_GALLERY.length) % HOME_GALLERY.length
              );
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
              src={HOME_GALLERY[lightboxIdx].src}
              alt={HOME_GALLERY[lightboxIdx].alt}
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % HOME_GALLERY.length);
            }}
            aria-label="Следующее фото"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#90754b] text-2xl text-white shadow-lg transition hover:bg-[#a68859] cursor-pointer"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
