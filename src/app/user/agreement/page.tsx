import type { Metadata } from "next";
import { AGREEMENT_BLOCKS } from "@/data/legal";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const metadata: Metadata = {
  title: 'Пользовательское соглашение | База отдыха "Хижина лесника"',
  alternates: {
    canonical: "/users/agreement",
  },
};

export default function UserAgreementAliasPage() {
  return (
    <LegalDocumentView
      title="Пользовательское соглашение"
      blocks={AGREEMENT_BLOCKS}
    />
  );
}
