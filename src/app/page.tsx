import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CarProfile,
  Key,
  MapPin,
  PawPrint,
  Percent,
  TreeEvergreen,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import { HOME_FAQ } from "@/data/home";
import { SITE_CONFIG } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { CabinShowcase } from "@/components/CabinShowcase";
import { SeasonalExperiences } from "@/components/SeasonalExperiences";
import { GalleryMarquee } from "@/components/GalleryMarquee";
import { BlogSection } from "@/components/BlogSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AboutContactActions } from "@/components/AboutContactActions";
import { HospitalityAwards } from "@/components/HospitalityAwards";
import { GuestReviews } from "@/components/GuestReviews";
import { Reveal } from "@/components/Reveal";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />

      {/* Sticky Floating Glass Navigation */}
      <Header variant="hero" bookingAnchor="#booking" />

      {/* 1. FULL-VIEWPORT ARCHITECTURAL HERO + DOCKED BOOKING BAR */}
      <section className="relative -mt-[80px] flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden pt-24 pb-10 sm:-mt-[84px] sm:pt-28 sm:pb-12">
        <img
          src="/images/home/hero-bg.webp"
          alt='База отдыха «Хижина лесника», уединённые дома в буковом лесу Архыза'
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0a1911]/70 via-[#0a1911]/45 to-[#0a1911]"
        />

        <div className="relative z-10 mx-auto my-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d49a5a]">
              Хижина лесника · Архыз, ул. Лесная 40
            </p>

            <h1 className="mt-4 font-moderustic text-4xl font-bold leading-[1.06] tracking-tight text-[#f3f5f0] sm:text-5xl lg:text-6xl">
              Три уединённых дома
              <br />в буковом лесу Архыза
            </h1>

            <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-[#d6e0d9] sm:text-lg">
              Огороженный приватный двор у каждого дома, панорамные окна на
              хребты, бесконтактный заезд 24/7 и 15 минут до склонов.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#booking"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-7 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
              >
                Проверить свободные даты
              </a>
              <a
                href="#cabins"
                className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/20 bg-[#0a1911]/55 px-7 text-sm font-medium text-[#f3f5f0] backdrop-blur-md transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a] active:scale-[0.98]"
              >
                Смотреть дома
              </a>
            </div>
          </div>
        </div>

        {/* Hero-Docked Контур.Отель Booking Module */}
        <div className="relative z-10 w-full">
          <KonturBookingWidget id="booking" />
        </div>
      </section>

      <main>
        {/* 2. INTERACTIVE CABIN EXPLORER (Barskie Polya / PineRiver inspired) */}
        <section
          id="cabins"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-20 sm:px-6 sm:pt-28"
        >
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                Выберите свой дом в лесу
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                На территории базы всего три отдельно стоящих дома для 4, 5 или
                7 гостей: максимум тишины, личная парковка и своя костровая зона
                у каждого.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-9">
            <CabinShowcase />
          </Reveal>
        </section>

        {/* 3. ASYMMETRIC FOREST ARCHITECTURE & PRIVILEGES BENTO (Ecobr / PineRiver inspired) */}
        <section className="mx-auto max-w-[1400px] px-4 pt-24 sm:px-6 sm:pt-32">
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                Камерная база отдыха «Хижина лесника»
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                Продуманный загородный комфорт для спокойного семейного отдыха,
                удалённой работы с видом на горы и зимних выездов на склоны.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Cell 1 (7 cols): Aerial Forest Territory + Interior */}
            <Reveal className="flex lg:col-span-7">
              <article className="flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#08140d] sm:col-span-7 sm:aspect-auto sm:h-64">
                    <img
                      src="/images/brand/forest-aerial.jpg"
                      alt="Вид сверху на дома базы отдыха Хижина лесника в буковом лесу"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#08140d] sm:col-span-5 sm:aspect-auto sm:h-64">
                    <img
                      src="/images/home/about-dining.jpg"
                      alt="Тёплый деревянный интерьер и обеденная зона у панорамного окна"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="mt-5 px-1 pb-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#d49a5a]">
                    <TreeEvergreen size={18} />
                    <span>Закрытая лесная территория без случайных прохожих</span>
                  </div>
                  <h3 className="mt-2 font-moderustic text-xl font-bold text-[#f3f5f0] sm:text-2xl">
                    Уединение в заповедном лесу в 5 минутах от центра Архыза
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                    Дома окружены вековыми буками и соснами. У каждого коттеджа
                    собственный огороженный двор, терраса с уличной мебелью,
                    мангал с шампурами и парковка прямо у входа.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Cell 2 (5 cols): Long-stay -5% Privilege Card */}
            <Reveal delay={0.08} className="flex lg:col-span-5">
              <article className="flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#d49a5a]/30 bg-[#163122] p-5 sm:p-6">
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#08140d]">
                    <img
                      src="/images/home/discount-festive.jpg"
                      alt="Уютный вечер в домике со скидкой 5 процентов от 4 суток"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#d49a5a]">
                    <Percent size={18} weight="bold" />
                    <span>Привилегия длительного отдыха</span>
                  </div>

                  <h3 className="mt-2 font-moderustic text-2xl font-bold text-[#f3f5f0]">
                    Скидка 5% на все дома при бронировании от 4 суток
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#d6e0d9]">
                    Оставайтесь дольше без спешки: тариф автоматически учитывает
                    скидку при прямом бронировании любого из трёх домов.
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="#booking"
                    className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#d49a5a] px-6 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
                  >
                    <span>Рассчитать стоимость</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            </Reveal>

            {/* Cell 3 (4 cols): Fast Wi-Fi + VPN */}
            <Reveal delay={0.04} className="flex lg:col-span-4">
              <article className="flex w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#163122] text-[#d49a5a]">
                  <WifiHigh size={24} />
                </div>
                <div className="mt-6">
                  <h3 className="font-moderustic text-lg font-bold text-[#f3f5f0]">
                    Быстрый Wi-Fi с VPN и Smart-TV
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                    Стабильный оптоволоконный канал для удалённой работы и
                    созвонов, Яндекс Станция и телевизоры с подпиской
                    Кинопоиск.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Cell 4 (4 cols): Contactless 24/7 Check-in & Ski Dryers */}
            <Reveal delay={0.1} className="flex lg:col-span-4">
              <article className="flex w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#163122] text-[#d49a5a]">
                  <Key size={24} />
                </div>
                <div className="mt-6">
                  <h3 className="font-moderustic text-lg font-bold text-[#f3f5f0]">
                    Бесконтактный заезд 24/7
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                    Приезжайте в любое время без ожидания на стойке. В каждом
                    доме есть электрическая сушилка для горнолыжных ботинок и
                    одежды.
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Cell 5 (4 cols): Pet-Friendly with Welcome Kit */}
            <Reveal delay={0.16} className="flex lg:col-span-4">
              <article className="flex w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#163122] text-[#d49a5a]">
                  <PawPrint size={24} />
                </div>
                <div className="mt-6">
                  <h3 className="font-moderustic text-lg font-bold text-[#f3f5f0]">
                    Pet-friendly и welcome-набор
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                    Принимаем гостей с воспитанными питомцами любого размера и
                    дарим фирменный набор от «Четыре лапы» с миской, лакомством
                    и игрушкой.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        {/* 4. AUREKI-STYLE (#sez1) INTERACTIVE SEASONAL & IMPRESSIONS HUB */}
        <section
          id="sez1"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-24 sm:px-6 sm:pt-32"
        >
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d49a5a]">
                Маршруты и сезоны Архыза
              </p>
              <h2 className="mt-3 font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                Впечатления рядом с базой в любое время года
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                Переключайте сценарии отдыха: от зимних трасс Романтика и
                снегоходов до водопадов, обсерватории САО РАН и горной бани на
                дровах.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <SeasonalExperiences />
          </Reveal>
        </section>

        {/* 5. FULL-BLEED ARCHITECTURAL FILMSTRIP GALLERY (Single Marquee on Page) */}
        <section id="gallery" className="scroll-mt-24 pt-24 sm:pt-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                  Атмосфера территории и интерьеров
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                  Нажмите на любой кадр, чтобы рассмотреть детали домов, террас
                  и вечерней подсветки в полном размере.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-9">
            <GalleryMarquee />
          </div>
        </section>

        {/* 6. BLOG & GUIDES SECTION (Replaces standalone /blog page) */}
        <section
          id="blog"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-24 sm:px-6 sm:pt-32"
        >
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                Блог и путеводители по Архызу
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                Подробные маршруты на автомобиле и самолёте, а также подборка
                живописных водопадов и локаций в нескольких минутах от нашей
                базы.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mt-9">
            <BlogSection />
          </Reveal>
        </section>

        {/* 7. TERRACE + VERIFIED AWARDS & FAQ SPLIT */}
        <section
          id="faq"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-24 sm:px-6 sm:pt-32"
        >
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left 5 cols: Terrace Photo + Independent Ratings */}
            <Reveal className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-4 sm:p-5">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#08140d]">
                  <img
                    src="/images/home/faq-terrace.jpg"
                    alt="Терраса домика с креслами на базе отдыха Хижина лесника"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-5 px-1 pb-1">
                  <h3 className="font-moderustic text-xl font-bold text-[#f3f5f0]">
                    Рейтинг 5.0 и доверие 250+ семей
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                    Нас отмечают наградой «Хорошее место» Яндекса и рекомендуют
                    независимые сервисы бронирования за чистоту, тепло в домах и
                    заботу о деталях.
                  </p>

                  <div className="mt-5">
                    <HospitalityAwards variant="cards" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right 7 cols: FAQ Accordion */}
            <Reveal delay={0.08} className="lg:col-span-7">
              <div className="max-w-2xl">
                <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                  Частые вопросы перед поездкой
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                  Всё, что важно знать о размещении с питомцами, сушке
                  горнолыжной экипировки, комплектации домов и дороге до
                  склонов.
                </p>
              </div>

              <div className="mt-8">
                <FaqAccordion />
              </div>
            </Reveal>
          </div>
        </section>

        {/* 8. DARK-FOREST GUEST REVIEWS + INTERACTIVE MAP & CONCIERGE */}
        <section
          id="reviews"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28"
        >
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
                Отзывы гостей и расположение в Архызе
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
                Удобный асфальтированный подъезд прямо к территории базы и
                реальные впечатления гостей на Яндекс Картах.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left 5 cols: Native Dark-Forest Guest Reviews */}
            <Reveal className="flex lg:col-span-5">
              <GuestReviews />
            </Reveal>

            {/* Right 7 cols: Map + Route Guide + Direct Concierge */}
            <Reveal
              delay={0.08}
              className="flex flex-col justify-between gap-6 lg:col-span-7"
            >
              <div
                id="contacts"
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-3 sm:p-4"
              >
                <div className="h-[370px] w-full overflow-hidden rounded-2xl bg-[#163122]">
                  <iframe
                    src={`https://yandex.ru/map-widget/v1/?oid=${SITE_CONFIG.yandexOrgId}&ol=biz&ll=${SITE_CONFIG.coords.lng}%2C${SITE_CONFIG.coords.lat}&z=17`}
                    title="База отдыха Хижина лесника на Яндекс Картах"
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <MapPin size={22} className="mt-0.5 shrink-0 text-[#d49a5a]" />
                    <div>
                      <p className="font-moderustic text-base font-bold text-[#f3f5f0]">
                        {SITE_CONFIG.address}
                      </p>
                      <p className="mt-1 text-xs text-[#a8b9ae]">
                        Координаты: {SITE_CONFIG.coords.lat},{" "}
                        {SITE_CONFIG.coords.lng}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CarProfile
                      size={22}
                      className="mt-0.5 shrink-0 text-[#d49a5a]"
                    />
                    <div>
                      <p className="font-moderustic text-base font-bold text-[#f3f5f0]">
                        Как добраться до базы
                      </p>
                      <Link
                        href="/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#d49a5a] transition hover:text-[#e0ab6e]"
                      >
                        <span>Подробный гид по маршрутам 2026</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="mb-4 text-sm text-[#d6e0d9]">
                    Остались вопросы по датам, трансферу или размещению с
                    детьми? Свяжитесь с нами напрямую:
                  </p>
                  <AboutContactActions />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
