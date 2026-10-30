"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { CalendarBlank, CaretDown, Users } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import { KonturAddConfig, mountKonturWidget } from "@/lib/kontur-hotel";

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
  className?: string;
}

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
      };
    case "horizontalForm":
      return {
        type: "bookingForm",
        inline: true,
        appearance: { container },
      };
    case "roomsList":
      return {
        type: "roomsList",
        appearance: { container },
      };
    case "calendarVertical":
      return {
        type: "availabilityCalendar",
        months: 1,
        appearance: { container },
      };
    case "calendarHorizontal":
      return {
        type: "availabilityCalendar",
        months: 2,
        appearance: { container },
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

  return (
    <section
      id={id}
      aria-label="Онлайн-бронирование Контур.Отель"
      className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 ${className}`}
    >
      {/* Live Контур.Отель container */}
      <div
        id={containerId}
        ref={containerRef}
        className={mountedWidget ? "rounded-3xl border border-white/12 bg-[#102419] p-3 sm:p-5" : "w-full"}
      />

      {/* Interactive architectural booking bar while widget mounts or on non-whitelisted preview hosts */}
      {!mountedWidget && isFormVariant && (
        <div
          className={`forest-glass w-full rounded-3xl p-5 sm:p-7 ${
            variant === "verticalForm" ? "mx-auto max-w-md" : ""
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
            <div className={variant === "verticalForm" ? "flex flex-col gap-2" : "flex flex-col gap-2 md:col-span-3"}>
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

            <div className={variant === "verticalForm" ? "flex flex-col gap-2" : "flex flex-col gap-2 md:col-span-3"}>
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

            <div className={variant === "verticalForm" ? "flex flex-col gap-2" : "flex flex-col gap-2 md:col-span-3"}>
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

            <div className={variant === "verticalForm" ? "pt-1" : "md:col-span-3"}>
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
