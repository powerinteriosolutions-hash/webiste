import aboutPage from "@/content/about.json";
import companyData from "@/content/company.json";
import contactPage from "@/content/contact.json";
import homePage from "@/content/home.json";
import projectsPage from "@/content/projects-page.json";
import servicesPage from "@/content/services-page.json";
import sharedSections from "@/content/shared-sections.json";

export const basePath = process.env.NODE_ENV === "production" ? "/webiste" : "";
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

export const siteUrl = companyData.siteUrl;
export const company = companyData.company;
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
