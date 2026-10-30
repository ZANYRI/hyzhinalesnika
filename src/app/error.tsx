"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a1911] px-6 text-center text-[#f3f5f0]">
      <span className="font-moderustic text-sm font-bold uppercase tracking-[0.2em] text-[#d49a5a]">
        Хижина лесника
      </span>
      <h1 className="mt-3 font-moderustic text-3xl font-bold tracking-tight text-[#f3f5f0]">
        Не удалось загрузить страницу
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#a8b9ae]">
        Попробуйте обновить страницу или вернуться на главную страницу базы
        отдыха «Хижина лесника».
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-7 text-sm font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98] cursor-pointer"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-white/15 bg-[#102419] px-7 text-sm font-medium text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a]"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
