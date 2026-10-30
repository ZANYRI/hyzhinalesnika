import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { EyeCount } from "@/components/BlogList";

export const metadata: Metadata = {
  title:
    'Как добраться до Архыза в 2026 году: все способы, маршруты, советы | "Хижина лесника"',
  description:
    "Актуальный гид 2026 года: как доехать до Архыза на машине, автобусе, самолёте и трансфере, и как добраться от посёлка до базы отдыха «Хижина лесника».",
  alternates: {
    canonical:
      "/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety",
  },
};

export default function HowToGetToArkhyz2026Page() {
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
          <span className="text-[#f3f5f0]">
            Как добраться до Архыза в 2026 году
          </span>
        </nav>

        <article className="mt-6 rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <span className="text-xs text-[#a8b9ae]">
              Опубликовано: 17.01.2026
            </span>
            <EyeCount views={757} />
          </div>

          <h1 className="mt-6 font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
            Как добраться до Архыза на машине и общественном транспорте в 2026
            году
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#d6e0d9]">
            Отправляетесь в горы Кавказа в 2026 году? Архыз принимает гостей
            круглый год. Мы собрали актуальный путеводитель со всеми способами
            дороги на личном автомобиле, самолёте и трансфере, а также точной
            схемой подъезда от посёлка до базы отдыха «Хижина лесника».
          </p>

          {/* Table of Contents */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#163122]/65 p-6">
            <h2 className="font-moderustic text-lg font-bold text-[#f3f5f0]">
              Содержание гида
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-[#d49a5a] md:grid-cols-2">
              <li>
                <a href="#car" className="transition hover:text-[#e0ab6e]">
                  1. Маршрут на автомобиле из крупных городов
                </a>
              </li>
              <li>
                <a href="#bus" className="transition hover:text-[#e0ab6e]">
                  2. Автобусы и междугороднее такси
                </a>
              </li>
              <li>
                <a href="#airplane" className="transition hover:text-[#e0ab6e]">
                  3. Ближайшие аэропорты прилёта
                </a>
              </li>
              <li>
                <a href="#taxi" className="transition hover:text-[#e0ab6e]">
                  4. Трансфер из аэропорта и ориентиры по стоимости
                </a>
              </li>
              <li>
                <a href="#to-base" className="transition hover:text-[#e0ab6e]">
                  5. Финальный участок до «Хижины лесника»
                </a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-[#e0ab6e]">
                  6. Частые вопросы водителей и туристов (2026)
                </a>
              </li>
            </ul>
          </div>

          {/* 1. На машине */}
          <section id="car" className="mt-10 scroll-mt-24 space-y-5">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Маршрут на машине до Архыза из крупных городов (2026)
            </h2>
            <p className="text-sm leading-relaxed text-[#a8b9ae] sm:text-base">
              Поездка на автомобиле даёт свободу передвижения по долине и
              водопадам. Основные федеральные и региональные трассы поддерживаются
              в хорошем состоянии, на финальном горном участке начинается плавный
              асфальтированный серпантин.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                  Из Ставрополя
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#d6e0d9]">
                  <strong>Расстояние:</strong> около 240 км.
                  <br />
                  <strong>Время в пути:</strong> 3,5-4,5 часа.
                  <br />
                  <strong>Маршрут:</strong> Ставрополь → Невинномысск → Черкесск
                  → станица Зеленчукская → п. Архыз (трасса А-155).
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                  Из Минеральных Вод и Пятигорска
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#d6e0d9]">
                  <strong>Расстояние:</strong> около 220 км от Минеральных Вод.
                  <br />
                  <strong>Время в пути:</strong> 3,5-4 часа.
                  <br />
                  <strong>Маршрут:</strong> по трассе Е50/Р217 в сторону
                  Черкесска, далее на А-155 через Карачаевск или Зеленчукскую.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                  Из Ростова-на-Дону и Краснодара
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#d6e0d9]">
                  <strong>Расстояние:</strong> около 550 км от Краснодара.
                  <br />
                  <strong>Время в пути:</strong> 7-8,5 часов.
                  <br />
                  <strong>Маршрут:</strong> Краснодар → Кропоткин → Невинномысск
                  → Черкесск → станица Зеленчукская → Архыз.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-moderustic text-xl font-bold text-[#f3f5f0]">
                Рекомендации водителям на 2026 год
              </h3>
              <ul className="mt-3 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
                <li>
                  <strong>Заправка:</strong> последние сетевые АЗС с полным
                  сервисом расположены в Черкесске и станице Зеленчукской, лучше
                  пополнить бак заранее.
                </li>
                <li>
                  <strong>Зимний сезон:</strong> с ноября по март обязательна
                  качественная зимняя резина, перед выездом сверяйте прогноз на
                  перевалах в Яндекс Картах.
                </li>
                <li>
                  <strong>Офлайн-навигация:</strong> на отдельных лесных участках
                  мобильная сеть может ослабевать, поэтому рекомендуем заранее
                  загрузить офлайн-карту Карачаево-Черкесии.
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Автобус */}
          <section id="bus" className="mt-10 scroll-mt-24 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Автобусы и междугороднее такси
            </h2>
            <p className="text-sm leading-relaxed text-[#a8b9ae] sm:text-base">
              Регулярные рейсы связывают Архыз с Черкесском круглый год, а в
              высокий горнолыжный и летний сезон добавляются прямые туристические
              трансферы.
            </p>
            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
              <li>
                <strong>Из Черкесска:</strong> автобусы отправляются с
                автостанции, время в дороге около 2,5 часов. Актуальные рейсы
                доступны на Яндекс Путешествиях и Tutu.ru.
              </li>
              <li>
                <strong>Из Ставрополя и Минеральных Вод:</strong> доступны
                сезонные прямые рейсы либо удобная стыковка через Черкесск.
              </li>
            </ul>
          </section>

          {/* 3. Самолет */}
          <section id="airplane" className="mt-10 scroll-mt-24 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Через какие аэропорты удобнее лететь в Архыз
            </h2>
            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
              <li>
                <strong>Минеральные Воды (MRV), ~220 км:</strong> главный
                авиаузел региона с ежедневными прямыми рейсами из Москвы,
                Санкт-Петербурга, Екатеринбурга и других городов.
              </li>
              <li>
                <strong>Ставрополь (STW), ~240 км:</strong> спокойная
                альтернатива при наличии прямого перелёта из вашего города.
              </li>
              <li>
                <strong>Нальчик (NAL), ~250 км:</strong> дополнительный вариант
                при подборе удобных дат и тарифов.
              </li>
            </ul>
          </section>

          {/* 4. Трансфер */}
          <section id="taxi" className="mt-10 scroll-mt-24 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Трансфер и такси из аэропорта
            </h2>
            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
              <li>
                <strong>Заказ:</strong> через Яндекс Go, региональные службы
                трансфера или аренду автомобиля прямо в терминале прилёта.
              </li>
              <li>
                <strong>Ориентир по стоимости в 2026 году:</strong> индивидуальный
                легковой трансфер из аэропорта Минеральные Воды обычно составляет
                3 500-5 000 ₽ в зависимости от сезона и класса автомобиля.
              </li>
              <li>
                <strong>Помощь гостям:</strong> после бронирования дома мы с
                радостью поделимся контактами проверенных водителей для встречи в
                аэропорту.
              </li>
            </ul>
          </section>

          {/* 5. До базы */}
          <section id="to-base" className="mt-10 scroll-mt-24 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Финальный этап: от центра посёлка Архыз до «Хижины лесника»
            </h2>
            <ul className="list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#d6e0d9] sm:text-base">
              <li>
                <strong>На автомобиле:</strong> от центральной улицы Архыза путь
                до ул. Лесная, 40 занимает 5-7 минут по асфальтированной дороге.
                Точка для навигатора:{" "}
                <a
                  href="https://yandex.ru/maps/-/CLhG74Ky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#d49a5a] underline hover:text-[#e0ab6e]"
                >
                  открыть в Яндекс Картах
                </a>
                . У каждого дома предусмотрена бесплатная личная парковка.
              </li>
              <li>
                <strong>На местном такси:</strong> поездка из центра посёлка
                займёт не более 10 минут, местные водители хорошо знают базу.
              </li>
            </ul>
          </section>

          {/* 6. FAQ 2026 */}
          <section id="faq" className="mt-10 scroll-mt-24 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#f3f5f0]">
              Частые вопросы путешественников (FAQ 2026)
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-base font-bold text-[#f3f5f0]">
                  Как состояние трассы А-155 на подъезде к Архызу?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                  Трасса поддерживается в хорошем состоянии круглый год, проезд
                  комфортен на любом легковом автомобиле.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-base font-bold text-[#f3f5f0]">
                  Где ближайшие зарядные станции для электромобилей?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                  Быстрые ЭЗС сосредоточены в Минеральных Водах, Ставрополе и
                  Черкесске, рекомендуем планировать заряд до подъёма в горы.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#163122]/55 p-5">
                <h3 className="font-moderustic text-base font-bold text-[#f3f5f0]">
                  Можно ли доехать на поезде?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                  Ближайшие ж/д вокзалы находятся в Невинномысске, Минеральных
                  Водах и Черкесске, откуда удобно пересесть на трансфер или
                  автобус.
                </p>
              </div>
            </div>
          </section>
        </article>

        <KonturBookingWidget id="booking" className="mt-12 px-0 sm:px-0" />
      </main>

      <Footer />
    </div>
  );
}
