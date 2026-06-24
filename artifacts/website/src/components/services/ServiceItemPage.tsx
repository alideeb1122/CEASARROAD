"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import RevealWrapper from "@/components/shared/RevealWrapper";
import { ChevronRightIcon, CheckCircleIcon, WhatsAppIcon } from "@/components/home/Icons";
import { withBasePath } from "@/lib/base-path";
import { getServiceWhatsAppHref } from "@/lib/data/services";
import type { Locale, ServiceItemRecord, ServiceRecord } from "@/lib/data/services";

interface ServiceItemPageProps {
  locale: Locale;
  service: ServiceRecord;
  item: ServiceItemRecord;
  previousItem: ServiceItemRecord | null;
  nextItem: ServiceItemRecord | null;
  common: {
    homeLabel: string;
    servicesLabel: string;
    serviceDetailsLabel: string;
    previousLabel: string;
    nextLabel: string;
    validityLabel: string;
    turnaroundLabel: string;
    customerVoicesTitle: string;
    customerVoices: Array<{ name: string; text: string; gender?: "male" | "female" }>;
    returnToService: string;
    whatsAppLabel: string;
  };
  listingCta: {
    title: string;
    subtitle: string;
    button: string;
    whatsapp: string;
  };
}

export default function ServiceItemPage({
  locale,
  service,
  item,
  previousItem,
  nextItem,
  common,
  listingCta,
}: ServiceItemPageProps) {
  const isRtl = locale === "ar";
  const isVisaResidencyService = service.slug === "visa-residency";
  const isFlightBookingService = service.slug === "flight-booking";
  const isGroupToursService = service.slug === "study-abroad";
  const isLanguageExamsService = service.slug === "language-exams";
  const isOtherServicesService = service.slug === "other-services";
  const isPassportIssuanceRenewalItem = item.slug === "passport-issuance-renewal";
  const pathname = usePathname();
  const router = useRouter();
  const useHeroImageAsBackground =
    isVisaResidencyService ||
    isFlightBookingService ||
    isGroupToursService ||
    isLanguageExamsService ||
    isOtherServicesService;
  const useRelaxedHeroLayout =
    isFlightBookingService || isGroupToursService || isLanguageExamsService || isOtherServicesService;
  const servicesBaseHref = locale === "ar" ? "/services" : "/en/services";
  const serviceHref = `${servicesBaseHref}/${service.slug}`;
  const homeHref = locale === "ar" ? "/" : "/en";
  const heroImage = item.landmarkImage ?? item.image ?? service.previewImage;
  const requirementsImage = item.requirementsImage ?? item.image ?? service.previewImage;
  const servicesImage = item.servicesImage ?? item.landmarkImage ?? item.image ?? service.previewImage;
  const heroPosition = item.landmarkPosition ?? item.imagePosition;
  const requirementsPosition = item.requirementsPosition ?? item.imagePosition;
  const servicesPosition = item.servicesPosition ?? item.landmarkPosition ?? item.imagePosition;
  const nationalityVariants = item.nationalityVariants ?? [];
  const [activeNationalitySlug, setActiveNationalitySlug] = useState<string | null>(
    nationalityVariants[0]?.slug ?? null,
  );
  const activeVariant =
    nationalityVariants.find((variant) => variant.slug === activeNationalitySlug) ?? nationalityVariants[0] ?? null;
  const displayedRequirements = activeVariant?.requirements ?? item.requirements;
  const displayedOfferings = activeVariant?.offerings ?? item.offerings;
  const displayedContactNote = activeVariant?.contactNote ?? item.contactNote;
  const serviceItemWhatsAppHref = getServiceWhatsAppHref(locale, service.slug, service.title, item.title);
  const nationalityPickerLabel = isPassportIssuanceRenewalItem
    ? locale === "ar"
      ? "اختر النوع"
      : "Choose type"
    : locale === "ar"
      ? "اختر الجنسية"
      : "Choose nationality";
  const nationalityPickerHint = isPassportIssuanceRenewalItem
    ? locale === "ar"
      ? "بدّل بين الجواز الداخلي والخارجي لتظهر لك الأوراق المطلوبة والخدمات المناسبة لنفس الصفحة."
      : "Switch between internal and external passport service to view the matching requirements and service details."
    : locale === "ar"
      ? "بدّل الجنسية لتظهر لك الخدمات والمتطلبات المناسبة لنفس الوجهة."
      : "Switch nationality to view the matching services and requirements for this destination.";
  const selectedNationalityLabel = isPassportIssuanceRenewalItem
    ? locale === "ar"
      ? "النوع المختار"
      : "Selected type"
    : locale === "ar"
      ? "الجنسية المختارة"
      : "Selected nationality";

  useEffect(() => {
    const nationalityFromUrl =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("nationality") : null;
    if (nationalityFromUrl && nationalityVariants.some((variant) => variant.slug === nationalityFromUrl)) {
      setActiveNationalitySlug(nationalityFromUrl);
      return;
    }

    setActiveNationalitySlug(nationalityVariants[0]?.slug ?? null);
  }, [item.slug, nationalityVariants]);

  function buildHref(targetPath: string, nationalitySlug?: string | null) {
    return nationalitySlug ? `${targetPath}?nationality=${nationalitySlug}` : targetPath;
  }

  function handleNationalityChange(slug: string) {
    setActiveNationalitySlug(slug);
    router.replace(buildHref(pathname ?? `${servicesBaseHref}/${service.slug}/${item.slug}`, slug), { scroll: false });
  }

  return (
    <>
      <section data-header-theme="dark" className="relative overflow-hidden bg-navy text-white">
        {useHeroImageAsBackground && heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-42"
              style={{
                backgroundImage: `url("${withBasePath(heroImage)}")`,
                backgroundPosition: heroPosition,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,183,112,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(94,130,190,0.12),transparent_34%),linear-gradient(180deg,rgba(10,18,35,0.9),rgba(16,30,58,0.94))]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,183,112,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(94,130,190,0.16),transparent_34%),linear-gradient(180deg,rgba(10,18,35,1),rgba(16,30,58,0.98))]" />
        )}
        <RevealWrapper className="container-custom relative z-10 py-16 lg:py-24">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
            <Link href={homeHref} className="transition-colors hover:text-white">
              {common.homeLabel}
            </Link>
            <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            <Link href={servicesBaseHref} className="transition-colors hover:text-white">
              {common.servicesLabel}
            </Link>
            <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            <Link href={serviceHref} className="transition-colors hover:text-white">
              {service.title}
            </Link>
            <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            <span className="text-white/90">{item.title}</span>
          </div>

          <div className={`grid gap-10 ${useHeroImageAsBackground ? "lg:grid-cols-1" : "lg:grid-cols-[1fr_0.92fr] lg:items-center"}`}>
            <div className={useRelaxedHeroLayout ? "mx-auto max-w-4xl text-center" : ""}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-gold/90">
                {common.serviceDetailsLabel}
              </p>
              <h1
                className={`text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[4rem] ${
                  useRelaxedHeroLayout ? "mx-auto max-w-3xl" : "max-w-2xl"
                }`}
              >
                {item.title}
              </h1>
              <p
                className={`mt-6 text-base leading-8 text-white/78 lg:text-lg ${
                  useRelaxedHeroLayout ? "mx-auto max-w-[46rem]" : "max-w-xl"
                }`}
              >
                {item.description}
              </p>
              {activeVariant ? (
                <div
                  className={`mt-5 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/88 ${
                    useRelaxedHeroLayout ? "mx-auto" : ""
                  }`}
                >
                  <span className="text-white/62">{selectedNationalityLabel}</span>
                  <span className="font-semibold text-gold">{activeVariant.label}</span>
                </div>
              ) : null}

              <div className={`mt-8 flex flex-wrap gap-3 ${useRelaxedHeroLayout ? "justify-center" : ""}`}>
                {!useHeroImageAsBackground ? (
                  <a
                    href={serviceItemWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_-20px_rgba(37,211,102,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {common.whatsAppLabel}
                  </a>
                ) : null}
                <Link
                  href={serviceHref}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/14 bg-white/7 px-6 py-3 text-sm font-semibold text-white/88 transition-all duration-300 hover:border-gold/35 hover:bg-white/10"
                >
                  {common.returnToService}
                </Link>
              </div>
            </div>

            {!useHeroImageAsBackground ? (
              <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[24px]">
                  {heroImage ? (
                    <img
                      src={withBasePath(heroImage)}
                      alt={item.landmarkAlt ?? item.imageAlt ?? item.title}
                      style={{ objectPosition: heroPosition }}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,29,0.1),rgba(8,14,29,0.8))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold/85">{item.heroTag}</p>
                    <div>
                      <h2 className="mt-2 text-3xl font-extrabold text-white">{item.shortLabel}</h2>
                      {item.landmarkAlt ? (
                        <p className="mt-2 line-clamp-1 text-sm font-semibold text-gold/90">{item.landmarkAlt}</p>
                      ) : null}
                      <p className="mt-3 max-w-[24ch] text-sm leading-6 text-white/75">{item.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </RevealWrapper>
      </section>

      <section data-header-theme="light" className="bg-white section-padding">
        <div className="container-custom grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          {nationalityVariants.length > 0 ? (
            <RevealWrapper className="lg:col-span-2">
              <div className="rounded-[30px] border border-slate-200/70 bg-[#fcfbf8] p-6 shadow-[0_18px_44px_-32px_rgba(23,34,63,0.18)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                      {nationalityPickerLabel}
                    </p>
                    <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
                      {isPassportIssuanceRenewalItem
                        ? locale === "ar"
                          ? "اعرض البيانات حسب النوع"
                          : "View data by type"
                        : locale === "ar"
                          ? "اعرض البيانات حسب الجنسية"
                          : "View data by nationality"}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-text-muted">{nationalityPickerHint}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {nationalityVariants.map((variant) => {
                      const isActive = variant.slug === activeVariant?.slug;
                      return (
                        <button
                          key={variant.slug}
                          type="button"
                          onClick={() => handleNationalityChange(variant.slug)}
                          aria-pressed={isActive}
                          className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                            isActive
                              ? "bg-navy text-white shadow-[0_18px_36px_-24px_rgba(15,23,42,0.55)]"
                              : "border border-slate-200 bg-white text-text-primary hover:border-gold/35 hover:text-navy"
                          }`}
                        >
                          {variant.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </RevealWrapper>
          ) : null}
          <RevealWrapper>
            <div className="rounded-[30px] border border-slate-200/70 bg-[#f8f7f3] p-7 shadow-[0_18px_44px_-32px_rgba(23,34,63,0.32)]">
              {requirementsImage ? (
                <div className="mb-6 overflow-hidden rounded-[24px] border border-white bg-white shadow-[0_16px_40px_-32px_rgba(23,34,63,0.35)]">
                  <img
                    src={withBasePath(requirementsImage)}
                    alt={item.requirementsImageAlt ?? item.imageAlt ?? item.title}
                    style={{ objectPosition: requirementsPosition }}
                    className="h-44 w-full object-cover"
                  />
                </div>
              ) : null}
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                {item.requirementsTitle}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
                {locale === "ar" ? "\u0627\u0644\u0623\u0648\u0631\u0627\u0642 \u0648\u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a" : "Documents and requirements"}
              </h2>
              <div className="mt-6 grid gap-3">
                {displayedRequirements.map((requirement) => (
                  <div key={requirement} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4">
                    <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold">
                      <CheckCircleIcon className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-6 text-text-primary">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>

          <RevealWrapper delay={80}>
            <div className="rounded-[30px] border border-slate-200/70 bg-white p-7 shadow-[0_18px_44px_-32px_rgba(23,34,63,0.32)]">
              {servicesImage ? (
                <div className="mb-6 overflow-hidden rounded-[24px] border border-slate-200 bg-[#f8f7f3]">
                  <img
                    src={withBasePath(servicesImage)}
                    alt={item.servicesImageAlt ?? item.landmarkAlt ?? item.imageAlt ?? item.title}
                    style={{ objectPosition: servicesPosition }}
                    className="h-44 w-full object-cover"
                  />
                </div>
              ) : null}
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-gold">
                {item.servicesTitle}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
                {locale === "ar" ? "\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0645\u062a\u0648\u0641\u0631\u0629" : "Available services"}
              </h2>
              <div className="mt-6 grid gap-4">
                {displayedOfferings.map((offering) => (
                  <div key={offering.name} className="rounded-[24px] border border-slate-200/80 bg-[#fcfbf8] p-5">
                    <h3 className="text-lg font-bold text-text-primary">{offering.name}</h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white bg-white px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                          {common.validityLabel}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-text-primary">{offering.validity}</div>
                      </div>
                      <div className="rounded-2xl border border-white bg-white px-4 py-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                          {common.turnaroundLabel}
                        </div>
                        <div className="mt-2 text-sm font-semibold text-text-primary">{offering.turnaround}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] bg-navy p-5 text-white">
                <p className="max-w-lg text-sm leading-7 text-white/75">{displayedContactNote}</p>
                <a
                  href={serviceItemWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-3 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fba58]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {common.whatsAppLabel}
                </a>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </section>

      <section data-header-theme="light" className="bg-[#f8f7f3] section-padding-sm border-y border-black/5">
        <RevealWrapper className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              {previousItem ? (
                <Link
                  href={buildHref(`${serviceHref}/${previousItem.slug}`, activeVariant?.slug)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-gold/35 hover:text-navy"
                >
                  <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "" : "rotate-180"}`} />
                  {common.previousLabel}: {previousItem.shortLabel}
                </Link>
              ) : null}
              {nextItem ? (
                <Link
                  href={buildHref(`${serviceHref}/${nextItem.slug}`, activeVariant?.slug)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-gold/35 hover:text-navy"
                >
                  {common.nextLabel}: {nextItem.shortLabel}
                  <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                </Link>
              ) : null}
            </div>
            <Link
              href={buildHref(serviceHref, activeVariant?.slug)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
            >
              {common.returnToService}
              <ChevronRightIcon className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </RevealWrapper>
      </section>

      <section data-header-theme="light" className="bg-white section-padding">
        <div className="container-custom">
          <RevealWrapper className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-gold">
              {common.customerVoicesTitle}
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-text-primary lg:text-4xl">
              {locale === "ar" ? "\u0627\u0646\u0637\u0628\u0627\u0639\u0627\u062a \u0633\u0631\u064a\u0639\u0629" : "Quick impressions"}
            </h2>
          </RevealWrapper>
          <div className="grid gap-5 md:grid-cols-2">
            {common.customerVoices.map((voice, index) => (
              <RevealWrapper key={`${voice.name}-${index}`} delay={index * 70}>
                <div className="rounded-[28px] border border-slate-200/70 bg-[#fcfbf8] p-6 shadow-[0_16px_40px_-34px_rgba(23,34,63,0.3)]">
                  <p className="max-w-[34ch] text-sm leading-7 text-text-muted">{voice.text}</p>
                  <div className="mt-5 text-sm font-bold text-text-primary">{voice.name}</div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
