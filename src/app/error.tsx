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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0e2618] px-6 text-center text-white">
      <p className="font-great-vibes text-5xl text-[#dbd0bf]">Упс...</p>
      <h1 className="mt-2 font-moderustic text-3xl font-extrabold uppercase text-[#90754b]">
        Произошла ошибка загрузки страницы
      </h1>
      <p className="mt-3 max-w-md text-sm text-white/75">
        Попробуйте обновить страницу или вернуться на главную страницу базы
        отдыха «Хижина лесника».
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-[#90754b] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#a68859] cursor-pointer"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/25 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-[#90754b]"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
