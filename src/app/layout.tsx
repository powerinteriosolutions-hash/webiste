import type { Metadata } from "next";
import { MotionFallback } from "@/components/motion-fallback";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brandAliases, company, siteUrl } from "@/lib/site-content";
import "./globals.css";

const metadataKeywords = Array.from(
  new Set([
    company.name,
    ...brandAliases,
    "interior design company India",
    "interior designers India",
    "home interior design India",
    "office interior design India",
    "turnkey interiors India",
    "commercial office interiors",
    "residential interiors",
    "turnkey interior solutions",
  ]),
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Power On Interio | Interior Design Company for Homes & Offices Across India",
    template: "%s | Power On Interio",
  },
  description: company.description,
  keywords: metadataKeywords,
  applicationName: "Power On Interio",
  authors: [{ name: "Power On Interio" }],
  creator: "Power On Interio",
  publisher: "Power On Interio",
  category: "Interior Design",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Power On Interio | Interior Design Company for Homes & Offices Across India",
    description: company.description,
    siteName: "Power On Interio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power On Interio | Interior Design Company for Homes & Offices Across India",
    description: company.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <MotionFallback />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
