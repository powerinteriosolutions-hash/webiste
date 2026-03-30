import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PowerInterio",
    short_name: "PowerInterio",
    description:
      "PowerInterio interior design portfolio for premium residential and commercial spaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f2ea",
    theme_color: "#9d7145",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
