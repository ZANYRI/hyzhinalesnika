import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Compass } from "@phosphor-icons/react/dist/ssr";
import { TOP_5_PLACES } from "@/data/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { EyeCount } from "@/components/BlogList";

export const metadata: Metadata = {
  title: 'ТОП-5 мест Архыза рядом с домиками | База отдыха "Хижина лесника"',
  description:
    "Откройте для себя 5 красивейших мест недалеко от базы отдыха Хижина Лесника: Баритовый водопад, Ферма Альпак, Казачий водопад, Канатная дорога и Обсерватория.",
  alternates: {
    canonical: "/stati-i-sovety/post/top-5-mest-v-arhyze",
  },
};

export default function Top5MestArhyzaPage() {
  return (
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-[#a8b9ae]"
        >
          <Link href="/" className="transition hover:text-[#d49a5a]">
            Главная
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition hover:text-[#d49a5a]">
            Блог
          </Link>
          <span>/</span>
          <Link
            href="/putevoditeli-marshruty"
            className="transition hover:text-[#d49a5a]"
          >
            Путеводители / маршруты
          </Link>
          <span>/</span>
          <span className="text-[#f3f5f0]">ТОП-5 мест Архыза</span>
        </nav>

        <article className="mt-6 rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <span className="text-xs text-[#a8b9ae]">
              Опубликовано: 24.06.2025
            </span>
            <EyeCount views={327} />
          </div>

          <h1 className="mt-6 font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
            ТОП-5 мест рядом с нашими домиками в Архызе
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#d6e0d9]">
            Приезжая в <strong>«Хижину лесника»</strong>, вы отдыхаете в тишине
            букового леса и одновременно находитесь в нескольких минутах езды от
            главных природных маршрутов Архыза. Мы собрали 5 проверенных
            локаций, куда легко отправиться всей семьёй.
          </p>

          <div className="mt-10 space-y-8">
            {TOP_5_PLACES.map((place) => (
              <section
                key={place.num}
                className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-white/10 bg-[#163122]/55 p-5 sm:p-6 lg:grid-cols-12"
              >
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#08140d] lg:col-span-5">
                  <img
                    src={place.image}
                    alt={`${place.title}, Архыз`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="lg:col-span-7">
                  <span className="font-moderustic text-xs font-bold text-[#d49a5a]">
                    Маршрут 0{place.num}
                  </span>
                  <h2 className="mt-1 font-moderustic text-xl font-bold text-[#f3f5f0] sm:text-2xl">
                    {place.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-medium text-[#d6e0d9]">
                    <span className="inline-flex items-center gap-1.5">
                      <Compass size={15} className="text-[#d49a5a]" />
                      <span>{place.distance}</span>
                    </span>
                    {place.travelTime && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={15} className="text-[#d49a5a]" />
                        <span>{place.travelTime}</span>
                      </span>
                    )}
                    {place.bestTime && (
                      <span className="text-[#a8b9ae]">
                        Лучшее время: {place.bestTime}
                      </span>
                    )}
                  </div>

                  <p className="mt-3.5 text-sm leading-relaxed text-[#a8b9ae] sm:text-[15px]">
                    {place.description}
                  </p>

                  <div className="mt-5">
                    <a
                      href={place.routeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-[#d49a5a] px-5 text-xs font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
                    >
                      <span>Построить маршрут от базы</span>
                      <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded-2xl border border-[#d49a5a]/30 bg-[#163122] p-6 sm:p-8">
            <h2 className="font-moderustic text-xl font-bold text-[#f3f5f0] sm:text-2xl">
              Спланируйте своё путешествие в Архыз
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
              Возьмите удобную обувь, термос с горным чаем и отправляйтесь
              исследовать долину, а вечером возвращайтесь к тёплой террасе и
              костровой зоне у своего дома.
            </p>
          </section>
        </article>

        <KonturBookingWidget id="booking" className="mt-12 px-0 sm:px-0" />
      </main>

      <Footer />
    </div>
  );
}
