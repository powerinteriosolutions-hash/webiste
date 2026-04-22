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
  const [featuredItem, ...supportingItems] = items;

  return (
    <div className="mx-auto w-full mt-8 sm:mt-10 lg:mt-12">
      <div className="lg:hidden">
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
              className="group home-surface-card snap-center shrink-0 basis-[calc(100vw-2rem)] sm:basis-[32rem] overflow-hidden border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#fffdf9_0%,#f6eee4_100%)]"
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

      <div className="hidden lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:items-start">
        {featuredItem ? (
          <Link
            href={projectsHref}
            aria-label={`Explore ${featuredItem.title}`}
            className="group home-surface-card overflow-hidden border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#fffdf9_0%,#f6eee4_100%)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#ece0d2]">
              <Image
                src={featuredItem.image}
                alt={featuredItem.title}
                fill
                quality={88}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,14,0.04)_8%,rgba(20,17,14,0.72)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[0.64rem] font-semibold tracking-[0.2em] uppercase text-[#f3d8b7]">
                  {featuredItem.label}
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[2rem] leading-none text-white">
                      {featuredItem.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.92rem] leading-6 text-white/78">
                      {featuredItem.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/18 bg-white/10 px-3 py-2 text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-white/90 backdrop-blur-sm">
                    View Project
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        <div className="grid gap-4">
          {supportingItems.map((item, index) => (
            <Link
              key={item.title}
              href={projectsHref}
              aria-label={`Explore ${item.title}`}
              className="group home-surface-card-compact grid grid-cols-[7rem_minmax(0,1fr)] items-stretch overflow-hidden border border-[rgba(31,26,23,0.08)] bg-[linear-gradient(180deg,#fffdfa_0%,#f6eee4_100%)]"
            >
              <div className="relative min-h-[8rem] overflow-hidden bg-[#ece0d2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  quality={84}
                  sizes="22vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.62rem] font-semibold tracking-[0.18em] uppercase text-[var(--color-accent)]">
                      {item.label}
                    </p>
                    <span className="text-[0.66rem] font-semibold tracking-[0.16em] uppercase text-[var(--color-muted)]">
                      0{index + 2}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-[1.25rem] leading-tight text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-[0.85rem] leading-6 text-[var(--color-muted)]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
