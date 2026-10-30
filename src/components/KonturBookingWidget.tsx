"use client";

import React, { useEffect, useId, useRef, useState } from "react";
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

  // Mobile floating button renders exclusively through Контур.Отель without visual wrapper
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
      className={`mx-auto w-full max-w-[1260px] px-4 sm:px-6 ${className}`}
    >
      {/* Target container into which Контур.Отель (https://bookonline24.ru/widget.js) mounts */}
      <div id={containerId} ref={containerRef} className="w-full" />

      {/* Interactive fallback / preview shown while widget.js loads or on domains not yet added in Контур.Отель settings */}
      {!mountedWidget && isFormVariant && (
        <div
          className={`w-full rounded-[14px] bg-white px-5 py-7 text-[#222] shadow-md sm:px-10 ${
            variant === "verticalForm" ? "mx-auto max-w-md" : ""
          }`}
        >
          <form
            onSubmit={handleFallbackSubmit}
            className={
              variant === "verticalForm"
                ? "flex flex-col gap-3"
                : "mx-auto flex max-w-[880px] flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            }
          >
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={checkIn ? "date" : "text"}
                  value={checkIn}
                  onFocus={(e) => {
                    e.currentTarget.type = "date";
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.value) e.currentTarget.type = "text";
                  }}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="Заезд"
                  aria-label="Дата заезда"
                  className="h-[42px] w-full rounded-[6px] border border-[#dcdcdc] bg-white pr-9 pl-3.5 text-[14px] text-[#333] placeholder:text-[#9c9c9c] outline-none focus:border-[#fcc038]"
                />
                {!checkIn && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#444]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                )}
              </div>

              <span className="text-[#888]">–</span>

              <div className="relative flex-1">
                <input
                  type={checkOut ? "date" : "text"}
                  value={checkOut}
                  min={checkIn || undefined}
                  onFocus={(e) => {
                    e.currentTarget.type = "date";
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.value) e.currentTarget.type = "text";
                  }}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="Выезд"
                  aria-label="Дата выезда"
                  className="h-[42px] w-full rounded-[6px] border border-[#dcdcdc] bg-white pr-9 pl-3.5 text-[14px] text-[#333] placeholder:text-[#9c9c9c] outline-none focus:border-[#fcc038]"
                />
                {!checkOut && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#444]"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="17" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                )}
              </div>
            </div>

            <div className="relative min-w-[210px]">
              <select
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                aria-label="Количество гостей"
                className="h-[42px] w-full appearance-none rounded-[6px] border border-[#dcdcdc] bg-white pr-8 pl-3.5 text-[14px] text-[#222] outline-none focus:border-[#fcc038] cursor-pointer"
              >
                <option value="1">1 взрослый</option>
                <option value="2">2 взрослых</option>
                <option value="3">3 взрослых</option>
                <option value="4">4 взрослых</option>
                <option value="5">5 взрослых</option>
                <option value="6">6 взрослых</option>
                <option value="7">7 взрослых</option>
              </select>
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#777]">
                ▾
              </span>
            </div>

            <button
              type="submit"
              className="h-[42px] min-w-[230px] rounded-[8px] bg-[#fcc038] px-6 font-moderustic text-[14px] font-medium text-[#1e1e1e] transition hover:bg-[#f2b324] cursor-pointer"
            >
              Проверить наличие
            </button>
          </form>
        </div>
      )}

      {!mountedWidget && !isFormVariant && (
        <div className="rounded-[14px] bg-white p-8 text-center text-[#222] shadow-md">
          <p className="font-moderustic text-base text-[#444]">
            {originBlocked
              ? "Встроенный модуль Контур.Отель активируется на основном домене hyzhinalesnika.ru. Вы можете перейти к бронированию напрямую:"
              : "Загрузка модуля онлайн-бронирования Контур.Отель..."}
          </p>
          <a
            href={SITE_CONFIG.konturBookingPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-[44px] items-center justify-center rounded-[8px] bg-[#fcc038] px-7 font-moderustic text-sm font-medium text-[#1e1e1e] transition hover:bg-[#f2b324]"
          >
            Открыть модуль бронирования Контур.Отель
          </a>
        </div>
      )}
    </section>
  );
}
