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
      className="airline-badge flex-shrink-0 flex items-center gap-3 mx-3 px-4 py-3.5 rounded-xl bg-white border border-gray-100"
      style={{
        minWidth: "158px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.055)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <span
        className="flex-shrink-0 rounded-full bg-brand-cta"
        style={{ width: "2.5px", height: "34px", opacity: 0.5 }}
      />
      <div className="flex flex-col gap-[3px] min-w-0">
        <span
          className="font-mono font-bold text-gray-800 leading-none"
          style={{ fontSize: "14px", letterSpacing: "0.16em" }}
        >
          {abbr}
        </span>
        <span
          className="font-medium text-gray-400 leading-tight whitespace-nowrap"
          style={{ fontSize: "10px", letterSpacing: "0.04em" }}
        >
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
  const direction = isRtl ? " reverse" : "";

  return (
    <section ref={ref} className="bg-gray-50 border-y border-gray-100">
      {/* Header */}
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

      {/* Marquee */}
      <div
        className="airlines-wrap relative overflow-hidden pb-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }}
      >
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{ width: "88px", background: "linear-gradient(to right, #f9fafb 40%, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{ width: "88px", background: "linear-gradient(to left, #f9fafb 40%, transparent)" }}
        />

        {/*
          Track: exactly 2 copies.
          Animation: translateX(0) → translateX(-50%).
          At t=100% the second copy is in the exact pixel position the first copy was at t=0.
          The loop reset is visually identical → no jump, no cut.
        */}
        <div
          className="airlines-track flex items-center py-1"
          style={{
            animation: `airlines-marquee 20s linear infinite${direction}`,
            willChange: "transform",
            transform: "translateZ(0)",
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
          from { transform: translateZ(0) translateX(0); }
          to   { transform: translateZ(0) translateX(-50%); }
        }
        .airlines-wrap:hover .airlines-track {
          animation-play-state: paused;
        }
        .airline-badge:hover {
          border-color: rgba(194, 169, 107, 0.25) !important;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08) !important;
          transform: translateY(-1px);
        }
        @media (max-width: 768px) {
          .airlines-track {
            animation-duration: 12s !important;
          }
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
