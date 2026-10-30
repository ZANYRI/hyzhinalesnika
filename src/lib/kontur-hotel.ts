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
        window.history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
    }
  } catch {
    // Ignore URL replacement errors
  }

  const pruneAdultsItems = (root: ParentNode = document.body) => {
    const items = root.querySelectorAll<HTMLElement>('[data-tid="MenuItem__root"]');
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
            } else if (
              node.querySelector('[data-tid="MenuItem__root"]')
            ) {
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
 * Highlights the `#booking` bar and opens Контур.Отель's interactive calendar
 * (or opens the full booking modal immediately if both dates are already selected).
 */
export function activateKonturBookingSection(sectionEl: HTMLElement): void {
  const pulseTarget =
    sectionEl.querySelector<HTMLElement>(".forest-glass") || sectionEl;
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
    if (hasFormattedDate(startField) && hasFormattedDate(endField) && searchBtn) {
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
