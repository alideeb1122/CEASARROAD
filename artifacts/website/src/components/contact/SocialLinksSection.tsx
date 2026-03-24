"use client";

import { getSocialIcon } from "@/components/home/Icons";
import { useReveal } from "@/components/home/useReveal";

interface Social {
  platform: string;
  handle: string;
  url: string;
  type: string;
  branch?: string;
}

interface SocialLinksSectionProps {
  title: string;
  subtitle: string;
  socials: Social[];
}

export default function SocialLinksSection({
  title,
  subtitle,
  socials,
}: SocialLinksSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container-custom">
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <p className="mt-3 text-white/55 text-sm max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/40 rounded-2xl p-4 transition-all duration-200 text-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, background-color 0.2s, border-color 0.2s",
                transitionDelay: `${80 + i * 60}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gold/15 group-hover:bg-gold/25 flex items-center justify-center text-gold transition-colors duration-200 flex-shrink-0">
                {getSocialIcon(social.type, "w-5 h-5")}
              </div>
              <div className="min-w-0 w-full">
                <p className="text-xs font-semibold text-white leading-tight truncate">
                  {social.platform}
                </p>
                <p className="text-xs text-white/45 truncate mt-0.5">{social.handle}</p>
                {social.branch && (
                  <span className="mt-1.5 inline-block text-xs bg-gold/20 text-gold font-medium px-2 py-0.5 rounded-full">
                    {social.branch}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
