import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1280px] px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm"
        >
          <Link href="/" className="underline hover:text-[#dbd0bf]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-white/95">Онлайн-бронирование</span>
        </nav>

        <div className="mt-6 text-center">
          <p className="font-great-vibes text-[44px] leading-none text-[#dbd0bf] sm:text-[52px]">
            Выберите удобные даты
          </p>
          <h1 className="mt-2 font-moderustic text-[28px] leading-tight font-extrabold uppercase text-[#90754b] sm:text-[40px]">
            ОНЛАЙН-БРОНИРОВАНИЕ ДОМИКОВ
          </h1>
        </div>

        {/* 1. Поиск и бронирование номеров — горизонтальный блок */}
        <KonturBookingWidget
          id="booking"
          variant="horizontalForm"
          containerId="WidgetHorizontalBlockId"
          className="mt-10 px-0 sm:px-0"
        />

        {/* 2. Календарь доступности (горизонтальный на 2 месяца для десктопа, вертикальный на 1 месяц для мобильных) */}
        <div className="mt-10 hidden md:block">
          <KonturBookingWidget
            id="availability-calendar-desktop"
            variant="calendarHorizontal"
            containerId="WidgetHorizontalAvailabilityCalendarId"
            className="px-0 sm:px-0"
          />
        </div>
        <div className="mt-10 md:hidden">
          <KonturBookingWidget
            id="availability-calendar-mobile"
            variant="calendarVertical"
            containerId="WidgetVerticalAvailabilityCalendarId"
            className="px-0 sm:px-0"
          />
        </div>

        {/* 3. Бронирование номеров — полный список домиков */}
        <KonturBookingWidget
          id="rooms-list"
          variant="roomsList"
          containerId="WidgetRoomsListId"
          className="mt-10 px-0 sm:px-0"
        />
      </main>

      <Footer />
    </div>
  );
}
