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

function getBranchLandmark(city: string): string {
  const normalized = city.trim().toLowerCase();
  if (normalized.includes("dubai") || normalized.includes("دبي")) return "/images/branches-dubai.jpg";
  if (normalized.includes("erbil") || normalized.includes("أربيل")) return "/images/branches-erbil.jpg";
  if (normalized.includes("homs") || normalized.includes("حمص")) return "/images/branches-homs.jpg";
  return "/images/branches-dubai.jpg";
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
    <section ref={ref} data-header-theme="light" className="bg-white section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-400 hover:-translate-y-2 hover:scale-[1.02] hover:border-brand-cta/45 hover:shadow-[0_32px_64px_-30px_rgba(15,23,42,0.5)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform, box-shadow, border-color",
                transitionDuration: "0.6s, 0.6s, 0.3s, 0.3s",
                transitionTimingFunction: "ease, ease, ease, ease",
                transitionDelay: `${i * 130}ms`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_86%_12%,rgba(194,169,107,0.2)_0%,rgba(194,169,107,0.04)_24%,transparent_54%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Card header */}
              <div className="relative z-10 overflow-hidden bg-brand-bg px-6 py-5">
                <div
                  className="absolute inset-0 scale-[1.16] bg-cover bg-center opacity-0 transition-all duration-700 group-hover:scale-100 group-hover:opacity-55"
                  style={{ backgroundImage: `url('${getBranchLandmark(branch.city)}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/82 to-brand-bg/42 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-cta scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-start" />
                <h3 className="relative text-2xl font-extrabold text-white transition-transform duration-300 group-hover:-translate-y-0.5">
                  {branch.city}
                </h3>
                <p className="relative mt-0.5 text-sm text-brand-muted transition-colors duration-300 group-hover:text-white/85">
                  {branch.country}
                </p>
              </div>

              {/* Card body */}
              <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
                {/* Address */}
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-start gap-3 text-sm text-text-muted transition-colors hover:text-brand-cta"
                >
                  <MapPinIcon className="branch-pin-icon mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cta" />
                  <span className="leading-relaxed">{branch.address}</span>
                  <ExternalLinkIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>

                {/* Working hours */}
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <ClockIcon className="branch-clock-icon mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cta" />
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
                  className="branch-cta flex w-full items-center justify-center gap-2 rounded-xl border border-brand-cta/25 bg-brand-cta/10 py-3 text-sm font-semibold text-brand-cta transition-all duration-200 hover:border-brand-cta hover:bg-brand-cta hover:text-brand-bg"
                >
                  <WhatsAppIcon className="branch-wa-icon h-4 w-4" />
                  {branchCta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .branch-pin-icon,
        .branch-clock-icon,
        .branch-wa-icon {
          transform-origin: center;
        }

        .group:hover .branch-pin-icon {
          animation: pinPulse 700ms ease;
        }

        .group:hover .branch-clock-icon {
          animation: clockTick 760ms ease;
        }

        .group:hover .branch-wa-icon {
          animation: waPop 650ms ease;
        }

        .group:hover .branch-cta {
          box-shadow: 0 10px 20px -14px rgba(201, 168, 76, 0.9);
        }

        @keyframes pinPulse {
          0% { transform: scale(0.9) translateY(0); }
          40% { transform: scale(1.18) translateY(-1px); }
          100% { transform: scale(1) translateY(0); }
        }

        @keyframes clockTick {
          0% { transform: rotate(0deg); }
          35% { transform: rotate(14deg); }
          70% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes waPop {
          0% { transform: scale(0.92); }
          45% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
