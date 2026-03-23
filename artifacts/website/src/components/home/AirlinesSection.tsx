"use client";

import { useReveal } from "./useReveal";

interface AirlinesSectionProps {
  label: string;
  trust: string;
  locale?: "ar" | "en";
}

const AIRLINES = [
  { abbr: "EK", name: "Emirates" },
  { abbr: "TK", name: "Turkish Airlines" },
  { abbr: "QR", name: "Qatar Airways" },
  { abbr: "EY", name: "Etihad Airways" },
  { abbr: "FZ", name: "flydubai" },
  { abbr: "G9", name: "Air Arabia" },
  { abbr: "MS", name: "EgyptAir" },
  { abbr: "PC", name: "Pegasus Airlines" },
  { abbr: "ME", name: "Middle East Airlines" },
  { abbr: "IA", name: "Iraqi Airways" },
];

function AirlineCard({ abbr, name }: { abbr: string; name: string }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-28 h-20 mx-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-brand-cta/25 hover:shadow-md transition-all duration-300 select-none">
      <span className="text-xl font-bold tracking-widest text-brand-cta font-mono leading-none">
        {abbr}
      </span>
      <span className="text-[10px] font-medium text-gray-400 text-center leading-tight px-2 truncate w-full text-center">
        {name}
      </span>
    </div>
  );
}

export default function AirlinesSection({
  label,
  trust,
  locale = "ar",
}: AirlinesSectionProps) {
  const { ref, visible } = useReveal(0.1);
  const isRtl = locale === "ar";

  return (
    <section ref={ref} className="bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="container-custom py-10">
        <div
          className="text-center mb-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand-cta/10 text-brand-cta text-xs font-semibold uppercase tracking-widest mb-2">
            {label}
          </span>
          <p className="text-sm text-gray-400 font-medium">{trust}</p>
        </div>
      </div>

      <div
        className="relative"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.15s",
        }}
      >
        <div
          className="flex"
          style={{
            animation: `airlines-marquee 38s linear infinite${isRtl ? " reverse" : ""}`,
          }}
          aria-hidden="true"
        >
          {[...AIRLINES, ...AIRLINES].map((a, i) => (
            <AirlineCard key={i} abbr={a.abbr} name={a.name} />
          ))}
        </div>
      </div>

      <div className="pb-10" />

      <style>{`
        @keyframes airlines-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes airlines-marquee {
            0%, 100% { transform: translateX(0); }
          }
        }
      `}</style>
    </section>
  );
}
