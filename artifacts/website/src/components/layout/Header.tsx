"use client";

import Link from "next/link";
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
  siteTagline,
  nav,
}: HeaderProps) {
  const pathname = usePathname();
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
    const norm = normalize(pathname);
    const normHref = normalize(href);
    if (normHref === "/" || normHref === "/en") return norm === normHref;
    return norm === normHref || norm.startsWith(normHref + "/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy shadow-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-[68px] lg:h-20">
            <Link
              href={locale === "ar" ? "/" : "/en"}
              className="flex flex-col leading-snug flex-shrink-0"
            >
              <span className="text-gold font-bold text-base sm:text-lg leading-tight">
                {siteName}
              </span>
              <span className="text-white/50 text-xs hidden sm:block">
                {siteTagline}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-gold bg-white/10"
                      : "text-white/75 hover:text-white hover:bg-white/10"
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
                className="md:hidden p-2 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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
        currentPath={pathname}
      />
    </>
  );
}
