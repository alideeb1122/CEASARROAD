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

function AirlineBadge({ abbr, name }: { abbr: string; name: string }) {
  return (
    <div
      className="airline-badge flex-shrink-0 flex items-center gap-3 mx-3 px-4 py-3.5 rounded-xl bg-white border border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_8px_rgba(0,0,0,0.03)] hover:border-brand-cta/25 hover:shadow-[0_3px_14px_rgba(0,0,0,0.08)] hover:scale-[1.03] hover:-translate-y-px transition-all duration-300 select-none cursor-default"
      style={{ minWidth: "158px" }}
    >
      <span className="flex-shrink-0 w-[3px] h-8 rounded-full bg-brand-cta opacity-50" />

      <div className="flex flex-col gap-[3px] min-w-0">
        <span className="text-[15px] font-bold tracking-[0.14em] text-gray-800 font-mono leading-none">
          {abbr}
        </span>
        <span className="text-[10px] font-medium text-gray-400 leading-tight tracking-wide whitespace-nowrap">
          {name}
        </span>
      </div>
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
    <section
      ref={ref}
      className="bg-gray-50 border-y border-gray-100 overflow-hidden"
    >
      <div className="container-custom pt-10 pb-7">
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-cta/20 bg-brand-cta/10 text-brand-cta text-[11px] font-semibold uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-brand-cta/70" />
            {label}
          </span>
          <p className="mt-2 text-xs text-gray-400 font-medium tracking-wide">
            {trust}
          </p>
        </div>
      </div>

      <div
        className="airlines-wrap relative pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

        <div
          className="airlines-track flex items-center py-1"
          style={{
            animation: `airlines-marquee 46s linear infinite${isRtl ? " reverse" : ""}`,
          }}
          aria-hidden="true"
        >
          {[...AIRLINES, ...AIRLINES].map((a, i) => (
            <AirlineBadge key={i} abbr={a.abbr} name={a.name} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes airlines-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .airlines-wrap:hover .airlines-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .airlines-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
