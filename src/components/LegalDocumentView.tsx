import React from "react";
import Link from "next/link";
import { LegalBlock } from "@/data/legal";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LegalDocumentViewProps {
  title: string;
  blocks: LegalBlock[];
}

export function LegalDocumentView({ title, blocks }: LegalDocumentViewProps) {
  return (
    <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1100px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-[#a8b9ae]"
        >
          <Link href="/" className="transition hover:text-[#d49a5a]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-[#f3f5f0]">{title}</span>
        </nav>

        <article className="mt-6 rounded-3xl border border-white/10 bg-[#102419] p-6 sm:p-10 lg:p-12">
          <h1 className="font-moderustic text-2xl font-bold leading-tight tracking-tight text-[#f3f5f0] sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#d6e0d9] sm:text-[15.5px]">
            {blocks.map((block, idx) =>
              block.type === "h2" ? (
                <h2
                  key={idx}
                  className="pt-5 font-moderustic text-lg font-bold text-[#d49a5a] sm:text-xl"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={idx} className="break-words">
                  {block.text}
                </p>
              )
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
