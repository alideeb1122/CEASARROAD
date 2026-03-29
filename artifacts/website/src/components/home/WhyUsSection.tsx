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
    <section ref={ref} data-header-theme="light" className="bg-surface section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {points.map((point, i) => (
            <div
              key={i}
              className="group relative flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-cta/25 hover:shadow-md transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              {/* Accent bar */}
              <div className="absolute start-0 top-4 bottom-4 w-0.5 rounded-full bg-brand-cta opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

              {/* Icon circle */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {getServiceIcon(point.icon, "w-6 h-6 text-brand-cta")}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-bold text-text-primary mb-1.5">
                  {point.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
