import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";
import { SecurityDepositNote } from "@/components/SecurityDepositNote";

export const metadata: Metadata = withSocialMetadata({
  title: 'Онлайн-бронирование домиков в Архызе | База отдыха "Хижина лесника"',
  description:
    'Забронируйте домик онлайн на базе отдыха "Хижина лесника" в Архызе через официальный модуль Контур.Отель. Актуальные цены и календарь свободных дат.',
  alternates: {
    canonical: "/booking",
  },
});

export default function BookingPage() {
  return <><PageStructuredData metadata={metadata} />{(
    <div className="min-h-screen bg-canvas text-ink">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1400px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            Онлайн-бронирование домов в Архызе
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Бронирование у нас на сайте – это быстро, легко и без дополнительных комиссий! Самый актуальный календарь здесь! Бронируйте здесь и сейчас! Мы будем рады помочь Вам с выбором дома, дат отдыха и бронированием! Наш телефон <a href="tel:+79280201001" className="whitespace-nowrap text-accent underline">+7 (928) 020-10-01</a>.
          </p>
        </div>

        <div role="note" aria-label="Обозначения доступности дат в календаре" className="mx-auto mt-7 flex max-w-[910px] flex-wrap justify-center gap-x-6 gap-y-3 text-xs leading-relaxed text-muted sm:text-sm">
          <p className="flex items-center gap-2.5"><span aria-hidden="true" className="h-4 w-4 shrink-0 rounded border border-[#c6ac4d] bg-[#f4df8b]" /><span>Жёлтая подсветка – есть свободные места</span></p>
          <p className="flex items-center gap-2.5"><span aria-hidden="true" className="h-4 w-4 shrink-0 rounded border border-line bg-surface" /><span>Без подсветки – свободных мест нет</span></p>
        </div>

        <p className="mx-auto mt-3 max-w-[910px] text-center text-xs leading-relaxed text-muted sm:text-sm">
          Доступность выбранного периода и ограничения тарифа, включая минимальное число ночей, уточняются в модуле при проверке дат.
        </p>

        <SecurityDepositNote className="mx-auto mt-7 max-w-[910px] bg-surface text-muted" />

        {/* 1. Центрированный интерактивный календарь доступности */}
        <KonturBookingWidget
          id="booking"
          variant="calendarResponsive"
          interactiveCalendar
          className="mt-9 px-0 sm:px-0"
        />

        {/* 2. Полный список домов (выровнен по центру вровень с календарём) */}
        <KonturBookingWidget
          id="rooms-list"
          variant="roomsList"
          containerId="WidgetRoomsListId"
          className="mt-10 max-w-[910px] px-0 sm:px-0"
        />
      </main>

      <Footer />
    </div>
  )}</>;
}
