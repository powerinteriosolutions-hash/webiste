"use client";

import Image from "next/image";
import Link from "next/link";
import { SwipeCarousel } from "@/components/swipe-carousel";

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

export function CommercialShowcaseCarousel({
  items,
  projectsHref,
}: CommercialShowcaseCarouselProps) {
  return (
    <div className="mx-auto mt-6 w-full max-w-5xl sm:mt-8">
      <SwipeCarousel
        ariaLabel="commercial showcase"
        stepRatio={1}
        viewportClassName="mx-[-1rem] px-4 lg:mx-0 lg:px-0"
        trackClassName="gap-4 pr-4 lg:pr-0"
      >
        {items.map((item) => (
          <Link
            key={item.title}
            href={projectsHref}
            aria-label={`Explore ${item.title}`}
            className="group home-surface-card snap-center shrink-0 basis-[calc(100vw-2rem)] sm:basis-[32rem] lg:basis-[calc(50%-0.5rem)] overflow-hidden border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#fffdf9_0%,#f6eee4_100%)]"
          >
            <div className="relative aspect-[16/9.6] overflow-hidden bg-[#ece0d2]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={88}
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 32rem, 50vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-4 sm:p-5">
              <p className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)] sm:text-[0.64rem]">
                {item.label}
              </p>
              <h3 className="mt-2 font-serif text-[1.22rem] leading-tight text-[var(--color-ink)] sm:text-[1.55rem]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xl text-[0.84rem] leading-5 text-[var(--color-muted)] sm:text-[0.94rem] sm:leading-6">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </SwipeCarousel>
    </div>
  );
}
