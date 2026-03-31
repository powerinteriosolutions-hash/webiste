"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const REVEAL_SELECTOR = "main > section:not(:first-of-type)";

export function MotionFallback() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const supportsViewTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: view()");

    const sections = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    const resetSections = () => {
      root.classList.remove("no-view-timeline");
      sections.forEach((section) => {
        section.removeAttribute("data-reveal-section");
        section.classList.remove("is-visible");
        section.style.removeProperty("--reveal-delay");
      });
    };

    if (mediaQuery.matches || supportsViewTimeline || sections.length === 0) {
      resetSections();
      return;
    }

    root.classList.add("no-view-timeline");

    sections.forEach((section, index) => {
      section.setAttribute("data-reveal-section", "");
      section.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 80}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    sections.forEach((section) => observer.observe(section));

    const handleMotionChange = () => {
      if (!mediaQuery.matches) {
        return;
      }

      observer.disconnect();
      resetSections();
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleMotionChange);
    } else {
      mediaQuery.addListener(handleMotionChange);
    }

    return () => {
      observer.disconnect();

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleMotionChange);
      } else {
        mediaQuery.removeListener(handleMotionChange);
      }

      resetSections();
    };
  }, [pathname]);

  return null;
}
