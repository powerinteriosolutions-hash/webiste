import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site-content";
import "./globals.css";

const deployedSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(deployedSiteUrl),
  title: {
    default: "Power On Interio | Interior Design Company",
    template: "%s | Power On Interio",
  },
  description:
    "Power On Interio designs residential and commercial interiors with a client-first approach, creative planning, and end-to-end execution.",
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
    url: deployedSiteUrl,
    title: "Power On Interio | Interior Design Company",
    description:
      "Residential and commercial interior design presented in a premium, SEO-ready company website.",
    siteName: "Power On Interio",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power On Interio | Interior Design Company",
    description:
      "Interior design company website with real brand details, premium positioning, and conversion-focused structure.",
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
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
