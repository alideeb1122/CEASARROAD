import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import { getServiceIcon } from "@/components/home/Icons";

export const metadata: Metadata = { title: "About Us" };

export default function EnglishAboutPage() {
  const p = en.pages.about;
  return (
    <>
      <section className="bg-navy text-white py-20 lg:py-28">
        <div className="container-custom text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {p.label}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {p.title}
          </h1>
          <p className="mt-4 text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
                {p.whoLabel}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5">
                {p.whoTitle}
              </h2>
              <p className="text-text-muted leading-relaxed text-base">{p.whoText}</p>
            </div>
            <div>
              <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
                {p.storyLabel}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5">
                {p.storyTitle}
              </h2>
              <p className="text-text-muted leading-relaxed text-base">{p.storyText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 lg:py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {p.stats.map((stat, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-4xl font-extrabold text-gold">
                  {stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {p.missionLabel}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5">
            {p.missionTitle}
          </h2>
          <p className="text-text-muted leading-relaxed text-base lg:text-lg">
            {p.missionText}
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              {p.valuesLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {p.valuesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.values.map((value, i) => (
              <div
                key={i}
                className="flex flex-col bg-background rounded-2xl border border-gray-100 p-6 hover:border-gold/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 flex-shrink-0">
                  {getServiceIcon(value.icon, "w-5 h-5 text-gold")}
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection
        title={p.ctaTitle}
        subtitle={p.ctaSubtitle}
        ctaBtn={p.ctaBtn}
        whatsapp={p.ctaWhatsapp}
      />
    </>
  );
}
