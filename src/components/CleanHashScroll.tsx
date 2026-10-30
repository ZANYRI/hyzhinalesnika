"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { activateKonturBookingSection } from "@/lib/kontur-hotel";

const PENDING_SCROLL_KEY = "hyzhina_scroll_target";

export function scrollToSectionById(id: string): boolean {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return false;
  }
  const el = document.getElementById(id);
  if (!el) return false;

  if (id === "booking") {
    const rect = el.getBoundingClientRect();
    const headerSafeTop = 96;
    const calendarSafeBottom = window.innerHeight - 140;
    const needsScroll =
      rect.top < headerSafeTop || rect.bottom > calendarSafeBottom;

    if (needsScroll) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => {
        activateKonturBookingSection(el);
      }, 360);
    } else {
      activateKonturBookingSection(el);
    }
    return true;
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function navigateToSection(
  targetHref: string,
  router: ReturnType<typeof useRouter>,
  currentPathname: string
) {
  if (typeof window === "undefined") return;

  const hashIndex = targetHref.indexOf("#");
  if (hashIndex === -1) {
    router.push(targetHref);
    return;
  }

  const rawPath = targetHref.slice(0, hashIndex);
  const targetPath = rawPath === "" ? currentPathname : rawPath;
  const sectionId = targetHref.slice(hashIndex + 1);
  if (!sectionId) return;

  // Clean any leftover hash in the current URL
  if (window.location.hash) {
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }

  if (targetPath === currentPathname && scrollToSectionById(sectionId)) {
    return;
  }

  try {
    sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId);
  } catch {
    // Ignore storage restrictions
  }
  router.push(targetPath || "/");
}

export function CleanHashScroll() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle initial hash in URL or pending cross-page section scroll
  useEffect(() => {
    let targetId: string | null = null;

    if (window.location.hash) {
      targetId = decodeURIComponent(window.location.hash.slice(1));
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    } else {
      try {
        targetId = sessionStorage.getItem(PENDING_SCROLL_KEY);
        if (targetId) {
          sessionStorage.removeItem(PENDING_SCROLL_KEY);
        }
      } catch {
        targetId = null;
      }
    }

    if (!targetId) return;

    const idToScroll = targetId;
    const raf = requestAnimationFrame(() => {
      if (!scrollToSectionById(idToScroll)) {
        setTimeout(() => scrollToSectionById(idToScroll), 120);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Global capture listener for all <a href="#..."> and <a href="/#..."> links
  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as Element | null;
      const anchor = target?.closest("a[href]");
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || !rawHref.includes("#") || rawHref === "#") return;

      let parsed: URL;
      try {
        parsed = new URL(rawHref, window.location.origin);
      } catch {
        return;
      }

      if (parsed.origin !== window.location.origin || !parsed.hash) return;

      const sectionId = decodeURIComponent(parsed.hash.slice(1));
      if (!sectionId) return;

      e.preventDefault();
      e.stopPropagation();

      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }

      if (
        parsed.pathname === window.location.pathname &&
        scrollToSectionById(sectionId)
      ) {
        return;
      }

      try {
        sessionStorage.setItem(PENDING_SCROLL_KEY, sectionId);
      } catch {
        // Ignore storage restrictions
      }
      router.push(parsed.pathname || "/");
    }

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [router]);

  return null;
}
