"use client";

import SectionHeading from "./SectionHeading";
import { MapPinIcon, ClockIcon, ExternalLinkIcon, WhatsAppIcon, getSocialIcon } from "./Icons";
import { useReveal } from "./useReveal";
import { withBasePath } from "@/lib/base-path";

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
  mapCta: string;
  hoursLabel: string;
  branchSocials: BranchSocial[];
}

interface BranchSocial {
  type: string;
  url: string;
  label?: string;
  branch?: string;
  platform?: string;
  handle?: string;
}

function getBranchLandmark(city: string): string {
  const normalized = city.trim().toLowerCase();
  if (normalized.includes("dubai") || normalized.includes("ط¯ط¨ظٹ")) return withBasePath("/images/branches-dubai.jpg");
  if (normalized.includes("erbil") || normalized.includes("ط£ط±ط¨ظٹظ„")) return withBasePath("/images/branches-erbil.jpg");
  if (normalized.includes("homs") || normalized.includes("ط­ظ…طµ")) return withBasePath("/images/branches-homs.jpg");
  return withBasePath("/images/branches-dubai.jpg");
}

export default function BranchesSection({
  title,
  subtitle,
  branches,
  branchCta,
  mapCta,
  hoursLabel,
  branchSocials,
}: BranchesSectionProps) {
  const { ref, visible } = useReveal(0.1);
  const socialOrder = ["linkedin", "tiktok", "youtube", "facebook", "instagram"];
  const sharedTypes = new Set(["linkedin", "tiktok", "youtube"]);

  const getBranchSocials = (branchCity: string) => {
    const combined = branchSocials.filter(
      (social) => social.branch === branchCity || (!social.branch && sharedTypes.has(social.type))
    );

    return combined.sort((a, b) => {
      const aIndex = socialOrder.indexOf(a.type);
      const bIndex = socialOrder.indexOf(b.type);
      const safeA = aIndex === -1 ? socialOrder.length : aIndex;
      const safeB = bIndex === -1 ? socialOrder.length : bIndex;
      return safeA - safeB;
    });
  };

  return (
    <section ref={ref} data-header-theme="light" className="bg-white pb-24 pt-16 lg:pb-28 lg:pt-18">
      <div className="container-custom">
        <SectionHeading title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {branches.map((branch, i) => {
            const socials = getBranchSocials(branch.city);

            return (
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

              <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
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

                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <ClockIcon className="branch-clock-icon mt-0.5 h-4 w-4 flex-shrink-0 text-brand-cta" />
                  <div>
                    <span className="text-xs font-semibold text-text-primary uppercase tracking-wide block mb-0.5">
                      {hoursLabel}
                    </span>
                    {branch.hours}
                  </div>
                </div>

                <div className="flex-1" />

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branch-cta branch-cta-wa flex w-full items-center justify-center gap-2 rounded-xl border border-brand-cta/25 bg-brand-cta/10 px-3 py-3 text-sm font-semibold text-brand-cta transition-all duration-200 hover:border-brand-cta hover:bg-brand-cta hover:text-brand-bg"
                  >
                    <WhatsAppIcon className="branch-wa-icon h-4 w-4" />
                    {branchCta}
                  </a>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="branch-cta branch-cta-map flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:border-brand-bg hover:bg-brand-bg/5 hover:text-brand-bg"
                  >
                    <MapPinIcon className="branch-map-icon h-4 w-4" />
                    {mapCta}
                  </a>
                </div>

                {socials.length ? (
                  <div className="mt-3 border-t border-slate-100/90 pt-3">
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      {socials.map((social) => (
                        <a
                          key={`${branch.city}-${social.type}-${social.url}`}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${social.platform ?? social.label} ${branch.city}`}
                          title={social.handle ? `${social.platform}: ${social.handle}` : social.platform ?? social.label}
                          className="branch-social-chip group/social inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cta/40 hover:bg-brand-cta/8 hover:text-brand-cta"
                        >
                          {getSocialIcon(social.type, "branch-social-icon h-[18px] w-[18px]")}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )})}
        </div>
      </div>

      <style>{`
        .branch-pin-icon,
        .branch-clock-icon,
        .branch-wa-icon,
        .branch-map-icon,
        .branch-social-icon {
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

        .group:hover .branch-map-icon {
          animation: pinPulse 700ms ease;
        }

        .group:hover .branch-social-chip {
          box-shadow: 0 12px 24px -18px rgba(35, 48, 86, 0.22);
        }

        .group:hover .branch-social-icon {
          animation: socialFloat 700ms ease;
        }

        .group:hover .branch-cta {
          box-shadow: 0 10px 20px -14px rgba(201, 168, 76, 0.9);
        }

        .group:hover .branch-cta-map {
          box-shadow: 0 12px 24px -18px rgba(35, 48, 86, 0.3);
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

        @keyframes socialFloat {
          0% { transform: scale(0.92) translateY(0); }
          45% { transform: scale(1.08) translateY(-1px); }
          100% { transform: scale(1) translateY(0); }
        }
      `}</style>
    </section>
  );
}
