import { PageStructuredData } from "@/components/StructuredData";
import Image from "next/image";
import heroMedia from "@/data/hero-media.json";
import type { Metadata } from "next";
import { withSocialMetadata, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/social-metadata";
import Link from "next/link";
import { ArrowRight, CarProfile, MapPin } from "@phosphor-icons/react/dist/ssr";
import { HOME_FAQ } from "@/data/home";
import { SITE_CONFIG } from "@/data/site";
import { CABIN_LIST } from "@/data/cabins";
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
  return <><PageStructuredData metadata={metadata} />{<div className="min-h-screen bg-[#102219] text-[#f3f5f0]">
    <link rel="preload" as="image" href={heroMedia.avif} type="image/avif" media="(max-width: 639px) and (max-aspect-ratio: 9/16)" fetchPriority="high" />
    {HOME_JSON_LD.map(schema => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, "\\u003c")}} />)}
    <Header variant="hero" />
    <section className="relative -mt-[80px] flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-28 pb-10 sm:-mt-[84px] sm:pt-32">
      <picture>
        {/* Only tall phones use the native-resolution portrait derivative.
            Wider screens retain the full photo and the same cover framing. */}
        <source media="(max-width: 639px) and (max-aspect-ratio: 9/16)" type="image/avif" srcSet={heroMedia.avif} />
        <source media="(max-width: 639px) and (max-aspect-ratio: 9/16)" type="image/webp" srcSet={heroMedia.webp} />
        <Image fill quality={60} sizes="(max-aspect-ratio: 3/2) 150vh, 100vw" loading="eager" fetchPriority="high" src="/images/home/hero-bg.jpg" alt="Дома базы отдыха Хижина лесника в буковом лесу Архыза" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#06130d]/65 via-[#06130d]/65 to-[#102219]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06130d]/35 via-[#06130d]/15 to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-end px-4 sm:px-6"><HeroBadges /></div>
      <div className="relative z-[31] mx-auto my-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#f3e6cf] sm:text-sm">База отдыха Хижина лесника</p>
        <h1 className="mt-4 max-w-4xl font-moderustic text-4xl font-bold leading-[1.12] text-balance sm:text-5xl lg:text-6xl">Уединенный отдых<br className="hidden sm:block" /> в буковом лесу Архыза</h1>
        <p className="mt-5 max-w-2xl font-medium leading-7 text-[#f3f5f0] sm:text-lg sm:leading-8">Идеальное место для отдыха. Насладитесь природой, лесом и свежим горным воздухом. Дома с огороженной территорией, тихие вечера у костра и панорамные окна с видом на горы. Приезжайте вдвоём, с детьми или в компании друзей. До СПА-комплекса и ресторана — 100 метров.</p>
        <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[#d49a5a] px-7 py-4 text-sm font-semibold text-[#102219] transition hover:bg-[#e0ab6e]">Проверить свободные даты</Link>
      </div>
    </section>
    <main>
      <HomeBenefits />
      <AudienceStories />
      <section id="cabins" className="mx-auto max-w-[1400px] px-4 pt-12 sm:px-6 sm:pt-16">
        <h2 id="online-booking" className="mb-4 scroll-mt-28 text-center font-moderustic text-2xl font-bold leading-tight text-[#f3f5f0] sm:text-3xl">Забронировать онлайн</h2>
        <KonturBookingWidget id="booking" className="mb-10 px-0 sm:px-0" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Ваш дом в Архызе</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Выберите свой дом в лесу</h2>
        <p className="mt-4 leading-relaxed text-[#a8b9ae]">Всего три дома:</p>
        <ul className="mt-2 flex flex-col gap-x-6 gap-y-2 text-sm leading-relaxed text-[#a8b9ae] sm:flex-row sm:flex-wrap sm:text-base">
          {CABIN_LIST.map(cabin => <li key={cabin.id} className="flex flex-wrap items-baseline gap-x-1 sm:flex-nowrap">
            <Link href={cabin.slug} className="whitespace-nowrap text-[#e6c7a0] underline decoration-[#d49a5a]/40 underline-offset-4 hover:decoration-[#d49a5a]">{cabin.cardTitle}</Link>
            <span className="whitespace-nowrap">– {cabin.cardGuests}, {cabin.cardArea}</span>
          </li>)}
        </ul>
        <div className="mt-8"><CabinShowcase /></div>
      </section>
      <section id="sez1" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Отдых в вашем ритме</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Чем заняться</h2>
        <p className="mt-4 mb-8 max-w-2xl text-[#a8b9ae]">Начните утро с прогулки по буковому лесу, отправьтесь навстречу горам или посвятите день себе в СПА.</p>
        <SeasonalExperiences />
      </section>
      <BookingAssistance />
      <section id="faq" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">До встречи в лесу</p>
        <h2 className="mt-3 mb-9 font-moderustic text-3xl font-bold sm:text-4xl">Частые вопросы</h2>
        <FaqAccordion />
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
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-[#173024] p-3 sm:p-4"
              >
                <div className="h-[370px] w-full overflow-hidden rounded-2xl bg-[#1d3b2b]">
                  <iframe
                    src={`https://yandex.ru/map-widget/v1/?oid=${SITE_CONFIG.yandexOrgId}&ol=biz&ll=${SITE_CONFIG.coords.lng}%2C${SITE_CONFIG.coords.lat}&z=17`}
                    title="База отдыха Хижина лесника на Яндекс Картах"
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#173024] p-6 sm:p-8">
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
    </main><Footer />
  </div>}</>;
}
