import { PageStructuredData } from "@/components/StructuredData";
import Image from "@/components/SeasonalImage";
import heroMedia from "@/data/hero-media.json";
import type { Metadata } from "next";
import { withSocialMetadata, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/social-metadata";
import Link from "next/link";
import { ArrowRight, CarProfile, MapPin } from "@phosphor-icons/react/dist/ssr";
import { HOME_FAQ } from "@/data/home";
import { SITE_CONFIG } from "@/data/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { CabinShowcase } from "@/components/CabinShowcase";
import { SeasonalExperiences } from "@/components/SeasonalExperiences";
import { FaqAccordion } from "@/components/FaqAccordion";
import { AboutContactActions } from "@/components/AboutContactActions";
import { GuestReviews } from "@/components/GuestReviews";
import { Reveal } from "@/components/Reveal";
import { HomeBenefits, AudienceStories, HeroBadges } from "@/components/HomeSections";
import { BookingAssistance } from "@/components/BookingAssistance";
import { SEASON_LABEL } from "@/lib/season";
import { Snowfall } from "@/components/Snowfall";

export const metadata: Metadata = withSocialMetadata({title: HOME_TITLE, description: HOME_DESCRIPTION, alternates: {canonical: "/"}});

const HOME_JSON_LD = [
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
  return <><PageStructuredData metadata={metadata} />{<div className="min-h-screen bg-canvas text-ink">
    <link rel="preload" as="image" href={heroMedia.avif} type="image/avif" media="(max-width: 639px) and (max-aspect-ratio: 9/16)" fetchPriority="high" />
    {HOME_JSON_LD.map(schema => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, "\\u003c")}} />)}
    <Header variant="hero" />
    <section data-tone="photo" className="relative -mt-[80px] flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-28 pb-10 sm:-mt-[84px] sm:pt-32">
      <picture>
        {/* Only tall phones use the native-resolution portrait derivative.
            Wider screens retain the full photo and the same cover framing. */}
        <source media="(max-width: 639px) and (max-aspect-ratio: 9/16)" type="image/avif" srcSet={heroMedia.avif} />
        <source media="(max-width: 639px) and (max-aspect-ratio: 9/16)" type="image/webp" srcSet={heroMedia.webp} />
        <Image fill quality={60} sizes="(max-aspect-ratio: 3/2) 150vh, 100vw" loading="eager" fetchPriority="high" src={heroMedia.desktop} alt="Дома «Хижины лесника» в буковом лесу Архыза — сезонная иллюстрация" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#081623]/55 via-[#081623]/45 to-[#0a1b24]/90" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#081623]/25 via-[#081623]/10 to-transparent" />
      <Snowfall />
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-end px-4 sm:px-6"><HeroBadges /></div>
      <div className="relative z-[31] mx-auto my-auto flex w-full max-w-[1400px] flex-col items-center px-4 py-12 text-center sm:px-6">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#f3e6cf] sm:text-sm">{SEASON_LABEL} в Архызе · Хижина лесника</p>
        <h1 className="mt-4 max-w-4xl font-moderustic text-4xl font-medium leading-[1.12] text-balance sm:text-5xl lg:text-6xl">Уединенный отдых<br className="hidden sm:block" /> в буковом лесу Архыза</h1>
        <p className="mt-5 max-w-5xl font-medium leading-7 text-ink sm:text-lg sm:leading-8">Идеальное место для отдыха. Дома с огороженной территорией, тихие вечера у костра и панорамные окна с видом на горы. Приезжайте вдвоём, с детьми или в компании друзей. До СПА-комплекса и ресторана — 100 метров.</p>
        <Link href="/booking" className="mt-8 inline-flex rounded-full bg-action px-7 py-4 text-sm font-semibold text-on-action transition hover:bg-action-hover">Проверить свободные даты</Link>
      </div>
    </section>
    <main>
      <HomeBenefits />
      <AudienceStories />
      <section id="cabins" className="section-band scroll-mt-24">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="online-booking" className="mb-4 scroll-mt-28 text-center font-moderustic text-2xl font-bold leading-tight text-ink sm:text-3xl">Забронировать онлайн</h2>
        <KonturBookingWidget id="booking" className="mb-10 px-0 sm:px-0" />
        <p className="section-eyebrow text-xs uppercase tracking-[0.2em] text-accent">Ваш дом в Архызе</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Выберите свой дом в лесу</h2>
        <div className="mt-8"><CabinShowcase /></div>
        </div>
      </section>
      <section id="sez1" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-16 sm:px-6 sm:pt-20">
        <p className="section-eyebrow text-xs uppercase tracking-[0.2em] text-accent">Отдых в вашем ритме</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Чем заняться</h2>
        <p className="mt-4 mb-8 max-w-2xl text-muted">Начните утро с прогулки по буковому лесу, отправьтесь навстречу горам или посвятите день себе в СПА.</p>
        <SeasonalExperiences />
      </section>
      <BookingAssistance />
      <section id="faq" className="section-band scroll-mt-28">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <p className="section-eyebrow text-xs uppercase tracking-[0.2em] text-accent">До встречи в лесу</p>
        <h2 className="mt-3 mb-9 font-moderustic text-3xl font-bold sm:text-4xl">Частые вопросы</h2>
        <FaqAccordion />
        </div>
      </section>
        {/* 8. DARK-FOREST GUEST REVIEWS + INTERACTIVE MAP & CONCIERGE */}
        <section
          id="reviews"
          className="mx-auto max-w-[1400px] scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
        >
          <Reveal>
            <div className="max-w-2xl">
              <h2 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                Отзывы гостей и расположение в Архызе
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
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
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-surface p-3 sm:p-4"
              >
                <div className="h-[370px] w-full overflow-hidden rounded-2xl bg-soft">
                  <iframe
                    src={`https://yandex.ru/map-widget/v1/?oid=${SITE_CONFIG.yandexOrgId}&ol=biz&ll=${SITE_CONFIG.coords.lng}%2C${SITE_CONFIG.coords.lat}&z=17`}
                    title="База отдыха Хижина лесника на Яндекс Картах"
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <MapPin size={22} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="font-moderustic text-base font-bold text-ink">
                        {SITE_CONFIG.address}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Координаты: {SITE_CONFIG.coords.lat},{" "}
                        {SITE_CONFIG.coords.lng}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CarProfile
                      size={22}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <div>
                      <p className="font-moderustic text-base font-bold text-ink">
                        Как добраться до базы
                      </p>
                      <Link
                        href="/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety"
                        className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent transition hover:text-accent-hover"
                      >
                        <span>Подробный гид по маршрутам 2026</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-6">
                  <p className="mb-4 text-sm text-muted">
                    Остались вопросы по датам, трансферу или размещению с
                    детьми? Свяжитесь с нами напрямую:
                  </p>
                  <AboutContactActions />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
    </main><Footer />
  </div>}</>;
}
