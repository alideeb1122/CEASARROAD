"use client";

import SectionHeading from "./SectionHeading";
import { useReveal } from "./useReveal";

interface Testimonial {
  name: string;
  text: string;
  context: string;
}

interface TestimonialsSectionProps {
  label: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  label,
  title,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section ref={ref} className="bg-white section-padding">
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col bg-surface rounded-2xl border border-gray-100 p-7 hover:border-brand-cta/20 hover:shadow-md transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                {[...Array(5)].map((_, s) => (
                  <svg
                    key={s}
                    className="w-4 h-4 text-brand-cta fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-text-muted leading-relaxed flex-1">
                {t.text}
              </p>

              {/* Divider */}
              <div className="my-5 border-t border-gray-100" />

              {/* Attribution */}
              <div>
                <p className="text-sm font-bold text-text-primary">{t.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{t.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
