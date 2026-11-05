import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { BlogSection } from "@/components/BlogSection";
export const metadata: Metadata = withSocialMetadata({title:'Новости и путеводители | Хижина лесника',description:'Путеводители базы отдыха «Хижина лесника» по Архызу: дорога на автомобиле и общественном транспорте, интересные места и маршруты рядом с домиками.',alternates:{canonical:"/news"}});
export default function NewsPage() { return <><PageStructuredData metadata={metadata} />{<ContentPage title="Новости" eyebrow="Истории и маршруты" description="Путеводители по Архызу, полезные советы и новости нашей базы отдыха."><BlogSection /></ContentPage>}</>; }
