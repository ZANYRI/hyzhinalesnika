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
          <span className="text-white/95">
            Как добраться до Архыза в 2026 году: все способы, маршруты, советы
          </span>
        </nav>

        {/* Article Card */}
        <article className="mt-6 rounded-2xl bg-white p-6 text-[#262626] shadow-lg sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ececec] pb-4">
            <span className="text-sm text-[#777]">
              Дата публикации: 17.01.2026
            </span>
            <EyeCount views={757} />
          </div>

          <h1 className="mt-6 font-moderustic text-2xl leading-tight font-extrabold text-[#0e2618] sm:text-4xl">
            Как добраться до Архыза на машине и общественном транспорте в 2026
            году
          </h1>

          <p className="mt-5 text-base leading-relaxed text-[#3a3a3a] sm:text-lg">
            Отправляетесь в горы Кавказа в 2026 году? Архыз ждёт гостей круглый
            год! Чтобы ваше путешествие началось без заминок, мы подготовили
            актуальный гид. В нём — все способы добраться до курорта на личном
            или общественном транспорте, свежие советы по дороге и простая
            инструкция, как от посёлка доехать до нашей базы отдыха «Хижина
            лесника».
          </p>

          {/* Table of Contents */}
          <div className="mt-8 rounded-xl bg-[#f4f6ef] p-6">
            <h2 className="font-moderustic text-lg font-bold text-[#0e2618]">
              Содержание
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#396448] sm:text-base">
              <li>
                <a href="#car" className="underline hover:text-[#90754b]">
                  Маршрут на машине до Архыза в 2026
                </a>
              </li>
              <li>
                <a href="#bus" className="underline hover:text-[#90754b]">
                  Как доехать до Архыза на автобусе и междугороднем такси
                </a>
              </li>
              <li>
                <a href="#airplane" className="underline hover:text-[#90754b]">
                  Авиасообщение: через какие аэропорты удобнее лететь
                </a>
              </li>
              <li>
                <a href="#taxi" className="underline hover:text-[#90754b]">
                  Трансфер и такси из аэропорта: заказ и цены
                </a>
              </li>
              <li>
                <a href="#to-base" className="underline hover:text-[#90754b]">
                  Финальный этап: как добраться от Архыза до «Хижины лесника»
                </a>
              </li>
              <li>
                <a href="#faq" className="underline hover:text-[#90754b]">
                  Актуальные вопросы путешественников (FAQ 2026)
                </a>
              </li>
            </ul>
          </div>

          {/* 1. На машине */}
          <section id="car" className="mt-10 scroll-mt-6 space-y-5">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Маршрут на машине до Архыза из крупных городов (2026)
            </h2>
            <p className="leading-relaxed text-[#333]">
              Поездка на автомобиле даёт свободу и позволяет насладиться видами.
              Основные трассы содержатся в хорошем состоянии, но готовьтесь к
              горному серпантину на финальном участке.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-[#e3e7da] p-5">
                <h3 className="font-bold text-[#0e2618]">Из Ставрополя</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3b3b3b]">
                  <strong>Расстояние:</strong> ~240 км.
                  <br />
                  <strong>Время в пути:</strong> 3,5 – 4,5 часа (с учётом
                  возможного ремонта участков трассы).
                  <br />
                  <strong>Маршрут:</strong> Ставрополь → Невинномысск → Черкесск
                  → станица Зеленчукская → п. Архыз (трасса А-155). После
                  Черкесска дорога становится извилистой — соблюдайте скоростной
                  режим.
                </p>
              </div>

              <div className="rounded-xl border border-[#e3e7da] p-5">
                <h3 className="font-bold text-[#0e2618]">
                  Из Минеральных Вод / Пятигорска
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3b3b3b]">
                  <strong>Расстояние:</strong> ~220 км от Минеральных Вод.
                  <br />
                  <strong>Время в пути:</strong> 3,5 – 4 часа.
                  <br />
                  <strong>Маршрут:</strong> Следуйте по трассе Е50/Р217 в
                  сторону Черкесска, затем на А-155 через Карачаевск. Участок от
                  Карачаевска активно модернизировался в предыдущие годы.
                </p>
              </div>

              <div className="rounded-xl border border-[#e3e7da] p-5">
                <h3 className="font-bold text-[#0e2618]">
                  Из Ростова-на-Дону / Краснодара
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3b3b3b]">
                  <strong>Расстояние:</strong> ~550 км от Краснодара.
                  <br />
                  <strong>Время в пути:</strong> 7 – 8,5 часов.
                  <br />
                  <strong>Маршрут:</strong> Краснодар → Кропоткин → Невинномысск
                  → далее как в маршруте из Ставрополя. Для комфорта планируйте
                  остановку на обед.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="font-moderustic text-xl font-bold text-[#0e2618]">
                Важные советы для водителей на 2026 год
              </h3>
              <ul className="mt-3 list-disc space-y-2.5 pl-5 leading-relaxed text-[#333]">
                <li>
                  <strong>Заправка и оплата:</strong> Последние крупные АЗС с
                  полным сервисом — в Черкесске и станице Зеленчукская.
                  Рекомендуем заправиться там. Повсеместно принимают
                  бесконтактные платежи.
                </li>
                <li>
                  <strong>Погода и дорога:</strong> Зимой и ранней весной на
                  перевалах возможен гололёд. Проверяйте прогнозы в
                  «Яндекс.Картах» и региональных сводках Карачаево-Черкесии.
                  Наличие зимней резины или цепей обязательно.
                </li>
                <li>
                  <strong>Навигация и связь:</strong> Сотовая связь (особенно
                  мобильный интернет) в горах может пропадать. Обязательно
                  скачайте офлайн-карты (Maps.me, 2GIS, Яндекс.Карты) и точные
                  координаты вашего проживания.
                </li>
              </ul>
            </div>
          </section>

          {/* 2. Автобус */}
          <section id="bus" className="mt-10 scroll-mt-6 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Как доехать до Архыза на автобусе и междугороднем такси (2026)
            </h2>
            <p className="leading-relaxed text-[#333]">
              Регулярное автобусное сообщение связывает Архыз с Черкесском, а в
              курортный сезон — и с другими городами.
            </p>
            <ul className="list-disc space-y-2.5 pl-5 leading-relaxed text-[#333]">
              <li>
                <strong>Из Черкесска:</strong> Автобусы отправляются с новой
                автостанции. Время в пути — около 2,5 часов. Расписание и билеты
                удобно смотреть в агрегаторах (Яндекс.Путешествия, Tutu.ru) или
                на сайте автовокзала.
              </li>
              <li>
                <strong>Из Ставрополя / Минеральных Вод:</strong> Прямые рейсы
                могут быть сезонными. Альтернатива — доехать до Черкесска с
                пересадкой.
              </li>
              <li>
                <strong>Междугороднее такси (попутчики):</strong> Популярный и
                часто экономичный вариант. Поездку можно найти в соответствующих
                приложениях, задав пункт назначения «Архыз».
              </li>
            </ul>
            <p className="text-sm font-medium text-[#90754b]">
              Совет: При планировании поездки на выходные или праздники
              покупайте билеты онлайн заранее.
            </p>
          </section>

          {/* 3. Самолет */}
          <section id="airplane" className="mt-10 scroll-mt-6 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Авиасообщение в 2026: через какие аэропорты лететь в Архыз
            </h2>
            <p className="leading-relaxed text-[#333]">
              Ближайшие к Архызу аэропорты не изменились, но количество рейсов
              растёт:
            </p>
            <ul className="list-disc space-y-2.5 pl-5 leading-relaxed text-[#333]">
              <li>
                <strong>Минеральные Воды (MRV)</strong> — ~220 км. Основной хаб,
                принимающий рейсы из Москвы, Санкт-Петербурга и многих других
                городов. В 2026 году ожидается стабильное расписание.
              </li>
              <li>
                <strong>Ставрополь (STW)</strong> — ~240 км. Удобная
                альтернатива, если есть прямой рейс в ваш город.
              </li>
              <li>
                <strong>Нальчик (NAL)</strong> — ~250 км. Рассмотрите этот
                вариант при сравнении цен и удобства стыковок.
              </li>
            </ul>
            <p className="leading-relaxed text-[#333]">
              После прилёта самый удобный способ добраться до Архыза — заранее
              заказанный трансфер или аренда автомобиля прямо в аэропорту.
            </p>
          </section>

          {/* 4. Трансфер */}
          <section id="taxi" className="mt-10 scroll-mt-6 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Трансфер и такси из аэропорта в Архыз (2026)
            </h2>
            <p className="leading-relaxed text-[#333]">
              Предзаказ транспорта — гарантия комфорта и фиксированной цены.
            </p>
            <ul className="list-disc space-y-2.5 pl-5 leading-relaxed text-[#333]">
              <li>
                <strong>Как заказать:</strong> Через проверенные агрегаторы
                (Ситимобил, Яндекс Go, локальные сервисы Карачаево-Черкесии) или
                напрямую у транспортных компаний, работающих в регионе.
              </li>
              <li>
                <strong>Стоимость в 2026:</strong> Зависит от аэропорта, класса
                авто и сезона. Ориентировочный диапазон из Минеральных Вод:
                3500–5000 рублей за легковой автомобиль. Точную цену лучше
                уточнять при бронировании.
              </li>
              <li>
                <strong>Наша помощь:</strong> Гостям базы «Хижина лесника» мы
                всегда готовы посоветовать надёжных перевозчиков и помочь с
                организацией встречи.
              </li>
            </ul>
          </section>

          {/* 5. До базы */}
          <section id="to-base" className="mt-10 scroll-mt-6 space-y-4">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Финальный этап: как добраться от посёлка Архыз до базы «Хижина
              лесника»
            </h2>
            <p className="leading-relaxed text-[#333]">
              Наша база расположена в тихом, живописном месте недалеко от
              посёлка. Дорога простая:
            </p>
            <ul className="list-disc space-y-2.5 pl-5 leading-relaxed text-[#333]">
              <li>
                <strong>На машине:</strong> От центральной части Архыза движение
                займёт всего 5–7 минут по асфальтированной дороге. Координаты
                для навигатора:{" "}
                <a
                  href="https://yandex.ru/maps/-/CLhG74Ky"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#396448] underline hover:text-[#90754b]"
                >
                  https://yandex.ru/maps/-/CLhG74Ky
                </a>
                . У каждого домика — <strong>личная бесплатная парковка</strong>.
              </li>
              <li>
                <strong>На местном такси:</strong> Поездка из любой точки
                посёлка обойдётся недорого и займёт не более 10 минут. Водителям
                известна наша база.
              </li>
              <li>
                <strong>Пешком:</strong> Не рекомендуется — путь идёт в гору,
                лучше сэкономить силы для отдыха.
              </li>
            </ul>
            <p className="leading-relaxed text-[#333]">
              После подтверждения бронирования мы вышлем вам{" "}
              <strong>
                детальную схему проезда с фото-ориентирами и точными
                координатами
              </strong>
              .
            </p>
          </section>

          {/* 6. FAQ 2026 */}
          <section id="faq" className="mt-10 scroll-mt-6 space-y-5">
            <h2 className="font-moderustic text-2xl font-bold text-[#0e2618]">
              Актуальные вопросы путешественников (FAQ 2026)
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl bg-[#f4f6ef] p-5">
                <h3 className="font-bold text-[#0e2618]">
                  ❓ Изменилась ли дорожная ситуация на подъезде к Архызу?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#333] sm:text-base">
                  <strong>Ответ:</strong> К 2026 году основные трассы (А-155 и
                  подъезды к ним) поддерживаются в хорошем состоянии. В летний
                  период возможны локальные ремонтные работы, которые могут
                  незначительно увеличить время в пути. Рекомендуем проверять
                  информацию о перекрытиях в навигационных приложениях перед
                  выездом.
                </p>
              </div>

              <div className="rounded-xl bg-[#f4f6ef] p-5">
                <h3 className="font-bold text-[#0e2618]">
                  ❓ Стало ли больше электрозаправок по пути?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#333] sm:text-base">
                  <strong>Ответ:</strong> Инфраструктура для электромобилей
                  развивается, но остаётся сконцентрированной в крупных городах
                  (Ставрополь, Черкесск, Минеральные Воды). Если вы
                  путешествуете на электромобиле, тщательно планируйте маршрут с
                  учётом расположения зарядных станций. В самом Архызе зарядка
                  может быть ограничена.
                </p>
              </div>

              <div className="rounded-xl bg-[#f4f6ef] p-5">
                <h3 className="font-bold text-[#0e2618]">
                  ❓ Можно ли добраться до Архыза на поезде?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#333] sm:text-base">
                  <strong>Ответ:</strong> Прямого железнодорожного сообщения с
                  посёлком Архыз нет. Ближайшие крупные железнодорожные вокзалы
                  находятся в Невинномысске, Минеральных Водах и Черкесске.
                  Оттуда до Архыза удобнее всего добираться на заранее
                  заказанном трансфере или автобусе.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <p className="leading-relaxed text-[#333]">
                Путь в горы — это начало вашего приключения. Мы постарались
                собрать самую полезную информацию, чтобы дорога прошла гладко. А
                по прибытии вас будет ждать уют, природа и гостеприимство базы
                отдыха <strong>«Хижина лесника»</strong>.
              </p>
              <p className="mt-3 font-semibold text-[#0e2618]">
                Забронируйте домик на 2026 год и приезжайте за новыми
                впечатлениями!
              </p>
            </div>
          </section>
        </article>

        <KonturBookingWidget id="booking" className="mt-12 px-0 sm:px-0" />
      </main>

      <Footer />
    </div>
  );
}
