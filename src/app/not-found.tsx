import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="/#booking" />
      <main className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-great-vibes text-6xl text-[#dbd0bf]">404</p>
        <h1 className="mt-2 font-moderustic text-3xl font-extrabold uppercase text-[#90754b] sm:text-4xl">
          Страница не найдена
        </h1>
        <p className="mt-4 max-w-md text-base text-white/80">
          Возможно, ссылка устарела или страница была перемещена. Выберите
          подходящий домик на главной странице.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-[56px] items-center justify-center rounded-xl bg-[#90754b] px-8 font-moderustic text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#a68859]"
        >
          Вернуться на главную
        </Link>
      </main>
      <Footer />
    </div>
  );
}
