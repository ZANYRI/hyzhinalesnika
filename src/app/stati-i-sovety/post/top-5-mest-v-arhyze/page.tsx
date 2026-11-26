import Image from "@/components/SeasonalImage";
import Link from "next/link";
import { ArticleBreadcrumbs } from "@/components/ArticleBreadcrumbs";
import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { ArrowUpRight, Clock, Compass } from "@phosphor-icons/react/dist/ssr";
import { TOP_5_PLACES } from "@/data/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { EyeCount } from "@/components/BlogSection";

const path = "/stati-i-sovety/post/top-5-mest-v-arhyze";
const headline = "ТОП-5 мест рядом с нашими домиками в Архызе";

export const metadata: Metadata = withSocialMetadata({
  title: 'ТОП-5 мест Архыза рядом с домиками | База отдыха "Хижина лесника"',
  description:
    "Откройте для себя 5 красивейших мест недалеко от базы отдыха Хижина Лесника: Баритовый водопад, Ферма Альпак, Казачий водопад, Канатная дорога и Обсерватория.",
  alternates: {
    canonical: path,
  },
});

export default function Top5MestArhyzaPage() {
  return <><PageStructuredData metadata={metadata} articleHeadline={headline} />{(
    <div className="min-h-screen bg-canvas text-ink">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
        <ArticleBreadcrumbs path={path} headline={headline} />

        <article className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <span className="text-xs text-muted">
              Опубликовано: 24.06.2025
            </span>
            <EyeCount views={327} />
          </div>

          <h1 className="mt-6 font-moderustic text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {headline}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Приезжая в <strong>«Хижину лесника»</strong>, вы отдыхаете в тишине
            букового леса и одновременно находитесь в нескольких минутах езды от
            главных природных маршрутов Архыза. Мы собрали 5 проверенных
            локаций, куда легко отправиться всей семьёй.
          </p>

          <div className="mt-10 space-y-8">
            {TOP_5_PLACES.map((place) => (
              <section
                key={place.num}
                className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-line bg-soft/55 p-5 sm:p-6 lg:grid-cols-12"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-soft lg:col-span-5">
                  <Image fill sizes="(min-width: 1024px) 40vw, 100vw"
                    src={place.image}
                    alt={`${place.title}, Архыз`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="lg:col-span-7">
                  <span className="font-moderustic text-xs font-bold text-accent">
                    Маршрут 0{place.num}
                  </span>
                  <h2 className="mt-1 font-moderustic text-xl font-bold text-ink sm:text-2xl">
                    {place.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Compass size={15} className="text-accent" />
                      <span>{place.distance}</span>
                    </span>
                    {place.travelTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={15} className="text-accent" />
                        <span>{place.travelTime}</span>
                      </span>
                    )}
                    {place.bestTime && (
                      <span className="text-muted">
                        Лучшее время: {place.bestTime}
                      </span>
                    )}
                  </div>

                  <p className="mt-3.5 text-sm leading-relaxed text-muted sm:text-[15px]">
                    {place.description}
                  </p>

                  <div className="mt-5">
                    <a
                      href={place.routeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-action px-5 text-xs font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98]"
                    >
                      <span>Построить маршрут от базы</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-accent/30 bg-soft p-6 sm:p-8">
            <h2 className="font-moderustic text-xl font-bold text-ink sm:text-2xl">
              Спланируйте своё путешествие в Архыз
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Возьмите удобную обувь, термос с горным чаем и отправляйтесь
              исследовать долину, а вечером возвращайтесь к тёплой террасе и
              костровой зоне у своего дома.
            </p>
          </section>
        </article>

        <p className="mt-8 text-sm"><Link href="/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety" className="text-accent underline">Как добраться до Архыза ↗</Link></p>
        <KonturBookingWidget id="booking" className="mt-12 px-0 sm:px-0" />
      </main>

      <Footer />
    </div>
  )}</>;
}
