"use client";

import Link from "next/link";
import RevealWrapper from "@/components/shared/RevealWrapper";
import FinalCtaSection from "@/components/shared/FinalCtaSection";
import { ChevronRightIcon, WhatsAppIcon, getServiceIcon } from "@/components/home/Icons";
import { withBasePath } from "@/lib/base-path";
import { getServicesListingWhatsAppHref } from "@/lib/data/services";
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
  const heroBackground = withBasePath("/images/hero/services-travel-docs.jpg");
  const servicesWhatsAppHref = getServicesListingWhatsAppHref(locale);

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

            <div className="mx-auto max-w-4xl text-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.34em] text-gold/72">
                  {content.label}
                </p>
                <h1 className="mx-auto w-full max-w-[52rem] text-center text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:whitespace-nowrap lg:text-[2.9rem] lg:leading-[1.04] xl:text-[3.15rem]">
                  {content.title}
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/92 lg:text-[1.05rem]">
                  {content.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={servicesWhatsAppHref}
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
            </div>
          </div>
        </RevealWrapper>
      </section>

      <section id="services-grid" data-header-theme="light" className="relative bg-[#f8f7f3] section-padding">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/[0.06] to-transparent" />
        <div className="container-custom relative">
          <RevealWrapper className="mb-10">
            <div>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-gold">
                  {content.label}
                </p>
                <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {content.spotlightTitle}
                </h2>
              </div>
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
                  <div className="relative flex h-full flex-col">
                    {service.previewImage ? (
                      <div className="mb-5 overflow-hidden rounded-[24px] border border-slate-200/70 bg-[#f8f7f3]">
                        <img
                          src={withBasePath(service.previewImage)}
                          alt={service.previewImageAlt ?? service.title}
                          loading="lazy"
                          style={{ objectPosition: service.previewImagePosition ?? "center center" }}
                          className="h-44 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <div className="mb-7 flex items-center justify-between gap-4">
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

                    <div className="mt-auto pt-7 flex items-center gap-2 text-sm font-semibold text-navy">
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
        whatsappHref={servicesWhatsAppHref}
      />
    </>
  );
}
