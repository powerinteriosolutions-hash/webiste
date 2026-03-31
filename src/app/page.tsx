import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import {
  company,
  faqs,
  homeContent,
  processSteps,
  projects,
  reasons,
  services,
  siteUrl,
  stats,
  testimonials,
  withBasePath,
} from "@/lib/site-content";

const deployedSiteUrl =
  process.env.NODE_ENV === "production"
    ? "https://powerinteriosolutions-hash.github.io/webiste"
    : siteUrl;

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

const seoSchema = {
  "@context": "https://schema.org",
  "@type": "InteriorDesign",
  name: company.name,
  url: deployedSiteUrl,
  description: company.description,
  areaServed: company.location,
  serviceType: services.map((service) => service.title),
};

const projectImages = homeContent.projectImages.map((imagePath) => withBasePath(imagePath));
const mobileTestimonials = testimonials.slice(0, 4);
const testimonialColumns = Array.from({ length: 3 }, (_, columnIndex) =>
  testimonials.filter((_, index) => index % 3 === columnIndex),
);
const clientColumns = Array.from({ length: 3 }, (_, columnIndex) =>
  homeContent.clientsSection.items.filter((_, index) => index % 3 === columnIndex),
);
const clientMarqueeItems = [
  ...homeContent.clientsSection.items,
  ...homeContent.clientsSection.items,
];
const heroSlides = [
  {
    image: "/commercial/comercial-3.jpeg",
    metric: "1500+",
    metricLabel: "Interiors Delivered",
    caption: "Residential and commercial spaces shaped with turnkey precision.",
    expertiseTitle: company.heroTitle,
    expertiseDetail:
      "Shared workspace planning with cleaner zoning, brighter circulation paths, and better team comfort.",
    expertiseTags: ["Shared Workspace", "Commercial", "Turnkey"],
  },
  {
    image: "/commercial/comercial-4.jpeg",
    metric: "10+",
    metricLabel: "Years of Experience",
    caption: "From design direction to execution, every step stays client-first.",
    expertiseTitle: "Group Discussion & Meeting Zones",
    expertiseDetail:
      "Discussion tables, huddle areas, and meeting rooms tuned for collaboration and presentation clarity.",
    expertiseTags: ["Group Discussion", "Meeting Rooms", "Acoustic Comfort"],
  },
  {
    image: "/residential/residential-kitchen-beige-modern.jpg",
    metric: "24/7",
    metricLabel: "Support Availability",
    caption: "Continuous updates and proactive support from brief to handover.",
    expertiseTitle: "Modular Kitchen Interiors",
    expertiseDetail:
      "Utility-first kitchens with efficient storage, easy movement, and premium finish combinations.",
    expertiseTags: ["Kitchen Planning", "Storage Optimization", "Residential"],
  },
].map((slide) => ({
  ...slide,
  image: withBasePath(slide.image),
}));

