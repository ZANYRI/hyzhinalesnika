import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  EnvelopeSimple,
  MapPin,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import { HospitalityAwards } from "./HospitalityAwards";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas pt-16 pb-12 text-ink">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand & Messengers */}
          <div className="min-w-0 md:col-span-5">
            <Link href="/" prefetch={false} aria-label='База отдыха "Хижина лесника" – на главную' className="inline-flex rounded-xl bg-white px-3 py-2 transition hover:opacity-85">
              <Image
                src="/images/brand/logo.png"
                alt='База отдыха "Хижина лесника"'
                width={450}
                height={132}
                className="h-16 w-[218px] max-w-full object-cover sm:h-20 sm:w-[273px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Три приватных дома со своей огороженной территорией, мангальной и
              костровой зоной, панорамными окнами на горы и быстрым Wi-Fi.
            </p>

            <SocialLinks className="mt-6 flex flex-wrap gap-3" />
          </div>

          {/* Navigation */}
          <div className="min-w-0 md:col-span-3">
            <p className="font-moderustic text-sm font-bold text-ink">
              Разделы
            </p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 transition hover:text-accent-hover"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      prefetch={item.href.startsWith("/#") ? false : "auto"}
                      className="transition hover:text-accent-hover"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="transition hover:text-accent-hover"
                >
                  Онлайн-календарь дат
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="min-w-0 md:col-span-4">
            <p className="font-moderustic text-sm font-bold text-ink">
              Контакты и координаты
            </p>

            <div className="mt-4 space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-accent"
                />
                <div>
                  <span className="block text-ink">
                    {SITE_CONFIG.address}
                  </span>
                  <span className="text-xs text-muted">
                    43.568904, 41.305983 · 5 мин от посёлка Архыз
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-accent" />
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="font-semibold text-ink transition hover:text-accent-hover"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <EnvelopeSimple
                  size={18}
                  className="shrink-0 text-accent"
                />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-muted transition hover:text-accent-hover"
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
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 text-xs text-muted lg:flex-row lg:items-center">
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
                className="text-accent underline decoration-accent/50 hover:text-accent-hover"
              >
                {SITE_CONFIG.registryNumber}
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <Link
              href="/oferta"
              className="transition hover:text-ink"
            >
              Договор оферты
            </Link>
            <Link
              href="/privacy-policy"
              className="transition hover:text-ink"
            >
              Политика обработки персональных данных
            </Link>
            <Link
              href="/users/agreement"
              className="transition hover:text-ink"
            >
              Пользовательское соглашение
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-ink">Использование cookie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
