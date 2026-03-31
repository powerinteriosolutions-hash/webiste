import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, MapPin, Ruler, Sparkles } from "lucide-react";
import { projects, projectsPageContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: projectsPageContent.meta.title,
  description: projectsPageContent.meta.description,
};

type GalleryItem = {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  area: string;
  styleNote: string;
  size: "standard" | "wide" | "tall";
};

const residentialGalleryImages = [
  "/residential/residential-bedroom-dark-accent-wall.jpg",
  "/residential/residential-bedroom-marble-headboard.jpg",
  "/residential/residential-bedroom-soft-neutral.jpg",
  "/residential/residential-bedroom-upholstered-headboard.jpg",
  "/residential/residential-kitchen-beige-modern.jpg",
  "/residential/residential-tv-unit-marble-panel.jpg",
  "/residential/residential-wardrobe-corner-storage.jpg",
  "/residential/residential-wardrobe-entry-view.jpg",
  "/residential/residential-wardrobe-white-panel.jpg",
];

const commercialGalleryImages = Array.from(
  { length: 16 },
  (_, index) => `/commercial/comercial-${index + 1}.jpeg`,
);

const locationCycle = ["Bengaluru", "Hyderabad", "Chennai"];
const sizeCycle: GalleryItem["size"][] = ["wide", "standard", "tall", "standard", "wide"];

const residentialTitles = [
  projects[0].name,
  "Master Bedroom Marble Wall",
  "Soft Neutral Bedroom",
  "Upholstered Headboard Suite",
  "Compact Kitchen Reset",
  "Living TV Unit Styling",
  "Wardrobe Corner Storage",
  "Wardrobe Entry View",
  projects[2].name,
];

const residentialDescriptions = [
  "Residential details layered around comfort, with warm textures and elegant wall treatment.",
  "A statement bedroom wall concept that adds depth while keeping the palette calm and cohesive.",
  "Soft residential styling designed for restful ambience, balanced lighting, and practical upkeep.",
  "A premium bedroom headboard treatment that combines hotel-like comfort with daily durability.",
  "Kitchen planning focused on movement, countertop utility, and optimized cabinet workflow.",
  "Media wall and storage composition shaped for clean cable management and visual balance.",
  "Corner wardrobe design that unlocks hard-to-use zones with stronger storage efficiency.",
  "Entry wardrobe arrangement with better circulation and practical day-to-day access.",
  "Storage-focused wardrobe planning with clean paneling and modular organization logic.",
];

const residentialStyles = [
  "Warm Minimal",
  "Marble Accent",
  "Soft Contemporary",
  "Hospitality Home",
  "Functional Premium",
  "Modern Media Wall",
  "Smart Utility",
  "Clean Entry Layout",
  "Storage First",
];

const commercialTitles = [
  "Shared Workspace Deck",
  "Open Collaboration Zone",
  "Coworking Desk Cluster",
  "Group Discussion Table",
  "Townhall Presentation Hall",
  "Interactive Event Floor",
  "Creative Dot Wall Studio",
  "Casual Discussion Lounge",
  "Executive Meeting Room",
  "Open Office Benching",
  "Business Café Seating",
  "Startup Green Collaboration Bay",
  "Executive Cabin Refresh",
  "Conference Table Suite",
  "Reception + Waiting",
  projects[1].name,
];

const commercialDescriptions = [
  "Shared work areas planned for better movement, cleaner zoning, and stronger team interaction.",
  "Layouts designed for group collaboration with practical desk clusters and meeting touchpoints.",
  "Workspace interiors balancing density, visibility, and productivity for daily operations.",
  "Discussion-first zones with table arrangements optimized for quick team decision-making.",
  "Multi-use spaces built for presentations, internal events, and structured knowledge sessions.",
  "Commercial interiors combining brand expression with durable finishes and easier maintenance.",
];

const commercialStyles = [
  "Open Plan",
  "Collaboration Core",
  "Modern Corporate",
  "Community Floor",
  "Executive Calm",
  "Brand Forward",
];

const residentialItems: GalleryItem[] = residentialGalleryImages.map((image, index) => ({
  name: residentialTitles[index],
  category: index === 4 || index === 8 ? "Storage and utility" : "Residential interior",
  description: residentialDescriptions[index],
  image,
  location: locationCycle[index % locationCycle.length],
  area: `${920 + index * 170} sq ft`,
  styleNote: residentialStyles[index],
  size: sizeCycle[index % sizeCycle.length],
}));

