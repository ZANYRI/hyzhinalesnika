import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  Eye,
} from "@phosphor-icons/react/dist/ssr";
import { BLOG_POSTS } from "@/data/blog";

export function EyeCount({ views }: { views: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[#a8b9ae]">
      <Eye size={15} className="text-[#d49a5a]" />
      <span>{views}</span>
    </span>
  );
}

export function BlogSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {BLOG_POSTS.map((post, idx) => {
        const isFeatured = idx === 0;
        return (
          <article
            key={post.slug}
            className={`group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#102419] p-4 transition hover:border-[#d49a5a]/45 sm:p-5 ${
              isFeatured ? "lg:col-span-7" : "lg:col-span-5"
            }`}
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
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1">
                <div className="flex items-center gap-2.5 text-xs text-[#a8b9ae]">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={14} className="text-[#d49a5a]" />
                    <time>{post.date}</time>
                  </span>
                  {post.category && (
                    <>
                      <span>·</span>
                      <span className="text-[#d49a5a]">
                        {post.category.title}
                      </span>
                    </>
                  )}
                </div>
                <EyeCount views={post.views} />
              </div>

              <h3 className="mt-3 px-1 font-moderustic text-xl font-bold leading-snug text-[#f3f5f0] transition group-hover:text-[#d49a5a] sm:text-2xl">
                <Link href={post.href}>{post.title}</Link>
              </h3>

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
                <span>Читать путеводитель</span>
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
