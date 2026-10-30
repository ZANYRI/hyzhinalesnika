import React from "react";
import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/data/site";
import {
  MailPencilIcon,
  MapPinIcon,
  PhoneOutlineIcon,
  TelegramIcon,
  WhatsappOutlineIcon,
} from "./Icons";

export function Footer() {
  return (
    <footer className="w-full bg-[#0e2618] pt-14 pb-12 text-white">
      <div className="mx-auto max-w-[1340px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-16">
          {/* Column 1: Brand + Messengers */}
          <div>
            <p className="font-mulish text-[20px] leading-snug font-normal uppercase text-[#90754b]">
              БАЗА ОТДЫХА &quot;ХИЖИНА
              <br />
              ЛЕСНИКА&quot;
            </p>
            <p className="mt-2.5 font-moderustic text-[13.5px] tracking-wide uppercase text-white/90">
              СНЯТЬ ДОМ В АРХЫЗЕ
            </p>

            <div className="mt-7 space-y-3.5">
              <a
                href={SITE_CONFIG.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[15px] text-white transition hover:text-[#dbd0bf]"
              >
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.02] text-white transition group-hover:border-[#90754b]">
                  <WhatsappOutlineIcon className="h-[19px] w-[19px]" />
                </span>
                <span className="font-moderustic">WhatsApp</span>
              </a>

              <a
                href={SITE_CONFIG.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 text-[15px] text-white transition hover:text-[#dbd0bf]"
              >
                <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.02] text-white transition group-hover:border-[#90754b]">
                  <TelegramIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="font-moderustic">Telegram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:pl-4">
            <ul className="space-y-3.5 font-moderustic text-[14.5px] leading-snug text-white">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-[#dbd0bf]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition hover:text-[#dbd0bf]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Address, Email, Phone */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.02] text-white">
                <MapPinIcon className="h-5 w-4" />
              </span>
              <div>
                <span className="block text-[13px] text-white/50">Адрес</span>
                <span className="mt-0.5 block font-moderustic text-[14.5px] text-white">
                  {SITE_CONFIG.addressShort}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.02] text-white">
                <MailPencilIcon className="h-5 w-4" />
              </span>
              <div>
                <span className="block text-[13px] text-white/50">Почта</span>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="mt-0.5 block font-moderustic text-[14.5px] text-white transition hover:text-[#dbd0bf]"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-white/15 bg-white/[0.02] text-white">
                <PhoneOutlineIcon className="h-[18px] w-[18px]" />
              </span>
              <div>
                <span className="block text-[13px] text-white/50">
                  Бронирование
                </span>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="mt-0.5 block font-moderustic text-[14.5px] font-semibold text-white transition hover:text-[#dbd0bf]"
                >
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar + Yandex Award Badge */}
        <div className="mt-12 border-t border-dotted border-white/35 pt-7">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-2 text-[14px] text-white/60">
              <p>{SITE_CONFIG.legalOwner}</p>
              <p>{SITE_CONFIG.inn}</p>
              <p>
                Номер реестровой записи:{" "}
                <a
                  href={SITE_CONFIG.registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2f65ff] underline hover:text-blue-400"
                >
                  {SITE_CONFIG.registryNumber}
                </a>
              </p>
              <div className="pt-1 space-y-2">
                <div>
                  <Link
                    href="/oferta"
                    className="text-white underline transition hover:text-[#dbd0bf]"
                  >
                    Договор оферты
                  </Link>
                </div>
                <div>
                  <Link
                    href="/privacy-policy"
                    className="text-white underline transition hover:text-[#dbd0bf]"
                  >
                    Политика обработки персональных данных
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:mx-auto">
              <iframe
                src={`https://yandex.ru/sprav/widget/rating-badge/${SITE_CONFIG.yandexOrgId}?type=award`}
                width="150"
                height="50"
                frameBorder="0"
                title="Хорошее место 5.0 — Выбор пользователей Яндекса"
                className="rounded-md bg-transparent"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
