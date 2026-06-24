"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RevealWrapper from "@/components/shared/RevealWrapper";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { ChevronRightIcon, WhatsAppIcon } from "@/components/home/Icons";
import { withBasePath } from "@/lib/base-path";
import { getServiceWhatsAppHref } from "@/lib/data/services";
import type { Locale, ServiceAudienceExtraDestinationRecord, ServiceItemRecord, ServiceRecord } from "@/lib/data/services";

type ServiceTestimonial = {
  name: string;
  text: string;
  context: string;
  gender?: "male" | "female";
};

type DestinationRegionSlug = "arab" | "asia" | "europe" | "africa";

const destinationRegionBySlug: Record<string, DestinationRegionSlug> = {
  oman: "arab",
  uae: "arab",
  saudi: "arab",
  lebanon: "arab",
  jordan: "arab",
  erbil: "arab",
  baghdad: "arab",
  libya: "arab",
  egypt: "arab",
  indonesia: "asia",
  cambodia: "asia",
  thailand: "asia",
  "sri-lanka": "asia",
  laos: "asia",
  vietnam: "asia",
  maldives: "asia",
  armenia: "europe",
  georgia: "europe",
  mozambique: "africa",
  "sierra-leone": "africa",
  kenya: "africa",
  guinea: "africa",
  liberia: "africa",
  ethiopia: "africa",
};

const regionOrder: DestinationRegionSlug[] = ["arab", "asia", "europe", "africa"];

