import type { NextConfig } from "next";
import path from "path";

const repoName = "webiste";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
