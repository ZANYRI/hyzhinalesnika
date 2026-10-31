"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Check,
  DoorOpen,
  Ruler,
  Users,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CABIN_LIST } from "@/data/cabins";
import { PhotoDots } from "./PhotoDots";
import { CabinTreeEmoji } from "./CabinTreeEmoji";

export function CabinShowcase() {
  const [activeCabinIdx, setActiveCabinIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const reduce = useReducedMotion();

  const cabin = CABIN_LIST[activeCabinIdx];
  // The card cover is already the first gallery photo, under a different filename.
  const previewPhotos = cabin.gallery.filter((photo, index, photos) => photos.findIndex(item => item.src === photo.src) === index);
  const currentPhoto = previewPhotos[photoIdx % previewPhotos.length];

  function selectCabin(idx: number) {
    setActiveCabinIdx(idx);
    setPhotoIdx(0);
  }

  function prevPhoto() {
    setPhotoIdx((p) => (p - 1 + previewPhotos.length) % previewPhotos.length);
  }

  function nextPhoto() {
    setPhotoIdx((p) => (p + 1) % previewPhotos.length);
  }

  return (
    <div>
      {/* Interactive Cabin Selector Pills */}
      <div
        id="cabin-selector"
        role="tablist"
        aria-label="Выбор дома"
        className="scroll-mt-24 flex flex-wrap items-center gap-2.5"
      >
        {CABIN_LIST.map((item, idx) => {
          const isActive = idx === activeCabinIdx;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectCabin(idx)}
              className={`relative rounded-full px-5 py-3 text-left text-sm font-semibold transition active:scale-[0.98] cursor-pointer ${
                isActive
                  ? "text-[#0a1911]"
                  : "border border-white/12 bg-[#102419] text-[#d6e0d9] hover:border-white/25 hover:text-[#f3f5f0]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCabinTab"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-[#d49a5a]"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <CabinTreeEmoji id={item.id} />
                <span>{item.cardTitle}</span>
                <span
                  className={`text-xs font-normal ${
                    isActive ? "text-[#0a1911]/80" : "text-[#a8b9ae]"
                  }`}
                >
                  · {item.cardGuests}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Asymmetric Showcase Stage */}
      <div className="mt-7 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left 7 cols: Photo Stage + Filmstrip */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-[#102419] p-3 sm:p-4 lg:col-span-7 lg:self-start">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#08140d]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentPhoto.src}
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                initial={reduce ? false : { opacity: 0.25, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0.2 }}
                transition={{ duration: 0.32 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Предыдущее фото дома"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0a1911]/75 text-[#f3f5f0] backdrop-blur-md transition hover:border-[#d49a5a] hover:text-[#d49a5a] active:scale-[0.98] cursor-pointer"
            >
              <CaretLeft size={18} weight="bold" />
            </button>

            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Следующее фото дома"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#0a1911]/75 text-[#f3f5f0] backdrop-blur-md transition hover:border-[#d49a5a] hover:text-[#d49a5a] active:scale-[0.98] cursor-pointer"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
          <PhotoDots total={previewPhotos.length} current={photoIdx} onSelect={setPhotoIdx} />
        </div>

        {/* Right 5 cols: Architectural Spec & Action Panel */}
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-moderustic text-2xl font-bold tracking-tight text-[#f3f5f0] sm:text-3xl">
                <CabinTreeEmoji id={cabin.id} className="mr-2" />
                {cabin.cardTitle}
              </h3>
              <span className="font-moderustic text-lg font-bold text-[#d49a5a] sm:text-xl">
                {cabin.cardPrice}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#a8b9ae]">
              {cabin.cardSubtitle}.
            </p>

            {/* 3 Metric Tiles */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-white/8 bg-[#163122]/70 p-3.5">
                <Users size={18} className="text-[#d49a5a]" />
                <span className="mt-2 block text-xs text-[#a8b9ae]">Гости</span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                  {cabin.cardGuests}
                </span>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#163122]/70 p-3.5">
                <Ruler size={18} className="text-[#d49a5a]" />
                <span className="mt-2 block text-xs text-[#a8b9ae]">
                  Площадь
                </span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                  {cabin.cardArea}
                </span>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#163122]/70 p-3.5">
                <DoorOpen size={18} className="text-[#d49a5a]" />
                <span className="mt-2 block text-xs text-[#a8b9ae]">
                  Планировка
                </span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                  {cabin.cardBedrooms}
                </span>
              </div>
            </div>

            {/* Key Highlights */}
            <ul className="mt-6 space-y-2.5 text-sm text-[#d6e0d9]">
              {cabin.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    size={16}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-[#d49a5a]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <Link
              href={cabin.slug}
              className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d49a5a]/45 bg-[#163122]/85 px-6 text-sm font-semibold text-[#f3f5f0] transition hover:border-[#d49a5a] hover:bg-[#d49a5a] hover:text-[#0a1911] active:scale-[0.98]"
            >
              <span>Планировка и фото</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}
