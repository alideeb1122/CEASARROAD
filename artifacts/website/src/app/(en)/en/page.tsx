import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/ui/Section";
import { en } from "@/lib/content/en";

export const metadata: Metadata = {
  title: "Caesar Road Travel & Tourism",
};

export default function EnglishHomePage() {
  const p = en.pages.home;

  return (
    <>
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white py-28 lg:py-40">
        <div className="container-custom text-center">
          <p className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-6 tracking-wide">
            {en.siteName}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            {p.heroTitle}
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            {p.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/en/services"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-navy font-bold rounded-lg hover:bg-gold-light transition-colors text-sm sm:text-base"
            >
              {p.heroCta}
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white/60 hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              {p.heroCtaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Section className="bg-background">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-semibold uppercase tracking-widest mb-4">
            {p.placeholderLabel}
          </span>
          <p className="text-text-muted leading-relaxed">{p.placeholderText}</p>
        </div>
      </Section>
    </>
  );
}
