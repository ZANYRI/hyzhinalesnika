"use client";

import React from "react";
import { SEASONAL_ACTIVITIES } from "@/data/home";

export function SeasonalMarquee() {
  const doubled = [...SEASONAL_ACTIVITIES, ...SEASONAL_ACTIVITIES];

  return (
    <div className="relative w-full overflow-hidden py-1">
      <div
        className="marquee-track gap-5"
        style={{ ["--marquee-duration" as string]: "30s" }}
      >
        {doubled.map((item, idx) => (
          <a
            key={`${item.src}-${idx}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-[250px] shrink-0 rounded-[20px] border-[1.5px] border-[#90754b] bg-[#0e2618] p-5 transition hover:border-[#dbd0bf] sm:w-[272px]"
          >
            <div className="h-[152px] w-full overflow-hidden rounded-[12px]">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
