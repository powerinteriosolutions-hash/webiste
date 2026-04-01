import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { CommercialShowcaseCarousel } from "@/components/commercial-showcase-carousel";
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
  withBasePathRoute,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: homeContent.meta.title,
  description: homeContent.meta.description,
};

const seoSchema = {
  "@context": "https://schema.org",
  "@type": "InteriorDesign",
  name: company.name,
  url: siteUrl,
  description: company.description,
  areaServed: company.location,
  serviceType: services.map((service) => service.title),
};

const projectImages = homeContent.projectImages.map((imagePath) => withBasePath(imagePath));
const aboutFeatureImage = projectImages[0];
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

const heroSlideIntervalSeconds = 8;
const heroSlides = [
  {
    image: "/commercial/hero-commercial-boardroom.png",
    alt: "Executive commercial boardroom interior with warm wood finishes and premium lighting",
    metric: "1500+",
    metricLabel: "Interiors Delivered",
    caption: "Executive workspaces planned with clarity, restraint, and a premium finish language.",
    expertiseTitle: "Executive Meeting Room Interiors",
    expertiseDetail:
      "Boardrooms, presentation areas, and client-facing meeting suites designed for focus, privacy, and a polished commercial presence.",
    expertiseTags: ["Boardroom Design", "Commercial Focus", "Turnkey"],
    mobilePosition: "72% center",
    desktopPosition: "center center",
    palette: {
      frameFrom: "rgba(25, 33, 40, 0.58)",
      frameTo: "rgba(25, 33, 40, 0.24)",
      frameBorder: "rgba(208, 222, 236, 0.5)",
      title: "#eef7ff",
      body: "rgba(239, 247, 255, 0.95)",
      tagBg: "rgba(49, 68, 86, 0.48)",
      tagBorder: "rgba(208, 222, 236, 0.56)",
      tagText: "#e4f1ff",
      metric: "#eff8ff",
      indicator: "rgba(187, 203, 218, 0.92)",
      shadow: "rgba(12, 18, 24, 0.36)",
    },
  },
  {
    image: "/commercial/hero-commercial-reception.png",
    alt: "Commercial office reception with glass partitions, warm wood textures, and a premium welcome desk",
    metric: "10+",
    metricLabel: "Years of Experience",
    caption: "Reception spaces shaped to feel calm, premium, and ready for every first impression.",
    expertiseTitle: "Reception and Welcome Desk Interiors",
    expertiseDetail:
      "Arrival zones, circulation paths, and visitor-facing fronts planned for openness, brand confidence, and smooth movement.",
    expertiseTags: ["Reception Design", "Arrival Planning", "Commercial"],
    mobilePosition: "76% center",
    desktopPosition: "center center",
    palette: {
      frameFrom: "rgba(25, 33, 40, 0.58)",
      frameTo: "rgba(25, 33, 40, 0.24)",
      frameBorder: "rgba(208, 222, 236, 0.5)",
      title: "#eef7ff",
      body: "rgba(239, 247, 255, 0.95)",
      tagBg: "rgba(49, 68, 86, 0.48)",
      tagBorder: "rgba(208, 222, 236, 0.56)",
      tagText: "#e4f1ff",
      metric: "#eff8ff",
      indicator: "rgba(187, 203, 218, 0.92)",
      shadow: "rgba(12, 18, 24, 0.36)",
    },
  },
  {
    image: "/residential/residential-kitchen-beige-modern.jpg",
    alt: "Modern modular kitchen interior with beige cabinets",
    metric: "24/7",
    metricLabel: "Support Availability",
    caption: "Continuous updates and proactive support from brief to handover.",
    expertiseTitle: "Modular Kitchen Interiors",
    expertiseDetail:
      "Utility-first kitchens with efficient storage, easy movement, and premium finish combinations.",
    expertiseTags: ["Kitchen Planning", "Storage Optimization", "Residential"],
    mobilePosition: "66% center",
    desktopPosition: "center center",
    palette: {
      frameFrom: "rgba(48, 36, 24, 0.56)",
      frameTo: "rgba(48, 36, 24, 0.24)",
      frameBorder: "rgba(244, 225, 196, 0.52)",
      title: "#fff2df",
      body: "rgba(255, 247, 236, 0.95)",
      tagBg: "rgba(88, 66, 43, 0.48)",
      tagBorder: "rgba(244, 225, 196, 0.56)",
      tagText: "#ffeacb",
      metric: "#fff1de",
      indicator: "rgba(229, 199, 160, 0.92)",
      shadow: "rgba(20, 14, 9, 0.36)",
    },
  },
].map((slide) => ({
  ...slide,
  image: withBasePath(slide.image),
}));
const heroAnimationDurationSeconds = heroSlides.length * heroSlideIntervalSeconds;

