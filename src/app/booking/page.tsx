import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KonturBookingWidget } from "@/components/KonturBookingWidget";

export const metadata: Metadata = {
  title: 'Онлайн-бронирование домиков в Архызе | База отдыха "Хижина лесника"',
  description:
    'Забронируйте домик онлайн на базе отдыха "Хижина лесника" в Архызе через официальный модуль Контур.Отель. Актуальные цены и календарь свободных дат.',
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1400px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
            Добро пожаловать на базу отдыха «Хижина лесника»
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
            Бронирование у нас на сайте — это быстро, легко и без дополнительных комиссий! Самый актуальный календарь здесь! Бронируйте здесь и сейчас! Мы будем рады помочь Вам с выбором дома, дат отдыха и бронированием! Наш телефон <a href="tel:+79280201001" className="whitespace-nowrap text-[#d49a5a] underline">+7 (928) 020-10-01</a>.
          </p>
        </div>

        <div role="note" aria-label="Обозначения доступности дат в календаре" className="mx-auto mt-7 flex max-w-[910px] flex-wrap justify-center gap-x-6 gap-y-3 text-xs leading-relaxed text-[#c3d0c7] sm:text-sm">
          <p className="flex items-center gap-2.5"><span aria-hidden="true" className="h-4 w-4 shrink-0 rounded border border-[#d49a5a] bg-[#d49a5a]" /><span>Жёлтая подсветка — есть свободные места</span></p>
          <p className="flex items-center gap-2.5"><span aria-hidden="true" className="h-4 w-4 shrink-0 rounded border border-white/30 bg-[#102419]" /><span>Без подсветки — свободных мест нет</span></p>
        </div>

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
  );
}
