import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const PATHS: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/work/houston", priority: 0.8 },
  { path: "/work/revoluna", priority: 0.8 },
  { path: "/work/sebrae-opp", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, priority }) => [
    {
      url: path ? `${siteConfig.url}${path}` : siteConfig.url,
      changeFrequency: "monthly" as const,
      priority,
    },
    {
      url: `${siteConfig.url}/pt${path}`,
      changeFrequency: "monthly" as const,
      priority: priority - 0.1,
    },
  ]);
}
