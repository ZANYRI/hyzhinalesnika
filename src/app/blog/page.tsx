import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: 'Блог об отдыхе в Архызе | База отдыха "Хижина лесника"',
  description:
    "Статьи, советы туристам, маршруты и путеводители по достопримечательностям Архыза от базы отдыха «Хижина лесника».",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0e2618] text-white">
      <Header variant="inner" bookingAnchor="/#booking" />
      <main>
        <BlogList posts={BLOG_POSTS} />
      </main>
      <Footer />
    </div>
  );
}
