import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import "./blog.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin", "latin-ext"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const sans = Inter({ variable: "--font-body", subsets: ["latin", "latin-ext"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const title = "Ștefan Drăgan — Un spațiu pentru tine";
const description = "Psihoterapie cognitiv-comportamentală și evaluare clinică online cu Ștefan Drăgan. Un spațiu sigur pentru tine. Prima ședință este gratuită.";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
  title: { default: title, template: "%s | Ștefan Drăgan" },
  description,
  applicationName: "Ștefan Drăgan",
  authors: [{ name: "Ștefan Drăgan" }],
  creator: "Ștefan Drăgan",
  icons: {
    icon: [{ url: "/sd-logo.svg", type: "image/svg+xml", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Ștefan Drăgan",
    title,
    description,
    ...(siteUrl ? { url: "/" } : {}),
  },
  twitter: { card: "summary_large_image", title, description },
  // Keep unfinished template content out of search until launch is explicit.
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ro" className={`${display.variable} ${sans.variable}`}><body id="top"><a className="skip-link" href="#main-content">Sari la conținut</a><SiteHeader />{children}<SiteFooter /></body></html>;
}
