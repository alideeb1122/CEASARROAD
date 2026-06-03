"use client";

import AnimatedWords from "./AnimatedWords";
import { useReveal } from "./useReveal";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={`${centered ? "text-center" : ""} mb-12 lg:mb-16`}>
      {label && (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
            light
              ? "bg-white/10 text-brand-cta"
              : "bg-brand-cta/10 text-brand-cta"
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-text-primary"
        }`}
      >
        <AnimatedWords text={title} visible={visible} baseDelay={70} />
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base lg:text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-brand-muted" : "text-text-muted"}`}
        >
          <AnimatedWords text={subtitle} visible={visible} baseDelay={180} step={45} />
        </p>
      )}
    </div>
  );
}
