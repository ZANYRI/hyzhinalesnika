"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { X } from "@phosphor-icons/react";
import { ANALYTICS_SETTINGS_EVENT, analyticsServerSnapshot, getAnalyticsChoice, setAnalyticsChoice, subscribeAnalyticsChoice } from "@/lib/analytics-consent";

const COOKIE_NAME = "hyzhina_cookie_notice";

export function CookieNotice() {
  const choice = useSyncExternalStore(subscribeAnalyticsChoice, getAnalyticsChoice, analyticsServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, open);
    return () => window.removeEventListener(ANALYTICS_SETTINGS_EVENT, open);
  }, []);

  function decide(value: "granted" | "denied") {
    setAnalyticsChoice(value);
    setSettingsOpen(false);
    try { document.cookie = `${COOKIE_NAME}=seen; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`; }
    catch { /* The analytics choice is also retained in memory for this tab. */ }
  }

  function close() {
    if (choice === "unknown") decide("denied");
    else setSettingsOpen(false);
  }

  if (choice !== "unknown" && !settingsOpen) return null;

  return (
    <aside aria-label="Настройки аналитических cookie" className="fixed bottom-4 left-4 z-40 w-fit max-w-[calc(100%_-_6rem)] rounded-xl border border-line bg-surface py-2 pr-2 pl-3 text-[11px] leading-snug text-muted shadow-sm sm:bottom-6 sm:left-6 sm:max-w-sm">
      <div className="flex items-start gap-2">
        <p className="py-1">Разрешить Яндекс Метрику для статистики посещений? <Link href="/privacy-policy" className="text-accent underline underline-offset-2">Обработка данных</Link> · <Link href="/cookie-policy" className="text-accent underline underline-offset-2">Cookie</Link></p>
        <button type="button" onClick={close} aria-label={choice === "unknown" ? "Продолжить без аналитики" : "Закрыть настройки cookie"} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-soft hover:text-accent"><X size={14} weight="thin" /></button>
      </div>
      <div className="mt-1 flex flex-wrap gap-2">
        <button type="button" onClick={() => decide("granted")} aria-label="Разрешить аналитические cookie" className="min-h-9 rounded-lg border border-accent/50 px-3 py-2 font-semibold text-accent hover:bg-soft">Разрешить</button>
        <button type="button" onClick={() => decide("denied")} aria-label="Отклонить аналитические cookie" className="min-h-9 rounded-lg border border-line px-3 py-2 font-semibold text-muted hover:bg-soft">Отклонить</button>
      </div>
    </aside>
  );
}

export function AnalyticsSettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))} className="cursor-pointer text-left transition hover:text-ink">Настройки cookie</button>;
}
