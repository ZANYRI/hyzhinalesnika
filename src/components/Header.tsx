"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { CloseIcon, HamburgerIcon, PhoneOutlineIcon } from "./Icons";
import { CallbackModal } from "./CallbackModal";

interface HeaderProps {
  variant?: "hero" | "inner";
  bookingAnchor?: string;
}

export function Header({
  variant = "inner",
  bookingAnchor = "#booking",
}: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  const isHero = variant === "hero";
  const row1 = NAV_ITEMS.filter((item) => item.row === 1);
  const row2 = NAV_ITEMS.filter((item) => item.row === 2);

  return (
    <>
      {/* Mobile floating hamburger button (exact top-right bronze square as on live site) */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Открыть меню"
        className="fixed top-3 right-3 z-40 flex h-14 w-14 items-center justify-center rounded-xl bg-[#90754b] text-white shadow-lg transition hover:bg-[#a68859] lg:hidden cursor-pointer"
      >
        <HamburgerIcon className="w-6 h-5" />
      </button>

      <header
        className={
          isHero
            ? "relative z-20 w-full px-5 pt-5 sm:px-8 sm:pt-7 lg:px-14 lg:pt-7"
            : "mx-auto mt-4 w-[calc(100%-24px)] max-w-[1392px] rounded-[22px] bg-[#f6f7f5] px-5 py-4 text-[#23220b] shadow-md sm:px-8 lg:px-14 lg:py-5"
        }
      >
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Logo rounded square */}
          <Link
            href="/"
            className="flex h-[108px] w-[118px] shrink-0 items-center justify-center rounded-[14px] bg-white p-2 shadow-xs transition hover:scale-[1.02]"
          >
            <img
              src="/images/brand/logo.png"
              alt='База отдыха "Хижина лесника"'
              className="h-auto w-full object-contain"
            />
          </Link>

          {/* Desktop 2-row Navigation */}
          <nav
            aria-label="Основное меню"
            className="hidden flex-1 flex-col justify-center px-4 lg:flex xl:px-8"
          >
            <div className="flex flex-wrap items-center gap-x-9 gap-y-2">
              {row1.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-moderustic text-[15.5px] font-normal transition ${
                    isHero
                      ? "text-white hover:text-[#dbd0bf]"
                      : "text-[#23220b] hover:text-[#90754b]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-9 gap-y-2">
              {row2.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-moderustic text-[15.5px] font-normal transition ${
                      isHero
                        ? "text-white hover:text-[#dbd0bf]"
                        : "text-[#23220b] hover:text-[#90754b]"
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`font-moderustic text-[15.5px] font-normal transition ${
                      isHero
                        ? "text-white hover:text-[#dbd0bf]"
                        : "text-[#23220b] hover:text-[#90754b]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </nav>

          {/* Right side: Phone block + Book CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                aria-label="Заказать обратный звонок"
                className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[11px] transition hover:scale-105 cursor-pointer ${
                  isHero
                    ? "bg-[#e8ebe6] text-[#5c5c5c]"
                    : "bg-white text-[#5c5c5c] shadow-xs"
                }`}
              >
                <PhoneOutlineIcon className="h-[19px] w-[19px]" />
              </button>
              <div className="text-left">
                <a
                  href={SITE_CONFIG.phoneHref}
                  className={`block font-moderustic text-[19px] leading-tight transition ${
                    isHero
                      ? "font-semibold text-white hover:text-[#dbd0bf]"
                      : "font-normal text-[#383314] hover:text-[#90754b]"
                  }`}
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <span
                  className={`block text-[13px] ${
                    isHero ? "text-white/75" : "text-[#6b6b60]"
                  }`}
                >
                  Отдел бронирования
                </span>
              </div>
            </div>

            {/* Book button (hidden on mobile hero where main CTA button is shown below, shown on sm/lg) */}
            <a
              href={bookingAnchor}
              className={`hidden sm:inline-flex h-[60px] items-center justify-center rounded-[11px] px-8 font-moderustic text-[13px] font-semibold uppercase tracking-wider transition ${
                isHero
                  ? "bg-[#fffaf0] text-[#4b4b4b] hover:bg-[#f2eadb]"
                  : "bg-[#396448] text-white hover:bg-[#2e533b]"
              }`}
            >
              ЗАБРОНИРОВАТЬ
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Navigation Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs lg:hidden"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="ml-auto flex h-full w-[84%] max-w-sm flex-col bg-[#0e2618] p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <span className="font-moderustic text-sm font-bold uppercase tracking-wider text-[#90754b]">
                Хижина лесника
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Закрыть меню"
                className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col space-y-4">
              {NAV_ITEMS.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDrawerOpen(false)}
                    className="font-moderustic text-base text-white/90 transition hover:text-[#dbd0bf]"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="font-moderustic text-base text-white/90 transition hover:text-[#dbd0bf]"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-auto border-t border-white/15 pt-5 space-y-4">
              <div>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="block font-moderustic text-lg font-semibold text-white"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
                <span className="text-xs text-white/65">
                  {SITE_CONFIG.address}
                </span>
              </div>
              <a
                href={bookingAnchor}
                onClick={() => setDrawerOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-[#90754b] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#a68859]"
              >
                Забронировать
              </a>
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
