import { SITE_CONFIG } from "@/data/site";
import { getAnalyticsChoice } from "@/lib/analytics-consent";

export const METRICA_COUNTER_ID = 98987390;
export const METRICA_SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";
export type MetricaGoal = "kontur_booking" | "callback_sent" | "phone_click" | "messenger_click" | "booking_page";
type GoalParameters = {
  form?: "callback" | "booking_assistance";
  channel?: "whatsapp" | "telegram" | "max" | "instagram";
};
type MetricaFunction = ((counterId: number, action: string, ...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
  hyzhinaQueue?: boolean;
};

declare global {
  interface Window { ym?: MetricaFunction; }
}

let initialized = false;
let lastPage: string | null = null;
const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "gclid"];

export function isMetricaSite() {
  return typeof window !== "undefined" && window.location.origin === SITE_CONFIG.url;
}

/** Omit hash fragments and arbitrary query fields, including booking/form data. */
export function analyticsUrl(value: string): string {
  if (!value) return "";
  try {
    const url = new URL(value, SITE_CONFIG.url);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    const clean = new URL(url.origin + url.pathname);
    for (const key of CAMPAIGN_KEYS) {
      const item = url.searchParams.get(key);
      if (item) clean.searchParams.set(key, item);
    }
    return clean.href;
  } catch { return ""; }
}

export function initializeMetrica() {
  if (!isMetricaSite() || getAnalyticsChoice() !== "granted") return false;
  if (initialized) return true;
  if (!window.ym) {
    const queue: MetricaFunction = (...args) => { (queue.a ??= []).push(args); };
    queue.l = Date.now();
    queue.hyzhinaQueue = true;
    window.ym = queue;
  }
  try {
    window.ym(METRICA_COUNTER_ID, "init", {
      defer: true, accurateTrackBounce: true,
      webvisor: false, clickmap: false, trackLinks: false,
    });
    initialized = true;
    return true;
  } catch { return false; }
}

export function trackMetricaGoal(goal: MetricaGoal, parameters?: GoalParameters) {
  if (!initializeMetrica()) return;
  try {
    // Only explicitly allowed categorical values can leave the application.
    const safe: GoalParameters = {};
    if (parameters?.form === "callback" || parameters?.form === "booking_assistance") safe.form = parameters.form;
    if (["whatsapp", "telegram", "max", "instagram"].includes(parameters?.channel || "")) safe.channel = parameters!.channel;
    if (Object.keys(safe).length) window.ym?.(METRICA_COUNTER_ID, "reachGoal", goal, safe);
    else window.ym?.(METRICA_COUNTER_ID, "reachGoal", goal);
  } catch { /* Analytics must never interrupt booking, contact forms or navigation. */ }
}

export function trackMetricaPage() {
  if (!initializeMetrica()) return;
  const url = analyticsUrl(window.location.href);
  if (!url || url === lastPage) return;
  try {
    window.ym?.(METRICA_COUNTER_ID, "hit", url, {
      title: document.title, referer: lastPage || analyticsUrl(document.referrer),
    });
    lastPage = url;
    if (window.location.pathname === "/booking") trackMetricaGoal("booking_page");
  } catch { /* The rest of the page remains usable if the library is unavailable. */ }
}

export function contactGoal(href: string): { goal: MetricaGoal; parameters?: GoalParameters } | null {
  if (href === SITE_CONFIG.phoneHref) return { goal: "phone_click" };
  const contacts = [
    [SITE_CONFIG.whatsappHref, "whatsapp"], [SITE_CONFIG.telegramHref, "telegram"],
    [SITE_CONFIG.maxHref, "max"], [SITE_CONFIG.instagramHref, "instagram"],
  ] as const;
  try {
    const url = new URL(href, SITE_CONFIG.url);
    for (const [target, channel] of contacts) {
      if (!target) continue;
      const expected = new URL(target);
      if (url.origin === expected.origin && url.pathname === expected.pathname) {
        return { goal: "messenger_click", parameters: { channel } };
      }
    }
  } catch { /* Ignore malformed and non-contact URLs. */ }
  return null;
}

export function stopMetrica() {
  if (typeof window === "undefined" || !initialized) return;
  try {
    if (window.ym?.hyzhinaQueue) {
      window.ym.a = window.ym.a?.filter(args => args[0] !== METRICA_COUNTER_ID);
    } else window.ym?.(METRICA_COUNTER_ID, "destruct");
    for (const value of document.cookie.split(";")) {
      const name = value.trim().split("=")[0];
      if (!name.startsWith("_ym_")) continue;
      for (const domain of ["", `; Domain=${window.location.hostname}`, `; Domain=.${window.location.hostname}`]) {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure${domain}`;
      }
    }
  } catch { /* Event helpers also check the choice before every call. */ }
  initialized = false;
  lastPage = null;
}
