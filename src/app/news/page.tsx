import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { BlogSection } from "@/components/BlogSection";
export const metadata: Metadata = {title:'Новости и путеводители | Хижина лесника',description:'Новости базы отдыха «Хижина лесника» и путеводители по Архызу: как добраться и что посмотреть.',alternates:{canonical:"/news"}};
export default function NewsPage() { return <ContentPage title="Новости" eyebrow="Истории и маршруты" description="Путеводители по Архызу, полезные советы и новости нашей базы отдыха."><BlogSection /></ContentPage>; }
