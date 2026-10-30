"use client";

import React, { useEffect, useState } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { HOME_GALLERY } from "@/data/home";

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
      <div className="marquee-container relative w-full overflow-hidden py-2">
        <div
          className="marquee-track items-center gap-5"
          style={{ ["--marquee-duration" as string]: "56s" }}
        >
          {doubled.map((item, idx) => (
            <button
              key={`${item.src}-${idx}`}
              type="button"
              onClick={() => setLightboxIdx(idx % HOME_GALLERY.length)}
              aria-label={`Открыть фото: ${item.alt}`}
              className={`relative shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#102419] transition-colors hover:border-[#d49a5a]/55 focus:outline-none cursor-pointer ${
                item.aspect === "portrait"
                  ? "h-[360px] w-[265px] sm:h-[430px] sm:w-[310px]"
                  : "h-[290px] w-[360px] sm:h-[345px] sm:w-[440px]"
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото территории"
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Закрыть"
            className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#102419] text-[#f3f5f0] transition hover:border-[#d49a5a] hover:text-[#d49a5a] cursor-pointer"
          >
            <X size={20} />
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
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#102419]/90 text-[#f3f5f0] shadow-lg transition hover:border-[#d49a5a] hover:text-[#d49a5a] cursor-pointer"
          >
            <CaretLeft size={22} weight="bold" />
          </button>

          <div
            className="max-h-[88vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={HOME_GALLERY[lightboxIdx].src}
              alt={HOME_GALLERY[lightboxIdx].alt}
              className="max-h-[84vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % HOME_GALLERY.length);
            }}
            aria-label="Следующее фото"
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#102419]/90 text-[#f3f5f0] shadow-lg transition hover:border-[#d49a5a] hover:text-[#d49a5a] cursor-pointer"
          >
            <CaretRight size={22} weight="bold" />
          </button>
        </div>
      )}
    </>
  );
}
