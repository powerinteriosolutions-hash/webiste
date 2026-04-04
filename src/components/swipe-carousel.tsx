"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SwipeCarouselProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  stepRatio?: number;
  autoPlayMs?: number;
  continuousAutoScrollPxPerSecond?: number;
  loop?: boolean;
  stopAutoPlayOnInteraction?: boolean;
  snap?: boolean;
};

const joinClasses = (...values: Array<string | undefined>) => values.filter(Boolean).join(" ");

export function SwipeCarousel({
  ariaLabel,
  children,
  className,
  viewportClassName,
  trackClassName,
  stepRatio = 0.9,
  autoPlayMs,
  continuousAutoScrollPxPerSecond,
  loop = false,
  stopAutoPlayOnInteraction = false,
  snap = true,
}: SwipeCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const dragAutoStopTriggeredRef = useRef(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [autoPlayStopped, setAutoPlayStopped] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const syncScrollState = () => {
      const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
      const hasOverflow = maxScrollLeft > 8;

      if (loop && hasOverflow) {
        setCanScrollPrev(true);
        setCanScrollNext(true);
        return;
      }

      setCanScrollPrev(viewport.scrollLeft > 8);
      setCanScrollNext(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 8);
    };

    syncScrollState();
    viewport.addEventListener("scroll", syncScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(syncScrollState);
    resizeObserver.observe(viewport);

    const track = viewport.firstElementChild;
    if (track instanceof HTMLElement) {
      resizeObserver.observe(track);
    }

    return () => {
      viewport.removeEventListener("scroll", syncScrollState);
      resizeObserver.disconnect();
    };
  }, [loop]);

  const stopAutoPlay = () => {
    if (stopAutoPlayOnInteraction) {
      setAutoPlayStopped(true);
    }
  };

  const scrollByDirection = (direction: -1 | 1) => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    stopAutoPlay();

    const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    const scrollAmount = Math.max(viewport.clientWidth * stepRatio, 240);

    if (loop && maxScrollLeft > 8) {
      if (direction === 1 && viewport.scrollLeft >= maxScrollLeft - 8) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      if (direction === -1 && viewport.scrollLeft <= 8) {
        viewport.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
        return;
      }
    }

    viewport.scrollBy({
      left: scrollAmount * direction,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    activePointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = viewport.scrollLeft;
    dragAutoStopTriggeredRef.current = false;
    viewport.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;

    if (!dragAutoStopTriggeredRef.current && Math.abs(deltaX) > 6) {
      stopAutoPlay();
      dragAutoStopTriggeredRef.current = true;
    }

    viewport.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    activePointerIdRef.current = null;
    dragAutoStopTriggeredRef.current = false;
    setIsDragging(false);
  };

  useEffect(() => {
    const viewport = viewportRef.current;

    if (
      !viewport ||
      !continuousAutoScrollPxPerSecond ||
      autoPlayStopped ||
      isDragging ||
      autoPlayMs
    ) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const track = viewport.firstElementChild;

    if (!(track instanceof HTMLElement)) {
      return;
    }

    let animationFrameId = 0;
    let previousTimestamp = 0;
    const resetPoint = track.scrollWidth / 2;

    const autoScroll = (timestamp: number) => {
      if (!previousTimestamp) {
        previousTimestamp = timestamp;
      }

      const delta = timestamp - previousTimestamp;
      previousTimestamp = timestamp;

      if (resetPoint <= viewport.clientWidth) {
        return;
      }

      viewport.scrollLeft += (continuousAutoScrollPxPerSecond * delta) / 1000;

      if (loop && viewport.scrollLeft >= resetPoint) {
        viewport.scrollLeft -= resetPoint;
      }

      animationFrameId = window.requestAnimationFrame(autoScroll);
    };

    animationFrameId = window.requestAnimationFrame(autoScroll);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    autoPlayMs,
    autoPlayStopped,
    continuousAutoScrollPxPerSecond,
    isDragging,
    loop,
  ]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || !autoPlayMs || autoPlayStopped || isDragging || continuousAutoScrollPxPerSecond) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const autoScroll = () => {
      const maxScrollLeft = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);

      if (maxScrollLeft <= 8) {
        return;
      }

      const scrollAmount = Math.max(viewport.clientWidth * stepRatio, 240);
      const nextLeft = viewport.scrollLeft + scrollAmount;

      if (loop && nextLeft >= maxScrollLeft - 8) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      viewport.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    };

    const intervalId = window.setInterval(autoScroll, autoPlayMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [
    autoPlayMs,
    autoPlayStopped,
    continuousAutoScrollPxPerSecond,
    isDragging,
    loop,
    stepRatio,
  ]);

  return (
    <div className={joinClasses("w-full", className)}>
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} left`}
          onClick={() => scrollByDirection(-1)}
          disabled={!canScrollPrev}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,26,23,0.12)] bg-white/90 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} right`}
          onClick={() => scrollByDirection(1)}
          disabled={!canScrollNext}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(31,26,23,0.12)] bg-white/90 text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div
        ref={viewportRef}
        aria-label={ariaLabel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={joinClasses(
          `no-scrollbar overflow-x-auto scroll-smooth ${snap ? "snap-x snap-mandatory" : ""} ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`,
          viewportClassName,
        )}
      >
        <div className={joinClasses("flex w-max min-w-full gap-4 pb-1", trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
