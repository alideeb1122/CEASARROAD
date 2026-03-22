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

  const normalize = (p: string) =>
    p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p;

  const isActive = (href: string) => {
    const norm = normalize(currentPath);
    const normHref = normalize(href);
    if (normHref === "/" || normHref === "/en") return norm === normHref;
    return norm === normHref || norm.startsWith(normHref + "/");
  };

  const drawerSide = locale === "ar" ? "right-0" : "left-0";
  const translateIn = "translate-x-0";
  const translateOut = locale === "ar" ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 ${drawerSide} h-full w-72 bg-navy-dark z-50 shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${
          isOpen ? translateIn : translateOut
        }`}
        dir={locale === "ar" ? "rtl" : "ltr"}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-gold font-semibold text-lg">
            {locale === "ar" ? "القائمة" : "Menu"}
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
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
              className={`block px-6 py-3.5 text-sm font-medium transition-colors border-b border-white/5 ${
                isActive(item.href)
                  ? "text-gold bg-white/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
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
