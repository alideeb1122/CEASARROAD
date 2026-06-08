"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/components/home/useReveal";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45a2.78 2.78 0 0 0-1.95 1.97A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.77 1.52V7.15a4.85 4.85 0 0 1-1-.46z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function MapPinIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SocialIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case "instagram": return <InstagramIcon className={className} />;
    case "facebook": return <FacebookIcon className={className} />;
    case "youtube": return <YoutubeIcon className={className} />;
    case "tiktok": return <TikTokIcon className={className} />;
    case "linkedin": return <LinkedInIcon className={className} />;
    default: return null;
  }
}

interface FooterSocial {
  type: string;
  url: string;
  label?: string;
  branch?: string;
  platform?: string;
  handle?: string;
}

interface FooterContent {
  tagline: string;
  quickLinks: string;
  branchesTitle: string;
  followUs: string;
  whatsappCta: string;
  mapCta: string;
  closedDay: string;
  rights: string;
  socials: FooterSocial[];
}

interface NavContent {
  home: string;
  services: string;
  branches: string;
  about: string;
  contact: string;
}

interface BranchData {
  city: string;
  address: string;
  whatsapp: string;
  hours: string;
  offDay: string;
  mapUrl: string;
}

interface FooterProps {
  locale: "ar" | "en";
  siteName: string;
  nav: NavContent;
  footer: FooterContent;
  branches: BranchData[];
  branchSocials: FooterSocial[];
}

export default function Footer({ locale, siteName, nav, footer, branches, branchSocials }: FooterProps) {
  const prefix = locale === "ar" ? "" : "/en";
  const { ref, visible } = useReveal(0.05);

  const navLinks = [
    { label: nav.home, href: locale === "ar" ? "/" : "/en" },
    { label: nav.services, href: `${prefix}/services` },
    { label: nav.branches, href: `${prefix}/branches` },
    { label: nav.about, href: `${prefix}/about` },
    { label: nav.contact, href: `${prefix}/contact` },
  ];

  const getBranchSocials = (branchCity: string) =>
    branchSocials.filter((social) => social.branch === branchCity);

  return (
    <footer
      ref={ref as React.Ref<HTMLElement>}
      data-header-theme="dark"
      className="relative overflow-hidden border-t border-white/10 bg-navy-dark text-white/60"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(201,163,71,0.06)_0%,transparent_18%),radial-gradient(circle_at_10%_100%,rgba(255,255,255,0.035)_0%,transparent_26%)]" />
        <div className="footer-pattern absolute inset-0 opacity-50" />
      </div>

      <div className="container-custom relative py-7 lg:py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-7">
          <div
            className="lg:col-span-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              transitionDelay: "0ms",
            }}
          >
            <span className="inline-flex rounded-2xl border border-white/12 bg-white/[0.06] px-3 py-2">
              <Image
                src="/branding/logo-caesar-road.svg"
                alt={siteName}
                width={280}
                height={82}
                className="h-9 w-auto brightness-0 invert md:h-10"
              />
            </span>
            <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-white/55">
              {footer.tagline}
            </p>

            <div className="mt-4">
              <p className="mb-2.5 text-[10px] uppercase tracking-widest text-white/30">
                {footer.followUs}
              </p>
              <div className="flex flex-wrap gap-2">
                {footer.socials.map((s) => (
                  !s.branch ? (
                  <a
                    key={`${s.type}-${s.url}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/45 transition-all duration-300 hover:border-brand-cta/30 hover:bg-brand-cta/10 hover:text-brand-cta"
                  >
                    <SocialIcon type={s.type} className="h-3.5 w-3.5" />
                  </a>
                  ) : null
                ))}
              </div>
            </div>

          </div>

          <div
            className="lg:col-span-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              transitionDelay: "80ms",
            }}
          >
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/90">
              {footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-white/50 transition-colors duration-150 hover:text-brand-cta">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="sm:col-span-2 lg:col-span-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              transitionDelay: "160ms",
            }}
          >
            <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-white/90">
              {footer.branchesTitle}
            </h3>
            <div>
              {branches.map((branch) => {
                const branchSocials = getBranchSocials(branch.city);

                return (
                  <div key={branch.city} className="border-b border-white/[0.07] py-2.5 last:border-0 last:pb-0">
                    <p className="mb-1 text-sm font-semibold text-white/85">{branch.city}</p>
                    <p className="mb-1 text-xs leading-relaxed text-white/40">{branch.address}</p>
                    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] text-white/30">
                      <ClockIcon className="h-3 w-3 flex-shrink-0" />
                      <span>{branch.hours}</span>
                      <span className="opacity-60">•</span>
                      <span>{footer.closedDay}: {branch.offDay}</span>
                    </div>
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <a
                        href={`https://wa.me/${branch.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${branch.city}`}
                        title={`${locale === "ar" ? "واتساب" : "WhatsApp"} ${branch.city}`}
                        className="group relative flex h-7 w-7 items-center justify-center rounded-md border border-brand-cta/20 bg-brand-cta/12 text-brand-cta transition-all duration-300 hover:border-brand-cta/35 hover:bg-brand-cta/20"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        <span className="pointer-events-none absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium text-navy opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
                          {locale === "ar" ? "واتساب" : "WhatsApp"}
                        </span>
                      </a>
                      {branch.mapUrl ? (
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${footer.mapCta} ${branch.city}`}
                          title={`${footer.mapCta} ${branch.city}`}
                          className="group relative flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-brand-cta/30 hover:bg-brand-cta/10 hover:text-brand-cta"
                        >
                          <MapPinIcon className="h-3.5 w-3.5" />
                          <span className="pointer-events-none absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium text-navy opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
                            {footer.mapCta}
                          </span>
                        </a>
                      ) : null}
                      {branchSocials.map((social) => (
                        <a
                          key={`${branch.city}-${social.type}-${social.url}`}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${social.label} ${branch.city}`}
                          title={`${social.platform ?? social.label} ${branch.city}`}
                          className="group relative flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-white/50 transition-all duration-300 hover:border-brand-cta/30 hover:bg-brand-cta/10 hover:text-brand-cta"
                        >
                          <SocialIcon type={social.type} className="h-3.5 w-3.5" />
                          <span className="pointer-events-none absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-[10px] font-medium text-navy opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
                            {social.platform ?? social.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-white/[0.08] pt-3 text-center text-[11px] text-white/25">
          {footer.rights}
        </div>
      </div>

      <style jsx>{`
        .footer-pattern {
          background-image:
            radial-gradient(circle at 22px 22px, rgba(232, 203, 94, 0.08) 0, rgba(232, 203, 94, 0.08) 1.2px, transparent 1.3px),
            radial-gradient(circle at 0 0, rgba(255, 255, 255, 0.045) 0, rgba(255, 255, 255, 0.045) 1px, transparent 1.1px),
            linear-gradient(115deg, transparent 0%, transparent 42%, rgba(255, 255, 255, 0.03) 42.5%, transparent 43%, transparent 100%);
          background-size: 44px 44px, 28px 28px, 100% 100%;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.9));
        }

        @media (max-width: 1024px) {
          .footer-pattern {
            opacity: 0.38;
          }
        }

        @media (max-width: 640px) {
          .footer-pattern {
            background-size: 38px 38px, 24px 24px, 100% 100%;
            opacity: 0.28;
          }
        }
      `}</style>
    </footer>
  );
}
