import type { MetadataRoute } from "next";
import { basePath, company, withAbsoluteBasePathRoute, withBasePath } from "@/lib/site-content";

export const dynamic = "force-static";

const manifestEntryPath = `${basePath || ""}/` || "/";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.shortName,
    description:
      "Power On Interio interior design portfolio for premium residential and commercial spaces.",
    start_url: manifestEntryPath,
    scope: manifestEntryPath,
    id: withAbsoluteBasePathRoute("/"),
    display: "standalone",
    background_color: "#f8f2ea",
    theme_color: "#9d7145",
    icons: [
      {
        src: withBasePath("/icon-192.png"),
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: withBasePath("/icon-512.png"),
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
