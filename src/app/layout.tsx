import type { Metadata } from "next";
import { MotionFallback } from "@/components/motion-fallback";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company, siteUrl } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Power On Interio | Residential and Commercial Interiors",
    template: "%s | Power On Interio",
  },
  description: company.description,
  keywords: [
    "Power On Interio",
    "Poweroninterio",
    "interior design company",
    "home interior design",
    "office interior design",
    "residential interiors",
    "commercial office interiors",
    "turnkey interior solutions",
  ],
  applicationName: "Power On Interio",
  authors: [{ name: "Power On Interio" }],
  creator: "Power On Interio",
  publisher: "Power On Interio",
  category: "Interior Design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Power On Interio | Residential and Commercial Interiors",
    description: company.description,
    siteName: "Power On Interio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power On Interio | Residential and Commercial Interiors",
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
