import Link from "next/link";
import { JsonLd } from "@/components/StructuredData";
import { SITE_CONFIG } from "@/data/site";

export function ArticleBreadcrumbs({ path, headline }: { path: string; headline: string }) {
  const links = [
    { path: "/", label: "Главная" },
    { path: "/news", label: "Новости" },
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [...links, { path, label: headline }].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: new URL(item.path, SITE_CONFIG.url).toString(),
        })),
      }} />
      <nav aria-label="Навигационная цепочка">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {links.map(item => (
            <li key={item.path} className="flex items-center gap-2">
              <Link href={item.path}>{item.label}</Link>
              <span aria-hidden="true">/</span>
            </li>
          ))}
          <li aria-current="page">{headline}</li>
        </ol>
      </nav>
    </>
  );
}
