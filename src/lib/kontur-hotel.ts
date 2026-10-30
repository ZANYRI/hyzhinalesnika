import { SITE_CONFIG } from "@/data/site";

export const MAX_ADULTS_COUNT = 7;

export type KonturWidgetType =
  | "bookingForm"
  | "roomsList"
  | "availabilityCalendar"
  | "showCheckAvailabilityButtonForMobileDevices";

export interface KonturAddConfig {
  type: KonturWidgetType;
  inline?: boolean;
  months?: 1 | 2;
  appearance: {
    container: string;
  };
  theme?: Record<string, unknown>;
}

export interface HotelWidgetGlobal {
  init: (config: {
    hotelId: string;
    version: "2";
    theme?: Record<string, unknown>;
    hooks?: {
      onError?: (e: unknown) => void;
      onInit?: () => void;
      onBooking?: (v: unknown) => void;
    };
  }) => void;
  add: (config: KonturAddConfig) => string | undefined;
  remove: (widgetId: string) => string | undefined;
  update: (widgetId?: string) => void;
  isExists: (widgetId: string) => boolean | undefined;
}

export interface KonturCalendarDayInfo {
  year: number;
  monthIndex: number;
  day: number;
  isoDate: string;
  formattedDate: string;
  hasPrice: boolean;
  isDisabled: boolean;
}

interface ReactFiberNode {
  return: ReactFiberNode | null;
  type?: {
    displayName?: string;
  } | null;
  memoizedProps?: Record<string, unknown> | null;
}

interface KonturSearchParamsState {
  fromDate: string | null;
  toDate: string | null;
  adultsCount: number;
  children?: unknown[];
  roomCategoryId?: string | null;
  calendarRoomCategoryId?: string | null;
}

interface KonturSearchContextValue {
  params: KonturSearchParamsState;
  setParams: (
    updater: (prev: KonturSearchParamsState) => KonturSearchParamsState
  ) => void;
  calendarRoomCategoryId?: string | null;
}

interface KonturLightboxContextValue {
  isBookingProcess: boolean;
  openBookingLightbox: () => void;
}

declare global {
  interface Window {
    HotelWidget?: HotelWidgetGlobal;
    ym?: (
      counterId: number,
      action: string,
      target: string,
      params?: unknown
    ) => void;
  }
}

const KONTUR_SCRIPT_SRC = "https://bookonline24.ru/widget.js";

/**
 * Global Контур.Отель v2 theme: styles primary booking CTAs in brand amber-cedar
 * while keeping the full-screen checkout/payment modal high-contrast and legible.
 */
const KONTUR_GLOBAL_THEME: Record<string, unknown> = {
  common: {
    buttons: {
      primary: {
        bg: "#d49a5a",
        hoverBg: "#e0ab6e",
        activeBg: "#c38847",
        textColor: "#0a1911",
        hoverTextColor: "#0a1911",
      },
    },
    controls: {
      btnBorderRadius: "9999px",
      inputBorderRadius: "12px",
      selectBorderRadius: "12px",
    },
  },
};

/**
 * Shared dark-forest ReactUI & BM color tokens applied to inline widgets mounted
 * directly on the `#0a1911` / `#102419` pages (and their DatePicker / Select popups).
 */
