"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { WINTER_ATMOSPHERE } from "@/data/atmosphere";

// Deterministic positions keep server/client markup identical; no per-frame JS.
const flakes = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 37 + 9) % 100}%`,
  size: [1.5, 2.1, 2.8, 1.75, 2.4][index % 5],
  duration: `${23 + (index * 7) % 15}s`,
  delay: `${-((index * 11) % 37)}s`,
  drift: `${((index * 13) % 41) - 20}px`,
  opacity: 0.52 + (index % 4) * 0.08,
}));

export function Snowfall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const enabled = WINTER_ATMOSPHERE.enabled && process.env.NEXT_PUBLIC_WINTER_ATMOSPHERE !== "false";

  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    const root = rootRef.current;
    let visible = true;
    const sync = () => { root.dataset.paused = String(document.hidden || !visible); };
    const resize = () => { root.style.setProperty("--snow-travel", `${root.clientHeight + 24}px`); };
    const intersection = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      sync();
    });
    const dimensions = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    intersection?.observe(root);
    dimensions?.observe(root);
    document.addEventListener("visibilitychange", sync);
    resize();
    sync();
    return () => {
      intersection?.disconnect();
      dimensions?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={rootRef} aria-hidden="true" data-snowfall="true" data-paused="false" className="site-snow">
    {flakes.map((flake, index) => <span key={index} className="site-snow-grain" style={{
      left: flake.left, width: flake.size, height: flake.size, opacity: flake.opacity,
      "--snow-duration": flake.duration, "--snow-delay": flake.delay, "--snow-drift": flake.drift,
    } as CSSProperties} />)}
  </div>;
}
