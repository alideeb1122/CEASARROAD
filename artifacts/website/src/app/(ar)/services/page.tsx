import type { Metadata } from "next";
import { ar } from "@/lib/content/ar";
import ServiceCard from "@/components/services/ServiceCard";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import { getServiceIcon } from "@/components/home/Icons";

export const metadata: Metadata = { title: "خدماتنا" };

export default function ArabicServicesPage() {
  const p = ar.pages.services;
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

      <section className="bg-background section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {p.services.map((service, i) => (
              <ServiceCard
                key={i}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                detail={service.detail}
                ctaBtn={service.ctaBtn}
                whatsapp={p.ctaWhatsapp}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-padding-sm">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
              {p.trustLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
              {p.trustTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {p.trustPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getServiceIcon(point.icon, "w-4 h-4 text-gold")}
                </div>
                <p className="text-sm text-text-primary font-medium leading-snug">
                  {point.text}
                </p>
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
