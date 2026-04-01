import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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

        <div className="grid min-w-0 gap-4 sm:gap-5">
          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                {contactPageContent.cards.emailLabel}
              </p>
              <a
                href={`mailto:${company.email}`}
                className="mt-4 block w-full font-serif text-[clamp(1.05rem,1.55vw,1.62rem)] leading-[1.18] tracking-[-0.02em] transition [overflow-wrap:anywhere] hover:text-[var(--color-accent)] sm:whitespace-nowrap"
              >
                {company.email}
              </a>
            </div>
          </div>

          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                {contactPageContent.cards.phoneLabel}
              </p>
              <a
                href={company.phoneHref}
                className="mt-4 block max-w-full font-serif text-[clamp(1.75rem,2.3vw,2.4rem)] leading-[1.08] tracking-[-0.02em] transition hover:text-[var(--color-accent)]"
              >
                {company.phone}
              </a>
            </div>
          </div>

          <div className="min-w-0 rounded-[1.8rem] border border-[var(--color-line)] bg-white px-6 py-6 sm:px-8 sm:py-7">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                {contactPageContent.cards.serviceAreaLabel}
              </p>
              <p className="mt-4 max-w-[24rem] font-serif text-[clamp(1.7rem,2.25vw,2.45rem)] leading-[1.12] tracking-[-0.02em]">
                {company.location}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                {contactPageContent.cards.serviceAreaHelp}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-sand)]/35 p-7 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
          {contactPageContent.form.eyebrow}
        </p>
        <ContactForm copy={contactPageContent.form} />
      </section>
    </main>
  );
}
