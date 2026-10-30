import type { Metadata } from "next";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/site";
import { BLOG_POSTS } from "@/data/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: 'Карта сайта | База отдыха "Хижина лесника"',
  alternates: {
    canonical: "/karta-sayta",
  },
};

export default function KartaSaytaPage() {
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
          <span className="text-white/95">Карта сайта</span>
        </nav>

        <div className="mt-6 rounded-2xl bg-white p-6 text-[#232323] shadow-lg sm:p-10">
          <h1 className="font-moderustic text-2xl font-extrabold text-[#0e2618] sm:text-3xl">
            Карта сайта
          </h1>

          <div className="mt-6 space-y-6">
            <div>
              <h2 className="font-moderustic text-lg font-bold text-[#90754b]">
                Основные разделы
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                <li>
                  <Link
                    href="/"
                    className="text-[#396448] underline hover:text-[#90754b]"
                  >
                    Главная страница
                  </Link>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#396448] underline hover:text-[#90754b]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[#396448] underline hover:text-[#90754b]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-moderustic text-lg font-bold text-[#90754b]">
                Статьи и маршруты
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                <li>
                  <Link
                    href="/putevoditeli-marshruty"
                    className="text-[#396448] underline hover:text-[#90754b]"
                  >
                    Путеводители / маршруты
                  </Link>
                </li>
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={post.href}
                      className="text-[#396448] underline hover:text-[#90754b]"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-moderustic text-lg font-bold text-[#90754b]">
                Правовая информация
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base">
                <li>
                  <Link
                    href="/oferta"
                    className="text-[#396448] underline hover:text-[#90754b]"
                  >
                    Договор публичной оферты
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#396448] underline hover:text-[#90754b]"
                  >
                    Политика обработки персональных данных
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/agreement"
                    className="text-[#396448] underline hover:text-[#90754b]"
                  >
                    Пользовательское соглашение
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
