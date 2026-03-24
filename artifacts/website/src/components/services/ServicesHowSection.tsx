"use client";

import { useReveal } from "@/components/home/useReveal";

interface HowStep {
  step: string;
  title: string;
  desc: string;
}

interface ServicesHowSectionProps {
  label: string;
  title: string;
  steps: HowStep[];
}

export default function ServicesHowSection({
  label,
  title,
  steps,
}: ServicesHowSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="bg-navy section-padding">
      <div className="container-custom">
        <div
          className="text-center mb-12 lg:mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
                transitionDelay: `${80 + i * 80}ms`,
              }}
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 start-full w-full h-px bg-white/10 z-0" />
              )}
              <div className="relative z-10 flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/12 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-extrabold text-xl tracking-tight">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base lg:text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
