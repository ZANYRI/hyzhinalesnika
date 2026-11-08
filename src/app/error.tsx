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
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center text-ink">
      <span className="font-moderustic text-sm font-bold uppercase tracking-[0.2em] text-accent">
        Хижина лесника
      </span>
      <h1 className="mt-3 font-moderustic text-3xl font-bold tracking-tight text-ink">
        Не удалось загрузить страницу
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        Попробуйте обновить страницу или вернуться на главную страницу базы
        отдыха «Хижина лесника».
      </p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full bg-action px-7 text-sm font-semibold text-on-action transition hover:bg-action-hover active:scale-[0.98] cursor-pointer"
        >
          Попробовать снова
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-full border border-line bg-surface px-7 text-sm font-medium text-ink transition hover:border-accent/60 hover:text-accent"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
