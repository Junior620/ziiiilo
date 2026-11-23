import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** Indexation ouverte, sauf l'API et les pages de développement. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/design-tokens"] },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