export const KONTUR_DARK_FOREST_COMMON: Record<string, unknown> = {
  colors: {
    whiteColor: "#102419",
    fontBlackColor: "#f3f5f0",
    fontBlackActiveColor: "#f3f5f0",
    fontGrayColor: "#a8b9ae",
    fontDisabledColor: "rgba(168, 185, 174, 0.45)",
    placeholderColor: "#a8b9ae",
    bgGrayLightColor: "rgba(22, 49, 34, 0.78)",
    bgGrayColor: "rgba(22, 49, 34, 0.92)",
    bgGrayDarkColor: "#163122",
    bgYellowLightColor: "rgba(212, 154, 90, 0.18)",
    bgYellowColor: "#d49a5a",
    fontYellowColor: "#e0ab6e",
    bgGreenLightColor: "rgba(59, 128, 78, 0.25)",
    bgGreenColor: "#469658",
    fontGreenColor: "#8be09a",
    bgBlueLightColor: "rgba(212, 154, 90, 0.16)",
    bgBlueColor: "#d49a5a",
    fontBlueColor: "#d49a5a",
  },
  base: {
    bgDefault: "#102419",
    bgDisabled: "rgba(16, 36, 25, 0.65)",
    textColorDefault: "#f3f5f0",
    textColorDisabled: "rgba(168, 185, 174, 0.45)",
    textColorDisabledContrast: "rgba(168, 185, 174, 0.45)",
    placeholderColor: "#a8b9ae",
    placeholderColorLight: "rgba(168, 185, 174, 0.65)",
    borderColorFocus: "#d49a5a",
    outlineColorFocus: "transparent",
    borderColorGrayLight: "rgba(243, 245, 240, 0.16)",
    borderColorGrayDark: "rgba(243, 245, 240, 0.28)",
    linkColor: "#d49a5a",
    linkHoverColor: "#e0ab6e",
    linkActiveColor: "#c38847",
  },
  buttons: {
    primary: {
      bg: "#d49a5a",
      hoverBg: "#e0ab6e",
      activeBg: "#c38847",
      textColor: "#0a1911",
      hoverTextColor: "#0a1911",
    },
    secondary: {
      bg: "#0a1911",
      hoverBg: "#163122",
      activeBg: "#1c3d2a",
      textColor: "#f3f5f0",
      hoverTextColor: "#f3f5f0",
      borderColor: "rgba(243, 245, 240, 0.16)",
    },
  },
  controls: {
    btnBorderRadius: "9999px",
    inputBorderRadius: "12px",
    selectBorderRadius: "12px",
    btnBacklessTextColor: "#c38847",
    btnBacklessHoverTextColor: "#a86f30",
    btnBacklessHoverBg: "rgba(212, 154, 90, 0.12)",
    btnBacklessActiveBg: "rgba(212, 154, 90, 0.2)",
    inputBg: "#0a1911",
    inputTextColor: "#f3f5f0",
    inputColor: "#f3f5f0",
    inputBorderColor: "rgba(243, 245, 240, 0.16)",
    inputBorderColorHover: "rgba(212, 154, 90, 0.55)",
    inputBorderColorFocus: "#d49a5a",
    inputIconColor: "#d49a5a",
    inputColorScheme: "dark",
    dateInputMaskColor: "rgba(168, 185, 174, 0.45)",
    datePickerOpenBtnColor: "#d49a5a",
    selectHoverBg: "#163122",
    selectActiveBg: "#1c3d2a",
    btnMenuArrowColor: "#a8b9ae",
    menuBgDefault: "#102419",
    menuItemTextColor: "#f3f5f0",
    menuItemHoverBg: "#163122",
    menuItemSelectedBg: "#1c3d2a",
    menuHeaderColor: "#a8b9ae",
    menuSeparatorBorderColor: "rgba(243, 245, 240, 0.1)",
    popupBackground: "#102419",
    popupBorder: "1px solid rgba(243, 245, 240, 0.14)",
    popupBorderRadius: "16px",
    tooltipBg: "#102419",
    tooltipTextColor: "#f3f5f0",
    tooltipCloseBtnColor: "#a8b9ae",
    tooltipCloseBtnHoverColor: "#f3f5f0",
    calendarBg: "#102419",
    calendarCellBg: "transparent",
    calendarCellHoverBgColor: "#163122",
    calendarCellHoverColor: "#f3f5f0",
    calendarCellSelectedBgColor: "#d49a5a",
    calendarCellSelectedFontColor: "#0a1911",
    calendarCellWeekendColor: "#e0ab6e",
    calendarMonthTitleBorderBottomColor: "rgba(243, 245, 240, 0.1)",
    calendarBottomSeparatorBorderColor: "rgba(243, 245, 240, 0.1)",
    rangeCalendarCellBg: "rgba(212, 154, 90, 0.2)",
    rangeCalendarCellEndBg: "#d49a5a",
    rangeCalendarCellEndColor: "#0a1911",
    rangeCalendarCellHoverBg: "rgba(212, 154, 90, 0.32)",
  },
};

