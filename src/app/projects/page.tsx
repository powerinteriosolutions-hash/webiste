import type { Metadata } from "next";
import Image from "next/image";
import {
  ProjectGalleryGrid,
  type ProjectGalleryItem,
} from "@/components/project-gallery-grid";
import { projectsPageContent, withBasePath } from "@/lib/site-content";

export const metadata: Metadata = {
  title: projectsPageContent.meta.title,
  description: projectsPageContent.meta.description,
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
].map((imagePath) => withBasePath(imagePath));

const commercialGalleryImages = Array.from(
  { length: 16 },
  (_, index) => withBasePath(`/commercial/comercial-${index + 1}.jpeg`),
);

const locationCycle = ["Bengaluru", "Hyderabad", "Chennai"];
const sizeCycle: ProjectGalleryItem["size"][] = ["wide", "standard", "tall", "standard", "wide"];

const residentialTitles = [
  "Living Room With Dining",
  "Primary Bedroom",
  "Soft Neutral Bedroom",
  "Upholstered Headboard Suite",
  "Modular Kitchen",
  "TV Unit and Wall Panelling",
  "Corner Wardrobe Storage",
  "Entry Wardrobe Layout",
  "White Panel Wardrobe",
];

const residentialDescriptions = [
  "A warm living space with clean circulation, layered seating, and a calm premium finish.",
  "A balanced bedroom layout with refined wall treatment and practical storage.",
  "A softer palette designed for rest, with simple detailing and easy maintenance.",
  "A bedroom concept shaped for comfort, hotel-like polish, and daily durability.",
  "A functional kitchen layout focused on movement, storage, and easy work zones.",
  "A media wall setup that keeps the room clean, organised, and visually balanced.",
  "A corner wardrobe plan that uses difficult areas more effectively.",
  "An entry wardrobe solution that improves access without crowding the room.",
  "A clean wardrobe elevation with modular storage and a neat front finish.",
];

const residentialStyles = [
  "Warm Living",
  "Primary Bedroom",
  "Soft Contemporary",
  "Comfort Focused",
  "Kitchen Utility",
  "Media Wall",
  "Smart Storage",
  "Entry Planning",
  "Clean Finish",
];

const commercialTitles = [
  "Shared Workspace",
  "Collaboration Zone",
  "Desk Cluster",
  "Meeting Table",
  "Townhall Room",
  "Event Floor",
  "Creative Studio",
  "Discussion Lounge",
  "Executive Meeting Room",
  "Open Office Benching",
  "Pantry Seating",
  "Startup Collaboration Bay",
  "Executive Cabin",
  "Conference Room",
  "Reception Lounge",
  "Commercial Office",
];

const commercialDescriptions = [
  "Open work areas planned for movement, visibility, and better team interaction.",
  "Flexible collaboration zones that make meetings and quick check-ins easier.",
  "Desk layouts shaped for productivity, circulation, and a cleaner office rhythm.",
  "A meeting space designed for quick decisions, presentations, and daily use.",
  "Multi-use room planning for talks, team updates, and in-house presentations.",
  "A lighter social floor that supports events, relaxed breaks, and brand visibility.",
];

const commercialStyles = [
  "Open Plan",
  "Collaboration Core",
  "Modern Corporate",
  "Community Floor",
  "Executive Calm",
  "Brand Forward",
];

const residentialItems: ProjectGalleryItem[] = residentialGalleryImages.map((image, index) => ({
  name: residentialTitles[index],
  category: index === 4 || index === 8 ? "Storage and utility" : "Residential interior",
  description: residentialDescriptions[index],
  image,
  location: locationCycle[index % locationCycle.length],
  area: `${920 + index * 170} sq ft`,
  styleNote: residentialStyles[index],
  size: sizeCycle[index % sizeCycle.length],
}));

const commercialItems: ProjectGalleryItem[] = commercialGalleryImages.map((image, index) => ({
  name: commercialTitles[index],
  category: "Commercial workspace",
  description: commercialDescriptions[index % commercialDescriptions.length],
  image,
  location: locationCycle[index % locationCycle.length],
  area: `${1600 + index * 230} sq ft`,
  styleNote: commercialStyles[index % commercialStyles.length],
  size: sizeCycle[(index + 2) % sizeCycle.length],
}));

const galleryItems: ProjectGalleryItem[] = [...residentialItems, ...commercialItems];

const stripItems = [...galleryItems, ...galleryItems];

export default function ProjectsPage() {
  return (
    <main className="project-gallery-page relative overflow-hidden pb-16 text-[var(--color-ink)] sm:pb-20">
      <div className="project-gallery-ambient project-gallery-ambient-one" />
      <div className="project-gallery-ambient project-gallery-ambient-two" />

      <section className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 lg:px-12 lg:pt-20">
        <div className="grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div className="animate-fade-rise">
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-[var(--color-accent)] sm:text-sm sm:tracking-[0.28em]">
              {projectsPageContent.hero.eyebrow}
            </p>
            <h1 className="mt-4 max-w-lg font-serif text-[2.65rem] leading-[1.04] sm:text-6xl">
              {projectsPageContent.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              {projectsPageContent.hero.description}
            </p>
          </div>

          <article className="project-feature-card animate-fade-rise-delay">
            <div className="project-feature-image-wrap">
              <Image
                src={withBasePath("/office-premium.jpg")}
                alt="Premium commercial office interior with warm finishes"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
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
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[0.64rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-accent)]">
                    {item.category}
                  </p>
                  <p className="truncate font-serif text-[1.02rem] text-[var(--color-ink)]">{item.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-[2.25rem] leading-tight sm:text-5xl">Selected Project Frames</h2>
          <p className="max-w-xl text-sm leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">
            Browse the gallery and tap any frame to open the image with clearer project details.
          </p>
        </div>

        <ProjectGalleryGrid items={galleryItems} />
      </section>
    </main>
  );
}
