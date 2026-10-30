import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = {
  title: 'Поиск по сайту | База отдыха "Хижина лесника"',
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm"
        >
          <Link href="/" className="underline hover:text-[#dbd0bf]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-white/95">Поиск</span>
        </nav>

        <Suspense
          fallback={
            <div className="mt-6 rounded-2xl bg-white p-10 text-[#444]">
              Загрузка поиска...
            </div>
          }
        >
          <SearchClient />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