const accessCache = new Map<string, Promise<boolean>>();
let scriptPromise: Promise<HotelWidgetGlobal> | null = null;
let initializedHotelId: string | null = null;
let adultsCapGuardInstalled = false;

const MONTH_NAME_MAP: Record<string, number> = {
  январ: 0,
  феврал: 1,
  март: 2,
  апрел: 3,
  май: 4,
  мая: 4,
  июн: 5,
  июл: 6,
  август: 7,
  сентябр: 8,
  октябр: 9,
  ноябр: 10,
  декабр: 11,
  januar: 0,
  februar: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function getReactFiber(el: Element): ReactFiberNode | null {
  const record = el as unknown as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (key.startsWith("__reactFiber$")) {
      return (record[key] as ReactFiberNode) || null;
    }
  }
  return null;
}

function parseMonthYearText(raw: string): {
  monthIndex: number | null;
  year: number | null;
} {
  const lower = raw.toLowerCase().trim();
  let monthIndex: number | null = null;
  for (const [prefix, idx] of Object.entries(MONTH_NAME_MAP)) {
    if (lower.includes(prefix)) {
      monthIndex = idx;
      break;
    }
  }
  const yearMatch = lower.match(/\b(20\d{2})\b/);
  const year = yearMatch ? Number.parseInt(yearMatch[1], 10) : null;
  return { monthIndex, year };
}

/**
 * Finds the day cell `<div>` (`CalendarDay`) inside Контур.Отель's `CalendarMonth`
 * `<section>` when clicking or hovering anywhere inside a day cell.
 */
export function findKonturCalendarDayCell(
  target: EventTarget | null,
  containerEl: HTMLElement
): HTMLElement | null {
  if (!(target instanceof HTMLElement) || !containerEl.contains(target)) {
    return null;
  }
  if (target.closest("button")) {
    return null;
  }
  const section = target.closest("section");
  if (!section || !containerEl.contains(section)) {
    return null;
  }

  let node: HTMLElement | null = target;
  while (node && node !== section) {
    const parent: HTMLElement | null = node.parentElement;
    if (parent && section.contains(parent) && parent.childElementCount >= 28) {
      return node;
    }
    node = parent;
  }
  return null;
}

/**
 * Extracts exact `{ year, monthIndex, day, isoDate, formattedDate, hasPrice, isDisabled }`
 * from a Контур.Отель `CalendarDay` DOM cell via its React Fiber props (with DOM fallback).
 */
