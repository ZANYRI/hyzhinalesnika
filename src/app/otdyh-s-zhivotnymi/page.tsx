import type { Metadata } from "next";
import Image from "@/components/SeasonalImage";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { PageStructuredData } from "@/components/StructuredData";
import { CABIN_LIST } from "@/data/cabins";
import { PET_FAQ } from "@/data/pets";
import { SITE_CONFIG } from "@/data/site";
import { withSocialMetadata } from "@/lib/social-metadata";
import { Check } from "@phosphor-icons/react/dist/ssr";

const welcomeKit = [
  "Миска",
  "Лакомство",
  "Салфетки для лап",
  "Пакеты для уборки",
  "Пелёнка",
  "Игрушка",
];

export const metadata: Metadata = withSocialMetadata({
  title: "Отдых с животными в Архызе | Хижина лесника",
  description: "Проживание с кошками и собаками в трёх домах «Хижины лесника» в Архызе. Выбор дома, условия размещения питомцев, доплата и подарочный набор «Четыре лапы».",
  alternates: { canonical: "/otdyh-s-zhivotnymi" },
});

export default function PetsPage() {
  return <>
    <PageStructuredData metadata={metadata} />
    <ContentPage title="Отдых с животными в Архызе" eyebrow="Вместе с питомцем" description="В «Хижину лесника» можно приехать с кошкой или собакой. Выберите один из трёх отдельных домов в буковом лесу и согласуйте размещение питомца при бронировании.">
      <section aria-labelledby="pet-welcome-kit" className="overflow-hidden rounded-3xl border border-line bg-soft p-5 sm:p-9">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
          <div className="lg:py-3">
            <a href="https://petfriendly.4lapy.ru/" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl bg-white p-3">
              <Image src="/images/pets/four-paws-logo.webp" width={729} height={112} alt="Четыре Лапы — партнёр приветственного набора" className="h-auto w-52 sm:w-60" />
            </a>
            <p className="section-eyebrow mt-8 text-xs uppercase tracking-[0.16em]">Маленький подарок к большой поездке</p>
            <h2 id="pet-welcome-kit" className="mt-4 max-w-xl font-moderustic text-3xl font-semibold leading-tight sm:text-4xl">Приветственный набор для вашего питомца</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">В «Хижине лесника» рады всей семье. Вместе с сетью зоомагазинов «Четыре Лапы» мы подготовили бесплатный набор для четвероногих гостей — с полезными мелочами для отдыха и прогулок.</p>
            <h3 className="mt-8 font-moderustic text-xl font-semibold text-ink">Что входит в набор</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {welcomeKit.map(item => <li key={item} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink">
                <Check aria-hidden="true" size={18} weight="bold" className="shrink-0 text-accent" />
                {item}
              </li>)}
            </ul>
            <div className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-muted">
              <p>Если едете с кошкой, уточните состав приветственного набора при бронировании.</p>
              <p className="mt-3">Набор предоставляется бесплатно. Размещение питомца оплачивается отдельно по условиям ниже.</p>
            </div>
            <a href="https://petfriendly.4lapy.ru/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-sm font-semibold text-accent underline underline-offset-4">О проекте «Пет-френдли территория» ↗</a>
          </div>
          <div className="grid gap-3">
            <figure className="overflow-hidden rounded-2xl border border-line bg-white">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image fill quality={75} loading="lazy" src="/images/pets/dogs-with-welcome-kit.webp" alt="Две собаки в лесу рядом с приветственным набором «Четыре Лапы»" sizes="(min-width: 1400px) 550px, (min-width: 1024px) 42vw, (min-width: 640px) calc(100vw - 120px), calc(100vw - 74px)" className="object-cover object-[50%_55%]" />
              </div>
              <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted">Наши четвероногие гости и подарок от «Четыре Лапы».</figcaption>
            </figure>
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <Image fill quality={75} loading="lazy" src="/images/pets/four-paws-welcome-kit.webp" alt="Пакет «Четыре Лапы» с приветственным набором для питомца" sizes="(min-width: 1400px) 270px, (min-width: 1024px) 21vw, (min-width: 640px) calc((100vw - 134px) / 2), calc((100vw - 88px) / 2)" className="object-cover object-[50%_55%]" />
                </div>
                <figcaption className="px-3 py-3 text-xs leading-relaxed text-muted">Подарок к вашему приезду.</figcaption>
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-square overflow-hidden">
                  <Image fill quality={75} loading="lazy" src="/images/pets/dog-on-cabin-terrace.webp" alt="Собака на террасе дома в «Хижине лесника»" sizes="(min-width: 1400px) 270px, (min-width: 1024px) 21vw, (min-width: 640px) calc((100vw - 134px) / 2), calc((100vw - 88px) / 2)" className="object-cover object-bottom" />
                </div>
                <figcaption className="px-3 py-3 text-xs leading-relaxed text-muted">На отдых — вместе с питомцем.</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="pet-policy" className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:mt-10 sm:p-9">
        <h2 id="pet-policy" className="font-moderustic text-2xl font-bold sm:text-3xl">{PET_FAQ.question}</h2>
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted sm:text-base">{PET_FAQ.answer}</p>
      </section>

      <section aria-labelledby="pet-cabins" className="mt-14 sm:mt-20">
        <h2 id="pet-cabins" className="font-moderustic text-3xl font-bold">Выберите дом для поездки с питомцем</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">Во всех домах есть собственная кухня и санузел, терраса и парковка. Посмотрите планировку и количество спальных мест, чтобы выбрать подходящий вариант для вашей семьи или компании.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CABIN_LIST.map(cabin => <Link key={cabin.id} href={cabin.slug} className="group overflow-hidden rounded-3xl border border-line bg-surface transition hover:border-accent/50">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image fill quality={60} loading="lazy" sizes="(min-width: 1400px) 436px, (min-width: 1024px) calc((100vw - 88px) / 3), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 32px)" src={cabin.cardImage} alt={cabin.cardImageAlt} className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-moderustic text-2xl font-bold">{cabin.cardTitle}</h3>
              <p className="mt-3 text-sm text-accent">{cabin.cardGuests} · {cabin.cardArea}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{cabin.cardSubtitle}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-accent">Фото и планировка дома ↗</span>
            </div>
          </Link>)}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-accent/30 bg-surface p-6 sm:p-9">
        <h2 className="font-moderustic text-2xl font-bold sm:text-3xl">Как спланировать поездку с животным</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">При бронировании сообщите, с каким питомцем вы приезжаете. Укажите его вес и рост в холке, чтобы уточнить категорию доплаты. Условия размещения согласуйте до поездки.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/booking" className="inline-flex items-center rounded-full bg-action px-6 py-3 text-sm font-semibold text-on-action">Проверить даты и забронировать</Link>
          <a href={SITE_CONFIG.phoneHref} className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-semibold">Уточнить условия: {SITE_CONFIG.phoneDisplay}</a>
        </div>
      </section>
    </ContentPage>
  </>;
}
