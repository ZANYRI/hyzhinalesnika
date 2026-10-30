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
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1260px] px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
        <nav
          aria-label="Хлебные крошки"
          className="flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm"
        >
          <Link href="/" className="underline hover:text-[#dbd0bf]">
            Главная
          </Link>
          <span>/</span>
          <span className="text-white/95">{title}</span>
        </nav>

        <article className="mt-6 rounded-2xl bg-white p-6 text-[#232323] shadow-lg sm:p-10 lg:p-12">
          <h1 className="font-moderustic text-2xl leading-tight font-extrabold text-[#0e2618] sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6 space-y-3.5 text-sm leading-relaxed text-[#2c2c2c] sm:text-[15.5px]">
            {blocks.map((block, idx) =>
              block.type === "h2" ? (
                <h2
                  key={idx}
                  className="pt-5 font-moderustic text-lg font-bold text-[#0e2618] sm:text-xl"
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
