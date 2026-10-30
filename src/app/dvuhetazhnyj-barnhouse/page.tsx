import type { Metadata } from "next";
import { CABINS } from "@/data/cabins";
import { CabinDetailView } from "@/components/CabinDetailView";

const cabin = CABINS.bereza;

export const metadata: Metadata = {
  title: cabin.seoTitle,
  description: cabin.seoDescription,
  alternates: {
    canonical: cabin.slug,
  },
};

export default function DvuhetazhnyjBarnhousePage() {
  return <CabinDetailView cabin={cabin} />;
}