interface ServiceDetailPageProps {
  locale: Locale;
  service: ServiceRecord;
  common: {
    homeLabel: string;
    servicesLabel: string;
    serviceDetailsLabel: string;
    availableItems: string;
    validityLabel: string;
    turnaroundLabel: string;
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
  const isVisaResidencyService = service.slug === "visa-residency";
  const baseHref = locale === "ar" ? "/services" : "/en/services";
  const homeHref = locale === "ar" ? "/" : "/en";
  const pathname = usePathname();
  const router = useRouter();
  const heroBackground = withBasePath(
    service.slug === "flight-booking"
      ? "/images/hero/flight-booking-hero.jpg"
      : service.previewImage ?? "/images/hero/hero-poster.jpg",
  );
  const audiences = service.audiences ?? [];
  const [activeAudienceSlug, setActiveAudienceSlug] = useState<string>(audiences[0]?.slug ?? "");
  const [activeRegionSlug, setActiveRegionSlug] = useState<DestinationRegionSlug | null>(null);
  const serviceTestimonials = common.customerVoices.map((voice, index) => ({
    ...voice,
    context: service.items[index]?.shortLabel ?? service.title,
    gender: voice.gender,
  }));
  const voicesLabel = common.customerVoicesTitle;
  const voicesSubtitle =
    locale === "ar"
      ? `آراء حقيقية من عملاء استخدموا ${service.title}`
      : `Real experiences from clients who used ${service.title}`;
  const activeAudience = audiences.find((audience) => audience.slug === activeAudienceSlug) ?? audiences[0] ?? null;
  const isOtherAudience = activeAudience?.slug === "other";
  const visibleItems =
    isVisaResidencyService && isOtherAudience
      ? service.items
      : activeAudience && activeAudience.featuredItemSlugs.length > 0
        ? activeAudience.featuredItemSlugs
            .map((slug) =>
              service.items.find(
                (item) =>
                  item.slug === slug &&
                  (item.nationalityVariants?.some((variant) => variant.slug === activeAudience.slug) ?? true),
              ),
            )
            .filter((item): item is ServiceRecord["items"][number] => Boolean(item))
        : service.items;
  const visibleSecondaryDestinations =
    isVisaResidencyService && activeAudience ? activeAudience.secondaryDestinations : [];
  const audiencePickerLabel = locale === "ar" ? "اختر الفئة" : "Choose category";
  const audiencePickerTitle = locale === "ar" ? "اعرض الوجهات حسب الفئة" : "View destinations by category";
  const audiencePickerHint =
    locale === "ar"
      ? "اختر الفئة المناسبة، ثم راجع الوجهات مرتبة حسب المنطقة لتصل إلى الدولة المطلوبة بسرعة أوضح."
      : "Choose the right category, then review destinations grouped by region for a clearer and faster scan.";
  const groupedDestinationsTitle = locale === "ar" ? "الوجهات حسب المنطقة" : "Destinations by region";
  const groupedDestinationsSubtitle =
    locale === "ar"
      ? isOtherAudience
        ? "هذه الفئة تعرض كل الوجهات المتاحة حالياً، مرتبة حسب المنطقة لتسهيل الوصول للخيار المناسب."
        : "هذه الوجهات مرتبة حسب المنطقة ضمن الفئة المختارة لتبقى المقارنة أوضح والتنقل أسرع."
      : isOtherAudience
        ? "This category shows all currently available destinations, grouped by region for easier browsing."
        : "These destinations are grouped by region within the selected category to keep comparison clearer and navigation faster.";
  const secondaryTitle = locale === "ar" ? "وجهات إضافية" : "Additional destinations";
  const secondarySubtitle =
    locale === "ar"
      ? "خيارات أخرى ضمن الفئة المختارة، مع المتطلبات والخدمات الأساسية لكل وجهة."
      : "More options within the selected category, with the main requirements and service details for each destination.";
  const inlineRequirementsTitle = locale === "ar" ? "المتطلبات" : "Requirements";
  const inlineServicesTitle = locale === "ar" ? "الخدمات" : "Services";
  const inlineContactLabel = locale === "ar" ? "التواصل والمتابعة" : "Contact and follow-up";
  const regionFilterLabel = locale === "ar" ? "اختر المنطقة" : "Choose region";
  const noDestinationsForFilterLabel =
    locale === "ar"
      ? "اختر التصنيف المناسب لعرض الوجهات بشكل أهدأ وأوضح."
      : "Choose the right region category to display a cleaner, more focused result set.";
  const noRequirementsLabel =
    locale === "ar"
      ? "تُؤكَّد الأوراق المطلوبة عند التواصل بحسب الحالة."
      : "Required documents are confirmed during contact based on the case.";
  const serviceWhatsAppHref = getServiceWhatsAppHref(locale, service.slug, service.title);
  const activeAudienceHrefSlug = activeAudience?.slug && activeAudience.slug !== "other" ? activeAudience.slug : null;
  const argoHighlights =
    locale === "ar"
      ? [
          { title: "400+ شركة طيران", description: "شراكات مباشرة مع شركات الطيران العالمية والاقتصادية." },
          { title: "تكامل GDS", description: "ربط مع Amadeus و Galileo لتوسيع خيارات الحجز." },
          { title: "أفضل سعر", description: "أكثر من مصدر للحجز للوصول إلى عروض تنافسية أسرع." },
          { title: "دعم 24/7", description: "مساندة فنية متواصلة لمكاتب السياحة والسفر." },
        ]
      : [
          { title: "400+ airlines", description: "Direct access to global and low-cost airline content." },
          { title: "GDS integration", description: "Connected with Amadeus and Galileo for broader inventory." },
          { title: "Better pricing", description: "Multiple booking sources to surface stronger offers faster." },
          { title: "24/7 support", description: "Continuous technical support for travel agencies." },
        ];
  const regionLabels: Record<Locale, Record<DestinationRegionSlug, string>> = {
    ar: {
      arab: "دول عربية",
      asia: "آسيا",
      europe: "أوروبا",
      africa: "أفريقيا",
    },
    en: {
      arab: "Arab countries",
      asia: "Asia",
      europe: "Europe",
      africa: "Africa",
    },
  };

  function getDestinationRegion(slug: string): DestinationRegionSlug {
    return destinationRegionBySlug[slug] ?? "asia";
  }

  function buildRegionGroups(items: ServiceItemRecord[], secondaryDestinations: ServiceAudienceExtraDestinationRecord[]) {
    return regionOrder
      .map((region) => ({
        slug: region,
        label: regionLabels[locale][region],
        items: items.filter((item) => getDestinationRegion(item.slug) === region),
        secondaryDestinations: secondaryDestinations.filter((destination) => getDestinationRegion(destination.slug) === region),
      }))
      .filter((group) => group.items.length > 0 || group.secondaryDestinations.length > 0);
  }

  const visaDestinationGroups =
    isVisaResidencyService && activeAudience ? buildRegionGroups(visibleItems, visibleSecondaryDestinations) : [];
  const selectedVisaRegion =
    isVisaResidencyService && visaDestinationGroups.length > 0
      ? visaDestinationGroups.find((group) => group.slug === activeRegionSlug) ?? visaDestinationGroups[0]
      : null;
  const filteredRegionItems = selectedVisaRegion?.items ?? [];
  const filteredRegionSecondaryDestinations = selectedVisaRegion?.secondaryDestinations ?? [];

  useEffect(() => {
    if (audiences.length === 0) return;
    const nationalityFromUrl =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("nationality") : null;
    if (nationalityFromUrl && audiences.some((audience) => audience.slug === nationalityFromUrl)) {
      setActiveAudienceSlug(nationalityFromUrl);
      return;
    }

    setActiveAudienceSlug(audiences[0].slug);
  }, [audiences]);

  useEffect(() => {
    if (!isVisaResidencyService || visaDestinationGroups.length === 0) {
      setActiveRegionSlug(null);
      return;
    }

    setActiveRegionSlug((currentRegionSlug) =>
      currentRegionSlug && visaDestinationGroups.some((group) => group.slug === currentRegionSlug)
        ? currentRegionSlug
        : visaDestinationGroups[0].slug,
    );
  }, [isVisaResidencyService, visaDestinationGroups]);

  function buildHref(targetPath: string, nationalitySlug?: string | null) {
    return nationalitySlug ? `${targetPath}?nationality=${nationalitySlug}` : targetPath;
  }

  function handleAudienceChange(slug: string) {
    setActiveAudienceSlug(slug);
    setActiveRegionSlug(null);
    const nextHref = buildHref(pathname ?? baseHref, slug);
    router.replace(nextHref, { scroll: false });
  }

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

          <div className="mx-auto grid w-full place-items-center">
            <div className="mx-auto grid w-full max-w-[52rem] place-items-center text-center">
              <p
                className="mb-4 w-full text-center text-sm font-semibold uppercase tracking-[0.32em] text-gold/95"
              >
                {common.serviceDetailsLabel}
              </p>
              <h1
                className={`mx-auto w-full max-w-3xl break-words text-center text-4xl font-extrabold tracking-tight sm:text-5xl ${
                  service.slug === "study-abroad"
                    ? "leading-[1.28] lg:text-[3.35rem] lg:leading-[1.2]"
                    : service.slug === "visa-residency"
                      ? "leading-[1.16] md:whitespace-nowrap lg:max-w-[44rem] lg:text-[2.65rem] lg:leading-[1.08] xl:max-w-[48rem] xl:text-[2.85rem]"
                    : service.slug === "flight-booking"
                      ? "leading-[1.18] md:whitespace-nowrap lg:max-w-[44rem] lg:text-[2.7rem] lg:leading-[1.08] xl:max-w-[48rem] xl:text-[2.95rem]"
                    : service.slug === "other-services"
                      ? "leading-[1.16] md:whitespace-nowrap lg:max-w-[46rem] lg:text-[2.55rem] lg:leading-[1.08] xl:max-w-[50rem] xl:text-[2.8rem]"
                      : "leading-[1.18] lg:text-[3.7rem] lg:leading-[1.12]"
                }`}
              >
                {service.heroTitle}
              </h1>
              <p
                className="mx-auto mt-6 w-full max-w-[46rem] text-center text-base leading-8 text-white/90 lg:text-lg"
              >
                {service.heroSubtitle}
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {!isVisaResidencyService ? (
                  <a
                    href={serviceWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-20px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {common.whatsAppLabel}
                  </a>
                ) : null}
                <Link
                  href={baseHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/22 bg-white/12 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-gold/45 hover:bg-white/18"
                >
                  {common.backToServices}
                </Link>
              </div>
            </div>
          </div>
        </RevealWrapper>
      </section>

      {isVisaResidencyService && audiences.length > 0 ? (
        <section data-header-theme="light" className="bg-white pt-8">
          <RevealWrapper className="container-custom">
            <div className="rounded-[32px] border border-slate-200/70 bg-[#fcfbf8] px-6 py-8 shadow-[0_18px_44px_-32px_rgba(23,34,63,0.18)] lg:px-10 lg:py-10">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <div className="max-w-3xl">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">{audiencePickerLabel}</p>
                  <h2 className="text-2xl font-extrabold tracking-tight text-text-primary lg:text-3xl">{audiencePickerTitle}</h2>
                  <p className="mt-3 text-sm leading-7 text-text-muted lg:text-base">{audiencePickerHint}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {audiences.map((audience) => {
                    const isActive = audience.slug === activeAudience?.slug;
                    return (
                      <button
                        key={audience.slug}
                        type="button"
                        onClick={() => handleAudienceChange(audience.slug)}
                        aria-pressed={isActive}
                        className={`min-w-[10rem] rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? "bg-navy text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.55)]"
                            : "border border-slate-200 bg-white text-text-primary hover:border-gold/35 hover:text-navy"
                        }`}
                      >
                        {audience.label}
                      </button>
                    );
                  })}
                </div>
                {isVisaResidencyService && visaDestinationGroups.length > 0 ? (
                  <div className="mt-8 grid w-full gap-5 border-t border-slate-200/80 pt-6">
                    <div className="text-center">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-gold">{regionFilterLabel}</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {visaDestinationGroups.map((group) => {
                          const isActive = group.slug === selectedVisaRegion?.slug;
                          return (
                            <button
                              key={group.slug}
                              type="button"
                              onClick={() => {
                                setActiveRegionSlug(group.slug);
                              }}
                              aria-pressed={isActive}
                              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                                isActive
                                  ? "bg-navy text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.55)]"
                                  : "border border-slate-200 bg-white text-text-primary hover:border-gold/35 hover:text-navy"
                              }`}
                            >
                              {group.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                ) : null}
              </div>
            </div>
          </RevealWrapper>
        </section>
      ) : null}

      {service.slug !== "flight-booking" ? (
        <section data-header-theme="light" className="bg-[#f8f7f3] section-padding">
          <div className="container-custom">
            {isVisaResidencyService && activeAudience ? (
            <>
              <div className="grid gap-10">
                {selectedVisaRegion ? (
                  <div key={selectedVisaRegion.slug} className="grid gap-5">
                    <RevealWrapper className="text-center">
                      <div className="mx-auto inline-flex items-center rounded-full border border-gold/15 bg-white px-5 py-2 text-sm font-semibold text-gold shadow-[0_16px_40px_-34px_rgba(23,34,63,0.18)]">
                        {selectedVisaRegion.label}
                      </div>
                    </RevealWrapper>

                    {filteredRegionItems.length > 0 ? (
                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {filteredRegionItems.map((item, index) => (
                          <RevealWrapper key={item.slug} delay={index * 75}>
                            <Link
                              href={buildHref(`${baseHref}/${service.slug}/${item.slug}`, activeAudienceHrefSlug)}
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
                                    src={withBasePath(item.image ?? service.previewImage)}
                                    alt={item.imageAlt ?? service.previewImageAlt ?? item.title}
                                    loading="lazy"
                                    style={{ objectPosition: item.imagePosition ?? service.previewImagePosition ?? "center center" }}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                  />
                                ) : null}
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,29,0.08),rgba(8,14,29,0.48)_45%,rgba(8,14,29,0.88))]" />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-gold/35" />
                                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                                  <div className="max-w-[26ch]">
                                    <h3 className="text-[2rem] font-extrabold leading-none sm:text-2xl">{item.shortLabel}</h3>
                                    <p
                                      className={`mt-3 min-h-[5.75rem] max-w-[24ch] text-sm text-white/82 ${
                                        isRtl ? "leading-8" : "leading-7"
                                      }`}
                                    >
                                      {item.summary}
                                    </p>
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
                    ) : null}

                    {filteredRegionSecondaryDestinations.length > 0 ? (
                      <div className="grid gap-4 lg:grid-cols-2">
                        {filteredRegionSecondaryDestinations.map((destination, index) => (
                          <RevealWrapper key={`${activeAudience.slug}-${selectedVisaRegion.slug}-${destination.slug}`} delay={index * 60}>
                            <details className="group rounded-[28px] border border-slate-200/80 bg-[#fcfbf8] p-6 shadow-[0_16px_40px_-34px_rgba(23,34,63,0.18)]">
                              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                                <div className="text-start">
                                  <h3 className="text-2xl font-extrabold tracking-tight text-text-primary">{destination.title}</h3>
                                  <p className="mt-3 text-sm leading-7 text-text-muted">{destination.summary}</p>
                                </div>
                                <div className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-navy transition-transform duration-300 group-open:rotate-90">
                                  <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                                </div>
                              </summary>

                              <div className="mt-6 border-t border-slate-200/80 pt-6">
                                <div className="grid gap-6">
                                  <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{inlineRequirementsTitle}</p>
                                    {destination.requirements.length > 0 ? (
                                      <div className="flex flex-wrap gap-2">
                                        {destination.requirements.map((requirement) => (
                                          <span
                                            key={requirement}
                                            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-text-primary"
                                          >
                                            {requirement}
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm leading-7 text-text-muted">{noRequirementsLabel}</p>
                                    )}
                                  </div>

                                  <div>
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{inlineServicesTitle}</p>
                                    <div className="grid gap-3">
                                      {destination.offerings.map((offering) => (
                                        <div key={`${destination.slug}-${offering.name}`} className="rounded-[22px] border border-slate-200 bg-white p-4">
                                          <div className="text-base font-bold text-text-primary">{offering.name}</div>
                                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                            <div>
                                              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{common.validityLabel}</div>
                                              <div className="mt-1 text-sm font-semibold text-text-primary">{offering.validity}</div>
                                            </div>
                                            <div>
                                              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{common.turnaroundLabel}</div>
                                              <div className="mt-1 text-sm font-semibold text-text-primary">{offering.turnaround}</div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="rounded-[22px] bg-navy p-5 text-white">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold/90">{inlineContactLabel}</p>
                                    <p className="text-sm leading-7 text-white/80">{destination.contactNote}</p>
                                    <a
                                      href={serviceWhatsAppHref}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                                    >
                                      <WhatsAppIcon className="h-4 w-4" />
                                      {common.whatsAppLabel}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </details>
                          </RevealWrapper>
                        ))}
                      </div>
                    ) : null}
                    {filteredRegionItems.length === 0 && filteredRegionSecondaryDestinations.length === 0 ? (
                      <RevealWrapper className="text-center">
                        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-10 text-base leading-7 text-text-muted">
                          {noDestinationsForFilterLabel}
                        </div>
                      </RevealWrapper>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {visibleItems.map((item, index) => (
                <RevealWrapper key={item.slug} delay={index * 75}>
                  <Link
                    href={buildHref(`${baseHref}/${service.slug}/${item.slug}`, activeAudienceHrefSlug)}
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
                          src={withBasePath(item.image ?? service.previewImage)}
                          alt={item.imageAlt ?? service.previewImageAlt ?? item.title}
                          loading="lazy"
                          style={{ objectPosition: item.imagePosition ?? service.previewImagePosition ?? "center center" }}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,29,0.08),rgba(8,14,29,0.48)_45%,rgba(8,14,29,0.88))]" />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-gold/35" />
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <div className="max-w-[26ch]">
                          <h3 className="text-[2rem] font-extrabold leading-none sm:text-2xl">{item.shortLabel}</h3>
                          <p
                            className={`mt-3 min-h-[5.75rem] max-w-[24ch] text-sm text-white/82 ${
                              isRtl ? "leading-8" : "leading-7"
                            }`}
                          >
                            {item.summary}
                          </p>
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
          )}
          </div>
        </section>
      ) : null}

      {!isVisaResidencyService && activeAudience && activeAudience.secondaryDestinations.length > 0 ? (
        <section data-header-theme="light" className="bg-white section-padding-sm border-t border-black/5">
          <div className="container-custom">
            <RevealWrapper className="mb-8 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">{secondaryTitle}</p>
              <h2 className="text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">{activeAudience.label}</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-text-muted">{secondarySubtitle}</p>
            </RevealWrapper>

            <div className="grid gap-4 lg:grid-cols-2">
              {activeAudience.secondaryDestinations.map((destination, index) => (
                <RevealWrapper key={`${activeAudience.slug}-${destination.slug}`} delay={index * 60}>
                  <details className="group rounded-[28px] border border-slate-200/80 bg-[#fcfbf8] p-6 shadow-[0_16px_40px_-34px_rgba(23,34,63,0.18)]">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <div className="text-start">
                        <h3 className="text-2xl font-extrabold tracking-tight text-text-primary">{destination.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-text-muted">{destination.summary}</p>
                      </div>
                      <div className="inline-flex h-11 min-w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-navy transition-transform duration-300 group-open:rotate-90">
                        <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                      </div>
                    </summary>

                    <div className="mt-6 border-t border-slate-200/80 pt-6">
                      <div className="grid gap-6">
                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{inlineRequirementsTitle}</p>
                          {destination.requirements.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {destination.requirements.map((requirement) => (
                                <span
                                  key={requirement}
                                  className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-text-primary"
                                >
                                  {requirement}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm leading-7 text-text-muted">{noRequirementsLabel}</p>
                          )}
                        </div>

                        <div>
                          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">{inlineServicesTitle}</p>
                          <div className="grid gap-3">
                            {destination.offerings.map((offering) => (
                              <div key={`${destination.slug}-${offering.name}`} className="rounded-[22px] border border-slate-200 bg-white p-4">
                                <div className="text-base font-bold text-text-primary">{offering.name}</div>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                  <div>
                                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{common.validityLabel}</div>
                                    <div className="mt-1 text-sm font-semibold text-text-primary">{offering.validity}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{common.turnaroundLabel}</div>
                                    <div className="mt-1 text-sm font-semibold text-text-primary">{offering.turnaround}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[22px] bg-navy p-5 text-white">
                          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold/90">{inlineContactLabel}</p>
                          <p className="text-sm leading-7 text-white/80">{destination.contactNote}</p>
                          <a
                            href={serviceWhatsAppHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                          >
                            <WhatsAppIcon className="h-4 w-4" />
                            {common.whatsAppLabel}
                          </a>
                        </div>
                      </div>
                    </div>
                  </details>
                </RevealWrapper>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {service.slug === "flight-booking" ? (
        <section data-header-theme="light" className="bg-white section-padding-sm border-b border-black/5">
          <RevealWrapper className="container-custom">
            <div className="mx-auto grid max-w-6xl gap-8 rounded-[36px] border border-slate-200/80 bg-[#fcfbf8] px-6 py-8 shadow-[0_24px_56px_-36px_rgba(23,34,63,0.28)] lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-10 lg:px-10 lg:py-10">
              <div className="order-last flex justify-center lg:order-last lg:justify-end">
                <div className="relative flex h-[14.5rem] w-full max-w-[17rem] items-center justify-center">
                  <div className="absolute inset-[1rem] rounded-full border border-[rgba(127,167,227,0.18)]" />
                  <div className="absolute inset-[1.9rem] rounded-full border border-[rgba(235,203,83,0.24)]" />
                  <div className="absolute inset-0 rounded-full border border-[rgba(132,176,236,0.16)]" />
                  <div className="absolute inset-[0.55rem] rounded-full border border-[rgba(234,196,74,0.14)]" />
                  <div className="grid h-[11.25rem] w-[11.25rem] place-items-center rounded-full bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.98)_0%,rgba(242,247,255,0.95)_48%,rgba(229,238,249,0.84)_74%,rgba(231,190,58,0.14)_100%)] p-6 shadow-[0_30px_60px_-30px_rgba(33,60,108,0.28)] ring-1 ring-[rgba(139,171,221,0.24)]">
                    <img
                      src={withBasePath("/images/partners/csr-logo.png")}
                      alt="\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648"
                      className="h-auto w-[76%] object-contain [filter:drop-shadow(0_10px_24px_rgba(38,120,210,0.12))]"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-start">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                  {locale === "ar" ? "\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648" : "Argo Platform"}
                </p>
                <h2 className="text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
                  {locale === "ar" ? "\u0645\u0646\u0635\u0629 \u0623\u0631\u063a\u0648 \u0644\u062d\u062c\u0648\u0632\u0627\u062a \u0627\u0644\u0637\u064a\u0631\u0627\u0646" : "Argo Platform for Flight Bookings"}
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-text-muted lg:mx-0 lg:max-w-[42rem]">
                  {locale === "ar"
                    ? "\u0645\u0646\u0635\u0629 B2B \u0645\u062e\u0635\u0635\u0629 \u0644\u0645\u0643\u0627\u062a\u0628 \u0627\u0644\u0633\u064a\u0627\u062d\u0629 \u0648\u0627\u0644\u0633\u0641\u0631\u060c \u062a\u0645\u0646\u062d\u0643 \u0648\u0635\u0648\u0644\u0627\u064b \u0633\u0631\u064a\u0639\u0627\u064b \u0625\u0644\u0649 \u0623\u0633\u0639\u0627\u0631 \u0634\u0631\u0643\u0627\u062a \u0627\u0644\u0637\u064a\u0631\u0627\u0646 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629 \u0648\u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f\u064a\u0629 \u0645\u0646 \u0648\u0627\u062c\u0647\u0629 \u0648\u0627\u062d\u062f\u0629."
                    : "A B2B platform for travel agencies that gives fast access to global and low-cost airline fares through one interface."}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:max-w-[46rem]">
                  {argoHighlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4 text-start shadow-[0_16px_36px_-30px_rgba(23,34,63,0.18)]"
                    >
                      <div className="text-sm font-bold text-text-primary">{item.title}</div>
                      <p className="mt-2 text-sm leading-7 text-text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealWrapper>
        </section>
      ) : null}

      <TestimonialsSection label={voicesLabel} title={voicesLabel} subtitle={voicesSubtitle} testimonials={serviceTestimonials} />

    </>
  );
}
