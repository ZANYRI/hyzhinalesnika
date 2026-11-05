import type { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { CABIN_LIST } from "@/data/cabins";
import { BLOG_POSTS } from "@/data/blog";

const absolute = (path: string) => new URL(path, SITE_CONFIG.url).toString();
const businessId = `${SITE_CONFIG.url}/#lodging`;
const websiteId = `${SITE_CONFIG.url}/#website`;

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Stable entity IDs connect every page to the same real lodging business. */
export function SiteStructuredData() {
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": websiteId, url: absolute("/"), name: SITE_CONFIG.name, inLanguage: "ru", publisher: { "@id": businessId } },
    { "@type": "LodgingBusiness", "@id": businessId, name: SITE_CONFIG.name, url: absolute("/"), image: absolute("/images/home/cabin-bereza.jpg"), telephone: SITE_CONFIG.phoneHref.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressLocality: "Архыз", addressRegion: "Карачаево-Черкесская Республика", streetAddress: "улица Лесная, 40", addressCountry: "RU" },
      geo: { "@type": "GeoCoordinates", latitude: SITE_CONFIG.coords.lat, longitude: SITE_CONFIG.coords.lng }, sameAs: [SITE_CONFIG.yandexMapsOrgUrl] },
  ] }} />;
}

/** Only facts already published in the page's own source data are emitted. */
export function PageStructuredData({ metadata }: { metadata: Metadata }) {
  const canonical = metadata.alternates?.canonical;
  const path = typeof canonical === "string" ? canonical : canonical instanceof URL ? canonical.toString() : canonical?.url.toString() ?? "/";
  const url = absolute(path);
  const pathname = new URL(url).pathname;
  const title = typeof metadata.title === "string" ? metadata.title
    : metadata.title && "absolute" in metadata.title ? metadata.title.absolute
    : metadata.title && "default" in metadata.title ? metadata.title.default
    : SITE_CONFIG.name;
  const pageId = `${url}#webpage`;
  const page: Record<string, unknown> = { "@type": pathname === "/news" ? "CollectionPage" : "WebPage", "@id": pageId, url, name: title, description: metadata.description, inLanguage: "ru", isPartOf: { "@id": websiteId }, about: { "@id": businessId } };
  const graph: Record<string, unknown>[] = [page];
  const cabin = CABIN_LIST.find(item => item.slug === pathname);
  if (cabin) {
    const id = `${url}#accommodation`;
    page.mainEntity = { "@id": id };
    graph.push({ "@type": "Accommodation", "@id": id, url, name: cabin.cardTitle, description: cabin.cardSubtitle, image: cabin.gallery.map(photo => absolute(photo.src)), containedInPlace: { "@id": businessId }, floorSize: { "@type": "QuantitativeValue", value: Number.parseFloat(cabin.cardArea), unitCode: "MTK" } });
  }
  const article = BLOG_POSTS.find(post => post.href === pathname);
  if (article) {
    const id = `${url}#article`;
    const [day, month, year] = article.date.split(".");
    page.mainEntity = { "@id": id };
    graph.push({ "@type": "Article", "@id": id, url, mainEntityOfPage: { "@id": pageId }, headline: article.title, description: metadata.description, image: absolute(article.thumbnail), datePublished: `${year}-${month}-${day}`, inLanguage: "ru", publisher: { "@id": businessId } });
  }
  if (pathname === "/" || pathname === "/news") {
    const items = pathname === "/" ? CABIN_LIST.map(item => ({ name: item.cardTitle, url: absolute(item.slug) })) : BLOG_POSTS.map(item => ({ name: item.title, url: absolute(item.href) }));
    page.mainEntity = { "@type": "ItemList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, ...item })) };
  }
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
