import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="/#booking" />
      <main className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <span className="font-moderustic text-sm font-bold uppercase tracking-[0.2em] text-[#d49a5a]">
          Ошибка 404
        </span>
        <h1 className="mt-3 font-moderustic text-3xl font-bold tracking-tight text-[#f3f5f0] sm:text-4xl">
          Страница не найдена
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#a8b9ae] sm:text-base">
          Возможно, ссылка устарела или страница была перемещена. Выберите
          подходящий дом на главной странице базы отдыха «Хижина лесника».
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-8 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
        >
          Вернуться на главную
        </Link>
      </main>
      <Footer />
    </div>
  );
}
