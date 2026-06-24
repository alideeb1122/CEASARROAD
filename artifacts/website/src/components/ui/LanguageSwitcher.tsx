"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  locale: "ar" | "en";
  label: string;
  darkMode?: boolean;
  compact?: boolean;
}

function getCounterpartPath(pathname: string, locale: "ar" | "en"): string {
  const clean =
    pathname.endsWith("/") && pathname.length > 1
      ? pathname.slice(0, -1)
      : pathname;

  if (locale === "ar") {
    if (clean === "/") return "/en";
    return `/en${clean}`;
  }

  if (clean === "/en") return "/";
  return clean.replace(/^\/en/, "") || "/";
}

export default function LanguageSwitcher({
  locale,
  label,
  darkMode = false,
  compact = false,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const counterpart = getCounterpartPath(
    pathname ?? (locale === "ar" ? "/" : "/en"),
    locale,
  );

  const classes = darkMode
    ? "border-amber-200/28 bg-[linear-gradient(135deg,rgba(214,170,87,0.28),rgba(255,255,255,0.08))] text-amber-50 shadow-[0_12px_28px_rgba(8,14,28,0.2)] hover:border-amber-100/42 hover:bg-[linear-gradient(135deg,rgba(224,184,102,0.44),rgba(255,255,255,0.14))]"
    : "border-amber-300/55 bg-[linear-gradient(135deg,rgba(255,248,235,0.98),rgba(232,199,131,0.42))] text-[#7f5e21] shadow-[0_12px_28px_rgba(188,152,84,0.18)] hover:border-amber-300/75 hover:bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(232,199,131,0.62))]";
  const sizeClasses = compact
    ? "h-12 min-w-[3.25rem] rounded-2xl px-3 text-[0.88rem] tracking-[0.16em]"
    : "min-w-[3.25rem] rounded-2xl px-3.5 py-2 text-sm tracking-[0.18em]";

  return (
    <Link
      href={counterpart}
      className={`inline-flex items-center justify-center border font-semibold backdrop-blur-xl transition-all duration-200 ${sizeClasses} ${classes}`}
    >
      {label}
    </Link>
  );
}
