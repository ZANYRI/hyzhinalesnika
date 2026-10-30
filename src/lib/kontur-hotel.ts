import { SITE_CONFIG } from "@/data/site";

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
}

export interface HotelWidgetGlobal {
  init: (config: {
    hotelId: string;
    version: "2";
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

const accessCache = new Map<string, Promise<boolean>>();
let scriptPromise: Promise<HotelWidgetGlobal> | null = null;
let initializedHotelId: string | null = null;

/**
 * Checks whether Контур.Отель allows embedding the widget on the current origin
 * (e.g. returns `true` on https://hyzhinalesnika.ru, `false` on localhost unless
 * localhost is added to allowed domains in Контур.Отель settings).
 * Checking beforehand prevents widget.js from firing a console.error in Next.js Dev Overlay.
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
      const el = document.getElementById(config.appearance.container);
      if (el && el.childElementCount > 0) {
        try {
          window.HotelWidget.remove(widgetId);
        } catch {
          // Ignore cleanup errors if container already detached
        }
      }
    },
  };
}
