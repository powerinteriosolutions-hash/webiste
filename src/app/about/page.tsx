import type { Metadata } from "next";
import Image from "next/image";
import {
  aboutContent,
  company,
  founders,
  reasons,
  stats,
  team,
  withBasePath,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-14">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {aboutContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-lg font-serif text-5xl leading-tight sm:text-6xl">
            {aboutContent.hero.title}
          </h1>
        </div>

        <div className="grid gap-6">
          <p className="text-lg leading-8 text-[var(--color-muted)]">
            {company.description} {aboutContent.hero.paragraphOneSuffix}
          </p>
          <p className="text-lg leading-8 text-[var(--color-muted)]">
            {aboutContent.hero.paragraphTwo}
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6">
            <p className="font-serif text-4xl">{item.value}</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-muted)]">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {aboutContent.approach.eyebrow}
          </p>
          <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
            {aboutContent.approach.title}
          </h2>
        </div>

        <div className="grid gap-4">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="flex items-start gap-4 rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-sand)]/35 px-5 py-5"
            >
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-accent)]" />
              <p className="text-base leading-7 text-[var(--color-muted)]">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:mt-14 lg:gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
              {aboutContent.leadership.eyebrow}
            </p>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
              {aboutContent.leadership.title}
            </h2>
          </div>
          <div className="max-w-xl rounded-[1.4rem] border border-[rgba(157,113,69,0.12)] bg-[rgba(255,252,248,0.72)] px-5 py-4">
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
              Leadership Notes
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              The leadership team stays close to planning, material decisions, and execution so the final interior matches the brief more closely.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:gap-6">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {founders.map((founder) => {
              const initials = founder.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2);
              const founderEmail = founder.email ?? company.email;
              const founderPhone = founder.phone ?? company.phone;
              const founderPhoneHref = founderPhone.replace(/[^0-9+]/g, "");
              const founderImage =
                typeof founder.image === "string" &&
                founder.image.trim() &&
                !founder.image.startsWith("data:")
                  ? withBasePath(founder.image)
                  : "";

              return (
                <article
                  key={founder.name}
                  className="executive-card profile-shell flex flex-col items-center gap-6 rounded-[2rem] border border-[rgba(157,113,69,0.14)] p-6 text-center shadow-[0_18px_46px_rgba(71,52,34,0.08)]"
                >
                  <div className="executive-photo-frame h-40 w-40 overflow-hidden rounded-full border-4 border-[rgba(157,113,69,0.2)] shadow-[0_10px_30px_rgba(71,52,34,0.15)]">
                    {founderImage ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={founderImage}
                          alt={founder.name}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="profile-avatar flex h-full w-full items-center justify-center bg-gradient-to-br from-[rgba(157,113,69,0.15)] to-[rgba(157,113,69,0.08)] text-5xl font-semibold text-[var(--color-accent)]">
                        {initials}
                      </div>
                    )}
                  </div>

                  <div className="flex w-full flex-col gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                        Leadership Profile
                      </p>
                      <p className="font-serif text-2xl leading-tight text-[var(--color-ink)] sm:text-3xl">
                        {founder.name}
                      </p>
                      <p className="mt-2 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                        {founder.role}
                      </p>
                    </div>

                    <div className="rounded-[1.15rem] border border-[rgba(157,113,69,0.12)] bg-[rgba(239,225,208,0.42)] p-4">
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                        Vision
                      </p>
                      <p className="mt-2 text-[0.9rem] leading-6 text-[var(--color-muted)]">
                        {founder.vision}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-[rgba(157,113,69,0.12)] pt-4 text-sm text-[var(--color-muted)]">
                      <a
                        href={`mailto:${founderEmail}`}
                        className="break-all rounded-full border border-[rgba(157,113,69,0.12)] bg-white/60 px-3 py-2 hover:text-[var(--color-accent)]"
                      >
                        {founderEmail}
                      </a>
                      <a
                        href={`tel:${founderPhoneHref}`}
                        className="rounded-full border border-[rgba(157,113,69,0.12)] bg-white/60 px-3 py-2 hover:text-[var(--color-accent)]"
                      >
                        {founderPhone}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rounded-[1.8rem] border border-[rgba(157,113,69,0.14)] bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede3_100%)] px-5 py-5 text-[var(--color-ink)] sm:px-6">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                  Team
                </p>
                <h3 className="mt-2 font-serif text-[2rem] leading-none">Meet the wider Power On Interio team</h3>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--color-muted)]">
                Core client support and coordination roles working alongside the leadership team.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {team.map((member) => {
                const initials = member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2);
                const memberEmail = member.email ?? company.email;
                const memberPhone = member.phone ?? company.phone;
                const memberPhoneHref = memberPhone.replace(/[^0-9+]/g, "");
                const hasEmail = typeof member.email === "string" && member.email.trim().length > 0;
                const hasPhone = typeof member.phone === "string" && member.phone.trim().length > 0;
                const memberImage =
                  typeof member.image === "string" &&
                  member.image.trim() &&
                  !member.image.startsWith("data:")
                    ? withBasePath(member.image)
                    : "";

                return (
                  <article
                    key={member.name}
                    className="home-surface-card-compact grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border border-[rgba(157,113,69,0.12)] bg-white/78 px-4 py-4"
                  >
                    <div className="overflow-hidden rounded-full border-2 border-[rgba(157,113,69,0.2)] shadow-[0_10px_24px_rgba(71,52,34,0.12)]">
                      {memberImage ? (
                        <div className="relative h-16 w-16">
                          <Image
                            src={memberImage}
                            alt={member.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="profile-avatar h-16 w-16 text-2xl">
                          {initials}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-serif text-[1.45rem] leading-none text-[var(--color-ink)]">
                        {member.name}
                      </p>
                      <p className="mt-2 text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                        {member.role}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-[0.76rem] text-[var(--color-muted)]">
                        {hasEmail ? (
                          <a
                            href={`mailto:${memberEmail}`}
                            className="rounded-full border border-[rgba(157,113,69,0.12)] bg-[rgba(239,225,208,0.36)] px-3 py-1.5 hover:text-[var(--color-accent)]"
                          >
                            {memberEmail}
                          </a>
                        ) : null}
                        {hasPhone ? (
                          <a
                            href={`tel:${memberPhoneHref}`}
                            className="rounded-full border border-[rgba(157,113,69,0.12)] bg-[rgba(239,225,208,0.36)] px-3 py-1.5 hover:text-[var(--color-accent)]"
                          >
                            {memberPhone}
                          </a>
                        ) : null}
                        {!hasEmail && !hasPhone ? (
                          <span className="rounded-full border border-[rgba(157,113,69,0.12)] bg-[rgba(239,225,208,0.36)] px-3 py-1.5">
                            Core Support
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
