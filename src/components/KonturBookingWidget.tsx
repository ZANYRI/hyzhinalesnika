"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { CalendarBlank, CaretDown, Users } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import {
  KONTUR_DARK_FOREST_COMMON,
  KonturAddConfig,
  mountKonturWidget,
} from "@/lib/kontur-hotel";

export type KonturModuleVariant =
  | "horizontalForm"
  | "verticalForm"
  | "roomsList"
  | "calendarHorizontal"
  | "calendarVertical"
  | "mobileFloatingButton";

interface KonturBookingWidgetProps {
  id?: string;
  variant?: KonturModuleVariant;
  containerId?: string;
  align?: "center" | "left";
  className?: string;
}

const BOOKING_FORM_THEME: Record<string, unknown> = {
  common: KONTUR_DARK_FOREST_COMMON,
  container: {
    bg: "transparent",
    border: "none",
    borderRadius: "0px",
    padding: "0px",
    boxShadow: "none",
    outline: "none",
  },
  gap: "14px",
};

const CALENDAR_THEME: Record<string, unknown> = {
  common: KONTUR_DARK_FOREST_COMMON,
  container: {
    bg: "#102419",
    border: "1px solid rgba(243, 245, 240, 0.1)",
    borderRadius: "24px",
    padding: "22px 24px",
    boxShadow: "none",
    outline: "none",
  },
  filterContainer: {
    bg: "#163122",
    border: "1px solid rgba(243, 245, 240, 0.08)",
    borderRadius: "16px",
    padding: "12px 20px",
    boxShadow: "none",
  },
  monthName: {
    color: "#f3f5f0",
  },
  calendarDay: {
    weekdayColor: "#f3f5f0",
    weekendColor: "#e0ab6e",
    priceColor: "#a8b9ae",
    activeBgColor: "rgba(212, 154, 90, 0.22)",
    activeWeekdayColor: "#f3f5f0",
    activeWeekendColor: "#e0ab6e",
  },
  arrowButtons: {
    bg: "#163122",
    bgHover: "#1f432f",
    bgActive: "#d49a5a",
    color: "#f3f5f0",
    colorHover: "#d49a5a",
    colorActive: "#0a1911",
  },
};

const ROOMS_LIST_THEME: Record<string, unknown> = {
  common: KONTUR_DARK_FOREST_COMMON,
  container: {
    bg: "#102419",
    border: "1px solid rgba(243, 245, 240, 0.1)",
    borderRadius: "24px",
    padding: "16px 24px",
    boxShadow: "none",
    outline: "none",
  },
  itemBorder: "1px solid rgba(243, 245, 240, 0.1)",
  name: {
    color: "#f3f5f0",
  },
  secondName: {
    color: "#a8b9ae",
  },
  parameters: {
    color: "#d6e0d9",
  },
  description: {
    color: "#a8b9ae",
  },
  photo: {
    borderRadius: "16px",
  },
};

function buildKonturConfig(
  variant: KonturModuleVariant,
  container: string
): KonturAddConfig {
  switch (variant) {
    case "verticalForm":
      return {
        type: "bookingForm",
        inline: false,
        appearance: { container },
        theme: BOOKING_FORM_THEME,
      };
    case "horizontalForm":
      return {
        type: "bookingForm",
        inline: true,
        appearance: { container },
        theme: BOOKING_FORM_THEME,
      };
    case "roomsList":
      return {
        type: "roomsList",
        appearance: { container },
        theme: ROOMS_LIST_THEME,
      };
    case "calendarVertical":
      return {
        type: "availabilityCalendar",
        months: 1,
        appearance: { container },
        theme: CALENDAR_THEME,
      };
    case "calendarHorizontal":
      return {
        type: "availabilityCalendar",
        months: 2,
        appearance: { container },
        theme: CALENDAR_THEME,
      };
    case "mobileFloatingButton":
      return {
        type: "showCheckAvailabilityButtonForMobileDevices",
        appearance: { container },
      };
  }
}

