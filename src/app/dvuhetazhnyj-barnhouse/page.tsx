import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { CABINS } from "@/data/cabins";
import { CabinDetailView } from "@/components/CabinDetailView";

const cabin = CABINS.bereza;

export const metadata: Metadata = withSocialMetadata({
  title: cabin.seoTitle,
  description: cabin.seoDescription,
  alternates: {
    canonical: cabin.slug,
  },
});

export default function DvuhetazhnyjBarnhousePage() {
  return <><PageStructuredData metadata={metadata} />{<CabinDetailView cabin={cabin} />}</>;
}
