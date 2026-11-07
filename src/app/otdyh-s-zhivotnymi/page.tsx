import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { PageStructuredData } from "@/components/StructuredData";
import { CABIN_LIST } from "@/data/cabins";
import { PET_FAQ } from "@/data/pets";
import { SITE_CONFIG } from "@/data/site";
import { withSocialMetadata } from "@/lib/social-metadata";

export const metadata: Metadata = withSocialMetadata({
  title: "Отдых с животными в Архызе | Хижина лесника",
  description: "Проживание с кошками и собаками в трёх домах «Хижины лесника» в Архызе. Выбор дома, условия размещения питомцев, доплата и подарочный набор «Четыре лапы».",
  alternates: { canonical: "/otdyh-s-zhivotnymi" },
});

export default function PetsPage() {
  return <>
    <PageStructuredData metadata={metadata} />
    <ContentPage title="Отдых с животными в Архызе" eyebrow="Вместе с питомцем" description="В «Хижину лесника» можно приехать с кошкой или собакой. Выберите один из трёх отдельных домов в буковом лесу и согласуйте размещение питомца при бронировании.">
      <section aria-labelledby="pet-policy" className="rounded-3xl border border-white/10 bg-[#173024] p-6 sm:p-9">
        <h2 id="pet-policy" className="font-moderustic text-2xl font-bold sm:text-3xl">{PET_FAQ.question}</h2>
        <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[#bdcfc3] sm:text-base">{PET_FAQ.answer}</p>
      </section>

      <section aria-labelledby="pet-cabins" className="mt-14 sm:mt-20">
        <h2 id="pet-cabins" className="font-moderustic text-3xl font-bold">Выберите дом для поездки с питомцем</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[#a8b9ae]">Во всех домах есть собственная кухня и санузел, терраса и парковка. Посмотрите планировку и количество спальных мест, чтобы выбрать подходящий вариант для вашей семьи или компании.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CABIN_LIST.map(cabin => <Link key={cabin.id} href={cabin.slug} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#173024] transition hover:border-[#d49a5a]/50">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image fill quality={60} loading="lazy" sizes="(min-width: 1400px) 436px, (min-width: 1024px) calc((100vw - 88px) / 3), (min-width: 640px) calc((100vw - 68px) / 2), calc(100vw - 32px)" src={cabin.cardImage} alt={cabin.cardImageAlt} className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-moderustic text-2xl font-bold">{cabin.cardTitle}</h3>
              <p className="mt-3 text-sm text-[#e6c7a0]">{cabin.cardGuests} · {cabin.cardArea}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#bdcfc3]">{cabin.cardSubtitle}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-[#e6c7a0]">Фото и планировка дома ↗</span>
            </div>
          </Link>)}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-[#d49a5a]/30 bg-[#173024] p-6 sm:p-9">
        <h2 className="font-moderustic text-2xl font-bold sm:text-3xl">Как спланировать поездку с животным</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[#bdcfc3]">При бронировании сообщите, с каким питомцем вы приезжаете. Укажите его вес и рост в холке, чтобы уточнить категорию доплаты. Условия размещения согласуйте до поездки.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/booking" className="inline-flex items-center rounded-full bg-[#d49a5a] px-6 py-3 text-sm font-semibold text-[#102219]">Проверить даты и забронировать</Link>
          <a href={SITE_CONFIG.phoneHref} className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold">Уточнить условия: {SITE_CONFIG.phoneDisplay}</a>
        </div>
      </section>
    </ContentPage>
  </>;
}
