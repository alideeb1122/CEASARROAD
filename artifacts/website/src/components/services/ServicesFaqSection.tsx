"use client";

import { useReveal } from "@/components/home/useReveal";

interface Faq {
  q: string;
  a: string;
}

interface ServicesFaqSectionProps {
  label: string;
  title: string;
  faqs: Faq[];
}

export default function ServicesFaqSection({
  label,
  title,
  faqs,
}: ServicesFaqSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="bg-background section-padding">
      <div className="container-custom">
        <div
          className="text-center mb-10 lg:mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            {label}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-primary tracking-tight">
            {title}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto divide-y divide-gray-100">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group py-5 first:pt-0 last:pb-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: `${80 + i * 60}ms`,
              }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <span className="font-semibold text-text-primary text-base leading-snug group-open:text-navy transition-colors">
                  {faq.q}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 group-open:bg-gold/15 flex items-center justify-center transition-colors">
                  <svg
                    className="w-3.5 h-3.5 text-text-muted group-open:text-gold transition-all duration-200 group-open:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm text-text-muted leading-relaxed pe-11">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
