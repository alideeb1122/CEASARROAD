"use client";

import Link from "next/link";
import { useEffect } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  locale: "ar" | "en";
  currentPath: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navItems,
  locale,
  currentPath,
}: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const normalize = (path: string) =>
    path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;

  const isActive = (href: string) => {
    const norm = normalize(currentPath);
    const normHref = normalize(href);
    if (normHref === "/" || normHref === "/en") {
      return norm === normHref;
    }

    return norm === normHref || norm.startsWith(normHref + "/");
  };

  const drawerSide = locale === "ar" ? "right-0" : "left-0";
  const translateIn = "translate-x-0";
  const translateOut =
    locale === "ar" ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 ${drawerSide} z-50 flex h-full w-72 flex-col bg-navy-dark shadow-2xl transition-transform duration-300 md:hidden ${
          isOpen ? translateIn : translateOut
        }`}
        dir={locale === "ar" ? "rtl" : "ltr"}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-lg font-semibold text-gold">
            {locale === "ar" ? "القائمة" : "Menu"}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`block border-b border-white/5 px-6 py-3.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-white/10 text-gold"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
