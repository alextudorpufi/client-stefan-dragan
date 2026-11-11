const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const parsedUrl = configuredUrl ? new URL(configuredUrl) : undefined;

if (parsedUrl && !["http:", "https:"].includes(parsedUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP or HTTPS URL.");
}

export const siteUrl = parsedUrl?.origin;
export const isIndexable = process.env.SITE_INDEXABLE === "true" && Boolean(siteUrl);
export const metadataBase = new URL(siteUrl ?? "http://localhost:3000");
