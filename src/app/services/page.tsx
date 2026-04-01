import type { Metadata } from "next";
import {
  company,
  processSteps,
  services,
  servicesPageContent,
  withBasePathRoute,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: servicesPageContent.meta.title,
  description: servicesPageContent.meta.description,
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
      <section className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {servicesPageContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-lg font-serif text-5xl leading-tight sm:text-6xl">
            {servicesPageContent.hero.title}
          </h1>
        </div>

        <div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {company.name} {servicesPageContent.hero.description}
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.title}
            className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-7 shadow-[0_18px_50px_rgba(71,52,34,0.06)]"
          >
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
              {company.name}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight">{service.title}</h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
              {service.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-16 rounded-[2rem] bg-[var(--color-ink)] px-6 py-10 text-white sm:px-8">
        <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent-soft)]">
          {servicesPageContent.process.eyebrow}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.5rem] border border-white/12 bg-white/6 p-6">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-soft)]">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-serif text-3xl">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-white/72">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <a
          href={withBasePathRoute("/contact")}
          className="inline-flex rounded-full bg-[var(--color-accent)] px-7 py-4 text-sm font-semibold tracking-[0.16em] uppercase text-white transition hover:bg-[#b9824b]"
        >
          {servicesPageContent.cta.label}
        </a>
      </section>
    </main>
  );
}
