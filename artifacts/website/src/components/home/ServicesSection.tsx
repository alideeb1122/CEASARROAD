"use client";

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { ChevronRightIcon, getServiceIcon } from "./Icons";
import { useReveal } from "./useReveal";

interface Service {
  icon: string;
  title: string;
  desc: string;
}

interface ServicesSectionProps {
  label: string;
  title: string;
  subtitle: string;
  services: Service[];
  locale: "ar" | "en";
  servicesHref: string;
}

export default function ServicesSection({
  label,
  title,
  subtitle,
  services,
  locale,
  servicesHref,
}: ServicesSectionProps) {
  const isRtl = locale === "ar";
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden bg-white section-padding"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-bg/[0.06] to-transparent" />
      <div className="pointer-events-none absolute -left-28 top-20 h-56 w-56 rounded-full bg-brand-cta/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-brand-bg/10 blur-3xl" />

      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <article
              key={i}
              className="group relative isolate overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_42px_-28px_rgba(46,49,77,0.45)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cta/35 hover:shadow-[0_24px_58px_-28px_rgba(46,49,77,0.5)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition:
                  "opacity 0.65s ease, transform 0.65s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 95}ms`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(194,169,107,0.14)_0%,_transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-brand-cta/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-70" />

              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-cta/20 bg-gradient-to-b from-brand-cta/18 to-brand-cta/6 text-brand-cta transition-all duration-300 group-hover:scale-105 group-hover:border-brand-cta/35 group-hover:from-brand-cta/28 group-hover:to-brand-cta/12">
                {getServiceIcon(service.icon, "h-7 w-7")}
              </div>

              <h3 className="mb-2 text-base font-bold text-text-primary">{service.title}</h3>
              <p className="line-clamp-4 text-sm leading-relaxed text-text-muted">{service.desc}</p>

              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-brand-cta opacity-80 transition-all duration-200 group-hover:opacity-100">
                <Link href={servicesHref} className="hover:underline">
                  {locale === "ar" ? "اعرف المزيد" : "Learn more"}
                </Link>
                <ChevronRightIcon className={`h-3.5 w-3.5 ${isRtl ? "rotate-180" : ""}`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
