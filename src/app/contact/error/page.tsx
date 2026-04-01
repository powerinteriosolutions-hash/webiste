import type { Metadata } from "next";
import Link from "next/link";
import { company, withBasePathRoute } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Unable to Send Enquiry",
  description: "The contact form could not be sent right now.",
};

export default function ContactErrorPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
      <section className="rounded-[2.25rem] border border-[rgba(170,78,56,0.18)] bg-[linear-gradient(180deg,#fff8f4_0%,#f7ebe6_100%)] p-7 shadow-[0_22px_70px_rgba(71,52,34,0.08)] sm:p-10">
        <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[rgba(170,78,56,0.9)]">
          Something Went Wrong
        </p>
        <h1 className="mt-4 max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">
          We couldn’t send your enquiry.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
          Please try again in a moment. If it still fails, the Resend sender may still need
          verification. You can email us directly at {company.email} while we sort it out.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={withBasePathRoute("/contact")}
            className="btn-premium inline-flex items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
          >
            Try Again
          </Link>
          <Link
            href={`mailto:${company.email}`}
            className="btn-premium inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-ink)] transition hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:px-7 sm:py-4 sm:text-sm"
          >
            Email Us
          </Link>
        </div>
      </section>
    </main>
  );
}
