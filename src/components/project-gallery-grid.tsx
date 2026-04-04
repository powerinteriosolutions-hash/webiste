"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Ruler, X } from "lucide-react";

export type ProjectGalleryItem = {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  area: string;
  styleNote: string;
  size: "standard" | "wide" | "tall";
};

type ProjectGalleryGridProps = {
  items: ProjectGalleryItem[];
};

const sizeClassMap: Record<ProjectGalleryItem["size"], string> = {
  standard: "xl:col-span-4",
  wide: "md:col-span-2 xl:col-span-8",
  tall: "xl:col-span-4",
};

const imageHeightClassMap: Record<ProjectGalleryItem["size"], string> = {
  standard: "aspect-[4/5]",
  wide: "aspect-[5/4]",
  tall: "aspect-[4/6]",
};

export function ProjectGalleryGrid({ items }: ProjectGalleryGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];
  const activePosition = activeIndex === null ? null : activeIndex + 1;

  useEffect(() => {
    if (!activeItem) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex - 1 + items.length) % items.length,
        );
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex + 1) % items.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, items.length]);

  const showPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex - 1 + items.length) % items.length,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex + 1) % items.length,
    );
  };

  return (
    <>
      <div className="project-gallery-grid mt-8 sm:mt-10">
        {items.map((item, index) => (
          <article
            key={`${item.name}-${item.location}`}
            className={`overflow-hidden rounded-[1.45rem] border border-[rgba(52,36,22,0.08)] bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede3_100%)] shadow-[0_18px_54px_rgba(32,22,14,0.08)] ${sizeClassMap[item.size]}`}
            style={{ animationDelay: `${index * 95}ms` }}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${item.name} image`}
              className="group block w-full text-left"
            >
              <div className={`relative overflow-hidden bg-[#e9decf] ${imageHeightClassMap[item.size]}`}>
                <Image
                  src={item.image}
                  alt={`${item.name} by Power On Interio`}
                  fill
                  sizes="(max-width: 767px) 50vw, (max-width: 1199px) 50vw, 33vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(12,9,8,0.12)_100%)]" />
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-accent)]">
                  {item.category}
                </p>
                <h3 className="mt-2 font-serif text-[1.3rem] leading-tight text-[var(--color-ink)] sm:text-[1.55rem]">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.74rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-muted)]">
                  Tap To View Details
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(10,8,6,0.82)] p-4 backdrop-blur-sm"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.name} image preview`}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[1.6rem] border border-white/10 bg-[rgba(24,18,14,0.94)] shadow-[0_30px_90px_rgba(0,0,0,0.34)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image preview"
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-[rgba(255,255,255,0.08)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous project image"
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[rgba(12,10,8,0.42)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next project image"
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[rgba(12,10,8,0.42)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)]">
              <div className="relative aspect-[4/5] min-h-[18rem] bg-[#17120f] sm:aspect-[16/11] lg:min-h-[34rem]">
                <Image
                  src={activeItem.image}
                  alt={`${activeItem.name} by Power On Interio`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(34,26,20,0.96)_0%,rgba(24,18,14,0.98)_100%)] p-5 text-white sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#d7b78f]">
                  {activeItem.category}
                </p>
                <h3 className="mt-3 font-serif text-[1.8rem] leading-tight sm:text-[2.2rem]">
                  {activeItem.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
                  {activeItem.description}
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-[1rem] border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-3.5">
                    <p className="text-[0.64rem] font-semibold tracking-[0.16em] uppercase text-[#d7b78f]">
                      Location
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/86 sm:text-base">
                      <MapPin className="h-4 w-4 text-[#d7b78f]" aria-hidden />
                      {activeItem.location}
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-3.5">
                    <p className="text-[0.64rem] font-semibold tracking-[0.16em] uppercase text-[#d7b78f]">
                      Area
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/86 sm:text-base">
                      <Ruler className="h-4 w-4 text-[#d7b78f]" aria-hidden />
                      {activeItem.area}
                    </p>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-[rgba(255,255,255,0.04)] px-4 py-3.5">
                    <p className="text-[0.64rem] font-semibold tracking-[0.16em] uppercase text-[#d7b78f]">
                      Design Direction
                    </p>
                    <p className="mt-2 text-sm text-white/86 sm:text-base">{activeItem.styleNote}</p>
                  </div>
                </div>

                <p className="mt-6 text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-white/42">
                  {String(activePosition ?? 0).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