export function extractKonturCalendarDayInfo(
  cell: HTMLElement
): KonturCalendarDayInfo | null {
  let day: number | null = null;
  let monthIndex: number | null = null;
  let year: number | null = null;
  let hasPrice = false;
  let isDisabled = false;
  let foundDayProps = false;

  let fiber = getReactFiber(cell);
  let hops = 0;
  while (fiber && hops < 16) {
    const props = fiber.memoizedProps;
    if (props) {
      if (!foundDayProps && "day" in props && "disabled" in props) {
        foundDayProps = true;
        if (typeof props.day !== "number" || props.day < 1) {
          return null;
        }
        day = props.day;
        isDisabled = Boolean(props.disabled);
        const data = props.data as { price?: unknown } | undefined;
        hasPrice = !isDisabled && Boolean(data && data.price);
      }
      if (
        typeof props.monthNumberFromZero === "number" &&
        typeof props.year === "number"
      ) {
        monthIndex = props.monthNumberFromZero;
        year = props.year;
        break;
      }
    }
    fiber = fiber.return;
    hops++;
  }

  // Pure DOM fallback if Fiber props are unavailable
  if (day === null) {
    const numText = (cell.firstElementChild?.textContent || "").trim();
    if (!/^\d{1,2}$/.test(numText)) {
      return null;
    }
    day = Number.parseInt(numText, 10);
    const subText = (cell.children[1]?.textContent || "").trim();
    hasPrice = /\d/.test(subText);
  }

  if (monthIndex === null || year === null) {
    const section = cell.closest("section");
    const flipId = section?.parentElement?.getAttribute("data-flip-id") || "";
    const titleText = (section?.firstElementChild?.textContent || "").trim();
    const parsedFlip = parseMonthYearText(flipId);
    const parsedTitle = parseMonthYearText(titleText);

    monthIndex = parsedFlip.monthIndex ?? parsedTitle.monthIndex;
    year = parsedFlip.year ?? parsedTitle.year;

    if (monthIndex !== null && year === null) {
      const now = new Date();
      year =
        monthIndex < now.getMonth() - 1
          ? now.getFullYear() + 1
          : now.getFullYear();
    }
  }

  if (day === null || monthIndex === null || year === null) {
    return null;
  }

  const isoDate = `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
  const formattedDate = `${pad2(day)}.${pad2(monthIndex + 1)}.${year}`;

  if (!foundDayProps) {
    const now = new Date();
    const todayIso = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(
      now.getDate()
    )}`;
    isDisabled = isoDate < todayIso;
    if (isDisabled) {
      hasPrice = false;
    }
  }

  return {
    year,
    monthIndex,
    day,
    isoDate,
    formattedDate,
    hasPrice,
    isDisabled,
  };
}

/**
 * Collects all rendered day cells inside a Контур.Отель `availabilityCalendar` container.
 */
function collectCalendarCells(
  containerEl: HTMLElement
): Array<{ cell: HTMLElement; info: KonturCalendarDayInfo }> {
  const results: Array<{ cell: HTMLElement; info: KonturCalendarDayInfo }> = [];
  const sections = containerEl.querySelectorAll("section");
  sections.forEach((section) => {
    const grids = section.querySelectorAll("div");
    grids.forEach((grid) => {
      if (grid.childElementCount >= 28) {
        Array.from(grid.children).forEach((child) => {
          if (child instanceof HTMLElement) {
            const info = extractKonturCalendarDayInfo(child);
            if (info) {
              results.push({ cell: child, info });
            }
          }
        });
      }
    });
  });
  return results;
}

/**
 * Computes the maximum valid check-out ISO date (`YYYY-MM-DD`) for a given `checkInIso`
 * based on currently rendered calendar availability: guests can stay across contiguous
 * nights with `hasPrice === true` and check out up to the first unavailable boundary morning.
 */
export function computeMaxValidCheckOutIso(
  containerEl: HTMLElement,
  checkInIso: string
): string | null {
  const entries = collectCalendarCells(containerEl);
  const byIso = new Map<string, KonturCalendarDayInfo>();
  for (const { info } of entries) {
    if (!byIso.has(info.isoDate) || info.hasPrice) {
      byIso.set(info.isoDate, info);
    }
  }

  const sortedIsos = Array.from(byIso.keys()).sort();
  for (const iso of sortedIsos) {
    if (iso <= checkInIso) continue;
    const info = byIso.get(iso);
    if (info && !info.hasPrice) {
      return iso;
    }
  }
  return null;
}

/**
 * Stamps `data-hl-clickable` and `data-hl-selected` attributes on Контур.Отель's
 * calendar cells so users get interactive hover, range preview, and selected range styling.
 */
