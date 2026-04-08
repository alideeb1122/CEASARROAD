"use client";

import SectionHeading from "./SectionHeading";
import { getServiceIcon } from "./Icons";
import { useReveal } from "./useReveal";

interface WhyPoint {
  icon: string;
  title: string;
  desc: string;
}

interface WhyUsSectionProps {
  label: string;
  title: string;
  subtitle: string;
  points: WhyPoint[];
}

export default function WhyUsSection({
  label,
  title,
  subtitle,
  points,
}: WhyUsSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden bg-surface section-padding"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-bg/[0.06] to-transparent" />
      <div className="pointer-events-none absolute left-0 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-bg/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-56 w-56 translate-x-1/3 rounded-full bg-brand-cta/12 blur-3xl" />

      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {points.map((point, i) => (
            <article
              key={i}
              className="group relative isolate flex gap-5 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_16px_40px_-28px_rgba(46,49,77,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-cta/35 hover:shadow-[0_24px_52px_-28px_rgba(46,49,77,0.52)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.65s ease, transform 0.65s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 85}ms`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(194,169,107,0.12)_0%,_transparent_62%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute start-0 top-5 bottom-5 w-0.5 rounded-full bg-brand-cta/70 opacity-50 transition-all duration-300 group-hover:opacity-100" />

              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-bg text-brand-cta transition-transform duration-300 group-hover:scale-105">
                {getServiceIcon(point.icon, "h-6 w-6")}
              </div>

              <div>
                <h3 className="mb-1.5 font-bold text-text-primary">{point.title}</h3>
                <p className="text-sm leading-relaxed text-text-muted">{point.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
