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
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1100px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-[#a8b9ae]"
        >
          <Link href="/" className="transition hover:text-[#d49a5a]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#f3f5f0]">Поиск</span>
        </nav>

        <Suspense
          fallback={
            <div className="mt-6 rounded-3xl border border-white/10 bg-[#102419] p-10 text-sm text-[#a8b9ae]">
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
