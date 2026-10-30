import type { Metadata } from "next";
import { OFERTA_BLOCKS } from "@/data/legal";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const metadata: Metadata = {
  title: 'Договор публичной оферты | База отдыха "Хижина лесника"',
  description:
    'Публичная оферта о заключении договора предоставления услуг средства размещения на базе отдыха "Хижина лесника" в Архызе.',
  alternates: {
    canonical: "/oferta",
  },
};

export default function OfertaPage() {
  return (
    <LegalDocumentView title="Договор публичной оферты" blocks={OFERTA_BLOCKS} />
  );
}
