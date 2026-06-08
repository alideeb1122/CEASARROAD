"use client";

import Link from "next/link";
import RevealWrapper from "@/components/shared/RevealWrapper";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { ChevronRightIcon, CheckCircleIcon, WhatsAppIcon, getServiceIcon } from "@/components/home/Icons";
import type { Locale, ServiceRecord } from "@/lib/data/services";

type ServiceTestimonial = {
  name: string;
  text: string;
  context: string;
  gender?: "male" | "female";
};

interface ServiceDetailPageProps {
  locale: Locale;
  service: ServiceRecord;
  common: {
    homeLabel: string;
    servicesLabel: string;
    serviceDetailsLabel: string;
    availableItems: string;
    whatsAppLabel: string;
    backToServices: string;
    customerVoicesTitle: string;
    customerVoices: Array<{ name: string; text: string; gender?: "male" | "female" }>;
  };
  listingCta: {
    title: string;
    subtitle: string;
    button: string;
    whatsapp: string;
  };
}

export default function ServiceDetailPage({
  locale,
  service,
  common,
  listingCta,
}: ServiceDetailPageProps) {
  const isRtl = locale === "ar";
  const baseHref = locale === "ar" ? "/services" : "/en/services";
  const homeHref = locale === "ar" ? "/" : "/en";
  const heroBackground =
    service.slug === "flight-booking"
      ? "/images/hero/flight-booking-hero.jpg"
      : service.slug === "study-abroad"
        ? "/images/hero/study-abroad-hero.jpg"
        : service.previewImage ?? "/images/hero/hero-poster.jpg";
  const serviceTestimonials = common.customerVoices.map((voice, index) => ({
    ...voice,
    context: service.items[index]?.shortLabel ?? service.title,
    gender: voice.gender,
  }));
  const voicesLabel = common.customerVoicesTitle;
  const voicesSubtitle =
    locale === "ar"
      ? `${common.customerVoicesTitle} ? ${service.title}`
      : `Real experiences from clients who used ${service.title}`;

  return (
    <>
      <section data-header-theme="dark" className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
          style={{ backgroundImage: `url("${heroBackground}")` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,183,112,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(94,130,190,0.10),transparent_34%),linear-gradient(180deg,rgba(8,14,28,0.62),rgba(10,20,40,0.74))]" />
        <RevealWrapper className="container-custom relative z-10 py-16 lg:py-24">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href={homeHref} className="transition-colors hover:text-white">
              {common.homeLabel}
            </Link>
            <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            <Link href={baseHref} className="transition-colors hover:text-white">
              {common.servicesLabel}
            </Link>
            <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            <span className="text-white/90">{service.title}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-gold/95">
                {common.serviceDetailsLabel}
              </p>
              <h1
                className={`max-w-2xl break-words text-4xl font-extrabold tracking-tight sm:text-5xl ${
                  service.slug === "study-abroad" ? "leading-[1.28] lg:text-[3.35rem] lg:leading-[1.2]" : "leading-[1.18] lg:text-[3.7rem] lg:leading-[1.12]"
                }`}
              >
                {service.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/90 lg:text-lg">
                {service.heroSubtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${listingCta.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-20px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {common.whatsAppLabel}
                </a>
                <Link
                  href={baseHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/22 bg-white/12 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-gold/45 hover:bg-white/18"
                >
                  {common.backToServices}
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/14 bg-[#08101e]/[0.72] p-7 backdrop-blur-xl">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[22px] border border-gold/15 bg-gold/10 text-gold">
                {getServiceIcon(service.icon, "h-8 w-8")}
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold/80">{service.eyebrow}</p>
              <p className="mt-4 max-w-md text-base leading-8 text-white/92">{service.detail}</p>
              <div className="mt-8 grid gap-4">
                {service.highlights.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-4">
                    <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-6 text-white/92">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      <section data-header-theme="light" className="bg-white section-padding-sm border-b border-black/5">
        <RevealWrapper className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
              {common.availableItems}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
              {service.optionsTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-text-muted">{service.optionsSubtitle}</p>
          </div>
        </RevealWrapper>
      </section>

      <section data-header-theme="light" className="bg-[#f8f7f3] section-padding">
        <div className="container-custom">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {service.items.map((item, index) => (
              <RevealWrapper key={item.slug} delay={index * 75}>
                <Link
                  href={`${baseHref}/${service.slug}/${item.slug}`}
                  className="group block h-full overflow-hidden rounded-[30px] border border-slate-200/70 bg-white p-4 shadow-[0_18px_44px_-30px_rgba(23,34,63,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_30px_70px_-28px_rgba(23,34,63,0.55)]"
                >
                  <div className="mb-4 flex items-start justify-between gap-4 px-2 pt-2">
                    <div className="inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-navy text-sm font-bold text-gold">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <span className="rounded-full border border-gold/15 bg-gold/10 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-gold">
                      {item.heroTag}
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,rgba(15,29,58,1),rgba(33,53,92,0.94))] text-white">
                    {item.image || service.previewImage ? (
                      <img
                        src={item.image ?? service.previewImage}
                        alt={item.imageAlt ?? service.previewImageAlt ?? item.title}
                        loading="lazy"
                        style={{ objectPosition: item.imagePosition ?? service.previewImagePosition ?? "center center" }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,29,0.08),rgba(8,14,29,0.48)_45%,rgba(8,14,29,0.88))]" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-gold/35" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/85">{item.title}</p>
                      <div>
                        <h3 className="mt-2 text-2xl font-extrabold">{item.shortLabel}</h3>
                        <p className="mt-3 max-w-[24ch] text-sm leading-6 text-white/75">{item.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2 pb-2 pt-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-navy">
                      <span>{common.serviceDetailsLabel}</span>
                      <ChevronRightIcon className={`h-4 w-4 transition-transform duration-300 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {service.slug === "flight-booking" ? (
        <section data-header-theme="light" className="bg-white section-padding-sm border-b border-black/5">
          <RevealWrapper className="container-custom">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-44 w-44 items-center justify-center rounded-[34px] border border-gold/20 bg-gradient-to-br from-navy to-slate-900 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.5)]">
                  <img
                    src="/images/partners/csr-logo.png"
                    alt="\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <div className="text-center lg:text-start">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  {locale === "ar" ? "\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648" : "Argo Platform"}
                </p>
                <h2 className="text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {locale === "ar" ? "\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648 \u0644\u062d\u062c\u0648\u0632\u0627\u062a \u0627\u0644\u0637\u064a\u0631\u0627\u0646" : "Argo Platform for Flight Bookings"}
                </h2>
                <p className="mt-4 text-base leading-8 text-text-muted lg:max-w-2xl">
                  {locale === "ar"
                    ? "\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648 \u0647\u064a \u0648\u0627\u062c\u0647\u062a\u0646\u0627 \u0627\u0644\u0630\u0643\u064a\u0629 \u0644\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u062d\u062c\u0648\u0632\u0627\u062a. \u062a\u0639\u0631\u0636 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0628\u0648\u0636\u0648\u062d\u060c \u0648\u062a\u0633\u0647\u0651\u0644 \u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u0633\u0627\u0631\u0627\u062a\u060c \u0648\u062a\u062e\u062a\u0635\u0631 \u0627\u0644\u0648\u0642\u062a \u0628\u064a\u0646 \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0648\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062d\u062c\u0632 \u0648\u062a\u0633\u0644\u064a\u0645 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629."
                    : "Argo is our smart booking interface. It presents available destinations clearly, makes it easier to choose the right flight, and reduces the time spent comparing options. Through this platform, we arrange the next step quickly and keep the process moving until the booking is confirmed and the final details are delivered."}
                </p>
              </div>
            </div>
          </RevealWrapper>
        </section>
      ) : null}

      <TestimonialsSection label={voicesLabel} title={voicesLabel} subtitle={voicesSubtitle} testimonials={serviceTestimonials} />

      <FinalCtaSection
        title={listingCta.title}
        subtitle={listingCta.subtitle}
        ctaBtn={listingCta.button}
        whatsapp={listingCta.whatsapp}
      />
    </>
  );
}
