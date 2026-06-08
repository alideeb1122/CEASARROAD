"use client";

import Link from "next/link";
import RevealWrapper from "@/components/shared/RevealWrapper";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import { ChevronRightIcon, WhatsAppIcon, getServiceIcon } from "@/components/home/Icons";
import type { Locale, ServiceRecord } from "@/lib/data/services";

interface ServicesListingPageProps {
  locale: Locale;
  content: {
    label: string;
    title: string;
    subtitle: string;
    intro: string;
    stats: Array<{ value: string; label: string }>;
    spotlightTitle: string;
    spotlightText: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaBtn: string;
    whatsapp: string;
    services: ServiceRecord[];
  };
  common: {
    homeLabel: string;
    servicesLabel: string;
    exploreLabel: string;
  };
}

export default function ServicesListingPage({ locale, content, common }: ServicesListingPageProps) {
  const isRtl = locale === "ar";
  const servicesBaseHref = locale === "ar" ? "/services" : "/en/services";
  const homeHref = locale === "ar" ? "/" : "/en";
  const heroBackground = "/images/hero/services-travel-docs.jpg";

  return (
    <>
      <section data-header-theme="dark" className="relative overflow-hidden bg-navy text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-86"
          style={{ backgroundImage: `url("${heroBackground}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(5,10,22,0.62)_10%,rgba(8,16,31,0.48)_48%,rgba(10,20,40,0.56)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(214,183,112,0.05),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(98,139,214,0.07),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.012] [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <RevealWrapper className="container-custom relative z-10 py-16 lg:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
              <Link href={homeHref} className="transition-colors hover:text-white">
                {common.homeLabel}
              </Link>
              <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
              <span className="text-white/90">{content.label}</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.34em] text-gold/72">
                  {content.label}
                </p>
                <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-[4rem]">
                  {content.title}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/92 lg:text-[1.05rem]">
                  {content.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${content.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-20px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {content.ctaBtn}
                  </a>
                  <a
                    href="#services-grid"
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/24 bg-white/12 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-gold/45 hover:bg-white/18"
                  >
                    {common.exploreLabel}
                    <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {content.stats.map((stat, index) => (
                  <RevealWrapper key={stat.label} delay={index * 80}>
                    <div className="relative overflow-hidden rounded-[24px] border border-white/18 bg-[#08101e]/[0.82] p-5 shadow-[0_24px_60px_-32px_rgba(7,12,24,0.86)] backdrop-blur-2xl">
                      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gold/10 to-transparent" />
                      <div className="relative flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="mb-3 h-px w-14 bg-gradient-to-r from-gold/80 to-transparent" />
                          <div className="text-sm font-medium leading-6 text-white/92 lg:text-[0.95rem]">
                            {stat.label}
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-3xl font-extrabold leading-none text-gold lg:text-[2.2rem]">
                            {stat.value}
                          </div>
                          <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                            {content.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealWrapper>
                ))}
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      <section data-header-theme="light" className="bg-white section-padding-sm border-b border-black/5">
        <RevealWrapper className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-base leading-8 text-text-muted">{content.intro}</p>
          </div>
        </RevealWrapper>
      </section>

      <section id="services-grid" data-header-theme="light" className="relative bg-[#f8f7f3] section-padding">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/[0.06] to-transparent" />
        <div className="container-custom relative">
          <RevealWrapper className="mb-10">
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-gold">
                  {content.label}
                </p>
                <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {content.spotlightTitle}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-text-muted lg:text-base">{content.spotlightText}</p>
            </div>
          </RevealWrapper>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {content.services.map((service, index) => (
              <RevealWrapper key={service.slug} delay={index * 80}>
                <Link
                  href={`${servicesBaseHref}/${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_44px_-30px_rgba(23,34,63,0.45)] transition-all duration-500 hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_30px_70px_-28px_rgba(23,34,63,0.55)]"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,183,112,0.16),transparent_56%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-gold/10 blur-3xl transition-transform duration-500 group-hover:scale-125" />
                  <div className="relative">
                    {service.previewImage ? (
                      <div className="mb-5 overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#f8f7f3]">
                        <img
                          src={service.previewImage}
                          alt={service.previewImageAlt ?? service.title}
                          loading="lazy"
                          style={{ objectPosition: service.previewImagePosition ?? "center center" }}
                          className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/15 to-gold/5 text-gold transition-all duration-500 group-hover:scale-105 group-hover:rotate-[3deg]">
                        {getServiceIcon(service.icon, "h-7 w-7")}
                      </div>
                      <span className="rounded-full bg-navy/[0.06] px-3 py-1 text-xs font-semibold tracking-[0.24em] text-navy/55">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold/90">
                      {service.eyebrow}
                    </p>
                    <h3 className="text-xl font-bold text-text-primary">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-text-muted">{service.summary}</p>

                    <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-navy">
                      <span>{service.cardCta}</span>
                      <ChevronRightIcon className={`h-4 w-4 transition-transform duration-300 ${isRtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                    </div>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection
        title={content.ctaTitle}
        subtitle={content.ctaSubtitle}
        ctaBtn={content.ctaBtn}
        whatsapp={content.whatsapp}
      />
    </>
  );
}
