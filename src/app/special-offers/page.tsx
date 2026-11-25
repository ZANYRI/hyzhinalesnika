import type { Metadata } from "next";
import Link from "next/link";
import { CalendarBlank, Gift } from "@phosphor-icons/react/dist/ssr";
import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import { ContentPage } from "@/components/ContentPage";
import { SplitMark } from "@/components/HomeSections";
import { GiftCertificateForm } from "@/components/GiftCertificateForm";
import {
  BIRTHDAY_MIN_NIGHTS, BIRTHDAY_WINDOW_DAYS, DISCOUNT_PERCENT,
  LONG_STAY_MIN_NIGHTS,
} from "@/data/special-offers";

export const metadata: Metadata = withSocialMetadata({
  title: "Специальные предложения | Хижина лесника",
  description: `Скидки ${DISCOUNT_PERCENT}% ко дню рождения и на отдых от ${LONG_STAY_MIN_NIGHTS} ночей в Архызе. Подарочные сертификаты от 10 000 ₽ на один год: электронные и печатные. Скидки не суммируются.`,
  alternates: { canonical: "/special-offers" },
});

export default function OffersPage() {
  return <>
    <PageStructuredData metadata={metadata} />
    <ContentPage title="Специальные предложения" eyebrow="Больше поводов для отдыха" description="Отметьте день рождения в лесу, останьтесь подольше или подарите близким поездку в Архыз.">
      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="birthday-offer" className="flex flex-col rounded-3xl border border-line bg-soft p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wood">К особенной дате</p>
            <Gift size={36} weight="thin" className="shrink-0 text-accent" aria-hidden="true" />
          </div>
          <p className="mt-8 font-moderustic text-6xl font-medium tracking-tight text-accent sm:text-7xl">−{DISCOUNT_PERCENT}%</p>
          <h2 id="birthday-offer" className="mt-4 font-moderustic text-2xl font-semibold sm:text-3xl">На день рождения</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">Подарите себе праздник в буковом лесу. Скидка {DISCOUNT_PERCENT}% действует на проживание в доме именинника при бронировании от {BIRTHDAY_MIN_NIGHTS} ночей.</p>
          <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">День рождения должен приходиться на период за {BIRTHDAY_WINDOW_DAYS} дней до или после вашего заезда. Скидка рассчитывается без учёта дополнительных услуг. Подтверждение даты праздника уточните при бронировании.</p>
        </section>
        <section aria-labelledby="long-stay-offer" className="flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-wood">Больше времени у гор</p>
            <CalendarBlank size={36} weight="thin" className="shrink-0 text-accent" aria-hidden="true" />
          </div>
          <p className="mt-8 font-moderustic text-6xl font-medium tracking-tight text-accent sm:text-7xl">−{DISCOUNT_PERCENT}%</p>
          <h2 id="long-stay-offer" className="mt-4 font-moderustic text-2xl font-semibold sm:text-3xl">На отдых от {LONG_STAY_MIN_NIGHTS} ночей</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">Останьтесь подольше: успейте погулять по лесу, увидеть горы и провести тихие вечера у костра. При проживании от {LONG_STAY_MIN_NIGHTS} ночей предоставляем скидку {DISCOUNT_PERCENT}% на проживание.</p>
          <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">Сообщите менеджеру о выбранном предложении при бронировании, чтобы подтвердить расчёт стоимости отдыха.</p>
        </section>
      </div>
      <aside aria-label="Условия скидок" className="mt-5 flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink">Скидки не суммируются</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">При наличии двух оснований применяется одна скидка {DISCOUNT_PERCENT}%. Уточните предложение у менеджера до подтверждения бронирования.</p>
        </div>
        <Link href="/booking" className="inline-flex shrink-0 items-center justify-center rounded-full bg-action px-6 py-3 text-sm font-semibold text-on-action transition hover:bg-action-hover">Проверить даты</Link>
      </aside>

      <section id="gift-certificate" aria-labelledby="gift-certificate-title" className="mt-12 scroll-mt-28 lg:mt-20">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <p className="section-eyebrow text-xs uppercase tracking-[0.16em]">Подарок с впечатлениями</p>
          <h2 id="gift-certificate-title" className="mt-4 font-moderustic text-3xl font-medium leading-tight sm:text-4xl">Соберите подарок<br />с видом на горы</h2>
          <p className="mt-5 leading-relaxed text-muted">Выберите оформление, добавьте тёплые слова и подарите близким отдых в «Хижине лесника».</p>
        </div>
        <GiftCertificateForm />
      </section>

      <section id="split" className="mt-12 scroll-mt-28 rounded-3xl border border-line bg-surface p-6 text-ink sm:p-9">
        <SplitMark />
        <h2 className="mt-5 font-moderustic text-2xl font-semibold sm:text-3xl">Удобная оплата отдыха частями</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">Можно оформить оплату проживания через Яндекс Сплит. Доступный срок, график платежей и условия уточняйте при бронировании.</p>
        <Link href="/split" className="mt-6 inline-flex text-sm font-semibold text-accent underline underline-offset-4">Подробнее о Яндекс Сплит ↗</Link>
      </section>
    </ContentPage>
  </>;
}