export function paintKonturCalendarSelection(
  containerEl: HTMLElement,
  checkInIso: string | null,
  checkOutIso: string | null,
  hoverIso: string | null
): void {
  const entries = collectCalendarCells(containerEl);
  const pickingCheckOut = Boolean(checkInIso && !checkOutIso);
  const maxCheckOutIso =
    pickingCheckOut && checkInIso
      ? computeMaxValidCheckOutIso(containerEl, checkInIso)
      : null;

  const isValidCheckOutTarget = (iso: string): boolean => {
    if (!checkInIso || iso <= checkInIso) return false;
    if (maxCheckOutIso && iso > maxCheckOutIso) return false;
    return true;
  };

  const previewEndIso =
    pickingCheckOut && hoverIso && isValidCheckOutTarget(hoverIso)
      ? hoverIso
      : null;
  const effectiveEndIso = checkOutIso || previewEndIso;

  for (const { cell, info } of entries) {
    const canClick =
      !info.isDisabled &&
      (pickingCheckOut
        ? info.isoDate === checkInIso ||
          isValidCheckOutTarget(info.isoDate) ||
          info.hasPrice
        : info.hasPrice);

    if (canClick) {
      cell.setAttribute("data-hl-clickable", "true");
    } else {
      cell.removeAttribute("data-hl-clickable");
    }

    let selectedState: string | null = null;
    if (checkInIso && info.isoDate === checkInIso) {
      selectedState = "start";
    } else if (checkOutIso && info.isoDate === checkOutIso) {
      selectedState = "end";
    } else if (previewEndIso && info.isoDate === previewEndIso) {
      selectedState = "preview-end";
    } else if (
      checkInIso &&
      effectiveEndIso &&
      info.isoDate > checkInIso &&
      info.isoDate < effectiveEndIso
    ) {
      selectedState = "range";
    }

    if (selectedState) {
      cell.setAttribute("data-hl-selected", selectedState);
    } else {
      cell.removeAttribute("data-hl-selected");
    }
  }
}

/**
 * Calculates number of nights between two `YYYY-MM-DD` ISO dates.
 */
export function countNightsBetweenIso(
  checkInIso: string,
  checkOutIso: string
): number {
  const [y1, m1, d1] = checkInIso.split("-").map(Number);
  const [y2, m2, d2] = checkOutIso.split("-").map(Number);
  const utc1 = Date.UTC(y1, m1 - 1, d1);
  const utc2 = Date.UTC(y2, m2 - 1, d2);
  return Math.max(1, Math.round((utc2 - utc1) / 86_400_000));
}

/**
 * Updates Контур.Отель's shared daily `RoomCategorySearchParamsProvider` (`xH`) with the
 * selected check-in / check-out dates (`DD.MM.YYYY`) and the currently selected house in
 * the calendar filter, then opens Контур.Отель's official `BookingSearchLightbox` checkout.
 */
export function openKonturCheckoutForDates(
  containerEl: HTMLElement,
  fromDate: string,
  toDate: string
): void {
  const anchorEl =
    containerEl.querySelector("section") || containerEl.firstElementChild;

  let searchCtx: KonturSearchContextValue | null = null;
  let lightboxCtx: KonturLightboxContextValue | null = null;

  if (anchorEl) {
    let curr = getReactFiber(anchorEl);
    while (curr) {
      const val = curr.memoizedProps?.value as
        | Record<string, unknown>
        | undefined;
      if (val && typeof val === "object") {
        // Outermost match wins: `ZU` (daily RoomCategorySearchParamsProvider) wraps `ZW` (hourly)
        if (typeof val.setParams === "function" && "params" in val) {
          const parentName = curr.return?.type?.displayName;
          if (parentName !== "HourlyObjectsSearchParamsProvider") {
            searchCtx = val as unknown as KonturSearchContextValue;
          }
        }
        // Outermost match wins: `XL` (daily BookingLightboxProvider) wraps `Zk` (hourly)
        if (
          typeof val.openBookingLightbox === "function" &&
          "isBookingProcess" in val
        ) {
          lightboxCtx = val as unknown as KonturLightboxContextValue;
        }
      }
      curr = curr.return;
    }
  }

  // Clamp adultsCount to the currently selected house's capacity if needed
  const placesEl = containerEl.querySelector('[data-tid="PlacesCount"]');
  const parsedCapacity = placesEl
    ? Number.parseInt((placesEl.textContent || "").trim(), 10)
    : Number.NaN;
  const maxHouseAdults =
    Number.isFinite(parsedCapacity) && parsedCapacity > 0
      ? Math.min(parsedCapacity, MAX_ADULTS_COUNT)
      : MAX_ADULTS_COUNT;

  if (searchCtx && lightboxCtx) {
    searchCtx.setParams((prev) => {
      const currentAdults = Math.min(
        Math.max(1, prev.adultsCount || 2),
        maxHouseAdults
      );
      const selectedRoomId =
        prev.calendarRoomCategoryId ??
        searchCtx?.calendarRoomCategoryId ??
        prev.roomCategoryId ??
        null;
      return {
        ...prev,
        fromDate,
        toDate,
        adultsCount: currentAdults,
        roomCategoryId: selectedRoomId,
      };
    });

    // Open lightbox on next macrotask after React 18 commits `fromDate` & `toDate` into `xH`
    const openModal = lightboxCtx.openBookingLightbox;
    window.setTimeout(() => {
      openModal();
    }, 0);
    return;
  }

  // Fallback for non-whitelisted preview hosts
  const fallbackUrl = new URL(SITE_CONFIG.konturBookingPortalUrl);
  fallbackUrl.searchParams.set("fromDate", fromDate);
  fallbackUrl.searchParams.set("toDate", toDate);
  fallbackUrl.searchParams.set("adultsCount", "2");
  window.open(fallbackUrl.toString(), "_blank", "noopener,noreferrer");
}

