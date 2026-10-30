import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  EnvelopeSimple,
  MapPin,
  Phone,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { HospitalityAwards } from "./HospitalityAwards";
import { CabinTreeEmoji } from "./CabinTreeEmoji";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#08140d] pt-16 pb-12 text-[#f3f5f0]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand & Messengers */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[#f3f5f0] p-1.5">
                <img
                  src="/images/brand/logo.png"
                  alt='База отдыха "Хижина лесника"'
                  className="h-full w-full object-contain"
                />
              </span>
              <div>
                <p className="font-moderustic text-xl font-bold tracking-tight text-[#f3f5f0]">
                  Хижина лесника
                </p>
                <p className="text-xs text-[#a8b9ae]">
                  Уединённые дома в буковом лесу Архыза
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#a8b9ae]">
              Три приватных дома со своей огороженной территорией, мангальной и
              костровой зоной, панорамными окнами на горы и быстрым Wi-Fi.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={SITE_CONFIG.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/12 bg-[#102419] px-4 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a]"
              >
                <WhatsappLogo size={18} />
                <span>WhatsApp</span>
              </a>

              <a
                href={SITE_CONFIG.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/12 bg-[#102419] px-4 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a]"
              >
                <TelegramLogo size={18} />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="font-moderustic text-sm font-bold text-[#f3f5f0]">
              Дома и разделы
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[#a8b9ae]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition hover:text-[#d49a5a]"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition hover:text-[#d49a5a]"
                    >
                      {item.cabinId && (
                        <CabinTreeEmoji id={item.cabinId} className="mr-1.5" />
                      )}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="transition hover:text-[#d49a5a]"
                >
                  Онлайн-календарь дат
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="md:col-span-4">
            <p className="font-moderustic text-sm font-bold text-[#f3f5f0]">
              Контакты и координаты
            </p>

            <div className="mt-4 space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#d49a5a]"
                />
                <div>
                  <span className="block text-[#f3f5f0]">
                    {SITE_CONFIG.address}
                  </span>
                  <span className="text-xs text-[#a8b9ae]">
                    43.568904, 41.305983 · 5 мин от посёлка Архыз
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-[#d49a5a]" />
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="font-semibold text-[#f3f5f0] transition hover:text-[#d49a5a]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <EnvelopeSimple
                  size={18}
                  className="shrink-0 text-[#d49a5a]"
                />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-[#a8b9ae] transition hover:text-[#d49a5a]"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <HospitalityAwards variant="compact" />
            </div>
          </div>
        </div>

        {/* Legal Bottom Strip */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-7 text-xs text-[#a8b9ae] lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span>{SITE_CONFIG.legalOwner}</span>
            <span>·</span>
            <span>{SITE_CONFIG.inn}</span>
            <span>·</span>
            <span>
              Реестровая запись:{" "}
              <a
                href={SITE_CONFIG.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d49a5a] underline decoration-[#d49a5a]/50 hover:text-[#e0ab6e]"
              >
                {SITE_CONFIG.registryNumber}
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <Link
              href="/oferta"
              className="transition hover:text-[#f3f5f0]"
            >
              Договор оферты
            </Link>
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#f3f5f0]"
            >
              Политика обработки персональных данных
            </Link>
            <Link
              href="/users/agreement"
              className="transition hover:text-[#f3f5f0]"
            >
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
