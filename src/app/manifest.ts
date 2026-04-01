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
        src: withBasePath(company.logoPath),
        sizes: "400x150",
        type: "image/png",
      },
    ],
  };
}
