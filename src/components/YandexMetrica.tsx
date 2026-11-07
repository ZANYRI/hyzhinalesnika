"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { analyticsServerSnapshot, getAnalyticsChoice, subscribeAnalyticsChoice } from "@/lib/analytics-consent";
import { contactGoal, isMetricaSite, METRICA_SCRIPT_URL, stopMetrica, trackMetricaGoal, trackMetricaPage } from "@/lib/metrica";

export function YandexMetrica() {
  const choice = useSyncExternalStore(subscribeAnalyticsChoice, getAnalyticsChoice, analyticsServerSnapshot);
  const pathname = usePathname();
  const enabled = choice === "granted" && isMetricaSite();

  useEffect(() => {
    if (!enabled) { stopMetrica(); return; }
    trackMetricaPage();
  }, [enabled, pathname]);

  useEffect(() => {
    if (!enabled) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button > 1 || !(event.target instanceof Element)) return;
      const href = event.target.closest("a[href]")?.getAttribute("href");
      if (!href) return;
      const result = contactGoal(href);
      if (result) trackMetricaGoal(result.goal, result.parameters);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, [enabled]);

  return enabled ? <Script id="yandex-metrica" src={METRICA_SCRIPT_URL} strategy="afterInteractive" /> : null;
}
