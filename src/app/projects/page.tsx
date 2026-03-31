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

const galleryItems: GalleryItem[] = [
  {
    name: projects[0].name,
    category: projects[0].category,
    description: "Layered neutrals, warm lighting, and custom seating to make evenings feel calmer.",
    image: "/living-premium.jpg",
    location: "Bengaluru",
    area: "2,300 sq ft",
    styleNote: "Warm Minimal",
    size: "tall",
  },
  {
    name: projects[1].name,
    category: projects[1].category,
    description: "A brighter reception-to-workstation flow designed for better focus and faster collaboration.",
    image: "/office-premium.jpg",
    location: "Hyderabad",
    area: "6,100 sq ft",
    styleNote: "Modern Corporate",
    size: "wide",
  },
  {
    name: projects[2].name,
    category: projects[2].category,
    description: "Storage-first planning with cleaner lines and easier movement through every work zone.",
    image: "/workspace-premium.jpg",
    location: "Chennai",
    area: "1,450 sq ft",
    styleNote: "Smart Utility",
    size: "standard",
  },
  {
    name: "Executive Cabin Refresh",
    category: "Commercial workspace",
    description: "Soft textures and acoustic surfaces that upgrade privacy while keeping an open visual tone.",
    image: "/office-premium.jpg",
    location: "Bengaluru",
    area: "1,900 sq ft",
    styleNote: "Executive Calm",
    size: "standard",
  },
  {
    name: "Family Lounge + Dining",
    category: "Residential interior",
    description: "A social core with durable finishes, concealed storage, and a richer hospitality feel.",
    image: "/living-premium.jpg",
    location: "Hyderabad",
    area: "2,000 sq ft",
    styleNote: "Contemporary Warm",
    size: "wide",
  },
  {
    name: "Open Collaboration Zone",
    category: "Commercial workspace",
    description: "Flexible furniture modules that support team huddles, quick reviews, and breakout discussions.",
    image: "/workspace-premium.jpg",
    location: "Chennai",
    area: "3,700 sq ft",
    styleNote: "Agile Planning",
    size: "tall",
  },
  {
    name: "Compact Kitchen Reset",
    category: "Storage and utility",
    description: "Task lighting, easy-clean counters, and practical zoning tuned for real daily routines.",
    image: "/living-premium.jpg",
    location: "Bengaluru",
    area: "980 sq ft",
    styleNote: "Functional Premium",
    size: "standard",
  },
  {
    name: "Reception + Waiting",
    category: "Commercial workspace",
    description: "A stronger first impression with material layering and cleaner wayfinding across entry points.",
    image: "/office-premium.jpg",
    location: "Hyderabad",
    area: "1,650 sq ft",
    styleNote: "Brand Forward",
    size: "standard",
  },
];

const stripItems = [...galleryItems, ...galleryItems];
const heroDescription =
  "Browse a curated mix of residential and commercial transformations, with animated previews and project-specific details designed for quick exploration.";

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
                src="/office-premium.jpg"
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
