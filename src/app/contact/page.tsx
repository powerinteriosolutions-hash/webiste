import type { Metadata } from "next";
import { company, contactPageContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: contactPageContent.meta.title,
  description: contactPageContent.meta.description,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
      <section className="grid gap-10 lg:grid-cols-[0.78fr_minmax(0,1.22fr)]">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {contactPageContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-lg font-serif text-5xl leading-tight sm:text-6xl">
            {contactPageContent.hero.title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-[var(--color-muted)]">
            {contactPageContent.hero.description}
          </p>
        </div>

        <div className="grid min-w-0 gap-5 md:grid-cols-2">
          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white p-7">
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
              {contactPageContent.cards.emailLabel}
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-4 block max-w-full break-all font-serif text-[clamp(1.9rem,2.7vw,3rem)] leading-tight transition hover:text-[var(--color-accent)]"
            >
              {company.email}
            </a>
          </div>

          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white p-7">
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
              {contactPageContent.cards.phoneLabel}
            </p>
            <a
              href={company.phoneHref}
              className="mt-4 block max-w-full break-words font-serif text-[clamp(1.9rem,2.7vw,3rem)] leading-tight transition hover:text-[var(--color-accent)]"
            >
              {company.phone}
            </a>
          </div>

          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white p-7 md:col-span-2">
            <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
              {contactPageContent.cards.serviceAreaLabel}
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight">{company.location}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">
              {contactPageContent.cards.serviceAreaHelp}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-sand)]/35 p-7 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
          {contactPageContent.form.eyebrow}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <input
            className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none"
            placeholder={contactPageContent.form.namePlaceholder}
          />
          <input
            className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none"
            placeholder={contactPageContent.form.phonePlaceholder}
          />
          <input
            className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none md:col-span-2"
            placeholder={contactPageContent.form.emailPlaceholder}
          />
          <textarea
            className="min-h-40 rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none md:col-span-2"
            placeholder={contactPageContent.form.messagePlaceholder}
          />
        </div>
      </section>
    </main>
  );
}
