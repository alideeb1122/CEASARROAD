import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { en } from "@/lib/content/en";

export const metadata: Metadata = { title: "Our Branches" };

export default function EnglishBranchesPage() {
  const p = en.pages.branches;
  return (
    <>
      <section className="bg-navy text-white py-20 lg:py-28">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{p.title}</h1>
          <p className="mt-4 text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </section>
      <Section className="bg-background">
        <div className="max-w-2xl mx-auto text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
            <span className="text-2xl">📍</span>
          </div>
          <p className="text-text-muted leading-relaxed">{p.placeholderText}</p>
        </div>
      </Section>
    </>
  );
}
