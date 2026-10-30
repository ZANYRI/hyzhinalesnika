"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  SEASON_TABS,
  SEASONAL_EXPERIENCES,
  SeasonTabId,
} from "@/data/home";

export function SeasonalExperiences() {
  const [activeTab, setActiveTab] = useState<SeasonTabId>("all");
  const reduce = useReducedMotion();

  const filtered =
    activeTab === "all"
      ? SEASONAL_EXPERIENCES
      : SEASONAL_EXPERIENCES.filter((item) => item.category === activeTab);

  return (
    <div>
      {/* Aureki-style (#sez1) Category Filter Pills */}
      <div
        role="tablist"
        aria-label="Сезонные впечатления"
        className="flex flex-wrap items-center gap-2.5"
      >
        {SEASON_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] cursor-pointer ${
                isActive
                  ? "text-[#0a1911]"
                  : "border border-white/12 bg-[#102419] text-[#d6e0d9] hover:border-white/25 hover:text-[#f3f5f0]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeSeasonTab"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="absolute inset-0 rounded-full bg-[#d49a5a]"
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filtered Editorial Grid */}
      <motion.div
        layout={!reduce}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const cardInner = (
              <>
                <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#08140d]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between px-1 pb-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#d49a5a]">
                      <Compass size={14} />
                      <span>{item.distance}</span>
                    </div>

                    <h3 className="mt-2 font-moderustic text-lg font-bold leading-snug text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#a8b9ae]">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
                    <span>
                      {item.external ? "Открыть на карте" : "Читать маршрут"}
                    </span>
                    {item.external ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowRight size={14} />
                    )}
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="flex"
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full flex-col rounded-3xl border border-white/10 bg-[#102419] p-4 transition hover:border-[#d49a5a]/45"
                  >
                    {cardInner}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="group flex w-full flex-col rounded-3xl border border-white/10 bg-[#102419] p-4 transition hover:border-[#d49a5a]/45"
                  >
                    {cardInner}
                  </Link>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
