export const BOOKING_POPUP_DELAY_MS = 90_000;
const TICK_MS = 1_000;

export function popupDismissalKey(pathname: string): string {
  return `hyzhina:booking-popup:dismissed:${pathname}`;
}

export function wasPopupDismissed(key: string): boolean {
  try { return sessionStorage.getItem(key) === "1"; }
  catch { return false; }
}

export function rememberPopupDismissal(key: string): void {
  try { sessionStorage.setItem(key, "1"); }
  catch { /* Closing still works when browser storage is unavailable. */ }
}

/** Count visible time and defer opening until other modal dialogs are closed. */
export function startBookingPopupTimer(key: string, onShow: () => void): () => void {
  if (wasPopupDismissed(key)) return () => {};
  let visibleTime = 0;
  const timer = window.setInterval(() => {
    if (wasPopupDismissed(key)) { window.clearInterval(timer); return; }
    if (document.visibilityState !== "visible") return;
    visibleTime += TICK_MS;
    if (visibleTime >= BOOKING_POPUP_DELAY_MS && !document.querySelector('[role="dialog"][aria-modal="true"]')) {
      window.clearInterval(timer);
      onShow();
    }
  }, TICK_MS);
  return () => window.clearInterval(timer);
}