export default function Home() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,_rgba(20,17,14,0.24)_0%,_rgba(20,17,14,0.56)_100%)]" />
        <div className="hero-cinematic-backdrop absolute inset-0 -z-30">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.metricLabel}
              className="hero-cinematic-slide"
              style={{ animationDelay: `${index * 6}s` }}
            >
              <Image
                src={slide.image}
                alt="Premium interior workspace"
                fill
                priority={index === 0}
                quality={68}
                sizes="100vw"
                className="hero-cinematic-image object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="hero-cinematic-texture absolute inset-0 -z-20" />
        <div className="drift-glow absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(201,161,112,0.18),_transparent_30%)]" />

        <div className="mx-auto flex min-h-[72vh] max-w-7xl flex-col px-4 py-10 sm:min-h-[82vh] sm:px-8 sm:py-14 lg:px-12 lg:py-20">
          <div className="grid flex-1 gap-7 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div className="hero-content-shell animate-fade-rise max-w-3xl text-white">
              <div className="hero-cinematic-fact-wrap h-[4.1rem] sm:h-[4.8rem]" aria-hidden>
                {heroSlides.map((slide, index) => (
                  <div
                    key={slide.metric}
                    className="hero-cinematic-fact"
                    style={{ animationDelay: `${index * 6}s` }}
                  >
                    <p className="font-serif text-[2.35rem] leading-none text-[var(--color-accent-soft)] sm:text-[3.2rem]">
                      {slide.metric}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hero-expertise-card mt-4 rounded-[1.7rem] border border-white/18 p-4 text-white shadow-[0_28px_80px_rgba(10,8,7,0.2)] backdrop-blur sm:rounded-[2rem] sm:p-6">
                <p className="text-[0.7rem] font-semibold tracking-[0.22em] uppercase text-[var(--color-accent-soft)] sm:text-[0.78rem] sm:tracking-[0.24em]">
                  Core Expertise
                </p>
                <div className="hero-expertise-stage mt-4 sm:mt-5" aria-hidden>
                  {heroSlides.map((slide, index) => (
                    <article
                      key={`expertise-left-${slide.metricLabel}`}
                      className="hero-expertise-frame rounded-[1rem] border border-white/12 bg-black/16 p-3.5 backdrop-blur sm:rounded-[1.2rem] sm:p-4"
                      style={{ animationDelay: `${index * 6}s` }}
                    >
                      <h3 className="font-serif text-[1.18rem] leading-tight text-[var(--color-accent-soft)] sm:text-[1.42rem]">
                        {slide.expertiseTitle}
                      </h3>
                      <p className="mt-2 text-[0.88rem] leading-6 text-white/80 sm:text-[0.92rem] sm:leading-7">
                        {slide.expertiseDetail}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {slide.expertiseTags.map((tag) => (
                          <span
                            key={`${slide.metricLabel}-left-${tag}`}
                            className="rounded-full border border-[rgba(217,180,140,0.34)] bg-[rgba(217,180,140,0.12)] px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.13em] uppercase text-[var(--color-accent-soft)] sm:text-[0.62rem]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                <Link
                  href="/contact"
                  className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white shadow-[0_18px_40px_rgba(157,113,69,0.28)] transition hover:-translate-y-1 hover:bg-[#b9824b] hover:shadow-[0_24px_48px_rgba(157,113,69,0.32)] sm:px-7 sm:py-4 sm:text-sm"
                >
                  {homeContent.heroPrimaryCta}
                </Link>
              </div>

              <div className="hero-cinematic-indicators mt-5 sm:mt-6" aria-hidden>
                {heroSlides.map((slide, index) => (
                  <span
                    key={`indicator-${slide.metric}`}
                    className="hero-cinematic-indicator"
                    style={{ animationDelay: `${index * 6}s` }}
                  />
                ))}
              </div>
            </div>

            <div className="hero-stats-shell animate-fade-rise-delay">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="interactive-card-dark rounded-[1.2rem] border border-white/15 bg-white/10 p-3.5 text-white backdrop-blur transition hover:bg-white/14 sm:rounded-[1.5rem] sm:p-4"
                  >
                    <p className="font-serif text-[1.9rem] sm:text-4xl">{item.value}</p>
                    <p className="mt-1.5 text-[0.64rem] font-semibold tracking-[0.12em] uppercase text-white/72 sm:mt-2 sm:text-xs sm:tracking-[0.14em]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.5))]">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-5 text-center text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-muted)] sm:grid-cols-3 sm:gap-4 sm:px-8 sm:py-6 sm:text-sm sm:tracking-[0.22em] lg:px-12">
          {homeContent.trustStrip.map((item) => (
            <p key={item} className="hover:text-[var(--color-accent)]">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f8f2ea_0%,#f4ede4_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-10">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-[var(--color-accent)] sm:text-sm sm:tracking-[0.28em]">
              {homeContent.aboutSection.eyebrow}
            </p>
            <h2 className="mt-3 max-w-md font-serif text-[2.4rem] leading-[1.04] sm:mt-4 sm:max-w-lg sm:text-5xl">
              {homeContent.aboutSection.title}
            </h2>
          </div>

          <div className="interactive-card grid max-w-2xl gap-4 rounded-[1.7rem] border border-[rgba(157,113,69,0.14)] bg-[rgba(255,250,245,0.82)] p-5 shadow-[0_18px_60px_rgba(98,70,42,0.06)] sm:gap-5 sm:rounded-[2rem] sm:p-7">
            <div className="relative h-52 overflow-hidden rounded-[1.3rem] sm:h-72 sm:rounded-[1.6rem]">
              <Image
                src={withBasePath("/residential/residential-bedroom-upholstered-headboard.jpg")}
                alt="Premium residential bedroom interior"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={68}
                className="object-cover object-center"
              />
            </div>
            <p className="text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              {company.description} {homeContent.aboutSection.description}
            </p>
            <div className="pt-1">
                <Link
                  href="/about"
                  className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
                >
                  {homeContent.aboutSection.primaryCta}
                </Link>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f3ece4_0%,#f8f2ea_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
                {homeContent.servicesSection.eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
                {homeContent.servicesSection.title}
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)] transition hover:text-[var(--color-ink)]"
            >
              {homeContent.servicesSection.linkLabel}
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 md:gap-5">
            {services.map((service) => (
              <article
                key={service.title}
                className="interactive-card rounded-[1.45rem] border border-[rgba(157,113,69,0.14)] bg-[linear-gradient(180deg,#fffdfb_0%,#f8f1e8_100%)] p-5 shadow-[0_18px_50px_rgba(110,82,54,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(110,82,54,0.1)] sm:rounded-[1.8rem] sm:p-7"
              >
                <p className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)] sm:text-sm sm:tracking-[0.22em]">
                  {company.name}
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] leading-tight sm:mt-4 sm:text-3xl">{service.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-6 text-[var(--color-muted)] sm:mt-4 sm:text-base sm:leading-7">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f2f1ee_0%,#f8f7f4_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:pt-2">
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
                {homeContent.clientsSection.eyebrow}
              </p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
                {homeContent.clientsSection.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--color-muted)] sm:mt-6 sm:text-lg sm:leading-8">
                {homeContent.clientsSection.description}
              </p>
            </div>

            <div>
              <div className="client-name-marquee lg:hidden">
                <div className="client-name-marquee-track">
                  {clientMarqueeItems.map((client, index) => (
                    <article
                      key={`${client}-mobile-${index}`}
                      className="interactive-card group min-w-[13.2rem] rounded-[1.25rem] border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f5f4f1_100%)] p-4 shadow-[0_12px_30px_rgba(55,45,34,0.04)]"
                    >
                      <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                        Client Partner
                      </p>
                      <h3 className="mt-4 font-serif text-[1.55rem] leading-tight text-[var(--color-ink)] transition group-hover:text-[var(--color-accent)]">
                        {client}
                      </h3>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hidden gap-4 lg:grid lg:grid-cols-3">
                {clientColumns.map((column, columnIndex) => (
                  <div
                    key={`client-column-${columnIndex}`}
                    className="client-carousel-column"
                  >
                    <div
                      className={`client-carousel-track ${
                        columnIndex === 1 ? "client-carousel-track-reverse" : ""
                      }`}
                    >
                      {[...column, ...column].map((client, index) => (
                        <article
                          key={`${client}-${columnIndex}-${index}`}
                          className="interactive-card group rounded-[1.45rem] border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f5f4f1_100%)] p-5 shadow-[0_16px_40px_rgba(55,45,34,0.05)]"
                        >
                          <div className="flex h-full min-h-24 flex-col justify-between">
                            <p className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                              Client Partner
                            </p>
                            <h3 className="mt-6 font-serif text-[1.9rem] leading-tight text-[var(--color-ink)] transition group-hover:text-[var(--color-accent)]">
                              {client}
                            </h3>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f6f3ed_0%,#efede7_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="grid gap-7 sm:gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
              {homeContent.whySection.eyebrow}
            </p>
            <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
              {homeContent.whySection.title}
            </h2>
          </div>

          <div className="grid gap-3 sm:gap-4">
            {reasons.map((reason) => (
              <div
                key={reason}
                className="interactive-card flex items-start gap-3 rounded-[1.3rem] border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#ffffff_0%,#f6f4ef_100%)] px-4 py-4 shadow-[0_12px_30px_rgba(71,52,34,0.04)] sm:gap-4 sm:rounded-[1.5rem] sm:px-5 sm:py-5"
              >
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <p className="text-[0.96rem] leading-6 text-[var(--color-muted)] sm:text-base sm:leading-7">{reason}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#1f1a17_0%,#171210_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent-soft)]">
                {homeContent.projectsSection.eyebrow}
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
                {homeContent.projectsSection.title}
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold tracking-[0.16em] uppercase text-[var(--color-accent-soft)] transition hover:text-white"
            >
              {homeContent.projectsSection.linkLabel}
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className="interactive-card-dark overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/6 shadow-[0_20px_55px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:bg-white/8 sm:rounded-[2rem]"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={projectImages[index]}
                    alt={project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    quality={68}
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(20,17,14,0.18)_100%)]" />
                </div>
                <div className="p-5 sm:p-7">
                  <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-soft)] sm:text-sm sm:tracking-[0.25em]">
                    0{index + 1} / {project.category}
                  </p>
                  <h3 className="mt-3 font-serif text-[1.9rem] sm:mt-4 sm:text-3xl">{project.name}</h3>
                  <p className="mt-3 text-[0.96rem] leading-6 text-white/72 sm:mt-4 sm:text-base sm:leading-7">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f7f2eb_0%,#f1ebe6_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
        <div className="grid gap-7 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
              {homeContent.processSection.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              {homeContent.processSection.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="interactive-card rounded-[1.45rem] border border-[rgba(157,113,69,0.12)] bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_100%)] p-5 shadow-[0_18px_50px_rgba(86,64,44,0.05)] sm:rounded-[1.8rem] sm:p-7"
              >
                <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] sm:text-sm sm:tracking-[0.24em]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] sm:mt-4 sm:text-3xl">{step.title}</h3>
                <p className="mt-3 text-[0.96rem] leading-6 text-[var(--color-muted)] sm:mt-4 sm:text-base sm:leading-7">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f5efe7_0%,#efe7dd_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-[linear-gradient(180deg,#12100e_0%,#1a1613_100%)] px-4 py-8 text-white shadow-[0_28px_90px_rgba(24,17,12,0.28)] sm:rounded-[2.2rem] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[#c49059]">
                {homeContent.testimonialsSection.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
                Over 100+ people trust our interior work
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                Real client experiences that highlight the service, satisfaction,
                and happiness behind every Power On Interio project.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:hidden">
              {mobileTestimonials.map((item, index) => (
                <blockquote
                  key={`${item.name}-mobile-${index}`}
                  className="testimonial-card-dark rounded-[1.3rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="max-w-[11rem] text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#d0a06e]">
                      {item.service}
                    </p>
                    <p className="shrink-0 text-xs font-semibold text-[#f0c35a]">
                      {"★".repeat(item.rating)}
                      <span className="text-white/24">
                        {"☆".repeat(5 - item.rating)}
                      </span>
                    </p>
                  </div>

                  <p className="mt-3 text-[0.96rem] leading-7 text-white/78">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  <div className="mt-4 rounded-[1rem] border border-[#6e5338]/40 bg-[#201a15] px-3.5 py-3">
                    <p className="text-[0.64rem] font-semibold tracking-[0.16em] uppercase text-[#d0a06e]">
                      Happiness Highlight
                    </p>
                    <p className="mt-1.5 text-[0.86rem] leading-6 text-white/68">
                      {item.happiness}
                    </p>
                  </div>

                  <footer className="mt-4 flex items-center gap-3 border-t border-white/8 pt-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#7c5f40] bg-[linear-gradient(135deg,#d0a06e_0%,#8f6843_100%)] font-serif text-sm text-white">
                      {item.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-serif text-lg text-white">{item.name}</p>
                      <p className="mt-0.5 text-[0.62rem] font-semibold tracking-[0.15em] uppercase text-white/50">
                        {item.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3">
              {testimonialColumns.map((column, columnIndex) => (
                <div key={`testimonial-column-${columnIndex}`} className="testimonial-column">
                  <div
                    className={`testimonial-column-track ${
                      columnIndex === 1 ? "testimonial-column-track-reverse" : ""
                    }`}
                  >
                    {[...column, ...column].map((item, index) => (
                      <blockquote
                        key={`${item.name}-${columnIndex}-${index}`}
                        className="testimonial-card-dark rounded-[1.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="max-w-[12rem] text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[#d0a06e]">
                            {item.service}
                          </p>
                          <p className="shrink-0 text-sm font-semibold text-[#f0c35a]">
                            {"★".repeat(item.rating)}
                            <span className="text-white/24">
                              {"☆".repeat(5 - item.rating)}
                            </span>
                          </p>
                        </div>

                        <p className="mt-4 text-[1.02rem] leading-8 text-white/78">
                          &ldquo;{item.quote}&rdquo;
                        </p>

                        <div className="mt-5 rounded-[1.15rem] border border-[#6e5338]/40 bg-[#201a15] px-4 py-3">
                          <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-[#d0a06e]">
                            Happiness Highlight
                          </p>
                          <p className="mt-2 text-sm leading-6 text-white/68">
                            {item.happiness}
                          </p>
                        </div>

                        <footer className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#7c5f40] bg-[linear-gradient(135deg,#d0a06e_0%,#8f6843_100%)] font-serif text-base text-white">
                            {item.name
                              .split(" ")
                              .slice(0, 2)
                              .map((part) => part[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-serif text-xl text-white">{item.name}</p>
                            <p className="mt-1 text-xs font-semibold tracking-[0.18em] uppercase text-white/50">
                              {item.role}
                            </p>
                          </div>
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wash bg-[linear-gradient(180deg,#f7f3eb_0%,#f2ede2_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
              {homeContent.faqSection.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {homeContent.faqSection.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              Quick answers for the questions most customers ask before starting
              their interior project in Bangalore, Chennai, or Hyderabad.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="pb-12 pt-12 sm:pb-20 sm:pt-20 sm:pt-22">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="rounded-[1.7rem] bg-[linear-gradient(135deg,_#d7b78f_0%,_#7f6143_100%)] px-5 py-8 text-white shadow-[0_24px_90px_rgba(71,52,34,0.18)] sm:rounded-[2.25rem] sm:px-10 sm:py-12">
            <p className="text-sm font-semibold tracking-[0.28em] uppercase text-white/78">
              {homeContent.contactCtaSection.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              {homeContent.contactCtaSection.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              {homeContent.contactCtaSection.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="btn-premium inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-ink)] transition hover:-translate-y-1 hover:bg-[var(--color-sand)] sm:px-7 sm:py-4 sm:text-sm"
                >
                  {homeContent.contactCtaSection.primaryCta}
                </Link>
              <a
                href={company.phoneHref}
                className="btn-premium inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase transition hover:-translate-y-1 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-sm"
              >
                {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
