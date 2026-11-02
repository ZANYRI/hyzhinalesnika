"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "@phosphor-icons/react";

const COOKIE_NAME = "hyzhina_cookie_notice";
const CHANGE_EVENT = "hyzhina:cookie-notice";
let dismissedInSession = false;

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

function isDismissed() {
  if (dismissedInSession) return true;
  try { return document.cookie.split(";").some(value => value.trim() === `${COOKIE_NAME}=seen`); }
  catch { return false; }
}

export function CookieNotice() {
  const dismissed = useSyncExternalStore(subscribe, isDismissed, () => true);

  function dismiss() {
    dismissedInSession = true;
    try { document.cookie = `${COOKIE_NAME}=seen; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`; }
    catch { /* Keep the notice dismissed for this session when storage is restricted. */ }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (dismissed) return null;

  return (
    <aside aria-label="Информация о cookie" className="fixed bottom-4 left-4 z-40 flex max-w-[calc(100%_-_6rem)] items-center gap-3 rounded-xl border border-white/10 bg-[#173024]/95 py-2 pr-2 pl-3 text-[11px] leading-snug text-[#c3d0c7] shadow-sm backdrop-blur-sm sm:bottom-6 sm:left-6">
      <p>Используем cookie. <Link href="/cookie-policy" className="text-[#d8ae7f] underline underline-offset-2">Подробнее</Link></p>
      <button type="button" onClick={dismiss} aria-label="Закрыть уведомление о cookie" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#a8b9ae] transition hover:bg-white/5 hover:text-white"><X size={14} weight="thin" /></button>
    </aside>
  );
}
