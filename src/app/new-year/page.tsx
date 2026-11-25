import type { Metadata } from "next";
import Image from "@/components/SeasonalImage";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CalendarBlank, Campfire, Gift, Mountains, Snowflake, Sparkle, TreeEvergreen, UsersThree, Waves } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingAssistance } from "@/components/BookingAssistance";
import { Snowfall } from "@/components/Snowfall";
import { JsonLd, PageStructuredData } from "@/components/StructuredData";
import { CABIN_LIST } from "@/data/cabins";
import { NEW_YEAR, NEW_YEAR_FAQ } from "@/data/new-year";
import { SITE_CONFIG } from "@/data/site";
import { withSocialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = withSocialMetadata({
  title: `Новый год ${NEW_YEAR.year} в Архызе — отдых в домиках | Хижина лесника`,
  description: `Встречайте Новый год ${NEW_YEAR.year} и проведите январские каникулы в Архызе. Три уютных дома в лесу для 2–7 гостей, свои кухни и террасы. Выбор дома и бронирование.`,
  alternates: { canonical: NEW_YEAR.href },
});

const activities = [
  { title: "Днём — навстречу горам", text: "Горнолыжные склоны, прогулки и панорамы Архыза. Выбирайте маршрут под погоду и настроение.", image: "/images/activities/ski-slopes.webp", alt: "Заснеженные горнолыжные склоны и панорама гор Архыза", tag: "Зимние впечатления", href: "/#sez1", icon: Mountains },
  { title: "После прогулок — в тепло", text: "Бассейн с подогревом, сауна и хамам в СПА партнёрского парк-отеля «Адреналин», в 100 метрах от домиков. Посещение оплачивается отдельно.", image: "/images/partners/spa/spa-01.webp", alt: "Бассейн с подогревом в партнёрском СПА-комплексе «Адреналин»", tag: "СПА рядом", href: "/spa", icon: Waves },
  { title: "Вечером — время для своих", text: "Приготовьте ужин на своей кухне, достаньте настольные игры и проведите вечер за долгими разговорами.", image: "/images/barnhouse/10.jpg", alt: "Уютная гостиная барнхауса «Берёза» с диваном и новогодней ёлкой", tag: "Домашние традиции", href: "#new-year-cabins", icon: Campfire },
];

export default function NewYearPage() {
  return <div className="min-h-screen bg-canvas text-ink">
    <PageStructuredData metadata={metadata} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_CONFIG.url}${NEW_YEAR.href}#holiday-faq`, mainEntity: NEW_YEAR_FAQ.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />
    <Header />
    <main>
      <section data-tone="emerald" aria-labelledby="new-year-title" className="new-year-hero mx-auto mt-4 max-w-[1400px] overflow-hidden rounded-[2rem] bg-[#102d24] text-ink sm:mt-6">
        <Image src={NEW_YEAR.hero} alt="Новогодняя ёлка и праздничный стол в барнхаусе «Берёза» в «Хижине лесника»" fill preload quality={75} sizes="(min-width: 1400px) 1400px, 100vw" className="new-year-hero-photo" />
        <div aria-hidden="true" className="new-year-hero-shade" />
        <div aria-hidden="true" className="new-year-hero-lights" />
        <Snowfall />
        <div className="relative z-10 flex min-h-[680px] flex-col px-6 py-9 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-[#f0d5a5]">
            <TreeEvergreen size={24} weight="thin" aria-hidden="true" />Хижина лесника · Архыз
            <span className="rounded-full border border-[#e4c48b]/40 px-3 py-1.5">Зима {NEW_YEAR.year}</span>
          </div>
          <div className="new-year-hero-copy my-8 max-w-[620px]">
            <p className="mb-5 flex items-center gap-2 text-sm text-[#f0d5a5]"><Sparkle size={18} weight="thin" aria-hidden="true" />Собраться вместе. Загадать главное.</p>
            <h1 id="new-year-title" className="new-year-hero-title font-moderustic text-[40px] font-normal leading-[1.06] tracking-[-0.035em] sm:text-6xl lg:text-[68px]">Новый год<br />в горах Архыза</h1>
            <p className="mt-6 max-w-[450px] text-sm leading-7 text-[#f0f0e6] sm:text-base">За окнами — лес и горы. Дома — тепло, близкие и время друг для друга. Встретьте {NEW_YEAR.year} год в «Хижине лесника» и останьтесь на январские каникулы.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#new-year-cabins" className="new-year-gold-button inline-flex min-h-12 items-center justify-center gap-4 rounded-full bg-[#f0d5a5] px-6 py-3.5 text-sm font-semibold">Выбрать свой дом<ArrowDown size={17} aria-hidden="true" /></Link>
              <Link href="#help" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-[#102d24]/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">Обсудить поездку</Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-6 text-xs text-[#f0eee5] sm:text-sm">
            <span className="inline-flex items-center gap-2"><Snowflake size={17} aria-hidden="true" />Новогодняя ночь</span>
            <span className="inline-flex items-center gap-2"><CalendarBlank size={17} aria-hidden="true" />Январские каникулы</span>
            <span className="inline-flex items-center gap-2"><UsersThree size={17} aria-hidden="true" />Для семьи и друзей</span>
          </div>
        </div>
      </section>

      <nav aria-label="На новогодней странице" className="mx-auto flex max-w-[1400px] flex-wrap gap-x-6 gap-y-3 px-5 py-6 text-xs font-medium text-muted sm:px-8 sm:text-sm">
        {[['#holiday-plans', 'Планы на праздники'], ['#new-year-cabins', 'Выбрать дом'], ['#winter-days', 'Чем заняться'], ['#holiday-faq', 'Вопросы'], ['#help', 'Помощь с бронированием']].map(([href, label]) => <Link key={href} href={href} className="underline-offset-4 transition hover:text-accent hover:underline">{label}</Link>)}
      </nav>

      <section id="holiday-plans" aria-labelledby="holiday-plans-title" className="mx-auto max-w-[1400px] scroll-mt-44 px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div><p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Праздник в вашем ритме</p><h2 id="holiday-plans-title" className="mt-4 max-w-2xl font-moderustic text-3xl font-medium leading-tight sm:text-5xl">Чуть ближе к природе.<br />Гораздо ближе друг к другу.</h2></div>
          <p className="max-w-xl leading-7 text-muted">Здесь можно встретить Новый год в своём кругу или приехать, когда праздничная суета уже позади. Три отдельных дома, свой двор и лес совсем рядом.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border border-line bg-soft p-7 sm:p-10">
            <Sparkle size={52} weight="thin" aria-hidden="true" className="absolute top-7 right-7 text-wood/30" />
            <p className="text-xs uppercase tracking-[0.16em] text-wood">31 декабря · Встречаем {NEW_YEAR.year}</p>
            <h3 className="mt-9 font-moderustic text-3xl font-medium">Новый год в своём кругу</h3>
            <p className="mt-4 max-w-md leading-7 text-muted">Любимые блюда на столе, пожелания близким и первый рассвет нового года в горах. Дом, в котором можно создать свои праздничные традиции.</p>
            <Link href="/booking" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-accent underline underline-offset-4">Проверить новогодние даты<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </article>
          <article className="relative overflow-hidden rounded-3xl border border-line bg-white p-7 sm:p-10">
            <Snowflake size={52} weight="thin" aria-hidden="true" className="absolute top-7 right-7 text-accent/25" />
            <p className="text-xs uppercase tracking-[0.16em] text-wood">Январь · Без спешки</p>
            <h3 className="mt-9 font-moderustic text-3xl font-medium">Каникулы среди гор</h3>
            <p className="mt-4 max-w-md leading-7 text-muted">Неспешные завтраки, прогулки по лесу и дни на склонах. Возвращайтесь в тёплый дом и продлевайте ощущение праздника столько, сколько хочется.</p>
            <Link href="/booking" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-accent underline underline-offset-4">Выбрать даты на каникулы<ArrowUpRight size={17} aria-hidden="true" /></Link>
          </article>
        </div>
      </section>

      <section id="new-year-cabins" aria-labelledby="new-year-cabins-title" className="section-band scroll-mt-44">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Ваш дом на праздники</p><h2 id="new-year-cabins-title" className="mt-4 font-moderustic text-3xl font-medium sm:text-5xl">Три дома. Три своих истории.</h2></div><p className="max-w-sm text-sm leading-6 text-muted">От поездки вдвоём до семейных каникул.<br />Выберите пространство для вашей компании.</p></div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {CABIN_LIST.map(cabin => <article key={cabin.id} className="overflow-hidden rounded-3xl border border-line bg-white">
              <Link href={cabin.slug} className="group relative block aspect-[4/3] overflow-hidden">
                <Image src={cabin.cardImage} alt={cabin.cardImageAlt} fill quality={75} sizes="(min-width: 1400px) 435px, (min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-2 text-xs font-medium text-[#244c3b]">{cabin.cardGuests} · {cabin.cardArea}</span>
              </Link>
              <div className="p-6 sm:p-7"><h3 className="font-moderustic text-2xl font-medium">{cabin.cardTitle}</h3><p className="mt-3 min-h-12 text-sm leading-6 text-muted">{cabin.cardSubtitle}</p><p className="mt-4 border-t border-line pt-4 text-xs leading-6 text-muted">{cabin.cardBedrooms} · своя кухня и терраса</p><Link href={cabin.slug} className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-accent">Посмотреть дом<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
            </article>)}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-white px-6 py-5"><p className="max-w-3xl text-sm leading-6 text-muted">Актуальные цены и свободные даты — в онлайн-бронировании. Условия праздничного заезда подтвердите до оплаты.</p><Link href="/booking" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-action px-6 py-3 text-sm font-semibold text-on-action transition hover:bg-action-hover">Проверить даты</Link></div>
        </div>
      </section>

      <section id="winter-days" aria-labelledby="winter-days-title" className="mx-auto max-w-[1400px] scroll-mt-44 px-4 py-14 sm:px-6 sm:py-20">
        <p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Дни, которые хочется запомнить</p>
        <h2 id="winter-days-title" className="mt-4 max-w-3xl font-moderustic text-3xl font-medium leading-tight sm:text-5xl">Пусть у этих каникул<br />будет свой ритм</h2>
        <div className="mt-9 grid gap-7 md:grid-cols-3">
          {activities.map(({ title, text, image, alt, tag, href, icon: Icon }) => <article key={title}>
            <Link href={href} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl"><Image src={image} alt={alt} fill quality={75} sizes="(min-width: 1400px) 430px, (min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none" /></Link>
            <p className="mt-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-wood"><Icon size={19} weight="thin" aria-hidden="true" />{tag}</p><h3 className="mt-3 font-moderustic text-2xl font-medium">{title}</h3><p className="mt-3 text-sm leading-7 text-muted">{text}</p><Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">Подробнее<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </article>)}
        </div>
      </section>

      <section aria-labelledby="holiday-comfort-title" className="mx-auto max-w-[1400px] px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="grid overflow-hidden rounded-[2rem] border border-line bg-soft lg:grid-cols-2">
          <div className="relative min-h-80 lg:min-h-[540px]"><Image src="/images/shale/04.jpg" alt="Вечер в шале «Бук»: вид из тёплого дома на освещённый двор" fill quality={75} sizes="(min-width: 1400px) 680px, (min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_58%]" /></div>
          <div className="p-7 sm:p-10 lg:p-12"><p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Всё для тёплого отдыха</p><h2 id="holiday-comfort-title" className="mt-4 font-moderustic text-3xl font-medium leading-tight sm:text-4xl">Праздник начинается<br />с ощущения дома</h2><ul className="mt-7 space-y-4 text-sm leading-7 text-muted">{['Отдельный дом со своей кухней и санузлом.', 'Отопление для комфортного зимнего проживания.', 'Личная терраса, двор и мангальная зона.', 'Постельное бельё, полотенца, Wi-Fi и парковка.'].map(text => <li key={text} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wood" />{text}</li>)}</ul><p className="mt-7 border-t border-line pt-5 text-sm leading-7 text-muted">СПА, питание и дополнительные услуги оплачиваются отдельно. Подробная комплектация — в карточке выбранного дома.</p></div>
        </div>
      </section>

      <section id="holiday-faq" aria-labelledby="holiday-faq-title" className="mx-auto max-w-[1400px] scroll-mt-44 px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Перед поездкой</p><h2 id="holiday-faq-title" className="mt-4 font-moderustic text-3xl font-medium leading-tight sm:text-4xl">Ответы на зимние вопросы</h2><p className="mt-5 max-w-sm text-sm leading-7 text-muted">Поможем выбрать дом и обсудить детали вашего отдыха.</p><Link href="#help" className="mt-5 inline-flex text-sm font-semibold text-accent underline underline-offset-4">Связаться с менеджером</Link></div><div className="space-y-3">{NEW_YEAR_FAQ.map(item => <details key={item.question} name="new-year-faq" className="group rounded-2xl border border-line bg-white px-5 py-5 sm:px-7"><summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-moderustic font-medium [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="text-xl leading-none text-wood transition group-open:rotate-45">+</span></summary><p className="mt-4 text-sm leading-7 text-muted">{item.answer}</p></details>)}<Link href="/otdyh-s-zhivotnymi" className="inline-flex pt-2 text-sm font-medium text-accent underline underline-offset-4">Условия отдыха с питомцами ↗</Link></div></div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 sm:px-6"><div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-line bg-soft px-6 py-7 sm:px-9"><div className="flex items-start gap-4"><Gift size={33} weight="thin" aria-hidden="true" className="shrink-0 text-wood" /><div><h2 className="font-moderustic text-xl font-medium sm:text-2xl">Подарите близким поездку в горы</h2><p className="mt-2 text-sm leading-6 text-muted">Сертификат от 10 000 ₽ · действует один год · электронный или печатный</p></div></div><Link href="/special-offers#gift-certificate" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-accent/40 px-6 py-3 text-sm font-semibold text-accent transition hover:bg-white">Выбрать сертификат<ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>
      <BookingAssistance />
    </main>
    <Footer />
  </div>;
}
