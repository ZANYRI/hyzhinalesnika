"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { CABIN_LIST, type CabinId } from "@/data/cabins";
import { BLOG_POSTS } from "@/data/blog";
import { CabinTreeEmoji } from "./CabinTreeEmoji";

interface SearchEntry {
  cabinId?: CabinId;
  title: string;
  href: string;
  snippet: string;
}

const SEARCH_INDEX: SearchEntry[] = [
  ...CABIN_LIST.map((c) => ({
    cabinId: c.id,
    title: `${c.titlePrefix} ${c.titleHighlight}`,
    href: c.slug,
    snippet: `${c.cardPrice} · ${c.cardGuests} · ${c.introText}`,
  })),
  ...BLOG_POSTS.map((p) => ({
    title: p.title,
    href: p.href,
    snippet: p.excerpt || `Материал в журнале от ${p.date}`,
  })),
];

export function SearchClient() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQ);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_INDEX;
    return SEARCH_INDEX.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-10">
      <h1 className="font-moderustic text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Поиск по сайту
      </h1>

      <div className="mt-5">
        <label
          htmlFor="site-search-input"
          className="mb-2 block text-xs font-medium text-muted"
        >
          Поисковый запрос
        </label>
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
          />
          <input
            id="site-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название дома, водопад, маршрут..."
            className="h-12 w-full rounded-xl border border-line bg-canvas pr-4 pl-11 text-sm text-ink placeholder:text-muted/60 outline-none transition focus:border-accent"
          />
        </div>
      </div>

      <div className="mt-7 space-y-3.5">
        {results.length === 0 ? (
          <p className="text-sm text-muted">
            По вашему запросу ничего не найдено. Попробуйте ввести другое
            ключевое слово.
          </p>
        ) : (
          results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-soft/55 p-5 transition hover:border-accent/45"
            >
              <div>
                <h2 className="font-moderustic text-lg font-bold text-ink transition group-hover:text-accent">
                  {item.cabinId && (
                    <CabinTreeEmoji id={item.cabinId} className="mr-1.5" />
                  )}
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.snippet}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
