import React from "react";
import Link from "next/link";
import { CABIN_LIST } from "@/data/cabins";
import { HOME_ADVANTAGES, HOME_FAQ } from "@/data/home";
import { SITE_CONFIG } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { GalleryMarquee } from "@/components/GalleryMarquee";
import { SeasonalMarquee } from "@/components/SeasonalMarquee";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  AboutContactActions,
  AdvantageContactCard,
} from "@/components/AboutContactActions";
import {
  ContactlessKeyIcon,
  ForestCabinIcon,
  WifiLaptopIcon,
} from "@/components/Icons";

const HOME_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Хижина Лесника",
    url: SITE_CONFIG.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "65",
    },
    image: `${SITE_CONFIG.url}/images/home/cabin-bereza.jpg`,
    telephone: "+79280201001",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Архыз",
      addressRegion: "Карачаево-Черкесская Республика",
      streetAddress: "улица Лесная, 40",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: String(SITE_CONFIG.coords.lat),
      longitude: String(SITE_CONFIG.coords.lng),
    },
    priceRange: "₽₽₽",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

function renderAdvantageIcon(id: "wifi" | "checkin" | "forest") {
  switch (id) {
    case "wifi":
      return <WifiLaptopIcon className="h-[44px] w-[49px]" />;
    case "checkin":
      return <ContactlessKeyIcon className="h-[52px] w-[52px]" />;
    case "forest":
      return <ForestCabinIcon className="h-[54px] w-[60px]" />;
  }
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e2618] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />

      {/* 1. HERO SECTION */}
      <section className="mx-auto mt-3.5 w-[calc(100%-24px)] max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[22px] bg-[#16291b]">
          {/* Hero Background Image */}
          <img
            src="/images/home/hero-bg.webp"
            alt='База отдыха "Хижина лесника" — дома в буковом лесу Архыза'
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/45" />

          {/* Embedded Hero Header */}
          <Header variant="hero" bookingAnchor="#booking" />

          {/* Hero Content */}
          <div className="relative z-10 px-6 pt-12 pb-12 sm:px-10 sm:pt-16 sm:pb-16 lg:px-14 lg:pt-20 lg:pb-16">
            <div className="max-w-3xl">
              <p className="font-moderustic text-[23px] leading-snug font-bold uppercase tracking-wide text-white sm:text-[31px] lg:text-[33px]">
                БАЗА ОТДЫХА &quot;ХИЖИНА ЛЕСНИКА&quot;
              </p>
              <p className="mt-6 font-moderustic text-[23px] leading-snug font-bold uppercase tracking-wide text-white sm:mt-8 sm:text-[31px] lg:text-[33px]">
                ДОМА В БУКОВОМ ЛЕСУ АРХЫЗА
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-6xl text-center font-bad-script text-[21px] leading-[1.6] text-white drop-shadow-xs sm:mt-12 sm:text-[26px] lg:text-[28px]">
              <p>Идеальное место для отдыха и работы.</p>
              <p>
                Чистый лесной воздух, спа-комплекс, вкусная еда с доставкой в
                номер.
              </p>
              <p>
                Минимум контактов с другими людьми - закрытая территория в
                заповедном буковом лесу Архыза.
              </p>
            </div>

            <div className="mt-10 sm:mt-12">
              <a
                href="#booking"
                className="inline-flex min-h-[68px] w-full items-center justify-center rounded-[12px] bg-[#fffaf0] px-7 py-3 text-center font-moderustic text-[13px] font-semibold uppercase tracking-wider text-[#4b4b4b] shadow-md transition hover:bg-[#f2eadb] sm:w-auto sm:px-10"
              >
                ПРОВЕРИТЬ ДАТЫ И ЗАБРОНИРОВАТЬ
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* 2. KONTUR.HOTEL INLINE BOOKING WIDGET */}
        <KonturBookingWidget id="booking" className="mt-10 sm:mt-12" />

        {/* 3. CHOOSE YOUR CABIN */}
        <section className="mx-auto mt-16 max-w-[1280px] px-4 sm:mt-20 sm:px-6">
          <div className="text-center">
            <p className="font-great-vibes text-[44px] leading-[1.12] text-[#dbd0bf] sm:text-[54px]">
              Будь как дома, путник
              <br />Я ни в чем не откажу!
            </p>
            <h2 className="mt-3 font-moderustic text-[28px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
              ВЫБЕРИТЕ СВОЙ ИДЕАЛЬНЫЙ ДОМИК
            </h2>
          </div>

          <div className="mx-auto mt-11 grid max-w-[960px] grid-cols-1 gap-6 md:grid-cols-3">
            {CABIN_LIST.map((cabin) => (
              <article
                key={cabin.id}
                className="flex flex-col overflow-hidden rounded-[22px] border-[3px] border-[#90754b] bg-[#d9decc] text-[#484c47]"
              >
                <Link
                  href={cabin.slug}
                  className="block h-[215px] w-full overflow-hidden rounded-b-[18px]"
                >
                  <img
                    src={cabin.cardImage}
                    alt={cabin.cardImageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col px-6 pt-6 pb-7">
                  <h3 className="font-moderustic text-[24px] leading-snug font-bold text-[#4a4e49]">
                    <Link
                      href={cabin.slug}
                      className="transition hover:text-[#90754b]"
                    >
                      {cabin.cardTitle}
                    </Link>
                  </h3>

                  <p className="mt-2 font-moderustic text-[15.5px] font-medium text-[#2c2f2c]">
                    {cabin.cardPrice}
                  </p>

                  <div className="mt-5 space-y-3 font-moderustic text-[15.5px] leading-snug text-[#6e736c]">
                    <p>
                      <span className="font-semibold text-[#5b6059]">
                        Места:
                      </span>{" "}
                      {cabin.cardGuests}
                    </p>
                    <p>
                      <span className="font-semibold text-[#5b6059]">
                        Спальни:
                      </span>{" "}
                      {cabin.cardBedrooms}
                    </p>
                    <p>
                      <span className="font-semibold text-[#5b6059]">
                        Площадь:
                      </span>{" "}
                      {cabin.cardArea}
                    </p>
                    <p className="pt-0.5">{cabin.cardSubtitle}</p>
                  </div>

                  <div className="mt-auto flex justify-end pt-7">
                    <Link
                      href={cabin.slug}
                      className="inline-flex h-[38px] items-center justify-center rounded-[7px] bg-[#90754b] px-4 font-moderustic text-[13px] font-medium uppercase tracking-wide text-white transition hover:bg-[#a68859]"
                    >
                      ПОДРОБНЕЕ О ДОМЕ
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. WHO WE ARE ("КТО МЫ?") */}
        <section className="mx-auto mt-24 max-w-[1300px] px-4 sm:mt-28 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            {/* Left Column with Foliage Backdrop + Translucent Card */}
            <div className="relative pb-10">
              <img
                src="/images/home/foliage-bg.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="pointer-events-none absolute top-20 right-0 bottom-0 left-0 h-[calc(100%-60px)] w-full object-cover object-top opacity-95 rounded-xl"
              />

              <div className="relative z-10">
                <p className="font-great-vibes text-[48px] leading-none text-[#dbd0bf] sm:text-[54px]">
                  Кто мы?
                </p>
                <h1 className="mt-2 font-moderustic text-[34px] leading-[1.12] font-extrabold text-[#90754b] sm:text-[46px] lg:text-[48px]">
                  База отдыха
                  <br />
                  &quot;Хижина лесника&quot; в
                  <br />
                  Архызе
                </h1>

                <div className="mt-10 max-w-[575px] rounded-[12px] bg-[#161714]/86 p-6 shadow-xl backdrop-blur-[2px] sm:p-8">
                  <p className="font-moderustic text-[16.5px] leading-[1.6] text-white/90">
                    База отдыха &quot;Хижина лесника&quot; представляет собой
                    комплекс из 3-х домов, расположенных в живописном лесу.
                    Вместимость от 4 до 7 гостей. Каждый дом имеет собственную
                    огороженную территорию, парковку, а так же террасу с мебелью
                    и мангальной зоной. Панорамные окна выходят на лес и горы
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2.5">
                    <img
                      src="/images/brand/ubook-badge.png"
                      alt="Ubook.ru рекомендует"
                      loading="lazy"
                      className="h-[50px] w-auto rounded-[8px]"
                    />
                    <iframe
                      src={`https://yandex.ru/sprav/widget/rating-badge/${SITE_CONFIG.yandexOrgId}?type=award`}
                      width="150"
                      height="50"
                      frameBorder="0"
                      title="Хорошее место 5.0 — Выбор пользователей Яндекса"
                      className="rounded-[8px] bg-transparent"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-2.5">
                    <img
                      src="/images/brand/101hotels-badge.png"
                      alt="101Hotels.com рекомендует"
                      loading="lazy"
                      className="h-[38px] w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interior Photo + Phone/Book + 250+ Guests Badge */}
            <div className="relative lg:pt-2">
              <div className="relative">
                <img
                  src="/images/home/about-dining.jpg"
                  alt='Уютная гостиная и обеденная зона на базе отдыха "Хижина лесника"'
                  loading="lazy"
                  className="h-[320px] w-full rounded-[24px] object-cover shadow-lg sm:h-[420px]"
                />

                {/* Overlapping 250+ Guests Pill Badge */}
                <div className="mx-auto mt-6 flex h-[265px] w-[228px] flex-col items-center justify-center rounded-[120px] bg-[#494949] px-5 text-center text-white shadow-2xl sm:absolute sm:-right-2 sm:-bottom-32 sm:mt-0 xl:-right-4">
                  <img
                    src="/images/home/guests-ornament.png"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-[46px] w-[46px] object-contain"
                  />
                  <p className="mt-3 font-moderustic text-[58px] leading-none font-extrabold">
                    250<span className="text-[44px] font-light">+</span>
                  </p>
                  <p className="mt-2 font-moderustic text-[13.5px] uppercase tracking-wide text-white/95">
                    ДОВОЛЬНЫХ ГОСТЕЙ
                  </p>
                </div>
              </div>

              <div className="sm:pr-[205px]">
                <AboutContactActions />
              </div>
            </div>
          </div>
        </section>

        {/* 5. GALLERY MARQUEE ("НАША БАЗА / ГАЛЕРЕЯ") */}
        <section className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
            <p className="font-great-vibes text-[48px] leading-none text-[#dbd0bf] sm:text-[54px]">
              Наша база
            </p>
            <h2 className="mt-2 font-moderustic text-[32px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
              ГАЛЕРЕЯ
            </h2>
          </div>

          <div className="mt-9">
            <GalleryMarquee />
          </div>
        </section>

        {/* 6. ADVANTAGES ("ПРЕИМУЩЕСТВА / ЗА ЧТО ЕЩЕ ВЫБИРАЮТ НАС?") */}
        <section className="mx-auto mt-24 max-w-[1300px] px-4 sm:mt-28 sm:px-6">
          <p className="font-great-vibes text-[48px] leading-none text-[#dbd0bf] sm:text-[54px]">
            Преимущества
          </p>
          <h2 className="mt-2 font-moderustic text-[30px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
            ЗА ЧТО ЕЩЕ ВЫБИРАЮТ НАС?
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
            {HOME_ADVANTAGES.map((adv) => (
              <div
                key={adv.id}
                className="flex flex-col rounded-[22px] bg-[#d9decc] p-7 text-[#141414]"
              >
                <div className="flex h-[112px] w-[118px] items-center justify-center rounded-[20px] bg-white text-[#222] shadow-xs">
                  {renderAdvantageIcon(adv.id)}
                </div>

                <h3 className="mt-8 font-moderustic text-[21px] leading-snug font-extrabold text-[#90754b]">
                  {adv.title}
                </h3>

                <p className="mt-3 font-moderustic text-[14.5px] leading-relaxed text-[#141414]">
                  {adv.description}
                </p>
              </div>
            ))}

            <AdvantageContactCard />
          </div>
        </section>

        {/* 7. 5% DISCOUNT PROMO BLOCK */}
        <section className="mx-auto mt-20 w-[calc(100%-24px)] max-w-[1392px] rounded-[24px] bg-[#d9decc] px-6 py-10 sm:mt-24 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            <div>
              <img
                src="/images/home/discount-festive.jpg"
                alt="Уютная атмосфера отдыха со скидкой 5%"
                loading="lazy"
                className="h-[320px] w-full rounded-[24px] object-cover sm:h-[430px]"
              />
            </div>

            <div>
              <h2 className="font-moderustic text-[30px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
                СКИДКА НА ВСЕ ДОМИКИ
              </h2>

              {/* Exact Notched Lime Tag Image */}
              <div
                className="mt-1 inline-flex h-[82px] w-[155px] items-center justify-center bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/home/tpl25_3_2.png')",
                }}
              >
                <span className="font-moderustic text-[52px] leading-none font-extrabold text-white">
                  5%
                </span>
              </div>

              <p className="mt-5 max-w-[520px] font-moderustic text-[16.5px] leading-relaxed text-[#7e6a48]">
                Наша база предоставляет не просто оперативный и качественный
                сервис, но и привлекательные скидки на проживание от 4-х дней
              </p>

              {/* Circular Timer Counters */}
              <div className="mt-7 flex items-center gap-6">
                {[
                  { val: "00", label: "дней" },
                  { val: "00", label: "часов" },
                  { val: "00", label: "минут" },
                ].map((unit) => (
                  <div key={unit.label} className="text-center">
                    <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-white font-moderustic text-[26px] text-[#3a3a3a] ring-4 ring-[#eceadd]">
                      {unit.val}
                    </div>
                    <span className="mt-2 block font-moderustic text-[14px] text-[#7e6a48]">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="#booking"
                  className="inline-flex h-[68px] items-center justify-center rounded-[12px] bg-[#90754b] px-8 font-moderustic text-[13px] font-bold uppercase tracking-wide text-white transition hover:bg-[#a68859] sm:px-9"
                >
                  ХОЧУ ЗАБОНИРОВАТЬ ПРЯМО СЕЙЧАС!
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. FAQ SECTION ("ДОПОЛНИТЕЛЬНО УЗНАТЬ / ВОПРОС - ОТВЕТ") */}
        <section className="mx-auto mt-24 max-w-[1300px] px-4 sm:mt-28 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div>
              <p className="font-great-vibes text-[48px] leading-[1.02] text-[#dbd0bf] sm:text-[52px]">
                Дополнительно
                <br />
                узнать
              </p>
              <h2 className="mt-2 font-moderustic text-[32px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
                ВОПРОС - ОТВЕТ
              </h2>

              <div className="mt-10">
                <FaqAccordion />
              </div>
            </div>

            <div className="lg:pt-2">
              <img
                src="/images/home/faq-terrace.jpg"
                alt="Уютная терраса домика на базе отдыха Хижина лесника"
                loading="lazy"
                className="h-[420px] w-full rounded-[24px] object-cover shadow-lg sm:h-[520px]"
              />
            </div>
          </div>
        </section>

        {/* 9. GUEST REVIEWS + SEASONAL ACTIVITIES */}
        <section className="mx-auto mt-24 max-w-[1300px] px-4 sm:mt-28 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-12">
            {/* Left: Yandex Reviews Widget */}
            <div>
              <p className="font-great-vibes text-[46px] leading-none text-[#dbd0bf] sm:text-[52px]">
                Мы ценим каждый отзыв!
              </p>
              <h2 className="mt-2 font-moderustic text-[32px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
                ОТЗЫВЫ ГОСТЕЙ
              </h2>

              <div className="mt-8 h-[640px] w-full max-w-[590px] overflow-hidden rounded-[12px] bg-white shadow-xl">
                <iframe
                  src={`https://yandex.ru/maps-reviews-widget/${SITE_CONFIG.yandexOrgId}?comments`}
                  title="Отзывы гостей о базе отдыха Хижина лесника на Яндекс Картах"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right: Seasonal Activities Marquee */}
            <div className="min-w-0 overflow-hidden">
              <p className="font-great-vibes text-[42px] leading-[1.08] text-[#dbd0bf] sm:text-[48px]">
                Рядом с нами много интересных мест
                <br />
                для ваших ярких впечатлений
              </p>
              <h2 className="mt-2 font-moderustic text-[32px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
                СЕЗОННЫЕ АКТИВНОСТИ
              </h2>

              <div className="mt-8">
                <SeasonalMarquee />
              </div>
            </div>
          </div>
        </section>

        {/* 10. FULL-WIDTH INTERACTIVE YANDEX MAP */}
        <section
          aria-label="Карта расположения базы отдыха Хижина лесника"
          className="mt-20 h-[450px] w-full bg-[#e6eccf]"
        >
          <iframe
            src={`https://yandex.ru/map-widget/v1/?oid=${SITE_CONFIG.yandexOrgId}&ol=biz&ll=${SITE_CONFIG.coords.lng}%2C${SITE_CONFIG.coords.lat}&z=17`}
            title="База отдыха Хижина лесника на Яндекс Картах"
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
