import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;

  const routes = [
    { path: "", priority: 1.0 },
    { path: "/booking", priority: 0.9 },
    { path: "/dom-dlya-semi", priority: 0.9 },
    { path: "/dvuhetazhnyj-barnhouse", priority: 0.9 },
    { path: "/shale-s-vidom-na-gory", priority: 0.9 },
    {
      path: "/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety",
      priority: 0.8,
    },
    { path: "/stati-i-sovety/post/top-5-mest-v-arhyze", priority: 0.8 },
    { path: "/oferta", priority: 0.4 },
    { path: "/privacy-policy", priority: 0.4 },
    { path: "/users/agreement", priority: 0.3 },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
