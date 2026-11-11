import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";
import { isIndexable, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable || !siteUrl) return [];

  return ["/", "/blog", ...posts.filter((post) => !post.isDemo).map((post) => `/blog/${post.slug}`)]
    .map((path) => ({ url: new URL(path, siteUrl).href }));
}
