import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import { ar } from "@/lib/content/ar";

export const metadata: Metadata = { title: "خدماتنا" };

export default function ArabicServicesPage() {
  const p = ar.pages.services;
  return (
    <>
      <PageHero title={p.title} subtitle={p.subtitle} />
      <Section className="bg-background">
        <PlaceholderBox text={p.placeholderText} />
      </Section>
    </>
  );
}

function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-navy text-white py-20 lg:py-28">
      <div className="container-custom text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-4 text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

function PlaceholderBox({ text }: { text: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
        <span className="text-2xl">🚧</span>
      </div>
      <p className="text-text-muted leading-relaxed">{text}</p>
    </div>
  );
}
