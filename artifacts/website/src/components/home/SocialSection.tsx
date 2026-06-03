"use client";

import SectionHeading from "./SectionHeading";
import { getSocialIcon } from "./Icons";
import { useReveal } from "./useReveal";

const SOCIAL_COLORS: Record<string, string> = {
  whatsapp: "#25D366",
  instagram: "#E1306C",
  facebook: "#1877F2",
  youtube: "#FF0000",
  tiktok: "#010101",
  linkedin: "#0A66C2",
};

interface Social {
  platform: string;
  handle: string;
  url: string;
  type: string;
}

interface SocialSectionProps {
  label: string;
  title: string;
  subtitle: string;
  socials: Social[];
}

export default function SocialSection({
  label,
  title,
  subtitle,
  socials,
}: SocialSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} data-header-theme="light" className="bg-surface section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {socials.map((social, i) => {
            const color = SOCIAL_COLORS[social.type] ?? "#333";
            return (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative isolate flex flex-col items-center gap-3 overflow-hidden rounded-[28px] border border-white/65 bg-white/45 p-5 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.22)] backdrop-blur-[18px] transition-all duration-500 hover:border-white/90 hover:shadow-[0_24px_60px_-26px_rgba(15,23,42,0.3)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.55s ease, transform 0.55s ease, box-shadow 0.45s ease, border-color 0.45s ease, background-color 0.45s ease",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(145deg,rgba(255,255,255,0.58),rgba(255,255,255,0.18)_44%,rgba(255,255,255,0.1)_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <div
                  className="pointer-events-none absolute inset-x-4 top-0 h-16 rounded-b-[999px] bg-white/55 blur-xl transition-all duration-500 group-hover:h-20 group-hover:bg-white/70"
                  style={{ opacity: 0.8 }}
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}1f 0%, transparent 58%), radial-gradient(circle at 50% 100%, ${color}14 0%, transparent 52%)`,
                  }}
                />

                <div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[18px] border border-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_18px_26px_-18px_rgba(15,23,42,0.4)] backdrop-blur-xl transition-all duration-500 group-hover:scale-[1.08] group-hover:rotate-[-4deg]"
                  style={{
                    background: `linear-gradient(180deg, rgba(255,255,255,0.72), ${color}16)`,
                    boxShadow: `inset 0 1px 0 rgba(255,255,255,0.75), 0 18px 26px -18px ${color}55`,
                  }}
                >
                  <span
                    className="transition-transform duration-500 group-hover:scale-110"
                    style={{ color, filter: `drop-shadow(0 8px 16px ${color}2f)` }}
                  >
                    {getSocialIcon(social.type, "w-6 h-6")}
                  </span>
                </div>

                <div className="relative z-10 text-center">
                  <p className="text-xs font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-slate-950">
                    {social.platform}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
                    {social.handle}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
