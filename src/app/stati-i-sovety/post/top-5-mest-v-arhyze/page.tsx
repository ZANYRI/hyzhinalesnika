import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-12 pb-16 sm:px-6 sm:pt-16">
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm"
        >
          <Link href="/" className="underline hover:text-[#dbd0bf]">
            Главная
          </Link>
          <span>/</span>
          <Link href="/blog" className="underline hover:text-[#dbd0bf]">
            Блог
          </Link>
          <span>/</span>
          <Link
            href="/putevoditeli-marshruty"
            className="underline hover:text-[#dbd0bf]"
          >
            Путеводители / маршруты
          </Link>
          <span>/</span>
          <span className="text-white/95">ТОП-5 мест Архыза</span>
        </nav>

        {/* Article Card */}
        <article className="mt-6 rounded-2xl bg-white p-6 text-[#262626] shadow-lg sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ececec] pb-4">
            <span className="text-sm text-[#777]">
              Дата публикации: 24.06.2025
            </span>
            <EyeCount views={327} />
          </div>

          <h1 className="mt-6 font-moderustic text-2xl leading-tight font-extrabold text-[#0e2618] sm:text-4xl">
            ТОП-5 мест рядом с нашими домиками
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#3a3a3a] sm:text-lg">
            Приезжая в <strong>Хижину Лесника</strong>, вы не только
            наслаждаетесь уютом и тишиной леса, но и получаете доступ к
            удивительным природным достопримечательностям Архыза. Мы собрали для
            вас 5 самых красивых и доступных мест, до которых легко добраться на
            любом транспорте.
          </p>

          <div className="mt-10 space-y-12">
            {TOP_5_PLACES.map((place) => (
              <section
                key={place.num}
                className="border-t border-[#efefef] pt-8 first:border-t-0 first:pt-0"
              >
                <h2 className="font-moderustic text-xl font-bold text-[#0e2618] sm:text-2xl">
                  {place.num}. {place.emoji} {place.title}
                </h2>

                <div className="mt-4 overflow-hidden rounded-xl max-w-[580px]">
                  <img
                    src={place.image}
                    alt={`${place.title} Архыз`}
                    loading="lazy"
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="mt-4 space-y-1 text-sm text-[#444] sm:text-base">
                  <p>
                    <strong>Расстояние:</strong> {place.distance}
                  </p>
                  {place.bestTime && (
                    <p>
                      <strong>Лучшее время:</strong> {place.bestTime}
                    </p>
                  )}
                  {place.travelTime && (
                    <p>
                      <strong>Время в пути:</strong> {place.travelTime}
                    </p>
                  )}
                </div>

                <div className="mt-3">
                  <a
                    href={place.routeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#396448] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2e533b]"
                  >
                    Построить маршрут в Яндекс Картах →
                  </a>
                </div>

                <p className="mt-4 text-base leading-relaxed text-[#333]">
                  {place.description}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-12 rounded-xl bg-[#f4f6ef] p-6 sm:p-8">
            <h2 className="font-moderustic text-xl font-bold text-[#0e2618] sm:text-2xl">
              🔚 Заключение
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#333]">
              Это только малая часть того, что можно открыть для себя рядом с
              Хижиной Лесника. Мы живём в удивительном месте, и каждый уголок
              здесь — как кадр из фильма. Возьмите рюкзак, воду, термос с чаем —
              и отправляйтесь исследовать.
            </p>
            <p className="mt-3 font-semibold text-[#0e2618]">
              Хочешь увидеть всё это своими глазами? Забронируй домик прямо
              сейчас — и отправляйся навстречу природе!
            </p>
          </section>
        </article>

        <KonturBookingWidget id="booking" className="mt-12 px-0 sm:px-0" />
      </main>

      <Footer />
    </div>
  );
}
