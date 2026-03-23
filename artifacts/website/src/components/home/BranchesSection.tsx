"use client";

import SectionHeading from "./SectionHeading";
import { MapPinIcon, ClockIcon, ExternalLinkIcon, WhatsAppIcon } from "./Icons";
import { useReveal } from "./useReveal";

interface Branch {
  city: string;
  country: string;
  address: string;
  mapUrl: string;
  whatsapp: string;
  hours: string;
}

interface BranchesSectionProps {
  label: string;
  title: string;
  subtitle: string;
  branches: Branch[];
  branchCta: string;
  hoursLabel: string;
}

export default function BranchesSection({
  label,
  title,
  subtitle,
  branches,
  branchCta,
  hoursLabel,
}: BranchesSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="bg-white section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-brand-cta/30 hover:shadow-lg transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 130}ms`,
              }}
            >
              {/* Card header */}
              <div className="relative bg-brand-bg px-6 py-5 overflow-hidden">
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-start" />
                <h3 className="text-2xl font-extrabold text-white">
                  {branch.city}
                </h3>
                <p className="text-sm text-brand-muted mt-0.5">
                  {branch.country}
                </p>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Address */}
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-text-muted hover:text-brand-cta transition-colors group/link"
                >
                  <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-cta" />
                  <span className="leading-relaxed">{branch.address}</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>

                {/* Working hours */}
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-cta" />
                  <div>
                    <span className="text-xs font-semibold text-text-primary uppercase tracking-wide block mb-0.5">
                      {hoursLabel}
                    </span>
                    {branch.hours}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/${branch.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-cta/10 text-brand-cta font-semibold text-sm hover:bg-brand-cta hover:text-brand-bg transition-all duration-200 border border-brand-cta/20 hover:border-brand-cta"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  {branchCta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
