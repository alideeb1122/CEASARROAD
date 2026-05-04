"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const headerRef = useRef<HTMLElement | null>(null);

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

  useEffect(() => {
    const updateTheme = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      const probeY = headerHeight + 12;
      const stack = document.elementsFromPoint(window.innerWidth / 2, probeY);
      const themedAncestor = stack.find((node) => {
        if (!(node instanceof Element)) return false;
        if (headerRef.current?.contains(node)) return false;
        return Boolean(node.closest("[data-header-theme]"));
      });
      const resolvedThemeElement =
        themedAncestor instanceof Element
          ? themedAncestor.closest("[data-header-theme]")
          : null;
      const nextTheme =
        resolvedThemeElement?.getAttribute("data-header-theme") === "light"
          ? "light"
          : "dark";
      setTheme(nextTheme);
    };

    updateTheme();

    const onScroll = () => window.requestAnimationFrame(updateTheme);
    const onResize = () => window.requestAnimationFrame(updateTheme);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [currentPath]);

  const headerClasses =
    theme === "light"
      ? "border-slate-200/80 bg-white/86 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      : "border-white/10 bg-navy/88 shadow-[0_10px_30px_rgba(10,16,30,0.18)]";
  const navShellClasses =
    theme === "light"
      ? "border-slate-200/80 bg-slate-100/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
      : "border-white/8 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";
  const activeNavClasses =
    theme === "light"
      ? "bg-white text-gold shadow-sm"
      : "bg-white/10 text-gold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";
  const inactiveNavClasses =
    theme === "light"
      ? "text-slate-600 hover:bg-white hover:text-slate-900"
      : "text-white/72 hover:bg-white/[0.08] hover:text-white";
  const mobileButtonClasses =
    theme === "light"
      ? "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      : "border-white/10 text-white/70 hover:bg-white/10 hover:text-white";
  const brandImageClasses =
    theme === "light"
      ? "h-9 sm:h-10 lg:h-11"
      : "h-9 sm:h-10 lg:h-11";

  return (
    <>
      <header
        ref={headerRef}
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

