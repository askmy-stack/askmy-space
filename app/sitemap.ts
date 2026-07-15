import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((p) => ({
      url: `${siteConfig.url}/work/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
