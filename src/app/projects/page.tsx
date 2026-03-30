import type { Metadata } from "next";
import { projects, projectsPageContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: projectsPageContent.meta.title,
  description: projectsPageContent.meta.description,
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-18">
      <section className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] uppercase text-[var(--color-accent)]">
            {projectsPageContent.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-lg font-serif text-5xl leading-tight sm:text-6xl">
            {projectsPageContent.hero.title}
          </h1>
        </div>

        <div>
          <p className="max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
            {projectsPageContent.hero.description}
          </p>
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_18px_50px_rgba(71,52,34,0.06)]"
          >
            <div className="h-72 bg-[linear-gradient(160deg,_rgba(224,204,175,0.98)_0%,_rgba(136,104,71,0.84)_100%)]" />
            <div className="p-7">
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[var(--color-accent)]">
                0{index + 1} / {project.category}
              </p>
              <h2 className="mt-4 font-serif text-3xl">{project.name}</h2>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
