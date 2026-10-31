import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { AUTUMN_ATMOSPHERE } from "@/data/atmosphere";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FloatingContacts } from "@/components/FloatingContacts";
import { CleanHashScroll } from "@/components/CleanHashScroll";
import { AutumnAtmosphere } from "@/components/AutumnAtmosphere";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'База отдыха "Хижина лесника" в Архызе | Аренда домиков в лесу',
    template: "%s",
  },
  description:
    'Аренда уютных домиков с панорамными окнами в буковом лесу Архыза. База отдыха "Хижина лесника": закрытая территория, мангальные зоны, парковка, быстрый Wi-Fi.',
  icons: {
    icon: "/images/brand/favicon.ico",
    shortcut: "/images/brand/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'База отдыха "Хижина лесника" в Архызе | Дома в буковом лесу',
    description:
      "Уютные домики с панорамным видом на горы и лес в Архызе. Закрытая территория, своя мангальная и костровая зона у каждого дома.",
    images: [
      {
        url: "/images/home/hero-bg.webp",
        width: 1400,
        height: 800,
        alt: 'База отдыха "Хижина лесника" в Архызе',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#0a1911] font-montserrat text-[#f3f5f0] antialiased selection:bg-[#d49a5a] selection:text-[#0a1911]">
        {AUTUMN_ATMOSPHERE.enabled && <AutumnAtmosphere />}
        {children}
        <Suspense fallback={null}>
          <CleanHashScroll />
        </Suspense>
        <FloatingContacts />
        <ScrollToTop />
      </body>
    </html>
  );
}
