import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import ServiceDetailBlock from "@/components/services/ServiceDetailBlock";
import ServicesHowSection from "@/components/services/ServicesHowSection";
import ServicesFaqSection from "@/components/services/ServicesFaqSection";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import RevealWrapper from "@/components/shared/RevealWrapper";

export const metadata: Metadata = { title: "Our Services" };

export default function EnglishServicesPage() {
  const p = en.pages.services;

  return (
    <>
      <section className="bg-navy text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.12),transparent_60%)] pointer-events-none" />
        <RevealWrapper className="container-custom text-center relative z-10">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-4">
            {p.label}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {p.title}
          </h1>
          <p className="mt-5 text-white/65 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {p.services.map((s, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white/8 border border-white/12 rounded-full px-4 py-1.5 text-sm text-white/80 font-medium"
              >
                {s.title}
              </span>
            ))}
          </div>
        </RevealWrapper>
      </section>

      <section className="bg-white section-padding-sm border-b border-gray-100">
        <RevealWrapper className="container-custom">
          <p className="text-base lg:text-lg text-text-muted leading-relaxed max-w-3xl mx-auto text-center">
            {p.intro}
          </p>
        </RevealWrapper>
      </section>

      {p.services.map((service, i) => (
        <ServiceDetailBlock
          key={i}
          index={i}
          icon={service.icon}
          title={service.title}
          desc={service.desc}
          detail={service.detail}
          bullets={service.bullets}
          ctaBtn={service.ctaBtn}
          whatsapp={p.ctaWhatsapp}
        />
      ))}

      <ServicesHowSection
        label={p.howLabel}
        title={p.howTitle}
        steps={p.howSteps}
      />

      <ServicesFaqSection
        label={p.faqLabel}
        title={p.faqTitle}
        faqs={p.faqs}
      />

      <FinalCtaSection
        title={p.ctaTitle}
        subtitle={p.ctaSubtitle}
        ctaBtn={p.ctaBtn}
        whatsapp={p.ctaWhatsapp}
      />
    </>
  );
}