const commercialItems: GalleryItem[] = commercialGalleryImages.map((image, index) => ({
  name: commercialTitles[index],
  category: "Commercial workspace",
  description: commercialDescriptions[index % commercialDescriptions.length],
  image,
  location: locationCycle[index % locationCycle.length],
  area: `${1600 + index * 230} sq ft`,
  styleNote: commercialStyles[index % commercialStyles.length],
  size: sizeCycle[(index + 2) % sizeCycle.length],
}));

const galleryItems: GalleryItem[] = [...residentialItems, ...commercialItems];

const stripItems = [...galleryItems, ...galleryItems];
const heroDescription =
  "Browse 25 curated residential and commercial frames, including kitchens, shared workspaces, and discussion-focused interiors.";

export default function ProjectsPage() {
  return (
    <main className="project-gallery-page relative overflow-hidden pb-16 text-[var(--color-ink)] sm:pb-20">
      <div className="project-gallery-ambient project-gallery-ambient-one" />
      <div className="project-gallery-ambient project-gallery-ambient-two" />

      <section className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div className="animate-fade-rise">
            <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-[var(--color-accent)] sm:text-sm sm:tracking-[0.28em]">
              <Sparkles className="h-4 w-4" aria-hidden />
              {projectsPageContent.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-lg font-serif text-[2.65rem] leading-[1.04] sm:text-6xl">
              Curated Interiors That Feel Alive
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              {heroDescription}
            </p>
          </div>

          <article className="project-feature-card animate-fade-rise-delay">
            <div className="project-feature-image-wrap">
              <Image
                src="/commercial/comercial-13.jpeg"
                alt="Feature project interior with premium office styling"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                quality={72}
                className="object-cover object-center"
              />
              <span className="project-feature-badge">Featured Transformation</span>
            </div>

            <div className="grid gap-4 p-5 sm:grid-cols-3 sm:gap-5 sm:p-6">
              <div>
                <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] sm:text-[0.67rem]">
                  Category
                </p>
                <p className="mt-2 font-serif text-[1.35rem] leading-tight">Commercial Office</p>
              </div>
              <div>
                <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] sm:text-[0.67rem]">
                  Area
                </p>
                <p className="mt-2 font-serif text-[1.35rem] leading-tight">6,100 sq ft</p>
              </div>
              <div>
                <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] sm:text-[0.67rem]">
                  Delivery
                </p>
                <p className="mt-2 font-serif text-[1.35rem] leading-tight">Turnkey Build</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-3 sm:px-8 lg:px-12">
        <div className="project-filmstrip">
          <div className="project-filmstrip-track">
            {stripItems.map((item, index) => (
              <article key={`${item.name}-${item.location}-${index}`} className="project-preview-pill">
                <div className="project-preview-thumb">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    quality={66}
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.64rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-accent)]">
                    {item.category}
                  </p>
                  <p className="truncate font-serif text-[1.02rem] text-[var(--color-ink)]">{item.name}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[2.25rem] leading-tight sm:text-5xl">Project Story Gallery</h2>
          <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
            Hover through each frame to reveal contextual details around style, scale, and location.
          </p>
        </div>

        <div className="project-gallery-grid mt-8 sm:mt-10">
          {galleryItems.map((item, index) => (
            <article
              key={`${item.name}-${item.location}`}
              className={`project-gallery-card project-gallery-card-${item.size}`}
              style={{ animationDelay: `${index * 95}ms` }}
            >
              <div className="project-gallery-image-wrap">
                <Image
                  src={item.image}
                  alt={`${item.name} by Power On Interio`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                  quality={72}
                  className="project-gallery-image object-cover object-center"
                />
                <div className="project-gallery-overlay" />
              </div>

              <div className="project-gallery-content">
                <p className="project-gallery-tag">{item.category}</p>
                <h3 className="mt-3 font-serif text-[1.85rem] leading-tight sm:text-[2.1rem]">{item.name}</h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <span className="project-meta-pill">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {item.location}
                  </span>
                  <span className="project-meta-pill">
                    <Ruler className="h-3.5 w-3.5" aria-hidden />
                    {item.area}
                  </span>
                  <span className="project-meta-pill">{item.styleNote}</span>
                </div>
              </div>

            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
