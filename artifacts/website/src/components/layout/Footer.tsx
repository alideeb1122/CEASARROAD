"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/components/home/useReveal";
import { withBasePath } from "@/lib/base-path";

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
  contact: string;
}

interface FooterProps {
  locale: "ar" | "en";
  siteName: string;
  nav: NavContent;
  footer: FooterContent;
}

export default function Footer({ locale, siteName, nav, footer }: FooterProps) {
  const prefix = locale === "ar" ? "" : "/en";
  const { ref, visible } = useReveal(0.05);
  const hotlineNumber = "+971 52 901 5091";
  const hotlineWhatsapp = hotlineNumber.replace(/[^\d]/g, "");
  const hotlineTitle = locale === "ar" ? "الخط الساخن" : "HOTLINE";
  const hotlineText =
    locale === "ar"
      ? "للمزيد من المعلومات تواصل معنا"
      : "For more information please contact";

  const navLinks = [
    { label: nav.home, href: locale === "ar" ? "/" : "/en" },
    { label: nav.services, href: `${prefix}/services` },
    { label: nav.branches, href: `${prefix}/branches` },
    { label: nav.contact, href: `${prefix}/contact` },
  ];

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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.05fr)_minmax(220px,0.8fr)_minmax(240px,0.95fr)] lg:items-start lg:gap-14">
          <div
            className="max-w-[24rem]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              transitionDelay: "0ms",
            }}
          >
            <Image
              src={withBasePath("/branding/logo-tariq-alkaiser-gold.png")}
              alt={siteName}
              width={1080}
              height={1080}
              className="h-[4.5rem] w-[4.5rem] object-contain md:h-[5rem] md:w-[5rem]"
            />
            <p className="mt-2 max-w-[220px] text-[13px] leading-relaxed text-white/55">
              {footer.tagline}
            </p>

            <div className="mt-4">
              <p className="mb-2.5 text-[10px] uppercase tracking-widest text-white/30">
                {footer.followUs}
              </p>
              <div className="flex flex-wrap gap-2">
                {footer.socials.map((s) =>
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
                )}
              </div>
            </div>
          </div>

          <div
            className="lg:justify-self-center"
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
            className="max-w-[22rem] lg:justify-self-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
              transitionDelay: "160ms",
            }}
          >
            <div className="rounded-[26px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_20px_40px_-30px_rgba(0,0,0,0.45)] backdrop-blur-[2px]">
              <span className="inline-flex rounded-full border border-[#c94b4b]/22 bg-[#c94b4b]/10 px-3 py-1 text-[0.66rem] font-semibold tracking-[0.18em] text-[#f08b8b]">
                {locale === "ar" ? "\u0648\u0627\u062a\u0633\u0627\u0628 \u0645\u0628\u0627\u0634\u0631" : "DIRECT WHATSAPP"}
              </span>
              <h3 className="mt-3 text-[1.15rem] font-semibold text-white">
                {locale === "ar" ? "\u0627\u0644\u062e\u0637 \u0627\u0644\u0633\u0627\u062e\u0646" : "Hotline"}
              </h3>
              <p className="mt-1 text-sm leading-6 text-white/58">
                {locale === "ar" ? "\u0644\u0644\u062d\u062c\u0648\u0632\u0627\u062a \u0648\u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631\u0627\u062a \u0627\u0644\u0633\u0631\u064a\u0639\u0629." : "For fast bookings and quick questions."}
              </p>
              <a
                href={`https://wa.me/${hotlineWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-[#be4545]/26 bg-[#b83c3c]/12 px-4 py-3 text-[0.95rem] font-semibold text-[#f18686] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d15353]/40 hover:bg-[#b83c3c]/18 hover:text-[#ff9d9d]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-current opacity-80" aria-hidden="true" />
                {locale === "ar" ? "\u0627\u0628\u062f\u0623 \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629" : "Start chat"}
              </a>
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
