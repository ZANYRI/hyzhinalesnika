"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { CABIN_LIST } from "@/data/cabins";
import { BLOG_POSTS } from "@/data/blog";

const SEARCH_INDEX = [
  ...CABIN_LIST.map((c) => ({
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
    <div className="mt-6 rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-10">
      <h1 className="font-moderustic text-2xl font-bold tracking-tight text-[#f3f5f0] sm:text-3xl">
        Поиск по сайту
      </h1>

      <div className="mt-5">
        <label
          htmlFor="site-search-input"
          className="mb-2 block text-xs font-medium text-[#a8b9ae]"
        >
          Поисковый запрос
        </label>
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#a8b9ae]"
          />
          <input
            id="site-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Название дома, водопад, маршрут..."
            className="h-12 w-full rounded-xl border border-white/15 bg-[#0a1911] pr-4 pl-11 text-sm text-[#f3f5f0] placeholder:text-[#a8b9ae]/60 outline-none transition focus:border-[#d49a5a]"
          />
        </div>
      </div>

      <div className="mt-7 space-y-3.5">
        {results.length === 0 ? (
          <p className="text-sm text-[#a8b9ae]">
            По вашему запросу ничего не найдено. Попробуйте ввести другое
            ключевое слово.
          </p>
        ) : (
          results.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#163122]/55 p-5 transition hover:border-[#d49a5a]/45"
            >
              <div>
                <h2 className="font-moderustic text-lg font-bold text-[#f3f5f0] transition group-hover:text-[#d49a5a]">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-[#a8b9ae]">
                  {item.snippet}
                </p>
              </div>
              <ArrowRight
                size={18}
                className="shrink-0 text-[#a8b9ae] transition group-hover:translate-x-0.5 group-hover:text-[#d49a5a]"
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
