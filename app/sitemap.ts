import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/profile";
import { caseSlugs } from "@/lib/content";
import { casePath } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { "pt-BR": `${siteUrl}/`, en: `${siteUrl}/en` } },
    },
    {
      url: `${siteUrl}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { "pt-BR": `${siteUrl}/`, en: `${siteUrl}/en` } },
    },
    ...caseSlugs.flatMap((slug) =>
      (["pt", "en"] as const).map((l) => ({
        url: `${siteUrl}${casePath(l, slug)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: l === "pt" ? 0.9 : 0.7,
        alternates: { languages: { "pt-BR": `${siteUrl}${casePath("pt", slug)}`, en: `${siteUrl}${casePath("en", slug)}` } },
      })),
    ),
  ];
}
