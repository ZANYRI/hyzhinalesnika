"use client";

import Image from "@/components/SeasonalImage";

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
import { CABIN_LIST } from "@/data/cabins";
import { PhotoDots } from "./PhotoDots";
import { CabinTreeEmoji } from "./CabinTreeEmoji";

export function CabinShowcase() {
  const [activeCabinIdx, setActiveCabinIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

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
                  ? "text-on-action"
                  : "border border-line bg-surface text-muted hover:border-line hover:text-ink"
              }`}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full bg-action"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <CabinTreeEmoji id={item.id} />
                <span>{item.cardTitle}</span>
                <span
                  className={`text-xs font-normal ${
                    isActive ? "text-on-action/90" : "text-muted"
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
        <div className="content-card flex flex-col rounded-3xl border border-line bg-surface p-3 sm:p-4 lg:col-span-7 lg:self-start">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-soft">
              <div
                key={currentPhoto.src}
                className={`relative h-full w-full ${photoIdx !== 0 || activeCabinIdx !== 0 ? "cabin-photo-enter" : ""}`}
              ><Image src={currentPhoto.src} alt={currentPhoto.alt} fill sizes="(min-width: 1400px) 742px, (min-width: 1024px) calc(58.333333vw - 75.333333px), (min-width: 640px) calc(100vw - 82px), calc(100vw - 58px)" loading="lazy" className="object-cover" /></div>

            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Предыдущее фото дома"
              className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-canvas/75 text-ink backdrop-blur-md transition hover:border-accent hover:text-accent-hover active:scale-[0.98] cursor-pointer"
            >
              <CaretLeft size={18} weight="bold" />
            </button>

            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Следующее фото дома"
              className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-canvas/75 text-ink backdrop-blur-md transition hover:border-accent hover:text-accent-hover active:scale-[0.98] cursor-pointer"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
          <PhotoDots total={previewPhotos.length} current={photoIdx} onSelect={setPhotoIdx} />
        </div>

        {/* Right 5 cols: Architectural Spec & Action Panel */}
        <div className="content-card flex flex-col justify-between rounded-3xl border border-line bg-surface p-5 sm:p-6 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-moderustic text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                <CabinTreeEmoji id={cabin.id} className="mr-2" />
                {cabin.cardTitle}
              </h3>
              <span className="font-moderustic text-lg font-bold text-accent sm:text-xl">
                {cabin.cardPrice}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-muted">
              {cabin.cardSubtitle}.
            </p>

            {/* 3 Metric Tiles */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              <div className="rounded-2xl border border-line bg-soft/70 p-3.5">
                <Users size={18} className="text-accent" />
                <span className="mt-2 block text-xs text-muted">Гости</span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-ink">
                  {cabin.cardGuests}
                </span>
              </div>

              <div className="rounded-2xl border border-line bg-soft/70 p-3.5">
                <Ruler size={18} className="text-accent" />
                <span className="mt-2 block text-xs text-muted">
                  Площадь
                </span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-ink">
                  {cabin.cardArea}
                </span>
              </div>

              <div className="rounded-2xl border border-line bg-soft/70 p-3.5">
                <DoorOpen size={18} className="text-accent" />
                <span className="mt-2 block text-xs text-muted">
                  Планировка
                </span>
                <span className="mt-0.5 block font-moderustic text-sm font-bold text-ink">
                  {cabin.cardBedrooms}
                </span>
              </div>
            </div>

            {/* Key Highlights */}
            <ul className="mt-6 space-y-2.5 text-sm text-muted">
              {cabin.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check
                    size={16}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <Link
              href={cabin.slug}
              className="inline-flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent/45 bg-soft/85 px-6 text-sm font-semibold text-ink transition hover:border-accent hover:bg-action hover:text-on-action active:scale-[0.98]"
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
