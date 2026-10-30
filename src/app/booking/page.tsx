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
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="#booking" />

      <main className="mx-auto max-w-[1400px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#a8b9ae]"
        >
          <Link href="/" className="transition hover:text-[#d49a5a]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#f3f5f0]">Онлайн-бронирование</span>
        </nav>

        <div className="mx-auto mt-5 max-w-2xl text-center">
          <h1 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
            Онлайн-бронирование домов
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
            Выберите даты заезда и выезда прямо в календаре Контур.Отель. При
            бронировании от 4 суток действует скидка 5%.
          </p>
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
