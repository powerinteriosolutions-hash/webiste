import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Camera, MessageCircleMore } from "lucide-react";
import { company, navLinks } from "@/lib/site-content";

type SocialLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/78 transition hover:-translate-y-0.5 hover:border-[var(--color-accent-soft)] hover:bg-white/10 hover:text-white"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-ink)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10">
          <div className="grid gap-5">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div className="inline-flex rounded-xl bg-white p-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
                <Image
                  src={company.logoPath}
                  alt={`${company.name} logo`}
                  width={140}
                  height={60}
                  sizes="140px"
                  className="h-10 w-auto object-contain sm:h-12"
                />
              </div>

              <div className="flex items-center gap-2.5 self-start md:self-auto">
                <SocialLink href={company.whatsapp} label="WhatsApp">
                  <MessageCircleMore className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </SocialLink>
                <SocialLink href={company.instagram} label="Instagram">
                  <Camera className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </SocialLink>
                <SocialLink href={company.linkedin} label="LinkedIn">
                  <BriefcaseBusiness className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </SocialLink>
              </div>
            </div>

            <p className="max-w-2xl text-[0.96rem] leading-7 text-white/72 sm:text-base">
              {company.description}
            </p>
          </div>

          <div className="grid min-w-0 gap-5 md:grid-cols-2 md:gap-6">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/4 p-5">
              <p className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-[var(--color-accent-soft)]">
                Explore
              </p>
              <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[0.76rem] font-semibold tracking-[0.14em] uppercase text-white/72 md:grid-cols-1 md:text-sm">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/10 bg-white/4 p-5">
              <p className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase text-[var(--color-accent-soft)]">
                Contact
              </p>
              <div className="mt-4 grid gap-3 text-sm leading-7 text-white/72">
                <a href={`mailto:${company.email}`} className="break-all transition hover:text-white">
                  {company.email}
                </a>
                <a href={company.phoneHref} className="transition hover:text-white">
                  {company.phone}
                </a>
                <p>{company.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
