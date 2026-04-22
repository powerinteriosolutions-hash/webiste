import aboutPage from "@/content/about.json";
import companyData from "@/content/company.json";
import contactPage from "@/content/contact.json";
import homePage from "@/content/home.json";
import projectsPage from "@/content/projects-page.json";
import servicesPage from "@/content/services-page.json";
import sharedSections from "@/content/shared-sections.json";

const normalizePathPrefix = (value: string) => {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

const normalizeSiteUrl = (value: string) => value.replace(/\/+$/, "");

export const basePath = normalizePathPrefix(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
const optimizedAssetRoot = "/optimized";
const localJpegPattern = /\.(jpe?g)$/i;

const withOptimizedAssetPath = (assetPath: string) => {
  if (!localJpegPattern.test(assetPath)) {
    return assetPath;
  }

  return `${optimizedAssetRoot}${assetPath.replace(localJpegPattern, ".webp")}`;
};

export const withBasePath = (assetPath: string) => {
  if (!assetPath || assetPath.startsWith("http")) {
    return assetPath;
  }

  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${basePath}${withOptimizedAssetPath(normalized)}`;
};

export const withBasePathRoute = (href: string) => {
  if (
    !href ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const [pathWithQuery, hash = ""] = href.split("#");
  const [pathname, query = ""] = pathWithQuery.split("?");
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const routePath = normalized === "/" ? "/" : `${normalized.replace(/\/+$/, "")}/`;
  const querySuffix = query ? `?${query}` : "";
  const hashSuffix = hash ? `#${hash}` : "";

  return `${routePath}${querySuffix}${hashSuffix}`;
};

export const withAbsoluteBasePathRoute = (href: string) => {
  const routePath = withBasePathRoute(href);

  if (
    !routePath ||
    routePath.startsWith("http") ||
    routePath.startsWith("mailto:") ||
    routePath.startsWith("tel:") ||
    routePath.startsWith("#")
  ) {
    return routePath;
  }

  return `${basePath}${routePath}`;
};

export const toAbsoluteSiteUrl = (href: string = "/") => {
  if (!href || href.startsWith("http")) {
    return href || `${siteUrl}/`;
  }

  const [pathWithQuery, hash = ""] = href.split("#");
  const [pathname, query = ""] = pathWithQuery.split("?");
  const normalizedPath = pathname === "/" ? "" : pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  const routePath = normalizedPath ? `${normalizedPath}/` : "./";
  const url = new URL(routePath, `${siteUrl}/`);

  if (query) {
    url.search = query;
  }

  if (hash) {
    url.hash = hash;
  }

  return url.toString();
};

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? companyData.siteUrl);
export const company = companyData.company;
export const brandAliases = Array.from(
  new Set(
    [
      companyData.company.shortName,
      ...(Array.isArray(companyData.company.brandAliases) ? companyData.company.brandAliases : []),
    ].filter((value): value is string => typeof value === "string" && value.trim().length > 0),
  ),
);
export const navLinks = companyData.navLinks;

export const homeContent = homePage;
export const aboutContent = aboutPage;
export const servicesPageContent = servicesPage;
export const projectsPageContent = projectsPage;
export const contactPageContent = contactPage;

export const stats = sharedSections.stats;
export const services = sharedSections.services;
export const reasons = sharedSections.reasons;
export const projects = sharedSections.projects;
export const processSteps = sharedSections.process;
export const testimonials = sharedSections.testimonials;
export const founders = sharedSections.founders;
export const team = sharedSections.team;
export const faqs = sharedSections.faqs;
