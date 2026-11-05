import { PageStructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CALLBACK_CONSENT, CONSENT_DOCUMENTS, consentUrl } from "@/data/consents";
import { LegalDocumentView } from "@/components/LegalDocumentView";
import { withSocialMetadata } from "@/lib/social-metadata";

type Props = { params: Promise<{ type: string; version: string }> };

export function generateStaticParams() {
  return CONSENT_DOCUMENTS.map(document => ({ type: document.kind, version: document.version }));
}

async function documentFor({ params }: Props) {
  const { type, version } = await params;
  const document = CONSENT_DOCUMENTS.find(item => item.kind === type && item.version === version);
  if (!document) notFound();
  return document;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const document = await documentFor(props);
  const current = document.kind === CALLBACK_CONSENT.kind && document.version === CALLBACK_CONSENT.version;
  return withSocialMetadata({ title: `${document.title} | Хижина лесника`, description: document.title, alternates: { canonical: consentUrl(document) }, robots: current ? undefined : { index: false, follow: false } });
}

export default async function ConsentPage(props: Props) {
  const document = await documentFor(props);
  const metadata = await generateMetadata(props);
  return <><PageStructuredData metadata={metadata} /><LegalDocumentView title={document.title} blocks={document.paragraphs.map(text => ({ type: "p", text }))}/></>;
}
