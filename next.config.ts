import type { NextConfig } from "next";
import path from "path";

const defaultSiteUrl = "https://poweroninterio.com";
const defaultGitHubPagesSiteUrl = "https://powerinteriosolutions-hash.github.io";

type DeployTarget = "local" | "github-pages" | "vercel";

const normalizePathPrefix = (value: string) => {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, "");

const toAbsoluteUrl = (value?: string) => {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return normalizeSiteUrl(value);
  }

  return normalizeSiteUrl(`https://${value}`);
};

const detectDeployTarget = (): DeployTarget => {
  const explicitTarget = process.env.DEPLOY_TARGET?.trim().toLowerCase();

  if (explicitTarget === "github" || explicitTarget === "github-pages") {
    return "github-pages";
  }

  if (explicitTarget === "vercel") {
    return "vercel";
  }

  if (process.env.VERCEL === "1") {
    return "vercel";
  }

  if (process.env.GITHUB_ACTIONS === "true" || process.env.GITHUB_PAGES === "true") {
    return "github-pages";
  }

  return "local";
};

const deployTarget = detectDeployTarget();
const isGitHubPages = deployTarget === "github-pages";
const vercelSiteUrl = toAbsoluteUrl(
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_BRANCH_URL ??
    process.env.VERCEL_URL,
);
const configuredSiteUrl =
  process.env.SITE_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isGitHubPages
    ? defaultGitHubPagesSiteUrl
    : deployTarget === "vercel"
      ? vercelSiteUrl ?? defaultSiteUrl
      : "http://localhost:3000");
const publicSiteUrl = normalizeSiteUrl(
  toAbsoluteUrl(configuredSiteUrl) ?? defaultGitHubPagesSiteUrl,
);
const basePath = isGitHubPages ? normalizePathPrefix(new URL(publicSiteUrl).pathname) : "";

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_DEPLOY_TARGET: deployTarget,
    NEXT_PUBLIC_SITE_URL: publicSiteUrl,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;
