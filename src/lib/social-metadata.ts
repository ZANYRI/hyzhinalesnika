import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import previews from "@/data/social-previews.json";
import versions from "@/data/social-image-versions.json";

export const HOME_TITLE = 'База отдыха "Хижина лесника" в Архызе | Аренда домиков в лесу';
export const HOME_DESCRIPTION = 'Три уютных дома с панорамными окнами в буковом лесу Архыза. Своя терраса, мангальная и костровая зона, парковка и быстрый Wi-Fi. Бронируйте отдых на официальном сайте.';

/** Repeat nested social fields per page: Next merges metadata only one level deep. */
export function withSocialMetadata(metadata: Metadata): Metadata {
  const canonical = metadata.alternates?.canonical;
  const path = typeof canonical === "string" ? canonical
    : canonical instanceof URL ? canonical.toString()
    : canonical?.url.toString() ?? "/";
  const url = new URL(path, SITE_CONFIG.url).toString();
  const pathname = new URL(url).pathname;
  const preview = previews[pathname as keyof typeof previews]
    ?? (pathname.startsWith("/consents/") ? previews["/consents"] : previews.default);
  const title = typeof metadata.title === "string" ? metadata.title : metadata.title && "absolute" in metadata.title ? metadata.title.absolute : HOME_TITLE;
  const description = metadata.description || HOME_DESCRIPTION;
  const imageUrl = new URL(`/images/social/${preview.file}`, SITE_CONFIG.url);
  const version = versions[preview.file as keyof typeof versions];
  if (version) imageUrl.searchParams.set("v", version);
  const image = imageUrl.toString();

  return {
    ...metadata,
    description,
    openGraph: {
      type: pathname === "/stati-i-sovety/post/top-5-mest-v-arhyze" || pathname.startsWith("/kak-dobratsya-") ? "article" : "website",
      locale: "ru_RU",
      siteName: SITE_CONFIG.shortName,
      title,
      description,
      url,
      images: [{ url: image, secureUrl: image, width: 1200, height: 630, type: "image/jpeg", alt: preview.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image, alt: preview.title }] },
  };
}
