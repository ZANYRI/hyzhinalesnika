import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { AGREEMENT_BLOCKS } from "@/data/legal";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const metadata: Metadata = withSocialMetadata({
  title: 'Пользовательское соглашение | База отдыха "Хижина лесника"',
  description: "Условия использования сайта базы отдыха «Хижина лесника» и обработки персональных данных.",
  alternates: {
    canonical: "/users/agreement",
  },
});

export default function UserAgreementAliasPage() {
  return (
    <LegalDocumentView
      title="Пользовательское соглашение"
      blocks={AGREEMENT_BLOCKS}
    />
  );
}
