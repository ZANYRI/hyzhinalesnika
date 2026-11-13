"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { X } from "@phosphor-icons/react";

const COOKIE_NAME = "hyzhina_cookie_notice";
const subscribe = () => () => {};
const serverSnapshot = () => true;

function noticeSeen() {
  try { return document.cookie.split(";").some(cookie => cookie.trim() === `${COOKIE_NAME}=seen`); }
  catch { return false; }
}

export function CookieNotice() {
  const seen = useSyncExternalStore(subscribe, noticeSeen, serverSnapshot);
  const [dismissed, setDismissed] = useState(false);

  function close() {
    setDismissed(true);
    try { document.cookie = `${COOKIE_NAME}=seen; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`; }
    catch { /* Keep the notice closed for this page when cookies are blocked. */ }
  }

  if (seen || dismissed) return null;

  return (
    <aside aria-label="Уведомление об использовании cookie" className="fixed bottom-4 left-4 z-40 w-fit max-w-[calc(100%_-_6rem)] rounded-xl border border-line bg-surface py-2 pr-2 pl-3 text-[11px] leading-snug text-muted shadow-sm sm:bottom-6 sm:left-6 sm:max-w-sm">
      <div className="flex items-start gap-2">
        <p className="py-1">Мы используем cookie для работы сайта и статистики посещений. <Link href="/cookie-policy" className="text-accent underline underline-offset-2">Подробнее</Link></p>
        <button type="button" onClick={close} aria-label="Закрыть уведомление о cookie" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-soft hover:text-accent-hover"><X size={14} weight="thin" /></button>
      </div>
    </aside>
  );
}
