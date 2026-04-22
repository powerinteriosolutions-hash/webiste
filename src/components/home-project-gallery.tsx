"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Ruler, X } from "lucide-react";
import { SwipeCarousel } from "@/components/swipe-carousel";

export type HomeProjectGalleryItem = {
  name: string;
  category: string;
  description: string;
  image: string;
  location: string;
  area: string;
  styleNote: string;
};

type HomeProjectGalleryProps = {
  items: HomeProjectGalleryItem[];
};

export function HomeProjectGallery({ items }: HomeProjectGalleryProps) {
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

  const modal =
    activeItem && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(10,8,6,0.82)] p-4 backdrop-blur-sm"
            onClick={() => setActiveIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeItem.name} image preview`}
          >
            <div
              className="relative w-full max-w-[min(76rem,calc(100vw-2rem))] overflow-hidden rounded-[1.45rem] border border-white/10 bg-[rgba(24,18,14,0.96)] shadow-[0_30px_90px_rgba(0,0,0,0.34)] lg:max-h-[calc(100vh-2.5rem)] lg:rounded-[1.8rem]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close image preview"
                className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-[rgba(18,14,11,0.78)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>

              <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.72fr)]">
                <div className="relative min-h-[18rem] bg-[#17120f] sm:min-h-[24rem] lg:min-h-0 lg:h-full">
                  <Image
                    src={activeItem.image}
                    alt={`${activeItem.name} by Power On Interio`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-contain p-3 sm:p-4 lg:p-5"
                    priority
                  />

                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Show previous project image"
                    className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[rgba(12,10,8,0.5)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Show next project image"
                    className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-[rgba(12,10,8,0.5)] text-white transition hover:bg-[rgba(255,255,255,0.14)]"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden />
                  </button>
                </div>

                <div className="border-t border-white/8 bg-[linear-gradient(180deg,rgba(34,26,20,0.96)_0%,rgba(24,18,14,0.98)_100%)] p-5 text-white sm:p-6 lg:flex lg:max-h-[calc(100vh-2.5rem)] lg:flex-col lg:overflow-y-auto lg:border-l lg:border-t-0 lg:p-7">
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
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="mt-6 lg:hidden">
        <SwipeCarousel
          ariaLabel="project gallery"
          stepRatio={1}
          viewportClassName="mx-[-1rem]"
          trackClassName="gap-4 px-4"
        >
          {items.map((item, index) => (
            <article
              key={`${item.name}-carousel`}
              className="interactive-card-dark home-surface-card-dark snap-center shrink-0 overflow-hidden border border-white/12 bg-white/6 w-[calc(100vw-2rem)] max-w-none"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open ${item.name} image`}
                aria-haspopup="dialog"
                className="group block w-full cursor-zoom-in touch-manipulation text-left"
              >
                <div className="relative h-[17.5rem] overflow-hidden bg-[#16120f]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    quality={88}
                    sizes="(max-width: 1024px) calc(100vw - 2rem), 33vw"
                    className="object-contain object-center transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(20,17,14,0.18)_100%)]" />
                </div>
                <div className="p-4">
                  <p className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent-soft)]">
                    0{index + 1} / {item.category}
                  </p>
                  <h3 className="mt-2.5 font-serif text-[1.55rem] leading-tight">{item.name}</h3>
                  <p className="mt-2.5 text-[0.86rem] leading-5 text-white/72">{item.description}</p>
                  <p className="mt-3 text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-white/48">
                    Tap To View Details
                  </p>
                </div>
              </button>
            </article>
          ))}
        </SwipeCarousel>
      </div>

      <div className="mt-8 hidden gap-4 sm:mt-10 sm:gap-5 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-4">
        {items.map((item, index) => (
          <article
            key={item.name}
            className="interactive-card-dark home-surface-card-dark overflow-hidden border border-white/12 bg-white/6 transition hover:-translate-y-1 hover:bg-white/8"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${item.name} image`}
              aria-haspopup="dialog"
              className="group block w-full cursor-zoom-in touch-manipulation text-left"
            >
              <div className="relative h-60 overflow-hidden xl:h-56">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  quality={88}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(20,17,14,0.18)_100%)]" />
              </div>
              <div className="p-5 sm:p-6 lg:p-5">
                <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent-soft)] sm:text-sm sm:tracking-[0.25em]">
                  0{index + 1} / {item.category}
                </p>
                <h3 className="mt-3 font-serif text-[1.9rem] sm:mt-4 sm:text-3xl">{item.name}</h3>
                <p className="mt-3 text-[0.96rem] leading-6 text-white/72 sm:mt-4 sm:text-base sm:leading-7">
                  {item.description}
                </p>
                <p className="mt-4 text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-white/48">
                  Click To View Details
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>
      {modal}
    </>
  );
}
