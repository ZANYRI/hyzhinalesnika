import { Suspense } from "react";
import type { Metadata } from "next";
import { withSocialMetadata, HOME_TITLE, HOME_DESCRIPTION } from "@/lib/social-metadata";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site";
import { AUTUMN_ATMOSPHERE } from "@/data/atmosphere";
import { CookieNotice } from "@/components/CookieNotice";
import { FloatingContacts } from "@/components/FloatingContacts";
import { CleanHashScroll } from "@/components/CleanHashScroll";
import { AutumnAtmosphere } from "@/components/AutumnAtmosphere";
import { SiteStructuredData } from "@/components/StructuredData";

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
    <html lang="ru" data-scroll-behavior="smooth">
      <body className="min-h-screen bg-[#102219] font-montserrat text-[#f3f5f0] antialiased selection:bg-[#d49a5a] selection:text-[#102219]">
        <SiteStructuredData />
        {AUTUMN_ATMOSPHERE.enabled && <AutumnAtmosphere />}
        {children}
        <Suspense fallback={null}>
          <CleanHashScroll />
        </Suspense>
        <CookieNotice />
        <FloatingContacts />
      </body>
    </html>
  );
}
