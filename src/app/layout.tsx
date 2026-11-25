import { Suspense } from "react";
import type { Metadata } from "next";
import { withSocialMetadata, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/social-metadata";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { CookieNotice } from "@/components/CookieNotice";
import { FloatingContacts } from "@/components/FloatingContacts";
import { CleanHashScroll } from "@/components/CleanHashScroll";
import { SiteStructuredData } from "@/components/StructuredData";
import { YandexMetrica } from "@/components/YandexMetrica";
import { SITE_SEASON } from "@/lib/season";

export const metadata: Metadata = withSocialMetadata({
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: HOME_TITLE, template: "%s" },
  description: HOME_DESCRIPTION,
  icons: {
    icon: [
      { url: "/images/brand/favicon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/brand/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/images/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-season={SITE_SEASON} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-canvas font-montserrat text-ink antialiased selection:bg-action selection:text-on-action">
        <SiteStructuredData />
        {children}
        <Suspense fallback={null}>
          <CleanHashScroll />
          <YandexMetrica />
        </Suspense>
        <CookieNotice />
        <FloatingContacts />
      </body>
    </html>
  );
}
