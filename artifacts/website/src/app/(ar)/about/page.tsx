import type { Metadata } from "next";
import { ar } from "@/lib/content/ar";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import RevealWrapper from "@/components/shared/RevealWrapper";
import { getServiceIcon, MapPinIcon, ClockIcon, GlobeIcon } from "@/components/home/Icons";

export const metadata: Metadata = { title: "من نحن" };

export default function ArabicAboutPage() {
  const p = ar.pages.about;
  const branches = ar.pages.branches.branches;

  return (
    <>
      {/* 1. Premium Hero */}
      <section className="bg-navy text-white py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full border border-white/30" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/20" />
        </div>
        <RevealWrapper className="container-custom text-center relative">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold text-xs font-semibold uppercase tracking-widest mb-6">
            {p.label}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto">
            {p.title}
          </h1>
          <p className="mt-6 text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-8 text-sm text-white/40">
            <span>دبي</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>أربيل</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>حمص</span>
          </div>
        </RevealWrapper>
      </section>

      {/* 2. Who We Are */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <RevealWrapper className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
            <div>
              <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                {p.whoLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5 leading-snug">
                {p.whoTitle}
              </h2>
              <p className="text-text-muted leading-relaxed text-base">{p.whoText}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-8 h-px bg-gold" />
                <span className="text-xs text-gold font-semibold uppercase tracking-wider">طريق القيصر</span>
              </div>
            </div>
            <div className="lg:pt-2">
              <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                {p.storyLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5 leading-snug">
                {p.storyTitle}
              </h2>
              <p className="text-text-muted leading-relaxed text-base">{p.storyText}</p>
              <div className="mt-8 grid grid-cols-3 gap-4 pt-2">
                {[
                  { city: "حمص", note: "المقر الأصيل" },
                  { city: "أربيل", note: "التوسع الأول" },
                  { city: "دبي", note: "الحضور الخليجي" },
                ].map((item) => (
                  <div key={item.city} className="text-center p-3 rounded-xl bg-background border border-gray-100">
                    <p className="font-bold text-text-primary text-sm">{item.city}</p>
                    <p className="text-xs text-text-muted mt-0.5">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* 3. Mission + Vision */}
      <section className="bg-surface section-padding">
        <div className="container-custom">
          <RevealWrapper className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-10">
              <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center mb-5">
                <GlobeIcon className="w-5 h-5 text-navy" />
              </div>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">
                {p.missionLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                {p.missionTitle}
              </h2>
              <p className="text-text-muted leading-relaxed text-base">{p.missionText}</p>
            </div>
            <div className="bg-navy rounded-2xl p-8 lg:p-10 text-white">
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <GlobeIcon className="w-5 h-5 text-gold" />
              </div>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-3 block">
                {p.visionLabel}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {p.visionTitle}
              </h2>
              <p className="text-white/70 leading-relaxed text-base">{p.visionText}</p>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* 4. Values */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <RevealWrapper className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              {p.valuesLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {p.valuesTitle}
            </h2>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {p.values.map((value, i) => (
              <div
                key={i}
                className="flex flex-col bg-background rounded-2xl border border-gray-100 p-6 hover:border-gold/40 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 flex items-center justify-center mb-5 flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-200">
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

      {/* 5. Regional Presence */}
      <section className="bg-surface section-padding">
        <div className="container-custom">
          <RevealWrapper className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-semibold uppercase tracking-widest mb-3">
              {p.presenceLabel}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
              {p.presenceTitle}
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-base leading-relaxed">
              {p.presenceSubtitle}
            </p>
          </RevealWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {branches.map((branch, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gold/30 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-text-primary text-lg">{branch.city}</p>
                    <p className="text-xs text-text-muted mt-0.5">{branch.country}</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-4 h-4 text-gold" />
                  </div>
                </div>
                <p className="text-sm text-text-muted leading-relaxed mb-4">{branch.address}</p>
                <div className="flex items-center gap-2 text-xs text-text-muted border-t border-gray-100 pt-4">
                  <ClockIcon className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span>{branch.hours}</span>
                </div>
                {branch.description && (
                  <p className="text-xs text-text-muted mt-3 leading-relaxed border-t border-gray-100 pt-3">
                    {branch.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trust Numbers */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="container-custom">
          <RevealWrapper className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {p.stats.map((stat, i) => (
              <div key={i} className="px-2">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gold leading-none">
                  {stat.value.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-white font-semibold text-sm mt-2">{stat.label}</p>
                <p className="text-white/45 text-xs mt-1 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </RevealWrapper>
        </div>
      </section>

      {/* 7. Final CTA */}
      <FinalCtaSection
        title={p.ctaTitle}
        subtitle={p.ctaSubtitle}
        ctaBtn={p.ctaBtn}
        whatsapp={p.ctaWhatsapp}
      />
    </>
  );
}
