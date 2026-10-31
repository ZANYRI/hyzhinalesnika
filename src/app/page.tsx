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
  return <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
    {HOME_JSON_LD.map(schema => <script key={schema["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, "\\u003c")}} />)}
    <Header variant="hero" />
    <section className="relative -mt-[80px] flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-28 pb-10 sm:-mt-[84px] sm:pt-32">
      <img src="/images/home/hero-bg.webp" alt="Дома базы отдыха Хижина лесника в буковом лесу Архыза" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1911]/65 via-[#0a1911]/40 to-[#0a1911]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] justify-end px-4 sm:px-6"><HeroBadges /></div>
      <div className="relative z-10 mx-auto my-auto w-full max-w-[1400px] px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d49a5a]">Хижина лесника · Архыз, ул. Лесная 40</p>
        <h1 className="mt-4 max-w-3xl font-moderustic text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Три уединённых дома<br />в буковом лесу Архыза</h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-[#d6e0d9] sm:text-lg">Своя терраса, тихие вечера у костра и горы рядом. Приезжайте с семьёй, вдвоём или в кругу друзей.</p>
        <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[#d49a5a] px-7 py-4 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e]">Проверить свободные даты</Link>
      </div>
      <div className="relative z-10"><KonturBookingWidget id="booking" /></div>
    </section>
    <main>
      <HomeBenefits />
      <section id="cabins" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Ваш дом в Архызе</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Выберите свой дом в лесу</h2>
        <p className="mt-4 max-w-2xl text-[#a8b9ae]">Всего три дома — для семейного отдыха, романтических выходных и встреч с друзьями.</p>
        <div className="mt-8"><CabinShowcase /></div>
      </section>
      <section id="sez1" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Отдых в вашем ритме</p>
        <h2 className="mt-3 font-moderustic text-3xl font-bold sm:text-4xl">Чем заняться</h2>
        <p className="mt-4 mb-8 max-w-2xl text-[#a8b9ae]">Начните утро с прогулки по буковому лесу, отправьтесь навстречу горам или посвятите день себе в СПА.</p>
        <SeasonalExperiences />
      </section>
      <AudienceStories />
      <BookingAssistance />
      <section id="faq" className="mx-auto max-w-[1000px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
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
    </main><Footer />
  </div>;
}