function parseAdultsMenuItemValue(item: Element): number | null {
  const content = item.querySelector('[data-tid="MenuItem__content"]');
  if (!content || !content.querySelector("svg")) {
    return null;
  }
  const raw = (content.textContent || "").trim();
  if (!/^\d+$/.test(raw)) {
    return null;
  }
  return Number.parseInt(raw, 10);
}

/**
 * Enforces a strict maximum of 7 adults in Контур.Отель's `AdultsCountSelect`
 * dropdown (which otherwise defaults to `1..20`), matching the maximum capacity
 * of the largest house on the base (Barnhouse «Берёза» — up to 7 guests).
 */
function installKonturAdultsCapGuard(): void {
  if (typeof window === "undefined" || adultsCapGuardInstalled) {
    return;
  }
  adultsCapGuardInstalled = true;

  // Clamp incoming ?adultsCount= query param if greater than MAX_ADULTS_COUNT
  try {
    const url = new URL(window.location.href);
    const rawAdults = url.searchParams.get("adultsCount");
    if (rawAdults) {
      const parsed = Number.parseInt(rawAdults, 10);
      if (Number.isFinite(parsed) && parsed > MAX_ADULTS_COUNT) {
        url.searchParams.set("adultsCount", String(MAX_ADULTS_COUNT));
        window.history.replaceState(
          null,
          "",
          url.pathname + url.search + url.hash
        );
      }
    }
  } catch {
    // Ignore URL replacement errors
  }

  const pruneAdultsItems = (root: ParentNode = document.body) => {
    const items = root.querySelectorAll<HTMLElement>(
      '[data-tid="MenuItem__root"]'
    );
    items.forEach((item) => {
      const count = parseAdultsMenuItemValue(item);
      if (count !== null && count > MAX_ADULTS_COUNT) {
        item.style.setProperty("display", "none", "important");
        item.setAttribute("aria-hidden", "true");
        item.setAttribute("data-adults-capped", "true");
        if (item instanceof HTMLButtonElement) {
          item.disabled = true;
        }
      }
    });
  };

  if (document.body) {
    pruneAdultsItems(document.body);
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.matches('[data-tid="MenuItem__root"]')) {
              pruneAdultsItems(node.parentElement || document.body);
            } else if (node.querySelector('[data-tid="MenuItem__root"]')) {
              pruneAdultsItems(node);
            }
          }
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Prevent clicking or ArrowDown-navigating past 7 inside AdultsCountSelect menu
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const menuItem = target?.closest('[data-tid="MenuItem__root"]');
      if (!menuItem) return;
      const count = parseAdultsMenuItemValue(menuItem);
      if (count !== null && count > MAX_ADULTS_COUNT) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key !== "ArrowDown") return;
      const openMenus = document.querySelectorAll<HTMLElement>(
        '[data-tid="Select__menu"]'
      );
      for (const menu of openMenus) {
        const items = Array.from(
          menu.querySelectorAll<HTMLElement>('[data-tid="MenuItem__root"]')
        );
        if (items.length <= MAX_ADULTS_COUNT) continue;
        const firstVal = parseAdultsMenuItemValue(items[0]);
        if (firstVal === null) continue;
        // If item #7 is already focused/active or hovered at the bottom of visible list, stop ArrowDown
        const seventh = items[MAX_ADULTS_COUNT - 1];
        if (
          seventh &&
          (document.activeElement === seventh ||
            seventh.getAttribute("data-visual-state-hover") !== null)
        ) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    },
    true
  );
}

