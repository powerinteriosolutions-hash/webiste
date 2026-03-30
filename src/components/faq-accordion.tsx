"use client";

import { useEffect, useRef, useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [contentHeights, setContentHeights] = useState<number[]>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const updateHeights = () => {
      setContentHeights(
        items.map((_, index) => contentRefs.current[index]?.scrollHeight ?? 0),
      );
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, [items]);

  return (
    <div className="grid gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const measuredHeight = contentHeights[index] ?? 0;

        return (
          <article
            key={item.question}
            className={`faq-item rounded-[1.5rem] border border-[rgba(157,113,69,0.12)] bg-[linear-gradient(180deg,#fffefa_0%,#f7f1e6_100%)] px-5 shadow-[0_14px_35px_rgba(96,76,52,0.05)] ${
              isOpen ? "faq-item-open" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="faq-summary flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
            >
              <h3 className="pr-3 font-serif text-2xl leading-tight text-[var(--color-ink)]">
                {item.question}
              </h3>
              <span
                className={`faq-toggle flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(157,113,69,0.18)] bg-white/70 text-2xl text-[var(--color-accent)] ${
                  isOpen ? "faq-toggle-open" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className={`faq-answer-wrap overflow-hidden ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              style={{ maxHeight: isOpen ? `${measuredHeight}px` : "0px" }}
            >
              <div
                ref={(node) => {
                  contentRefs.current[index] = node;
                }}
                className={`faq-answer-inner min-h-0 ${isOpen ? "translate-y-0" : "-translate-y-2"}`}
              >
                <div className="faq-answer max-w-4xl pb-5 pr-12">
                  <p className="text-base leading-7 text-[var(--color-muted)]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
