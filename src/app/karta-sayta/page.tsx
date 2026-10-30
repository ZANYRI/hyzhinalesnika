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
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-[#a8b9ae]"
        >
          <Link href="/" className="transition hover:text-[#d49a5a]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#f3f5f0]">Карта сайта</span>
        </nav>

        <div className="mt-6">
          <h1 className="font-moderustic text-3xl font-bold tracking-tight text-[#f3f5f0] sm:text-4xl">
            Карта сайта
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <section className="rounded-3xl border border-white/10 bg-[#102419] p-6">
              <h2 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                Основные разделы
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#d6e0d9]">
                <li>
                  <Link href="/" className="transition hover:text-[#d49a5a]">
                    Главная страница
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="transition hover:text-[#d49a5a]"
                  >
                    Онлайн-бронирование
                  </Link>
                </li>
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[#d49a5a]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="transition hover:text-[#d49a5a]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#102419] p-6">
              <h2 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                Статьи и маршруты
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#d6e0d9]">
                <li>
                  <Link
                    href="/putevoditeli-marshruty"
                    className="transition hover:text-[#d49a5a]"
                  >
                    Путеводители / маршруты
                  </Link>
                </li>
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={post.href}
                      className="transition hover:text-[#d49a5a]"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#102419] p-6">
              <h2 className="font-moderustic text-lg font-bold text-[#d49a5a]">
                Правовая информация
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[#d6e0d9]">
                <li>
                  <Link
                    href="/oferta"
                    className="transition hover:text-[#d49a5a]"
                  >
                    Договор публичной оферты
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="transition hover:text-[#d49a5a]"
                  >
                    Политика обработки персональных данных
                  </Link>
                </li>
                <li>
                  <Link
                    href="/users/agreement"
                    className="transition hover:text-[#d49a5a]"
                  >
                    Пользовательское соглашение
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
