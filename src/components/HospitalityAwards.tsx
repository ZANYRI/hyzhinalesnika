import React from "react";
import {
  ArrowUpRight,
  Medal,
  SealCheck,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/data/site";

interface HospitalityAwardsProps {
  variant?: "cards" | "compact";
}

function LaurelEmblem() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 text-[#d49a5a]"
    >
      {/* Left laurel branch */}
      <path
        d="M13.5 25.5C9.2 23.4 6.5 19.1 6.5 14.2C6.5 11.1 7.6 8.3 9.6 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.7 15.5C4.8 14.7 4.1 12.9 4.5 11.3C6.2 11.6 7.4 13.1 7.2 14.9"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M8.1 20.3C6.1 20.1 4.9 18.6 4.8 16.9C6.5 16.7 8.1 17.8 8.4 19.6"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M8.1 10.6C6.6 9.4 6.4 7.5 7.2 6C8.7 6.8 9.4 8.5 8.8 10.1"
        fill="currentColor"
        fillOpacity="0.35"
      />

      {/* Right laurel branch */}
      <path
        d="M18.5 25.5C22.8 23.4 25.5 19.1 25.5 14.2C25.5 11.1 24.4 8.3 22.4 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M25.3 15.5C27.2 14.7 27.9 12.9 27.5 11.3C25.8 11.6 24.6 13.1 24.8 14.9"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M23.9 20.3C25.9 20.1 27.1 18.6 27.2 16.9C25.5 16.7 23.9 17.8 23.6 19.6"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M23.9 10.6C25.4 9.4 25.6 7.5 24.8 6C23.3 6.8 22.6 8.5 23.2 10.1"
        fill="currentColor"
        fillOpacity="0.35"
      />

      {/* Center star */}
      <path
        d="M16 9.3L17.65 12.65L21.35 13.18L18.67 15.79L19.3 19.47L16 17.73L12.7 19.47L13.33 15.79L10.65 13.18L14.35 12.65L16 9.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HospitalityAwards({
  variant = "cards",
}: HospitalityAwardsProps) {
  if (variant === "compact") {
    return (
      <a
        href={SITE_CONFIG.yandexReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3.5 rounded-2xl border border-[#d49a5a]/30 bg-[#102419] px-4 py-3 transition hover:border-[#d49a5a]/65"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d49a5a]/25 bg-[#0a1911]">
          <LaurelEmblem />
        </span>

        <span className="leading-snug">
          <span className="flex items-center gap-2">
            <span className="font-moderustic text-sm font-bold text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
              Хорошее место
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#d49a5a]/35 bg-[#d49a5a]/15 px-2 py-0.5 font-moderustic text-xs font-bold text-[#d49a5a]">
              <Star size={11} weight="fill" />
              <span>5,0</span>
            </span>
          </span>
          <span className="mt-0.5 block text-[11px] text-[#a8b9ae]">
            Выбор пользователей Яндекса
          </span>
        </span>

        <ArrowUpRight
          size={15}
          className="ml-1 shrink-0 text-[#a8b9ae] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d49a5a]"
        />
      </a>
    );
  }

  return (
    <div className="space-y-3">
      {/* Primary Flagship Award: Yandex Khoroshee Mesto 5.0 */}
      <a
        href={SITE_CONFIG.yandexReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-3 rounded-2xl border border-[#d49a5a]/35 bg-gradient-to-br from-[#163122] to-[#0d1f15] p-4 transition hover:border-[#d49a5a]/70"
      >
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d49a5a]/30 bg-[#0a1911]/85 shadow-inner">
            <LaurelEmblem />
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-moderustic text-base font-bold text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
                Хорошее место
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-[#d49a5a]/40 bg-[#d49a5a]/15 px-2.5 py-0.5 font-moderustic text-xs font-bold text-[#d49a5a]">
                <Star size={12} weight="fill" />
                <span>5,0</span>
              </span>
            </div>
            <span className="mt-0.5 block text-xs text-[#a8b9ae]">
              Награда и выбор пользователей Яндекса · 65+ оценок
            </span>
          </div>
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-[#a8b9ae] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#d49a5a]"
        />
      </a>

      {/* Secondary Verified Hospitality Plaques: Ubook.ru & 101Hotels.com */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#163122]/65 p-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0a1911]/80 text-[#d49a5a]">
            <SealCheck size={20} weight="duotone" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-moderustic text-sm font-bold text-[#f3f5f0]">
              Ubook.ru
            </p>
            <p className="truncate text-xs text-[#a8b9ae]">
              Рекомендует гостям
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#163122]/65 p-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0a1911]/80 text-[#d49a5a]">
            <Medal size={20} weight="duotone" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-moderustic text-sm font-bold text-[#f3f5f0]">
              101Hotels.com
            </p>
            <p className="truncate text-xs text-[#a8b9ae]">
              Проверенный объект
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
