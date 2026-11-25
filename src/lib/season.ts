import config from "@/data/season.json";
import images from "@/data/seasonal-images.json";

export type Season = "winter" | "autumn" | "summer";
export const SITE_SEASON = config.season as Season;
export const SEASON_LABEL = { winter: "Зима", autumn: "Осень", summer: "Лето" }[SITE_SEASON];
export function seasonalImage(src: string, season: Season = SITE_SEASON): string {
  const variants = (images as Record<string, Partial<Record<Season, string>>>)[src];
  return variants?.[season] ?? src;
}