export function KonturBookingWidget({
  id = "booking",
  variant = "horizontalForm",
  containerId: customContainerId,
  align = "center",
  className = "",
}: KonturBookingWidgetProps) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const containerId = customContainerId || `kontur-${variant}-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [mountedWidget, setMountedWidget] = useState(false);
  const [originBlocked, setOriginBlocked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");

  useEffect(() => {
    let cancelled = false;
    let cleanupWidget: (() => void) | undefined;
    let observer: MutationObserver | null = null;

    const el = containerRef.current;
    if (el) {
      const checkRendered = () => {
        if (!cancelled && el.childElementCount > 0) {
          setMountedWidget(true);
        }
      };

      observer = new MutationObserver(checkRendered);
      observer.observe(el, {
        childList: true,
        subtree: true,
      });
    }

    const config = buildKonturConfig(variant, containerId);

    mountKonturWidget(config)
      .then(({ allowed, cleanup }) => {
        if (cancelled) {
          cleanup();
          return;
        }
        cleanupWidget = cleanup;
        if (!allowed) {
          setOriginBlocked(true);
        } else if (
          containerRef.current &&
          containerRef.current.childElementCount > 0
        ) {
          setMountedWidget(true);
        }
      })
      .catch(() => {
        if (!cancelled) setMountedWidget(false);
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanupWidget?.();
    };
  }, [containerId, variant]);

  if (variant === "mobileFloatingButton") {
    return <div id={containerId} ref={containerRef} />;
  }

  function handleFallbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.open(
      SITE_CONFIG.konturBookingPortalUrl,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const isFormVariant =
    variant === "horizontalForm" || variant === "verticalForm";

  const mountedContainerClass =
    variant === "horizontalForm"
      ? `kontur-forest-scope forest-glass w-full rounded-3xl px-5 py-4 sm:px-7 sm:py-5 lg:w-fit ${
          align === "center" ? "mx-auto" : ""
        }`
      : variant === "verticalForm"
        ? "kontur-forest-scope forest-glass mx-auto w-full max-w-md rounded-3xl p-5 sm:p-6"
        : "kontur-forest-scope w-full";

  return (
    <section
      id={id}
      aria-label="Онлайн-бронирование Контур.Отель"
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 ${className}`}
    >
      {/* Live Контур.Отель container (kept at a stable JSX node position so portal root never remounts) */}
      <div
        id={containerId}
        ref={containerRef}
        className={mountedWidget ? mountedContainerClass : "w-full"}
      />

      {/* Interactive architectural booking bar while widget mounts or on non-whitelisted preview hosts */}
      {!mountedWidget && isFormVariant && (
        <div
          className={`forest-glass w-full rounded-3xl p-5 sm:p-7 ${
            variant === "verticalForm"
              ? "mx-auto max-w-md"
              : align === "center"
                ? "mx-auto max-w-[980px]"
                : "max-w-[980px]"
          }`}
        >
          <form
            onSubmit={handleFallbackSubmit}
            className={
              variant === "verticalForm"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 items-end gap-4 md:grid-cols-12"
            }
          >
            <div
              className={
                variant === "verticalForm"
                  ? "flex flex-col gap-2"
                  : "flex flex-col gap-2 md:col-span-3"
              }
            >
              <label
                htmlFor={`${containerId}-checkin`}
                className="flex items-center gap-1.5 text-xs font-medium text-[#a8b9ae]"
              >
                <CalendarBlank size={14} className="text-[#d49a5a]" />
                <span>Дата заезда</span>
              </label>
              <input
                id={`${containerId}-checkin`}
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0a1911]/90 px-3.5 text-sm text-[#f3f5f0] outline-none transition focus:border-[#d49a5a]"
              />
            </div>

            <div
              className={
                variant === "verticalForm"
                  ? "flex flex-col gap-2"
                  : "flex flex-col gap-2 md:col-span-3"
              }
            >
              <label
                htmlFor={`${containerId}-checkout`}
                className="flex items-center gap-1.5 text-xs font-medium text-[#a8b9ae]"
              >
                <CalendarBlank size={14} className="text-[#d49a5a]" />
                <span>Дата выезда</span>
              </label>
              <input
                id={`${containerId}-checkout`}
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0a1911]/90 px-3.5 text-sm text-[#f3f5f0] outline-none transition focus:border-[#d49a5a]"
              />
            </div>

            <div
              className={
                variant === "verticalForm"
                  ? "flex flex-col gap-2"
                  : "flex flex-col gap-2 md:col-span-3"
              }
            >
              <label
                htmlFor={`${containerId}-guests`}
                className="flex items-center gap-1.5 text-xs font-medium text-[#a8b9ae]"
              >
                <Users size={14} className="text-[#d49a5a]" />
                <span>Гости</span>
              </label>
              <div className="relative">
                <select
                  id={`${containerId}-guests`}
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-[#0a1911]/90 pr-9 pl-3.5 text-sm text-[#f3f5f0] outline-none transition focus:border-[#d49a5a] cursor-pointer"
                >
                  <option value="1">1 гость</option>
                  <option value="2">2 гостя</option>
                  <option value="3">3 гостя</option>
                  <option value="4">4 гостя</option>
                  <option value="5">5 гостей</option>
                  <option value="6">6 гостей</option>
                  <option value="7">7 гостей</option>
                </select>
                <CaretDown
                  size={15}
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#a8b9ae]"
                />
              </div>
            </div>

            <div
              className={
                variant === "verticalForm" ? "pt-1" : "md:col-span-3"
              }
            >
              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-6 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] cursor-pointer"
              >
                Проверить даты
              </button>
            </div>
          </form>
        </div>
      )}

      {!mountedWidget && !isFormVariant && (
        <div className="rounded-3xl border border-white/10 bg-[#102419] p-8 text-center">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#a8b9ae]">
            {originBlocked
              ? "Встроенный календарь Контур.Отель активируется на основном домене hyzhinalesnika.ru. Вы можете открыть актуальную шахматку свободных дат напрямую:"
              : "Загружаем актуальный календарь свободных дат Контур.Отель..."}
          </p>
          <a
            href={SITE_CONFIG.konturBookingPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-7 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
          >
            Открыть календарь бронирования
          </a>
        </div>
      )}
    </section>
  );
}
