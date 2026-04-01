import type { Metadata } from "next";
import Link from "next/link";
import { company, withBasePathRoute } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Enquiry Sent",
  description: "Your enquiry has been sent to Power On Interio.",
};

export default function ContactSentPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <section className="rounded-[2.25rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,#fffaf4_0%,#f5ede1_100%)] p-7 shadow-[0_22px_70px_rgba(71,52,34,0.08)] sm:p-10">
        <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
          Enquiry Sent
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">
          Thanks, we’ve received your message.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          Your enquiry has been sent to {company.email}. We’ll review the details and get back to
          you soon.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={withBasePathRoute("/contact")}
            className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
          >
            Send Another Enquiry
          </Link>
          <Link
            href={withBasePathRoute("/")}
            className="btn-premium inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-ink)] transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
