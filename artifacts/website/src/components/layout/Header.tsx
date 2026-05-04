"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

interface NavContent {
  home: string;
  services: string;
  branches: string;
  about: string;
  contact: string;
  switchLang: string;
}

interface HeaderProps {
  locale: "ar" | "en";
  siteName: string;
  siteTagline: string;
  nav: NavContent;
}

export default function Header({
  locale,
  siteName,
  siteTagline: _siteTagline,
  nav,
}: HeaderProps) {
  const pathname = usePathname();
  const currentPath = pathname ?? (locale === "ar" ? "/" : "/en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const prefix = locale === "ar" ? "" : "/en";

  const navItems = [
    { label: nav.home, href: locale === "ar" ? "/" : "/en" },
    { label: nav.services, href: `${prefix}/services` },
    { label: nav.branches, href: `${prefix}/branches` },
    { label: nav.about, href: `${prefix}/about` },
    { label: nav.contact, href: `${prefix}/contact` },
  ];

  const normalize = (p: string) =>
    p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;

  const isActive = (href: string) => {
    const norm = normalize(currentPath);
    const normHref = normalize(href);
    if (normHref === "/" || normHref === "/en") return norm === normHref;
    return norm === normHref || norm.startsWith(normHref + "/");
  };

  const headerClasses =
    "border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)]";
  const navShellClasses =
    "border-slate-200/80 bg-slate-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]";
  const activeNavClasses = "bg-white text-gold shadow-sm";
  const inactiveNavClasses = "text-slate-600 hover:bg-white hover:text-slate-900";
  const mobileButtonClasses =
    "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900";
  const brandImageClasses = "h-10 sm:h-11 lg:h-12";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${headerClasses}`}
      >
        <div className="container-custom">
          <div className="flex h-[68px] items-center justify-between lg:h-[82px]">
            <Link
              href={locale === "ar" ? "/" : "/en"}
              className="group flex flex-shrink-0 items-center"
            >
              <Image
                src="/branding/logo-caesar-road.svg"
                alt={siteName}
                width={300}
                height={90}
                priority
                className={`w-auto transition-transform duration-300 group-hover:-translate-y-0.5 ${brandImageClasses}`}
              />
            </Link>

            <nav className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 lg:flex lg:gap-1.5 lg:px-2.5 ${navShellClasses}`}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? activeNavClasses
                      : inactiveNavClasses
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher locale={locale} label={nav.switchLang} />
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`rounded-xl border p-2 transition-colors lg:hidden ${mobileButtonClasses}`}
                aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        locale={locale}
        currentPath={currentPath}
      />
    </>
  );
}

