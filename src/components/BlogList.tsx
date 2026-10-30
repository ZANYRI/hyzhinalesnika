"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPostSummary } from "@/data/blog";

export function EyeCount({ views }: { views: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-[#888]">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4 text-[#bdbdbd]"
        aria-hidden="true"
      >
        <path d="M12 5c-5.5 0-9.8 4.2-11 7 1.2 2.8 5.5 7 11 7s9.8-4.2 11-7c-1.2-2.8-5.5-7-11-7zm0 11.5A4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
      </svg>
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1260px] px-4 pt-20 pb-20 sm:px-6 sm:pt-24">
      {/* Top "Разделы" Button & Dropdown matching blog_0.png */}
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex items-center gap-2.5 rounded-[5px] bg-white px-4 py-2 text-[14px] font-bold text-[#1456d8] shadow-xs transition hover:bg-[#f4f6fa] cursor-pointer"
        >
          <svg
            viewBox="0 0 20 16"
            fill="currentColor"
            className="h-3.5 w-4"
            aria-hidden="true"
          >
            <rect x="0" y="0" width="18" height="2.2" rx="1" />
            <rect x="0" y="4.5" width="12" height="2.2" rx="1" />
            <rect x="0" y="9" width="16" height="2.2" rx="1" />
            <rect x="0" y="13.5" width="10" height="2.2" rx="1" />
          </svg>
          <span>{activeCategoryLabel || "Разделы"}</span>
        </button>

        {menuOpen && (
          <div className="absolute left-0 z-20 mt-2 w-64 rounded-lg bg-white py-2 text-sm text-[#222] shadow-xl">
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 transition hover:bg-[#f3f5ef] hover:text-[#90754b]"
            >
              Все записи блога
            </Link>
            <Link
              href="/putevoditeli-marshruty"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 transition hover:bg-[#f3f5ef] hover:text-[#90754b]"
            >
              Путеводители / маршруты
            </Link>
          </div>
        )}
      </div>

      {/* Blog Cards */}
      <div className="mt-7 space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[3px] bg-white px-6 py-5 text-[#333] shadow-sm sm:px-7 sm:py-6"
          >
            <time className="block font-moderustic text-[13px] text-[#7a7a7a]">
              {post.date}
            </time>

            <h2 className="mt-1">
              <Link
                href={post.href}
                className="font-moderustic text-[20px] leading-snug font-normal text-[#d89835] underline transition hover:text-[#90754b] sm:text-[21px]"
              >
                {post.title}
              </Link>
            </h2>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
              <Link href={post.href} className="block shrink-0 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  loading="lazy"
                  className="h-[76px] w-[120px] object-cover transition hover:opacity-90"
                />
              </Link>

              {post.excerpt && (
                <p className="font-moderustic text-[16.5px] leading-relaxed text-[#4f4f4f]">
                  {post.excerpt}
                </p>
              )}
            </div>

            <div className="mt-5 border-t border-[#efefef] pt-3">
              <EyeCount views={post.views} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
