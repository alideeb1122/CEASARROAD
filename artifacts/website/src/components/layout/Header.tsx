"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { withBasePath } from "@/lib/base-path";

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
  const currentPath =
    pathname ??
    (typeof window !== "undefined"
      ? window.location.pathname
      : locale === "ar"
        ? "/"
        : "/en");
  const normalize = (p: string) =>
    p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;
  const normalizedCurrentPath = normalize(currentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("dark");

  const prefix = locale === "ar" ? "" : "/en";

  const navItems = [
    { label: nav.home, href: locale === "ar" ? "/" : "/en" },
    { label: nav.services, href: `${prefix}/services` },
    { label: nav.branches, href: `${prefix}/branches` },
    { label: nav.about, href: `${prefix}/about` },
    { label: nav.contact, href: `${prefix}/contact` },
  ];

  const isActive = (href: string) => {
    const norm = normalizedCurrentPath;
    const normHref = normalize(href);
    if (normHref === "/" || normHref === "/en") return norm === normHref;
    return norm === normHref || norm.startsWith(normHref + "/");
  };

  useLayoutEffect(() => {
    const resolveTheme = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme]"),
      );
      const probeY = 96;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          return section.dataset.headerTheme === "dark" ? "dark" : "light";
        }
      }

      return "light";
    };

    const onScroll = () => {
      const nextScrolled = window.scrollY > 56;
      setIsScrolled(nextScrolled);
      setHeaderTheme(resolveTheme());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [normalizedCurrentPath]);

  const isDarkHeaderMode = headerTheme === "dark";
  const useLightBrand = isDarkHeaderMode;

  const headerClasses = isDarkHeaderMode
    ? "border-white/12 bg-white/[0.08] shadow-[0_18px_40px_rgba(6,14,28,0.18)]"
    : "border-slate-200/70 bg-white/72 shadow-[0_12px_36px_rgba(15,23,42,0.12)]";
  const navShellClasses = isDarkHeaderMode
    ? "border-white/12 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    : "border-slate-200/80 bg-slate-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]";
  const activeNavClasses = isDarkHeaderMode
    ? "bg-white/90 text-gold shadow-sm"
    : "bg-white text-gold shadow-sm";
  const inactiveNavClasses = isDarkHeaderMode
    ? "text-white/82 hover:bg-white/10 hover:text-white"
    : "text-slate-600 hover:bg-white hover:text-slate-900";
  const mobileButtonClasses =
    isDarkHeaderMode
      ? "border-white/20 text-white/82 hover:bg-white/10 hover:text-white"
      : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900";
  const brandImageClasses = "h-12 sm:h-14 lg:h-16";

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-2xl supports-[backdrop-filter]:bg-white/10 transition-[background-color,border-color,box-shadow] duration-300 ${headerClasses}`}
      >
        <div className={`pointer-events-none absolute inset-0 ${isDarkHeaderMode ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.10),rgba(255,255,255,0.04))]" : "bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.08))]"}`} />
        <div className="container-custom">
          <div className="relative flex h-[74px] items-center justify-between lg:h-[92px]">
            <Link
              href={locale === "ar" ? "/" : "/en"}
              className="group flex flex-shrink-0 items-center"
            >
              <Image
                src={withBasePath(useLightBrand ? "/branding/logo-caesar-road-white.svg" : "/branding/logo-caesar-road.svg")}
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

