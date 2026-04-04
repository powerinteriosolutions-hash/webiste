"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

type HomeLeadFormProps = {
  action: string;
  eyebrow: string;
  title: string;
  description: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  submitLabel: string;
  loadingLabel: string;
  message: string;
};

export function HomeLeadForm({
  action,
  eyebrow,
  title,
  description,
  namePlaceholder,
  phonePlaceholder,
  emailPlaceholder,
  submitLabel,
  loadingLabel,
  message,
}: HomeLeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (isSubmitting) {
      event.preventDefault();
      return;
    }

    setIsSubmitting(true);
  };

  return (
    <form
      className="home-surface-card border border-[rgba(87,63,41,0.12)] bg-[linear-gradient(180deg,#fffdf9_0%,#f4ede4_100%)] p-4 text-[var(--color-ink)]"
      action={action}
      method="post"
      aria-busy={isSubmitting}
      onSubmit={handleSubmit}
    >
      <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-[1.28rem] font-extrabold leading-[1.02] tracking-[-0.03em] uppercase text-[var(--color-ink)]">
        {title}
      </h2>
      <p className="mt-2 text-[0.82rem] leading-5 text-[var(--color-muted)]">{description}</p>

      <div className="mt-4 grid gap-3">
        <input
          name="name"
          required
          autoComplete="name"
          placeholder={namePlaceholder}
          aria-label={namePlaceholder}
          className="rounded-[1rem] border border-[rgba(87,63,41,0.08)] bg-[#efeae1] px-4 py-3.5 text-[0.95rem] outline-none transition placeholder:text-[rgba(101,86,74,0.72)] focus:border-[var(--color-accent)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)]"
        />
        <input
          name="phone"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder={phonePlaceholder}
          aria-label={phonePlaceholder}
          className="rounded-[1rem] border border-[rgba(87,63,41,0.08)] bg-[#efeae1] px-4 py-3.5 text-[0.95rem] outline-none transition placeholder:text-[rgba(101,86,74,0.72)] focus:border-[var(--color-accent)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)]"
        />
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={emailPlaceholder}
          aria-label={emailPlaceholder}
          className="rounded-[1rem] border border-[rgba(87,63,41,0.08)] bg-[#efeae1] px-4 py-3.5 text-[0.95rem] outline-none transition placeholder:text-[rgba(101,86,74,0.72)] focus:border-[var(--color-accent)] focus:bg-white focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)]"
        />
        <input type="hidden" name="message" value={message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-premium mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3.5 text-[0.76rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] disabled:translate-y-0 disabled:cursor-wait disabled:bg-[var(--color-ink)]/90 disabled:text-white/90"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.1} />
            {loadingLabel}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight className="h-4 w-4" strokeWidth={2.1} />
          </>
        )}
      </button>
    </form>
  );
}
