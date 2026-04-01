"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

type CommercialShowcaseItem = {
  image: string;
  label: string;
  title: string;
  description: string;
};

type CommercialShowcaseCarouselProps = {
  items: readonly CommercialShowcaseItem[];
  projectsHref: string;
};

const desktopMediaQuery = "(min-width: 900px)";

const buildSlides = (
  items: readonly CommercialShowcaseItem[],
  cardsPerView: number,
): CommercialShowcaseItem[][] => {
  const slides: CommercialShowcaseItem[][] = [];

  for (let index = 0; index < items.length; index += cardsPerView) {
    slides.push([...items.slice(index, index + cardsPerView)]);
  }

  return slides;
};

export function CommercialShowcaseCarousel({
  items,
  projectsHref,
}: CommercialShowcaseCarouselProps) {
  const [cardsPerView, setCardsPerView] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMediaQuery);
    const syncCardsPerView = () => {
      setCardsPerView(mediaQuery.matches ? 2 : 1);
    };

    syncCardsPerView();
    mediaQuery.addEventListener("change", syncCardsPerView);

    return () => {
      mediaQuery.removeEventListener("change", syncCardsPerView);
    };
  }, []);

  const slides = buildSlides(items, cardsPerView);
  const slideCount = slides.length;
  const currentIndex = Math.min(activeIndex, Math.max(slideCount - 1, 0));

  useEffect(() => {
    if (slideCount <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previousIndex) => (previousIndex + 1) % slideCount);
    }, 4400);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slideCount]);

  const goToSlide = (index: number) => {
    const lastIndex = Math.max(slideCount - 1, 0);
    const nextIndex = Math.max(0, Math.min(index, lastIndex));
    setActiveIndex(nextIndex);
  };

  const handlePrevious = () => {
    goToSlide(currentIndex <= 0 ? slideCount - 1 : currentIndex - 1);
  };

  const handleNext = () => {
    goToSlide(currentIndex >= slideCount - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="mx-auto mt-8 max-w-5xl">
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-muted)] sm:text-xs">
          {String(currentIndex + 1).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous commercial showcase slide"
            onClick={handlePrevious}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,26,23,0.12)] bg-white/88 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next commercial showcase slide"
            onClick={handleNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,26,23,0.12)] bg-white/88 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translate3d(-${currentIndex * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div
              key={`commercial-slide-${slideIndex}`}
              className="grid min-w-full gap-4"
              style={{ gridTemplateColumns: `repeat(${slide.length}, minmax(0, 1fr))` }}
            >
              {slide.map((item) => (
                <Link
                  key={item.title}
                  href={projectsHref}
                  aria-label={`Explore ${item.title}`}
                  className="group overflow-hidden rounded-[1.45rem] border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#fffdf9_0%,#f6eee4_100%)] shadow-[0_16px_36px_rgba(17,13,10,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(17,13,10,0.1)]"
                >
                  <div className="relative aspect-[16/8.2] overflow-hidden bg-[#ece0d2]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={88}
                      sizes="(max-width: 899px) 100vw, 50vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] sm:text-[0.64rem]">
                        {item.label}
                      </p>
                      <h3 className="mt-2 font-serif text-[1.35rem] leading-tight text-[var(--color-ink)] sm:text-[1.55rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-[0.88rem] leading-6 text-[var(--color-muted)] sm:text-[0.94rem]">
                        {item.description}
                      </p>
                    </div>
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(31,26,23,0.12)] bg-white text-[var(--color-ink)] transition group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {slideCount > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: slideCount }, (_, index) => (
            <button
              key={`commercial-stop-${index}`}
              type="button"
              aria-label={`Go to commercial showcase slide ${index + 1}`}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition ${
                index === currentIndex
                  ? "w-8 bg-[var(--color-accent)]"
                  : "w-2.5 bg-[rgba(31,26,23,0.16)] hover:bg-[rgba(31,26,23,0.28)]"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
