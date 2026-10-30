"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CalendarBlank, Eye } from "@phosphor-icons/react";
import { BlogPostSummary } from "@/data/blog";

export function EyeCount({ views }: { views: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#a8b9ae]">
      <Eye size={15} className="text-[#d49a5a]" />
      <span>{views}</span>
    </span>
  );
}

export function BlogList({
  posts,
  activeCategoryLabel,
}: {
  posts: BlogPostSummary[];
  activeCategoryLabel?: string;
}) {
  const isGuidesOnly = Boolean(activeCategoryLabel);

  return (
    <div className="mx-auto max-w-[1400px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <div className="max-w-2xl">
        <h1 className="font-moderustic text-3xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-4xl">
          {activeCategoryLabel || "Журнал и путеводители по Архызу"}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#a8b9ae]">
          Проверенные маршруты, советы по дороге в горы и любимые локации рядом
          с базой отдыха «Хижина лесника».
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <Link
          href="/blog"
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
            !isGuidesOnly
              ? "bg-[#d49a5a] text-[#0a1911]"
              : "border border-white/12 bg-[#102419] text-[#d6e0d9] hover:border-white/25 hover:text-[#f3f5f0]"
          }`}
        >
          Все материалы
        </Link>
        <Link
          href="/putevoditeli-marshruty"
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] ${
            isGuidesOnly
              ? "bg-[#d49a5a] text-[#0a1911]"
              : "border border-white/12 bg-[#102419] text-[#d6e0d9] hover:border-white/25 hover:text-[#f3f5f0]"
          }`}
        >
          Путеводители / маршруты
        </Link>
      </div>

      {/* Editorial Cards */}
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-4 transition hover:border-[#d49a5a]/45 sm:p-5"
          >
            <div>
              <Link
                href={post.href}
                className="block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#08140d]"
              >
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </Link>

              <div className="mt-5 flex items-center justify-between gap-3 px-1">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#a8b9ae]">
                  <CalendarBlank size={14} className="text-[#d49a5a]" />
                  <time>{post.date}</time>
                </span>
                <EyeCount views={post.views} />
              </div>

              <h2 className="mt-3 px-1 font-moderustic text-xl font-bold leading-snug text-[#f3f5f0] transition group-hover:text-[#d49a5a] sm:text-2xl">
                <Link href={post.href}>{post.title}</Link>
              </h2>

              {post.excerpt && (
                <p className="mt-2.5 px-1 text-sm leading-relaxed text-[#a8b9ae]">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="mt-6 px-1 pb-1">
              <Link
                href={post.href}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f3f5f0] transition group-hover:text-[#d49a5a]"
              >
                <span>Читать материал</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
