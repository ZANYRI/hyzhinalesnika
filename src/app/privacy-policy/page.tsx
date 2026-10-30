import type { Metadata } from "next";
import { PRIVACY_BLOCKS } from "@/data/legal";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const metadata: Metadata = {
  title:
    'Политика обработки персональных данных | База отдыха "Хижина лесника"',
  description:
    'Политика в отношении обработки персональных данных посетителей сайта и гостей базы отдыха "Хижина лесника".',
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentView
      title="Политика обработки персональных данных"
      blocks={PRIVACY_BLOCKS}
    />
  );
}
