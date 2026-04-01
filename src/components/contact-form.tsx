type ContactFormCopy = {
  namePlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
  helperText: string;
};

type ContactFormProps = {
  recipientEmail: string;
  copy: ContactFormCopy;
};

export function ContactForm({ recipientEmail, copy }: ContactFormProps) {
  const mailtoAction = `mailto:${recipientEmail}?subject=${encodeURIComponent(
    "Power On Interio project enquiry",
  )}`;

  return (
    <form
      className="mt-8 grid gap-5 md:grid-cols-2"
      action={mailtoAction}
      method="post"
      encType="text/plain"
    >
      <input
        name="name"
        required
        autoComplete="name"
        className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)]"
        placeholder={copy.namePlaceholder}
        aria-label={copy.namePlaceholder}
      />
      <input
        name="phone"
        autoComplete="tel"
        className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)]"
        placeholder={copy.phonePlaceholder}
        aria-label={copy.phonePlaceholder}
      />
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        className="rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)] md:col-span-2"
        placeholder={copy.emailPlaceholder}
        aria-label={copy.emailPlaceholder}
      />
      <textarea
        name="message"
        required
        rows={6}
        className="min-h-40 rounded-[1rem] border border-[var(--color-line)] bg-white px-4 py-4 outline-none transition focus:border-[var(--color-accent)] focus:shadow-[0_0_0_4px_rgba(157,113,69,0.08)] md:col-span-2"
        placeholder={copy.messagePlaceholder}
        aria-label={copy.messagePlaceholder}
      />
      <div className="md:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          {copy.helperText}
        </p>
        <button
          type="submit"
          className="btn-premium inline-flex w-full items-center justify-center rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-center text-[0.78rem] font-semibold tracking-[0.16em] uppercase text-white transition hover:-translate-y-1 hover:bg-[var(--color-accent)] sm:w-auto sm:px-7 sm:py-4 sm:text-sm"
        >
          {copy.submitLabel}
        </button>
      </div>
    </form>
  );
}