const commercialShowcaseItems = [
  {
    image: withBasePath("/commercial/comercial-4.jpeg"),
    label: "Commercial Office",
    title: "Reception and Arrival",
    description: "A clean welcome zone that sets the tone and keeps circulation easy.",
  },
  {
    image: withBasePath("/commercial/comercial-1.jpeg"),
    label: "Workspace Planning",
    title: "Open Collaboration Floor",
    description: "Open desk planning shaped for team flow, visibility, and daily use.",
  },
  {
    image: withBasePath("/commercial/comercial-6.jpeg"),
    label: "Meeting Zone",
    title: "Conference Room Flow",
    description: "A meeting setup built for clear presentations and focused discussion.",
  },
  {
    image: withBasePath("/commercial/comercial-15.jpeg"),
    label: "Client Lounge",
    title: "Premium First Impressions",
    description: "A polished client-facing space that feels calm, premium, and welcoming.",
  },
] as const;

export default function Home() {
  return (
    <main className="bg-[var(--color-cream)] text-[var(--color-ink)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,_rgba(20,17,14,0.12)_0%,_rgba(20,17,14,0.34)_100%)]" />
        <div className="hero-cinematic-backdrop absolute inset-0 -z-30">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.metricLabel}
              className="hero-cinematic-slide"
              style={{
                animationDelay: `${index * heroSlideIntervalSeconds}s`,
                animationDuration: `${heroAnimationDurationSeconds}s`,
              }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                loading="eager"
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                quality={88}
                sizes="100vw"
                className="hero-cinematic-image object-cover"
                style={
                  {
                    animationDuration: `${heroAnimationDurationSeconds}s`,
                    "--hero-mobile-position": slide.mobilePosition,
                    "--hero-desktop-position": slide.desktopPosition,
                  } as CSSProperties
                }
              />
            </div>
          ))}
        </div>
        <div className="hero-cinematic-texture absolute inset-0 -z-20" />
        <div className="drift-glow absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(201,161,112,0.18),_transparent_30%)]" />

        <div className="flex min-h-[76svh] w-full flex-col justify-end px-4 pb-4 pt-10 sm:min-h-[82vh] sm:px-8 sm:pb-6 sm:pt-14 lg:px-10 lg:pb-8 lg:pt-16 xl:px-14">
          <div className="grid flex-1 items-end gap-4 sm:gap-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(18rem,0.36fr)] lg:gap-6 lg:items-end">
            <div className="hero-content-shell hero-mobile-dock animate-fade-rise max-w-3xl text-white lg:max-w-[34rem] lg:self-end xl:max-w-[36rem]">
              <div className="hero-expertise-card rounded-[1.45rem] p-2.5 text-white sm:rounded-[2rem] sm:p-6">
                <p className="text-[0.72rem] font-bold tracking-[0.16em] uppercase text-[#f6e3cb] sm:text-[0.92rem] sm:tracking-[0.2em]">
                  Core Expertise
                </p>
                <div className="hero-expertise-stage mt-2 sm:mt-5" aria-hidden>
                  {heroSlides.map((slide, index) => (
                    <article
                      key={`expertise-left-${slide.metricLabel}`}
                      className="hero-expertise-frame rounded-[1rem] border p-2.5 backdrop-blur-[2px] flex flex-col items-center justify-center text-center sm:items-start sm:justify-start sm:text-left sm:rounded-[1.2rem] sm:p-4"
                      style={
                        {
                          animationDelay: `${index * heroSlideIntervalSeconds}s`,
                          animationDuration: `${heroAnimationDurationSeconds}s`,
                          background: `linear-gradient(158deg, ${slide.palette.frameFrom} 0%, ${slide.palette.frameTo} 100%)`,
                          borderColor: slide.palette.frameBorder,
                          boxShadow: `0 20px 48px ${slide.palette.shadow}`,
                        } as CSSProperties
                      }
                    >
                      <h3
                        className="font-serif font-semibold text-[1.6rem] leading-[1.1] sm:text-[2.6rem] lg:text-[3rem]"
                        style={{ color: slide.palette.title }}
                      >
                        {slide.expertiseTitle}
                      </h3>
                      <p
                        className="mt-2 hidden text-[1.02rem] leading-7 font-medium sm:block sm:text-[1.15rem] sm:leading-8 lg:text-[1.26rem]"
                        style={{ color: slide.palette.body }}
                      >
                        {slide.expertiseDetail}
                      </p>
                      <div className="mt-3 hidden flex-wrap gap-2 sm:flex">
                        {slide.expertiseTags.map((tag) => (
                          <span
                            key={`${slide.metricLabel}-left-${tag}`}
                            className="rounded-full border px-2.5 py-1 text-[0.72rem] font-bold tracking-[0.1em] uppercase sm:px-3 sm:text-[0.8rem]"
                            style={{
                              background: slide.palette.tagBg,
                              borderColor: slide.palette.tagBorder,
                              color: slide.palette.tagText,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="hero-cta-wrap mt-2 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                <Link
                  href={withBasePathRoute("/contact")}
                  className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white shadow-[0_18px_40px_rgba(157,113,69,0.28)] transition hover:-translate-y-1 hover:bg-[#b9824b] hover:shadow-[0_24px_48px_rgba(157,113,69,0.32)] sm:px-7 sm:py-4 sm:text-sm"
                >
                  {homeContent.heroPrimaryCta}
                </Link>
              </div>

              <div className="hero-cinematic-indicators mt-5 hidden sm:flex sm:mt-6" aria-hidden>
                {heroSlides.map((slide, index) => (
                  <span
                    key={`indicator-${slide.metric}`}
                    className="hero-cinematic-indicator"
                    style={
                      {
                        animationDelay: `${index * heroSlideIntervalSeconds}s`,
                        animationDuration: `${heroAnimationDurationSeconds}s`,
                        "--hero-indicator-active": slide.palette.indicator,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            </div>

            <div className="hero-stats-shell animate-fade-rise-delay hidden md:block lg:justify-self-end">
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

      <section className="section-wash bg-[linear-gradient(180deg,#f7f1ea_0%,#f2ebe2_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
                {homeContent.commercialSection.eyebrow}
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-[2.2rem] leading-tight sm:text-[3rem]">
                {homeContent.commercialSection.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[0.96rem] leading-7 text-[var(--color-muted)] sm:text-[1rem] sm:leading-8">
                {homeContent.commercialSection.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-end">
              <Link
                href={withBasePathRoute("/contact")}
                className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
              >
                {homeContent.commercialSection.primaryCta}
              </Link>
              <Link
                href={withBasePathRoute("/projects")}
                className="btn-premium inline-flex items-center justify-center rounded-full border border-[rgba(31,26,23,0.14)] bg-white/78 px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-ink)] transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
              >
                {homeContent.commercialSection.secondaryCta}
              </Link>
            </div>
          </div>

          <CommercialShowcaseCarousel
            items={commercialShowcaseItems}
            projectsHref={withBasePathRoute("/projects")}
          />
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
                src={aboutFeatureImage}
                alt="Signature Power On Interio interior project"
                fill
                quality={88}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <p className="text-base leading-7 text-[var(--color-muted)] sm:text-lg sm:leading-8">
              {company.description} {homeContent.aboutSection.description}
            </p>
            <div className="pt-1">
                <Link
                  href={withBasePathRoute("/about")}
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
              href={withBasePathRoute("/services")}
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
                  Interior Service
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
          <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="min-w-0 lg:pt-2">
              <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
                {homeContent.clientsSection.eyebrow}
              </p>
              <h2 className="mt-4 w-full max-w-full pr-1 font-serif text-[1.82rem] leading-[1.12] sm:max-w-xl sm:text-5xl sm:leading-tight">
                {homeContent.clientsSection.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--color-muted)] sm:mt-6 sm:text-lg sm:leading-8">
                {homeContent.clientsSection.description}
              </p>
            </div>

            <div className="min-w-0">
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
              href={withBasePathRoute("/projects")}
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
                    quality={88}
                    sizes="(max-width: 1024px) 100vw, 33vw"
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
                {homeContent.testimonialsSection.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                Short client notes on planning, communication, and finish quality.
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
              Answers to the questions most clients ask before starting a project in Bangalore, Chennai, or Hyderabad.
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
                  href={withBasePathRoute("/contact")}
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
