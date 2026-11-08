"use client";

import Image from "next/image";

import React, { useState } from "react";
import Link from "next/link";
import { List, PhoneCall, X } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import { CallbackModal } from "./CallbackModal";

interface HeaderProps {
  variant?: "hero" | "inner";
  bookingAnchor?: string;
}

const HEADER_LINKS = [
  { label: "Дома", target: "/#cabins" },
  { label: "Чем заняться", target: "/#sez1" },
  { label: "СПА и релакс", target: "/spa" },
  { label: "Питание", target: "/dining" },
  { label: "Специальные предложения", target: "/special-offers" },
  { label: "Новости", target: "/news" },
  { label: "Контакты", target: "/#contacts" },
] as const;

export function Header({ variant = "inner" }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 w-full border-b border-line bg-white shadow-[0_3px_18px_rgba(24,47,36,0.04)]">
        <header data-variant={variant} className="mx-auto flex h-[80px] w-full max-w-[1800px] items-center justify-between gap-x-3 gap-y-3 px-4 sm:h-[84px] sm:px-6 md:h-auto md:flex-wrap md:py-4 xl:h-[84px] xl:flex-nowrap xl:py-0">
          {/* Brand Wordmark Logo */}
          <Link
            href="/"
            prefetch={false}
            aria-label='База отдыха "Хижина лесника" – на главную'
            className="group flex shrink-0 items-center pl-1 focus:outline-none"
          >
            <Image
              src="/images/brand/logo.png"
              alt='База отдыха "Хижина лесника"'
              width={450}
              height={132}
              className="h-11 w-[150px] object-cover transition duration-200 group-hover:opacity-80 sm:h-12 sm:w-[164px] 2xl:h-14 2xl:w-[191px]"
            />
          </Link>

          {/* Single-line Desktop Navigation */}
          <nav
            aria-label="Основное меню"
            className="order-3 hidden w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 md:flex xl:order-none xl:w-auto xl:flex-nowrap xl:gap-2 2xl:gap-3"
          >
            {HEADER_LINKS.map((item) => (
              <Link key={item.target} href={item.target} prefetch={item.target.startsWith("/#") ? false : "auto"} onClick={() => setDrawerOpen(false)}
                className="whitespace-nowrap text-xs font-medium 2xl:text-[13.5px] text-muted transition hover:text-accent cursor-pointer"
              >
                {item.label}</Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={SITE_CONFIG.phoneHref}
              className="hidden whitespace-nowrap text-sm font-semibold text-ink transition hover:text-accent min-[1700px]:inline-block"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              aria-label="Обратный звонок"
              title="Обратный звонок"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-accent transition hover:border-accent/60 active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall size={18} />
            </button>

            <Link
              href="/booking"
              onClick={() => setDrawerOpen(false)}
              className="hidden min-h-11 items-center whitespace-nowrap rounded-xl bg-action px-4 py-2.5 text-xs 2xl:px-5 2xl:text-[13px] font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] sm:inline-flex cursor-pointer"
            >
              Проверить даты и забронировать
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Открыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-accent transition hover:border-accent md:hidden cursor-pointer"
            >
              <List size={20} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Navigation Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm md:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-line bg-canvas p-6 text-ink shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line pb-5">
              <Link href="/" prefetch={false} onClick={() => setDrawerOpen(false)} aria-label='База отдыха "Хижина лесника" – на главную'>
              <Image
                src="/images/brand/logo.png"
                alt='База отдыха "Хижина лесника"'
                width={450}
                height={132}
                className="h-11 w-[150px] object-cover"
              />
              </Link>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Закрыть меню"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-soft text-muted hover:text-ink cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {HEADER_LINKS.map((item) => (
                <Link key={item.target} href={item.target} prefetch={item.target.startsWith("/#") ? false : "auto"} onClick={() => setDrawerOpen(false)}
                  className="rounded-xl px-3 py-3 text-left font-moderustic text-base font-medium text-ink transition hover:bg-surface hover:text-accent cursor-pointer"
                >
                  {item.label}</Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4 border-t border-line pt-5">
              <div>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="block font-moderustic text-lg font-bold text-ink"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <span className="text-xs text-muted">
                  Ежедневно · отдел бронирования
                </span>
              </div>

              <Link
                href="/booking"
                onClick={() => setDrawerOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-full bg-action text-sm font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] cursor-pointer"
              >
                Проверить даты и забронировать
              </Link>
            </div>
          </div>
        </div>
      )}

      <CallbackModal
        open={callbackOpen}
        onClose={() => setCallbackOpen(false)}
      />
    </>
  );
}
