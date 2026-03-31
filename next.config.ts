import type { NextConfig } from "next";
import path from "path";

// Base path logic:
// 1) Respect explicit BASE_PATH (e.g., "/webiste" for GitHub Pages).
// 2) Otherwise, derive from NEXT_PUBLIC_SITE_URL so GitHub Pages works even if
//    only that env var is set (pathname portion becomes the base path).
// 3) Fallback to "" for root deployments.
const siteUrlFromEnv = process.env.NEXT_PUBLIC_SITE_URL;
const derivedBasePath =
  siteUrlFromEnv && (() => {
    try {
      const url = new URL(siteUrlFromEnv);
      return url.pathname.replace(/\/$/, "");
    } catch {
      return "";
    }
  })();
const basePath = process.env.BASE_PATH ?? derivedBasePath ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
