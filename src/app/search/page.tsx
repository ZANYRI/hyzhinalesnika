import { withSocialMetadata } from "@/lib/social-metadata";
import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchClient } from "@/components/SearchClient";

export const metadata: Metadata = withSocialMetadata({
  title: 'Поиск по сайту | База отдыха "Хижина лесника"',
  description: "Поиск домов, услуг и полезных материалов на сайте базы отдыха «Хижина лесника» в Архызе.",
  alternates: { canonical: "/search" },
  robots: {
    index: false,
    follow: true,
  },
});

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#102219] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1100px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">


        <Suspense
          fallback={
            <div className="mt-6 rounded-3xl border border-white/10 bg-[#173024] p-10 text-sm text-[#a8b9ae]">
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
