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
      <div className="sticky top-3 z-40 mx-auto w-full max-w-[1800px] px-3 sm:px-6">
        <header data-variant={variant} className="forest-glass flex h-[68px] w-full items-center justify-between gap-x-3 gap-y-3 rounded-full px-4 sm:h-[72px] sm:px-6 md:h-auto md:flex-wrap md:rounded-[2rem] md:py-3 xl:h-[72px] xl:flex-nowrap xl:rounded-full xl:py-0">
          {/* Brand Wordmark Logo */}
          <Link
            href="/"
            aria-label='База отдыха "Хижина лесника" – на главную'
            className="group flex shrink-0 items-center pl-1 focus:outline-none"
          >
            <Image
              src="/images/brand/logo-wordmark-light.png"
              alt='База отдыха "Хижина лесника"'
              width={450}
              height={132}
              className="h-10 w-auto object-contain transition duration-200 group-hover:scale-[1.02] group-hover:opacity-95 sm:h-[44px] 2xl:h-[50px]"
            />
          </Link>

          {/* Single-line Desktop Navigation */}
          <nav
            aria-label="Основное меню"
            className="order-3 hidden w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 md:flex xl:order-none xl:w-auto xl:flex-nowrap xl:gap-2 2xl:gap-3"
          >
            {HEADER_LINKS.map((item) => (
              <Link key={item.target} href={item.target} onClick={() => setDrawerOpen(false)}
                className="whitespace-nowrap text-xs font-medium 2xl:text-[13.5px] text-[#d6e0d9] transition hover:text-[#d49a5a] cursor-pointer"
              >
                {item.label}</Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={SITE_CONFIG.phoneHref}
              className="hidden whitespace-nowrap text-sm font-semibold text-[#f3f5f0] transition hover:text-[#d49a5a] min-[1700px]:inline-block"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>

            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              aria-label="Обратный звонок"
              title="Обратный звонок"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a] active:scale-[0.98] cursor-pointer"
            >
              <PhoneCall size={18} />
            </button>

            <Link
              href="/booking"
              onClick={() => setDrawerOpen(false)}
              className="hidden whitespace-nowrap rounded-full bg-[#d49a5a] px-4 py-2.5 text-xs 2xl:px-5 2xl:text-[13px] font-semibold text-[#102219] transition hover:bg-[#e0ab6e] active:scale-[0.98] sm:inline-flex cursor-pointer"
            >
              Проверить даты и забронировать
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Открыть меню"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f3f5f0] transition hover:border-white/30 md:hidden cursor-pointer"
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
            className="ml-auto flex h-full w-[86%] max-w-sm flex-col border-l border-white/10 bg-[#102219] p-6 text-[#f3f5f0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <Link href="/" onClick={() => setDrawerOpen(false)} aria-label='База отдыха "Хижина лесника" – на главную'>
              <Image
                src="/images/brand/logo-wordmark-light.png"
                alt='База отдыха "Хижина лесника"'
                width={450}
                height={132}
                className="h-9 w-auto object-contain"
              />
              </Link>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Закрыть меню"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[#a8b9ae] hover:text-[#f3f5f0] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {HEADER_LINKS.map((item) => (
                <Link key={item.target} href={item.target} onClick={() => setDrawerOpen(false)}
                  className="rounded-xl px-3 py-3 text-left font-moderustic text-base font-medium text-[#f3f5f0] transition hover:bg-[#173024] hover:text-[#d49a5a] cursor-pointer"
                >
                  {item.label}</Link>
              ))}
            </nav>

            <div className="mt-auto space-y-4 border-t border-white/10 pt-5">
              <div>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="block font-moderustic text-lg font-bold text-[#f3f5f0]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <span className="text-xs text-[#a8b9ae]">
                  Ежедневно · отдел бронирования
                </span>
              </div>

              <Link
                href="/booking"
                onClick={() => setDrawerOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#d49a5a] text-sm font-semibold text-[#102219] transition hover:bg-[#e0ab6e] active:scale-[0.98] cursor-pointer"
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
