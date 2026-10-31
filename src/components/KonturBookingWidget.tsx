"use client";

import React, {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { CalendarBlank, CaretDown, Users, X } from "@phosphor-icons/react";
import { SITE_CONFIG } from "@/data/site";
import {
  computeMaxValidCheckOutIso,
  countNightsBetweenIso,
  extractKonturCalendarDayInfo,
  findKonturCalendarDayCell,
  KONTUR_DARK_FOREST_COMMON,
  KonturAddConfig,
  KonturCalendarDayInfo,
  MAX_ADULTS_COUNT,
  mountKonturWidget,
  openKonturCheckoutForDates,
  paintKonturCalendarSelection,
} from "@/lib/kontur-hotel";

export type KonturModuleVariant =
  | "horizontalForm"
  | "verticalForm"
  | "roomsList"
  | "calendarHorizontal"
  | "calendarVertical"
  | "calendarResponsive"
  | "mobileFloatingButton";

interface KonturBookingWidgetProps {
  id?: string;
  variant?: KonturModuleVariant;
  containerId?: string;
  align?: "center" | "left";
  interactiveCalendar?: boolean;
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
    padding: "18px 20px 10px",
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
  parameters: {
    color: "#d6e0d9",
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

const ADULTS_OPTIONS = Array.from({ length: MAX_ADULTS_COUNT }, (_, idx) => {
  const count = idx + 1;
  return {
    value: String(count),
    label: count === 1 ? "1 взрослый" : `${count} взрослых`,
  };
});

function formatNightsLabel(nights: number): string {
  const mod10 = nights % 10;
  const mod100 = nights % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return `${nights} сутки`;
  }
  return `${nights} суток`;
}

function subscribeDesktopMedia(callback: () => void): () => void {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopMediaSnapshot(): boolean {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopMediaServerSnapshot(): boolean {
  return true;
}

function buildKonturConfig(
  variant: Exclude<KonturModuleVariant, "calendarResponsive">,
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
  interactiveCalendar = false,
  className = "",
}: KonturBookingWidgetProps) {
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const isDesktopViewport = useSyncExternalStore(
    subscribeDesktopMedia,
    getDesktopMediaSnapshot,
    getDesktopMediaServerSnapshot
  );

  const resolvedVariant: Exclude<KonturModuleVariant, "calendarResponsive"> =
    variant === "calendarResponsive"
      ? isDesktopViewport
        ? "calendarHorizontal"
        : "calendarVertical"
      : variant;

  const isCalendarVariant =
    resolvedVariant === "calendarHorizontal" ||
    resolvedVariant === "calendarVertical";
  const calendarInteractive = interactiveCalendar && isCalendarVariant;

  const containerId =
    customContainerId || `kontur-${resolvedVariant}-${reactId}`;
  const activeKey = `${containerId}:${resolvedVariant}`;
  const containerRef = useRef<HTMLDivElement>(null);

  const [mountedKey, setMountedKey] = useState<string | null>(null);
  const [originBlocked, setOriginBlocked] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("2");

  // Interactive date range state for `availabilityCalendar`
  const [calSelection, setCalSelection] = useState<{
    checkIn: KonturCalendarDayInfo | null;
    checkOut: KonturCalendarDayInfo | null;
  }>({ checkIn: null, checkOut: null });
  const calSelectionRef = useRef(calSelection);
  const hoverIsoRef = useRef<string | null>(null);
  const activeHouseTitleRef = useRef<string>("");

  useEffect(() => {
    calSelectionRef.current = calSelection;
    if (calendarInteractive && containerRef.current) {
      paintKonturCalendarSelection(
        containerRef.current,
        calSelection.checkIn?.isoDate ?? null,
        calSelection.checkOut?.isoDate ?? null,
        hoverIsoRef.current
      );
    }
  }, [calSelection, calendarInteractive]);

  const mountedWidget = mountedKey === activeKey;

  useEffect(() => {
    let cancelled = false;
    let cleanupWidget: (() => void) | undefined;
    let observer: MutationObserver | null = null;
    let notifiedResize = false;

    const triggerCalendarMeasure = () => {
      if (!notifiedResize && isCalendarVariant) {
        notifiedResize = true;
        requestAnimationFrame(() => {
          if (!cancelled) {
            window.dispatchEvent(new Event("resize"));
          }
        });
      }
    };

    const el = containerRef.current;
    if (el) {
      el.replaceChildren();

      const syncCalendarDom = () => {
        if (cancelled || el.childElementCount === 0) return;
        setMountedKey(activeKey);
        triggerCalendarMeasure();

        if (calendarInteractive) {
          // Reset selection if user switched to a different house in the calendar filter dropdown
          const selectBtn = el.querySelector<HTMLElement>(
            '[data-tid="Select__root"] button'
          );
          const houseTitle = (selectBtn?.textContent || "").trim();
          if (
            houseTitle &&
            activeHouseTitleRef.current &&
            houseTitle !== activeHouseTitleRef.current
          ) {
            activeHouseTitleRef.current = houseTitle;
            hoverIsoRef.current = null;
            calSelectionRef.current = { checkIn: null, checkOut: null };
            setCalSelection({ checkIn: null, checkOut: null });
            paintKonturCalendarSelection(el, null, null, null);
            return;
          }
          if (houseTitle) {
            activeHouseTitleRef.current = houseTitle;
          }

          paintKonturCalendarSelection(
            el,
            calSelectionRef.current.checkIn?.isoDate ?? null,
            calSelectionRef.current.checkOut?.isoDate ?? null,
            hoverIsoRef.current
          );
        }
      };

      observer = new MutationObserver(syncCalendarDom);
      observer.observe(el, {
        childList: true,
        subtree: true,
      });
    }

    const config = buildKonturConfig(resolvedVariant, containerId);

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
          setMountedKey(activeKey);
          triggerCalendarMeasure();
          if (calendarInteractive) {
            paintKonturCalendarSelection(
              containerRef.current,
              calSelectionRef.current.checkIn?.isoDate ?? null,
              calSelectionRef.current.checkOut?.isoDate ?? null,
              hoverIsoRef.current
            );
          }
        }
      })
      .catch(() => {
        if (!cancelled) setMountedKey(null);
      });

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanupWidget?.();
    };
  }, [
    activeKey,
    calendarInteractive,
    containerId,
    isCalendarVariant,
    resolvedVariant,
  ]);

  // Interactive click & live hover-range preview handlers for `availabilityCalendar`
  useEffect(() => {
    const el = containerRef.current;
    if (!calendarInteractive || !el) return;

    const handleClick = (e: MouseEvent) => {
      const cell = findKonturCalendarDayCell(e.target, el);
      if (!cell) return;
      const info = extractKonturCalendarDayInfo(cell);
      if (!info || info.isDisabled) return;

      const current = calSelectionRef.current;

      // 1. Starting a fresh check-in selection (or restarting after a completed range)
      if (!current.checkIn || (current.checkIn && current.checkOut)) {
        if (!info.hasPrice) return;
        hoverIsoRef.current = null;
        setCalSelection({ checkIn: info, checkOut: null });
        return;
      }

      // 2. Clicking the active check-in day again clears selection
      if (info.isoDate === current.checkIn.isoDate) {
        hoverIsoRef.current = null;
        setCalSelection({ checkIn: null, checkOut: null });
        return;
      }

      // 3. Clicking an earlier available day moves check-in earlier
      if (info.isoDate < current.checkIn.isoDate) {
        if (!info.hasPrice) return;
        hoverIsoRef.current = null;
        setCalSelection({ checkIn: info, checkOut: null });
        return;
      }

      // 4. Clicking a later day: validate contiguous availability up to check-out morning
      const maxCheckOutIso = computeMaxValidCheckOutIso(
        el,
        current.checkIn.isoDate
      );
      if (maxCheckOutIso && info.isoDate > maxCheckOutIso) {
        // User clicked across booked nights onto a later free block -> start new check-in there
        if (info.hasPrice) {
          hoverIsoRef.current = null;
          setCalSelection({ checkIn: info, checkOut: null });
        }
        return;
      }

      // Valid check-out date! Lock range and open official Контур.Отель checkout modal
      hoverIsoRef.current = null;
      setCalSelection({ checkIn: current.checkIn, checkOut: info });
      openKonturCheckoutForDates(
        el,
        current.checkIn.formattedDate,
        info.formattedDate
      );
    };

    const handlePointerMove = (e: PointerEvent) => {
      const current = calSelectionRef.current;
      if (!current.checkIn || current.checkOut) {
        if (hoverIsoRef.current !== null) {
          hoverIsoRef.current = null;
          paintKonturCalendarSelection(
            el,
            current.checkIn?.isoDate ?? null,
            current.checkOut?.isoDate ?? null,
            null
          );
        }
        return;
      }

      const cell = findKonturCalendarDayCell(e.target, el);
      const info = cell ? extractKonturCalendarDayInfo(cell) : null;
      const nextHoverIso =
        info && !info.isDisabled ? info.isoDate : null;

      if (nextHoverIso !== hoverIsoRef.current) {
        hoverIsoRef.current = nextHoverIso;
        paintKonturCalendarSelection(
          el,
          current.checkIn.isoDate,
          null,
          nextHoverIso
        );
      }
    };

    const handlePointerLeave = () => {
      if (hoverIsoRef.current !== null) {
        hoverIsoRef.current = null;
        paintKonturCalendarSelection(
          el,
          calSelectionRef.current.checkIn?.isoDate ?? null,
          calSelectionRef.current.checkOut?.isoDate ?? null,
          null
        );
      }
    };

    el.addEventListener("click", handleClick);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      el.removeEventListener("click", handleClick);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [calendarInteractive]);

  if (resolvedVariant === "mobileFloatingButton") {
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

  function handleResetCalendarSelection() {
    hoverIsoRef.current = null;
    setCalSelection({ checkIn: null, checkOut: null });
  }

  function handleReopenCalendarCheckout() {
    if (
      containerRef.current &&
      calSelection.checkIn &&
      calSelection.checkOut
    ) {
      openKonturCheckoutForDates(
        containerRef.current,
        calSelection.checkIn.formattedDate,
        calSelection.checkOut.formattedDate
      );
    }
  }

  const isFormVariant =
    resolvedVariant === "horizontalForm" || resolvedVariant === "verticalForm";

  const mountedContainerClass =
    resolvedVariant === "horizontalForm"
      ? `kontur-forest-scope forest-glass w-full rounded-3xl px-5 py-4 sm:px-7 sm:py-5 lg:w-fit ${
          align === "center" ? "mx-auto" : ""
        }`
      : resolvedVariant === "verticalForm"
        ? "kontur-forest-scope forest-glass mx-auto w-full max-w-md rounded-3xl p-5 sm:p-6"
        : "kontur-forest-scope w-full";

  const selectedNights =
    calSelection.checkIn && calSelection.checkOut
      ? countNightsBetweenIso(
          calSelection.checkIn.isoDate,
          calSelection.checkOut.isoDate
        )
      : 0;

  return (
    <section
      id={id}
      aria-label="Онлайн-бронирование Контур.Отель"
      className={`mx-auto w-full max-w-[1400px] scroll-mt-28 px-4 sm:px-6 ${className}`}
    >
      {/* Live Контур.Отель container (kept at a stable JSX node position so portal root never remounts) */}
      <div
        id={containerId}
        ref={containerRef}
        className={mountedWidget ? mountedContainerClass : "w-full"}
      />

      {/* Interactive calendar status & action strip */}
      {mountedWidget && calendarInteractive && (
        <div className="mx-auto mt-4 flex w-full max-w-[910px] flex-col items-center justify-center">
          {!calSelection.checkIn && (
            <p className="text-center text-xs text-[#a8b9ae] sm:text-sm">
              Нажмите на свободную дату в календаре, чтобы выбрать заезд и выезд
            </p>
          )}

          {calSelection.checkIn && !calSelection.checkOut && (
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[#d49a5a]/40 bg-[#102419] px-5 py-2.5 text-xs text-[#f3f5f0] shadow-lg sm:text-sm">
              <span>
                Заезд:{" "}
                <strong className="font-semibold text-[#d49a5a]">
                  {calSelection.checkIn.formattedDate}
                </strong>{" "}
                — выберите дату выезда в календаре
              </span>
              <button
                type="button"
                onClick={handleResetCalendarSelection}
                className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-[#a8b9ae] transition hover:border-white/30 hover:text-[#f3f5f0] cursor-pointer"
              >
                <X size={12} />
                <span>Сбросить</span>
              </button>
            </div>
          )}

          {calSelection.checkIn && calSelection.checkOut && (
            <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-[#d49a5a]/45 bg-[#102419] px-5 py-3 text-xs text-[#f3f5f0] shadow-lg sm:rounded-full sm:text-sm">
              <span>
                Выбрано:{" "}
                <strong className="font-semibold text-[#d49a5a]">
                  {calSelection.checkIn.formattedDate} —{" "}
                  {calSelection.checkOut.formattedDate}
                </strong>{" "}
                <span className="text-[#a8b9ae]">
                  ({formatNightsLabel(selectedNights)})
                </span>
              </span>
              <button
                type="button"
                onClick={handleReopenCalendarCheckout}
                className="inline-flex h-9 items-center justify-center rounded-full bg-[#d49a5a] px-4 text-xs font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] sm:text-sm cursor-pointer"
              >
                Забронировать
              </button>
              <button
                type="button"
                onClick={handleResetCalendarSelection}
                aria-label="Сбросить выбранные даты"
                className="inline-flex h-9 items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 text-xs text-[#a8b9ae] transition hover:border-white/30 hover:text-[#f3f5f0] cursor-pointer"
              >
                <X size={13} />
                <span>Сбросить</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive architectural booking bar while widget mounts or on non-whitelisted preview hosts */}
      {!mountedWidget && isFormVariant && (
        <div
          className={`forest-glass w-full rounded-3xl p-5 sm:p-7 ${
            resolvedVariant === "verticalForm"
              ? "mx-auto max-w-md"
              : align === "center"
                ? "mx-auto max-w-[980px]"
                : "max-w-[980px]"
          }`}
        >
          <form
            onSubmit={handleFallbackSubmit}
            className={
              resolvedVariant === "verticalForm"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 items-end gap-4 md:grid-cols-12"
            }
          >
            <div
              className={
                resolvedVariant === "verticalForm"
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
                resolvedVariant === "verticalForm"
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
                resolvedVariant === "verticalForm"
                  ? "flex flex-col gap-2"
                  : "flex flex-col gap-2 md:col-span-3"
              }
            >
              <label
                htmlFor={`${containerId}-guests`}
                className="flex items-center gap-1.5 text-xs font-medium text-[#a8b9ae]"
              >
                <Users size={14} className="text-[#d49a5a]" />
                <span>Взрослые</span>
              </label>
              <div className="relative">
                <select
                  id={`${containerId}-guests`}
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-white/15 bg-[#0a1911]/90 pr-9 pl-3.5 text-sm text-[#f3f5f0] outline-none transition focus:border-[#d49a5a] cursor-pointer"
                >
                  {ADULTS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <CaretDown
                  size={15}
                  className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[#a8b9ae]"
                />
              </div>
            </div>

            <div
              className={
                resolvedVariant === "verticalForm" ? "pt-1" : "md:col-span-3"
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
        <div className="mx-auto max-w-[910px] rounded-3xl border border-white/10 bg-[#102419] p-8 text-center">
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
