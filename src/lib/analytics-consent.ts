export type AnalyticsChoice = "unknown" | "granted" | "denied";
export const ANALYTICS_CONSENT_VERSION = "2026-11-07-1";
export const ANALYTICS_SETTINGS_EVENT = "hyzhina:analytics-settings";
const STORAGE_KEY = "hyzhina_analytics_consent";
const CHANGE_EVENT = "hyzhina:analytics-consent";
const MAX_AGE = 365 * 24 * 60 * 60 * 1000;
let sessionChoice: { choice: AnalyticsChoice; expiresAt: number } | null = null;

export function getAnalyticsChoice(): AnalyticsChoice {
  if (typeof window === "undefined") return "unknown";
  if (sessionChoice && sessionChoice.expiresAt > Date.now()) return sessionChoice.choice;
  try {
    const record = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (record?.version === ANALYTICS_CONSENT_VERSION &&
      (record.choice === "granted" || record.choice === "denied") &&
      Number.isFinite(record.expiresAt) && record.expiresAt > Date.now()) return record.choice;
  } catch { /* An unavailable or damaged store never implies consent. */ }
  return "unknown";
}

export function setAnalyticsChoice(choice: "granted" | "denied") {
  const decidedAt = new Date().toISOString();
  const expiresAt = Date.now() + MAX_AGE;
  sessionChoice = { choice, expiresAt };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: ANALYTICS_CONSENT_VERSION, choice, decidedAt, expiresAt,
    }));
  } catch { /* Respect the choice for this tab when persistent storage is blocked. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeAnalyticsChoice(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      sessionChoice = null;
      callback();
    }
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function analyticsServerSnapshot(): AnalyticsChoice { return "unknown"; }
