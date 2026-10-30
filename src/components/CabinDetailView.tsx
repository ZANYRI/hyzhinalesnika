import React from "react";
import Link from "next/link";
import { BOOKING_RULES, CabinData } from "@/data/cabins";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CabinGallerySlider } from "./CabinGallerySlider";
import { KonturBookingWidget } from "./KonturBookingWidget";

interface CabinDetailViewProps {
  cabin: CabinData;
}

function renderIntroWithHighlight(text: string, highlight?: string) {
  if (!highlight) return text;
  const idx = text.indexOf(highlight);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-[#90754b]">{highlight}</span>
      {text.slice(idx + highlight.length)}
    </>
  );
}

export function CabinDetailView({ cabin }: CabinDetailViewProps) {
  return (
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="pt-16 pb-16 sm:pt-20">
        {/* Top 2-Column Section: Photo Slider (left) + Bad Script Description & Specs (right) */}
        <section className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.03fr_1fr] lg:gap-11">
            {/* Left Gallery Slider */}
            <div>
              <CabinGallerySlider images={cabin.gallery} />
            </div>

            {/* Right Bad Script Details */}
            <div className="font-bad-script">
              <h1 className="text-[40px] leading-tight font-normal text-white sm:text-[50px]">
                {cabin.titlePrefix}{" "}
                <span className="text-[#90754b]">{cabin.titleHighlight}</span>
              </h1>

              <p className="mt-5 text-[20px] leading-[1.45] text-white/95 sm:text-[21.5px]">
                {renderIntroWithHighlight(
                  cabin.introText,
                  cabin.introHighlightWord
                )}
              </p>

              {/* 2-Column Spec Rows with Independent Gold Underlines */}
              <div className="mt-8 space-y-6">
                {cabin.specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[260px_1fr] sm:gap-9"
                  >
                    <div className="border-b border-[#90754b]/80 pb-3 text-[21px] leading-snug text-[#90754b]">
                      {row.label}
                    </div>
                    <div className="border-b border-[#90754b]/80 pb-3 text-[20px] leading-[1.42] text-white/95">
                      {row.lines.map((line, i) =>
                        line === "" ? (
                          <div key={i} className="h-3.5" />
                        ) : (
                          <p key={i}>{line}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Green Bad Script Book CTA */}
              <div className="mt-10">
                <a
                  href="#booking"
                  className="inline-flex h-[62px] min-w-[196px] items-center justify-center rounded-[7px] bg-[#396448] px-10 font-bad-script text-[24px] text-white shadow-sm transition hover:bg-[#2e533b]"
                >
                  Забронировать
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Inline Контур.Отель Booking Form */}
        <KonturBookingWidget id="booking" className="mt-12 sm:mt-14" />

        {/* Booking & Living Rules */}
        <section className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6">
          <h2 className="text-center font-bad-script text-[32px] leading-snug text-white sm:text-[42px]">
            Правила бронирования и проживания в{" "}
            <span className="text-[#90754b]">Хижине лесника</span>
          </h2>
          <p className="mx-auto mt-3 max-w-5xl text-center font-bad-script text-[21px] leading-relaxed text-white/95 sm:text-[24px]">
            У нас предусмотрено несколько простых правил для того, чтобы
            обеспечить максимальный комфорт нашим гостям!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKING_RULES.map((rule) => (
              <div
                key={rule.icon}
                className="flex min-h-[480px] flex-col items-center rounded-[10px] bg-[#d9decc] px-6 py-10 text-center"
              >
                <div className="flex h-[215px] w-full items-center justify-center">
                  <img
                    src={rule.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-[190px] w-[190px] object-contain"
                  />
                </div>
                <p className="mt-6 font-bad-script text-[20.5px] leading-[1.42] text-[#90754b]">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Sell Other Cabins */}
        <section className="mx-auto mt-20 max-w-[1280px] px-4 sm:px-6">
          <p className="font-bad-script text-[32px] leading-snug text-white sm:text-[40px]">
            Дом занят на нужные даты?
          </p>
          <h2 className="mt-1 font-bad-script text-[30px] leading-snug uppercase text-[#90754b] sm:text-[38px]">
            ПОСМОТРИТЕ ДРУГИЕ ВАРИАНТЫ
          </h2>

          <div className="mt-8 flex flex-wrap gap-7">
            {cabin.otherVariants.map((variant) => (
              <article
                key={variant.href}
                className="flex w-full max-w-[300px] flex-col overflow-hidden rounded-[6px] border-[3px] border-[#90754b] bg-[#d9decc] font-bad-script text-[#111]"
              >
                <Link href={variant.href} className="block overflow-hidden">
                  <img
                    src={variant.image}
                    alt={variant.title}
                    loading="lazy"
                    className="h-[175px] w-full object-cover transition duration-300 hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-3.5">
                  <h3 className="text-[27px] leading-snug font-bold text-black">
                    <Link
                      href={variant.href}
                      className="transition hover:text-[#396448]"
                    >
                      {variant.title}
                    </Link>
                  </h3>

                  <div className="mt-2.5 space-y-2.5 text-[18px] leading-[1.35] text-[#222]">
                    <p>
                      <span className="text-[#90754b]">Вместительность:</span>{" "}
                      {variant.capacity}
                    </p>
                    <p>
                      <span className="text-[#90754b]">Спальные места:</span>{" "}
                      {variant.sleepingPlaces}
                    </p>
                    <p className="pt-1">
                      <span className="text-[#90754b]">Площадь:</span>{" "}
                      {variant.area}
                    </p>
                  </div>

                  <p className="mt-auto pt-5 text-[24px] font-bold text-black">
                    {variant.priceFrom}
                  </p>

                  <Link
                    href={variant.href}
                    className="mt-3 flex h-[44px] w-full items-center justify-center rounded-[4px] bg-[#396448] text-[18.5px] text-white transition hover:bg-[#2e533b]"
                  >
                    Забронировать дом
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Gold Horizontal Rule above Footer (as on live cabin pages) */}
      <div className="w-full border-t border-[#90754b]" />
      <Footer />
    </div>
  );
}