/**
 * Checks whether Контур.Отель allows embedding the widget on the current origin
 * (e.g. returns `true` on https://hyzhinalesnika.ru, `false` on localhost unless
 * localhost is added to allowed domains in Контур.Отель settings).
 */
export function checkKonturWidgetAccess(
  hotelId: string = SITE_CONFIG.konturHotelId
): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  let cached = accessCache.get(hotelId);
  if (!cached) {
    cached = fetch(
      `https://bookonline24.ru/widget/api/v1/widget-access/${encodeURIComponent(
        hotelId
      )}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    )
      .then(async (res) => {
        if (!res.ok) return false;
        const data: unknown = await res.json();
        return data === true;
      })
      .catch(() => false);

    accessCache.set(hotelId, cached);
  }

  return cached;
}

/**
 * Loads https://bookonline24.ru/widget.js using the official Контур.Отель loader
 * and initializes HotelWidget v2 once per browser session if the current domain is permitted.
 */
export async function ensureKonturHotelInitialized(
  hotelId: string = SITE_CONFIG.konturHotelId
): Promise<HotelWidgetGlobal | null> {
  if (typeof window === "undefined") {
    return null;
  }

  installKonturAdultsCapGuard();

  const allowedOnCurrentOrigin = await checkKonturWidgetAccess(hotelId);
  if (!allowedOnCurrentOrigin) {
    return null;
  }

  if (!scriptPromise) {
    scriptPromise = new Promise<HotelWidgetGlobal>((resolve, reject) => {
      if (window.HotelWidget) {
        resolve(window.HotelWidget);
        return;
      }

      let done = false;
      const finish = () => {
        if (done) return;
        if (window.HotelWidget) {
          done = true;
          resolve(window.HotelWidget);
        }
      };

      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${KONTUR_SCRIPT_SRC}"]`
      );

      if (existing) {
        existing.addEventListener("load", finish);
        existing.addEventListener("error", () => {
          scriptPromise = null;
          reject(new Error("Не удалось загрузить скрипт Контур.Отель"));
        });
        return;
      }

      // Official Контур.Отель script injection pattern
      const l = document.createElement("script") as HTMLScriptElement & {
        onreadystatechange?: (() => void) | null;
        readyState?: string;
      };
      l.type = "text/javascript";
      l.src = KONTUR_SCRIPT_SRC;
      l.async = true;
      l.onload = l.onreadystatechange = function () {
        const state = l.readyState;
        if (!done && (!state || state === "loaded" || state === "complete")) {
          finish();
        }
      };
      l.onerror = () => {
        scriptPromise = null;
        reject(
          new Error("Не удалось загрузить https://bookonline24.ru/widget.js")
        );
      };

      const firstScript = document.getElementsByTagName("script")[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(l, firstScript);
      } else {
        document.head.appendChild(l);
      }
    });
  }

  const hw = await scriptPromise;

  if (initializedHotelId !== hotelId) {
    hw.init({
      hotelId,
      version: "2",
      theme: KONTUR_GLOBAL_THEME,
      hooks: {
        onError: (e) => {
          console.warn("[Контур.Отель] onError", e);
        },
        onInit: () => {
          if (process.env.NODE_ENV === "development") {
            console.info("[Контур.Отель] onInit — модуль инициализирован");
          }
        },
        onBooking: (v) => {
          if (typeof window.ym === "function") {
            window.ym(98987390, "reachGoal", "kontur_booking", v);
          }
        },
      },
    });
    initializedHotelId = hotelId;
  }

  return hw;
}

