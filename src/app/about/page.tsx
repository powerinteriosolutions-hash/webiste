import type { Metadata } from "next";
import Image from "next/image";
import {
  aboutContent,
  company,
  founders,
  reasons,
  stats,
  team,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: aboutContent.meta.title,
  description: aboutContent.meta.description,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
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

      <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-6">
            <p className="font-serif text-4xl">{item.value}</p>
            <p className="mt-3 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-muted)]">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
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

      <section className="mt-16 grid gap-10">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {aboutContent.leadership.eyebrow}
          </p>
          <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight sm:text-5xl">
            {aboutContent.leadership.title}
          </h2>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-2">
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
                  ? founder.image
                  : "";

              return (
                <article
                  key={founder.name}
                  className="executive-card profile-shell grid h-full gap-6 rounded-[2rem] border border-[rgba(157,113,69,0.14)] p-6 shadow-[0_20px_65px_rgba(71,52,34,0.08)] xl:grid-cols-[190px_1fr]"
                >
                  <div className="executive-photo-frame min-h-[18rem]">
                    {founderImage ? (
                      <div className="relative h-full min-h-[18rem] w-full">
                        <Image
                          src={founderImage}
                          alt={founder.name}
                          fill
                          sizes="(max-width: 1280px) 100vw, 190px"
                          quality={68}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="profile-avatar h-full min-h-[18rem] w-full text-6xl">
                        <div className="flex flex-col items-center gap-4">
                          <span>{initials}</span>
                          <span className="executive-photo-slot">Photo Slot</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex h-full flex-col gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-accent)]">
                        Executive Profile
                      </p>
                      <p className="font-serif text-3xl text-[var(--color-ink)]">
                        {founder.name}
                      </p>
                      <p className="mt-2 text-sm font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                        {founder.role}
                      </p>
                    </div>

                    <div className="rounded-[1.3rem] border border-[rgba(157,113,69,0.12)] bg-[rgba(239,225,208,0.42)] p-4">
                      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                        Vision
                      </p>
                      <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                        {founder.vision}
                      </p>
                    </div>

                    <div className="mt-auto grid gap-3 border-t border-[rgba(157,113,69,0.12)] pt-4 text-sm text-[var(--color-muted)]">
                      <a href={`mailto:${founderEmail}`} className="break-all hover:text-[var(--color-accent)]">
                        {founderEmail}
                      </a>
                      <a href={`tel:${founderPhoneHref}`} className="hover:text-[var(--color-accent)]">
                        {founderPhone}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-ink)] px-5 py-6 text-white sm:px-6">
            <div className="mb-6">
              <p className="text-sm font-semibold tracking-[0.22em] uppercase text-[var(--color-accent-soft)]">
                Team Profiles
              </p>
              <h3 className="mt-2 font-serif text-3xl">
                Meet the wider Power On Interio team
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/62">
                A static profile grid keeps every team member visible and easy to scan.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {team.map((member) => {
                const initials = member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2);
                const memberEmail = member.email ?? company.email;
                const memberPhone = member.phone ?? company.phone;
                const memberPhoneHref = memberPhone.replace(/[^0-9+]/g, "");
                const memberImage =
                  typeof member.image === "string" &&
                  member.image.trim() &&
                  !member.image.startsWith("data:")
                    ? member.image
                    : "";

                return (
                  <article
                    key={member.name}
                    className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.14)]"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 overflow-hidden rounded-full border-4 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                        {memberImage ? (
                          <div className="relative h-28 w-28">
                            <Image
                              src={memberImage}
                              alt={member.name}
                              fill
                              sizes="112px"
                              quality={66}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="profile-avatar h-28 w-28 text-3xl">
                            {initials}
                          </div>
                        )}
                      </div>

                      <p className="font-serif text-3xl text-white">{member.name}</p>
                      <p className="mt-2 text-xs font-semibold tracking-[0.18em] uppercase text-[var(--color-accent-soft)]">
                        {member.role}
                      </p>

                      <div className="mt-5 grid w-full gap-2 text-sm text-white/72">
                        <a
                          href={`mailto:${memberEmail}`}
                          className="break-all rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 hover:text-white"
                        >
                          {memberEmail}
                        </a>
                        <a
                          href={`tel:${memberPhoneHref}`}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 hover:text-white"
                        >
                          {memberPhone}
                        </a>
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
