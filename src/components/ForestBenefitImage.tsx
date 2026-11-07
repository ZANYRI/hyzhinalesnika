import media from "@/data/forest-media.json";

// This card never needs a source wider than the original 1200px photo.
// Keep native picture selection so every advertised URL is already encoded.
export function ForestBenefitImage() {
  const sizes = "(min-width: 1400px) 440px, (min-width: 1024px) calc((100vw - 80px) / 3), (min-width: 640px) calc((100vw - 64px) / 2), calc(100vw - 32px)";
  const srcSet = (sources: typeof media.avif) => sources.map(source => `${source.src} ${source.width}w`).join(", ");
  return <picture>
    <source type="image/avif" srcSet={srcSet(media.avif)} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet(media.webp)} sizes={sizes} />
    <img src={media.webp[0].src} srcSet={srcSet(media.webp)} sizes={sizes} width={media.width} height={media.height}
      alt="Лес и горы Архыза в тумане" loading="lazy" decoding="async" fetchPriority="low"
      className="absolute inset-0 -z-20 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
  </picture>;
}
