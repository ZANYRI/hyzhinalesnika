"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CABIN_LIST } from "@/data/cabins";
import { BLOG_POSTS } from "@/data/blog";

const SEARCH_INDEX = [
  ...CABIN_LIST.map((c) => ({
    title: `${c.titlePrefix} ${c.titleHighlight}`,
    href: c.slug,
    snippet: `${c.cardPrice} • ${c.cardGuests} • ${c.introText}`,
  })),
  ...BLOG_POSTS.map((p) => ({
    title: p.title,
    href: p.href,
    snippet: p.excerpt || `Статья в блоге от ${p.date}`,
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
    <div className="mt-6 rounded-2xl bg-white p-6 text-[#232323] shadow-lg sm:p-10">
      <h1 className="font-moderustic text-2xl font-extrabold text-[#0e2618] sm:text-3xl">
        Поиск по сайту
      </h1>

      <div className="mt-5">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название домика, маршрута или ключевое слово..."
          className="w-full rounded-xl border border-[#cdd2c1] bg-[#fafbf8] px-4 py-3 text-base text-[#1c1c1c] outline-none transition focus:border-[#396448]"
        />
      </div>

      <div className="mt-7 space-y-4">
        {results.length === 0 ? (
          <p className="text-sm text-[#666]">
            По вашему запросу ничего не найдено. Попробуйте изменить запрос.
          </p>
        ) : (
          results.map((item) => (
            <div
              key={item.href}
              className="rounded-xl border border-[#e7eadf] p-4 transition hover:border-[#90754b]"
            >
              <Link
                href={item.href}
                className="font-moderustic text-lg font-bold text-[#396448] underline hover:text-[#90754b]"
              >
                {item.title}
              </Link>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4b4b4b]">
                {item.snippet}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
