"use client";

import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { getServiceIcon, ChevronRightIcon } from "./Icons";
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
    <section ref={ref} className="bg-white section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-brand-cta/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-brand-cta/10 flex items-center justify-center mb-5 group-hover:bg-brand-cta/20 group-hover:scale-105 transition-all duration-300">
                {getServiceIcon(service.icon, "w-7 h-7 text-brand-cta")}
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {service.desc}
              </p>

              {/* Hover indicator */}
              <div className="mt-4 flex items-center gap-1 text-brand-cta text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link href={servicesHref} className="hover:underline">
                  {locale === "ar" ? "اعرف المزيد" : "Learn more"}
                </Link>
                <ChevronRightIcon className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
