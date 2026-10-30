import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  DoorOpen,
  MoonStars,
  Prohibit,
  Ruler,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react/dist/ssr";
import { BOOKING_RULES, CabinData } from "@/data/cabins";
import { SITE_CONFIG } from "@/data/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CabinGallerySlider } from "./CabinGallerySlider";
import { KonturBookingWidget } from "./KonturBookingWidget";
import { Reveal } from "./Reveal";
import { CabinTreeEmoji } from "./CabinTreeEmoji";

interface CabinDetailViewProps {
  cabin: CabinData;
}

function renderRuleIcon(idx: number) {
  switch (idx) {
    case 0:
      return <ShieldCheck size={24} />;
    case 1:
      return <Clock size={24} />;
    case 2:
      return <Prohibit size={24} />;
    default:
      return <MoonStars size={24} />;
  }
}

export function CabinDetailView({ cabin }: CabinDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="pt-8 pb-20 sm:pt-12 sm:pb-28">
        {/* Top Architectural Showcase: 7/5 Gallery + Summary */}
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <Link
            href="/#cabins"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#a8b9ae] transition hover:text-[#d49a5a]"
          >
            <ArrowLeft size={14} />
            <span>Все дома в «Хижине лесника»</span>
          </Link>

          <div className="mt-5 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left 7 cols: Interactive Photo Stage */}
            <div className="lg:col-span-7">
              <CabinGallerySlider images={cabin.gallery} />
            </div>

            {/* Right 5 cols: Summary & Key Parameters */}
            <div className="rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-8 lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d49a5a]">
                Архыз · ул. Лесная, 40
              </p>

              <h1 className="mt-3 font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                <CabinTreeEmoji id={cabin.id} className="mr-2" />
                {cabin.titlePrefix}{" "}
                <span className="text-[#d49a5a]">{cabin.titleHighlight}</span>
              </h1>

              <p className="mt-3 font-moderustic text-xl font-bold text-[#f3f5f0]">
                {cabin.cardPrice}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#a8b9ae] sm:text-[15px]">
                {cabin.introText}
              </p>

              {/* 3 Core Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-2.5">
                <div className="rounded-2xl border border-white/8 bg-[#163122]/75 p-3.5">
                  <Users size={18} className="text-[#d49a5a]" />
                  <span className="mt-2 block text-xs text-[#a8b9ae]">
                    Гости
                  </span>
                  <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                    {cabin.cardGuests}
                  </span>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#163122]/75 p-3.5">
                  <Ruler size={18} className="text-[#d49a5a]" />
                  <span className="mt-2 block text-xs text-[#a8b9ae]">
                    Площадь
                  </span>
                  <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                    {cabin.cardArea}
                  </span>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#163122]/75 p-3.5">
                  <DoorOpen size={18} className="text-[#d49a5a]" />
                  <span className="mt-2 block text-xs text-[#a8b9ae]">
                    Комнаты
                  </span>
                  <span className="mt-0.5 block font-moderustic text-sm font-bold text-[#f3f5f0]">
                    {cabin.cardBedrooms}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-sm text-[#d6e0d9]">
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

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#booking"
                  className="inline-flex h-12 flex-1 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-6 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
                >
                  Проверить свободные даты
                </a>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-[#163122]/65 px-5 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a] active:scale-[0.98]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Контур.Отель Booking Bar */}
        <div className="mt-12 sm:mt-16">
          <KonturBookingWidget id="booking" />
        </div>

        {/* Grouped Architectural Equipment & Layout Cards */}
        <section className="mx-auto mt-20 max-w-[1400px] px-4 sm:mt-24 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-2xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-3xl">
                Планировка и полная комплектация дома
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#a8b9ae] sm:text-base">
                Мы подготовили всё необходимое от кухонной техники и посуды до
                сушилки горнолыжных ботинок и гигиенических наборов.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cabin.specs.map((row, idx) => (
              <Reveal key={row.label} delay={idx * 0.04} className="flex">
                <article className="flex w-full flex-col rounded-3xl border border-white/10 bg-[#102419] p-6">
                  <h3 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                    {row.label}
                  </h3>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#d6e0d9]">
                    {row.lines
                      .filter((line) => line.trim() !== "")
                      .map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d49a5a]"
                          />
                          <span>{line}</span>
                        </li>
                      ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Living & Booking Rules */}
        <section className="mx-auto mt-20 max-w-[1400px] px-4 sm:mt-24 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-2xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-3xl">
                Правила бронирования и проживания
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[#a8b9ae] sm:text-base">
                Четыре прозрачных правила, благодаря которым в «Хижине лесника»
                всегда тихо, свежо и спокойно.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKING_RULES.map((rule, idx) => (
              <Reveal key={rule.title} delay={idx * 0.05} className="flex">
                <article className="flex w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#163122] text-[#d49a5a]">
                    {renderRuleIcon(idx)}
                  </div>
                  <div className="mt-6">
                    <h3 className="font-moderustic text-lg font-bold text-[#f3f5f0]">
                      {rule.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                      {rule.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Cross-Sell Other Cabins */}
        <section className="mx-auto mt-20 max-w-[1400px] px-4 sm:mt-24 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-2xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-3xl">
                Дом занят на выбранные даты? Посмотрите соседние коттеджи
              </h2>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {cabin.otherVariants.map((variant) => (
              <article
                key={variant.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-4 transition hover:border-[#d49a5a]/45 sm:flex-row sm:items-center sm:gap-6"
              >
                <Link
                  href={variant.href}
                  className="block aspect-[16/10] w-full shrink-0 overflow-hidden rounded-2xl bg-[#08140d] sm:aspect-[4/3] sm:w-56"
                >
                  <img
                    src={variant.image}
                    alt={variant.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="mt-4 flex flex-1 flex-col justify-between px-1 sm:mt-0 sm:py-1">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-moderustic text-xl font-bold text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
                        <Link href={variant.href}>
                          <CabinTreeEmoji id={variant.id} className="mr-1.5" />
                          {variant.title}
                        </Link>
                      </h3>
                      <span className="font-moderustic text-sm font-bold text-[#d49a5a]">
                        {variant.priceFrom}
                      </span>
                    </div>

                    <p className="mt-2 text-xs font-medium text-[#d6e0d9]">
                      {variant.area} · {variant.capacity}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#a8b9ae]">
                      {variant.sleepingPlaces}
                    </p>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={variant.href}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f3f5f0] transition group-hover:text-[#d49a5a]"
                    >
                      <span>Подробнее о доме</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
