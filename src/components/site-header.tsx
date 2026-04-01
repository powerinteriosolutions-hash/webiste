"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { company, navLinks, withBasePath, withBasePathRoute } from "@/lib/site-content";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const normalizePath = (value: string) => {
    const path = value.split("#")[0]?.split("?")[0] ?? "/";
    if (path === "/") return "/";
    return path.replace(/\/+$/, "");
  };

  const currentPath = normalizePath(pathname ?? "/");

  const isLinkActive = (href: string) => {
    const targetPath = normalizePath(href);
    if (targetPath === "/") return currentPath === "/";
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  const handleSamePageLinkClick = (href: string) => {
    if (isLinkActive(href)) {
      setIsOpen(false);
    }
  };

  const handleMobileNavLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);

    if (!isLinkActive(href)) {
      return;
    }

    event.preventDefault();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[rgba(248,242,234,0.96)]">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={withBasePathRoute("/")}
            className="group flex min-w-0 items-center gap-3"
            onClick={() => handleSamePageLinkClick("/")}
          >
            <div className="rounded-xl bg-white p-2 shadow-[0_10px_24px_rgba(71,52,34,0.08)] group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_34px_rgba(71,52,34,0.12)]">
              <Image
                src={withBasePath(company.logoPath)}
                alt={`${company.name} logo`}
                width={120}
                height={52}
                sizes="120px"
                className="h-9 w-auto object-contain sm:h-11"
              />
            </div>
            <span className="hidden text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[var(--color-muted)] sm:inline-block lg:text-xs">
              Interior Design Company
            </span>
          </Link>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] bg-white/80 text-[var(--color-ink)] shadow-[0_10px_24px_rgba(71,52,34,0.06)] transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(71,52,34,0.1)] lg:hidden"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  isOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu ${
                  isOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
                }`}
              />
            </span>
          </button>

          <nav className="hidden flex-wrap gap-2 text-xs font-semibold tracking-[0.16em] uppercase sm:text-sm lg:flex">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={withBasePathRoute(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 transition-[color,background-color,transform] duration-200 ${
                    isActive
                      ? "bg-[rgba(157,113,69,0.14)] text-[var(--color-accent)]"
                      : "text-[var(--color-muted)] hover:-translate-y-0.5 hover:text-[var(--color-accent)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
            isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isOpen}
        >
          <div className="min-h-0">
            <nav
              id="mobile-navigation"
              className={`origin-top rounded-[1.5rem] border border-[var(--color-line)] bg-[rgba(255,255,255,0.96)] p-3 shadow-[0_18px_40px_rgba(71,52,34,0.08)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform ${
                isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              <div className="grid gap-2">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={withBasePathRoute(link.href)}
                      onClick={(event) => handleMobileNavLinkClick(event, link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`rounded-xl px-4 py-3 text-sm font-semibold tracking-[0.14em] uppercase transition-[color,background-color] duration-200 ${
                        isActive
                          ? "bg-[rgba(157,113,69,0.14)] text-[var(--color-accent)]"
                          : "text-[var(--color-muted)] hover:bg-[rgba(157,113,69,0.08)] hover:text-[var(--color-accent)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
