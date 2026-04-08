"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locale: "ar" | "en";
  label: string;
}

function getCounterpartPath(pathname: string, locale: "ar" | "en"): string {
  const clean = pathname.endsWith("/") && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;

  if (locale === "ar") {
    if (clean === "/") return "/en";
    return `/en${clean}`;
  } else {
    if (clean === "/en") return "/";
    return clean.replace(/^\/en/, "") || "/";
  }
}

export default function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const counterpart = getCounterpartPath(pathname ?? (locale === "ar" ? "/" : "/en"), locale);

  return (
    <Link
      href={counterpart}
      className="px-3 py-1.5 rounded-md text-sm font-semibold border border-gold/60 text-gold hover:bg-gold hover:text-navy transition-all duration-200 tracking-wide"
    >
      {label}
    </Link>
  );
}