export interface MountKonturResult {
  allowed: boolean;
  cleanup: () => void;
}

/**
 * Mounts a Контур.Отель widget module into `config.appearance.container`
 * and returns an SPA-safe cleanup function for Next.js route changes.
 */
export async function mountKonturWidget(
  config: KonturAddConfig,
  hotelId: string = SITE_CONFIG.konturHotelId
): Promise<MountKonturResult> {
  const hw = await ensureKonturHotelInitialized(hotelId);
  if (!hw) {
    return { allowed: false, cleanup: () => {} };
  }

  const containerEl = document.getElementById(config.appearance.container);
  if (!containerEl) {
    return { allowed: true, cleanup: () => {} };
  }

  const widgetId = hw.add(config);

  return {
    allowed: true,
    cleanup: () => {
      if (!widgetId || !window.HotelWidget) return;
      // Use captured `containerEl` reference because React detaches the node before useEffect cleanup
      if (containerEl.childElementCount > 0) {
        try {
          window.HotelWidget.remove(widgetId);
        } catch {
          // Ignore cleanup errors if already removed
        }
      }
    },
  };
}

/**
 * Highlights the `#booking` bar or centered calendar and opens Контур.Отель's interactive
 * calendar (or opens the full booking modal immediately if both dates are already selected).
 */
export function activateKonturBookingSection(sectionEl: HTMLElement): void {
  const calendarCard = sectionEl.querySelector<HTMLElement>(
    '[style*="--bm-theme-filterContainer-bg"] > div'
  );
  const pulseTarget =
    sectionEl.querySelector<HTMLElement>(".forest-glass") ||
    calendarCard ||
    sectionEl;
  pulseTarget.classList.remove("booking-focus-pulse");
  // Trigger reflow so repeated clicks replay the amber highlight pulse
  void pulseTarget.offsetWidth;
  pulseTarget.classList.add("booking-focus-pulse");

  const startField = sectionEl.querySelector<HTMLElement>(
    '[data-tid="DateRangePicker__start"]'
  );
  const endField = sectionEl.querySelector<HTMLElement>(
    '[data-tid="DateRangePicker__end"]'
  );
  const searchBtn = sectionEl.querySelector<HTMLButtonElement>(
    ".WidgetBookingControlButtonContainer button"
  );

  const hasFormattedDate = (el: HTMLElement | null) =>
    Boolean(el && /\d{2}\.\d{2}\.\d{4}/.test(el.textContent || ""));

  if (startField || endField) {
    if (
      hasFormattedDate(startField) &&
      hasFormattedDate(endField) &&
      searchBtn
    ) {
      searchBtn.click();
      return;
    }

    const targetField = hasFormattedDate(startField) ? endField : startField;
    if (targetField) {
      const focusable =
        targetField.querySelector<HTMLElement>(
          '[tabindex]:not([tabindex="-1"]), input'
        ) || targetField;
      focusable.focus({ preventScroll: true });
      focusable.click();
      return;
    }
  }

  if (searchBtn) {
    searchBtn.click();
    return;
  }

  // Fallback booking bar (e.g. non-whitelisted preview host or while script loads)
  const dateInputs = Array.from(
    sectionEl.querySelectorAll<HTMLInputElement>('input[type="date"]')
  );
  if (dateInputs.length > 0) {
    const emptyInput = dateInputs.find((inp) => !inp.value) || dateInputs[0];
    emptyInput.focus({ preventScroll: true });
    try {
      emptyInput.showPicker?.();
    } catch {
      // Ignore if browser restricts programmatic showPicker
    }
  }
}
