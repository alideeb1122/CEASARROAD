import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import RevealWrapper from "@/components/shared/RevealWrapper";
import { getServiceIcon, MapPinIcon, ClockIcon, GlobeIcon } from "@/components/home/Icons";
import AboutServicesCarousel from "@/components/about/AboutServicesCarousel";
import BranchesSection from "@/components/home/BranchesSection";

export const metadata: Metadata = { title: "About Us" };

export default function EnglishAboutPage() {
  const p = en.pages.about;
  const hp = en.pages.home;
  const branches = en.pages.branches.branches;

  return (
    <>
      {/* 1. Premium Hero */}
      <section data-header-theme="dark" className="bg-navy text-white py-24 lg:py-36 relative overflow-hidden">
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
            <span>Dubai</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>Erbil</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>Homs</span>
          </div>
        </RevealWrapper>
      </section>

      {/* 2. Who We Are */}
      <section data-header-theme="light" className="bg-white section-padding">
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
                <span className="text-xs text-gold font-semibold uppercase tracking-wider">Caesar Road</span>
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
                  { city: "Homs", note: "Where we began" },
                  { city: "Erbil", note: "First expansion" },
                  { city: "Dubai", note: "Gulf presence" },
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
      <section data-header-theme="light" className="bg-surface section-padding">
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
      <section data-header-theme="light" className="bg-white section-padding">
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
      <BranchesSection
        label={p.presenceLabel}
        title={p.presenceTitle}
        subtitle={p.presenceSubtitle}
        branches={branches}
        branchCta="Contact Branch"
        hoursLabel="Working Hours"
      />

      <AboutServicesCarousel
        label={hp.servicesLabel}
        title={hp.servicesTitle}
        subtitle={hp.servicesSubtitle}
        locale="en"
        items={[
          {
            title: p.storyTitle,
            subtitle: p.storyText,
            image: "/images/gallery/gallery-5.svg",
            imageAlt: p.storyTitle,
          },
          {
            title: p.values[0].title,
            subtitle: p.values[0].desc,
            image: "/images/gallery/gallery-1.svg",
            imageAlt: p.values[0].title,
          },
          {
            title: p.values[1].title,
            subtitle: p.values[1].desc,
            image: "/images/gallery/gallery-2.svg",
            imageAlt: p.values[1].title,
          },
          {
            title: p.values[2].title,
            subtitle: p.values[2].desc,
            image: "/images/gallery/gallery-3.svg",
            imageAlt: p.values[2].title,
          },
          {
            title: p.values[3].title,
            subtitle: p.values[3].desc,
            image: "/images/gallery/gallery-4.svg",
            imageAlt: p.values[3].title,
          },
        ]}
      />

      {/* 6. Trust Numbers */}
      <section data-header-theme="dark" className="bg-navy py-16 lg:py-20">
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
