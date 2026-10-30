import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: 'Путеводители и маршруты по Архызу | Блог "Хижина лесника"',
  description:
    "Маршруты и путеводители по самым живописным местам Архыза рядом с базой отдыха «Хижина лесника».",
  alternates: {
    canonical: "/putevoditeli-marshruty",
  },
};

export default function PutevoditeliMarshrutyPage() {
  const filtered = BLOG_POSTS.filter(
    (p) => p.category?.href === "/putevoditeli-marshruty"
  );

  return (
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="/#booking" />
      <main>
        <BlogList
          posts={filtered}
          activeCategoryLabel="Путеводители / маршруты"
        />
      </main>
      <Footer />
    </div>
  );
}
