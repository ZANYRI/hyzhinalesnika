"use client";

import React, { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Server-rendered content remains visible without JavaScript. Only animate
    // sections still below the viewport after hydration.
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.dataset.reveal = "visible";
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal="visible"
      style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as React.CSSProperties}
      className={`reveal-section ${className}`}
    >
      {children}
    </div>
  );
}
