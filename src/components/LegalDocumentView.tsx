import React from "react";
import { LegalBlock } from "@/data/legal";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LegalDocumentViewProps {
  title: string;
  blocks: LegalBlock[];
}

export function LegalDocumentView({ title, blocks }: LegalDocumentViewProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header variant="inner" bookingAnchor="/#booking" />

      <main className="mx-auto max-w-[1100px] px-4 pt-10 pb-24 sm:px-6 sm:pt-14">


        <article className="mt-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:p-12">
          <h1 className="font-moderustic text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {title}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-[15.5px]">
            {blocks.map((block, idx) =>
              block.type === "h2" ? (
                <h2
                  key={idx}
                  className="pt-5 font-moderustic text-lg font-bold text-accent sm:text-xl"
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
