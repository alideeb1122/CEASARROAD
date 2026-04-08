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
      className="airline-badge mx-3 flex flex-shrink-0 items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur-sm"
      style={{
        minWidth: "166px",
        boxShadow: "0 8px 24px rgba(15,23,42,0.04)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <span
        className="flex-shrink-0 rounded-full bg-brand-cta"
        style={{ width: "2.5px", height: "34px", opacity: 0.5 }}
      />
      <div className="flex flex-col gap-[3px] min-w-0">
        <span
          className="font-mono font-bold leading-none text-slate-800"
          style={{ fontSize: "14px", letterSpacing: "0.16em" }}
        >
          {abbr}
        </span>
        <span
          className="whitespace-nowrap font-medium leading-tight text-slate-400"
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
    <section ref={ref} data-header-theme="light" className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,#f8f8f4_0%,#fcfcfa_100%)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-32 w-32 rounded-full bg-brand-cta/6 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-28 w-40 rounded-full bg-brand-section/5 blur-3xl" />
      </div>
      {/* Header */}
      <div className="container-custom pt-12 pb-8 lg:pt-14 lg:pb-9">
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cta/20 bg-brand-cta/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cta">
            <span className="w-1 h-1 rounded-full bg-brand-cta/70" />
            {label}
          </span>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
            {trust}
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="airlines-wrap relative overflow-hidden pb-12 lg:pb-14"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }}
      >
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10"
          style={{ width: "104px", background: "linear-gradient(to right, #fafaf7 36%, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10"
          style={{ width: "104px", background: "linear-gradient(to left, #fafaf7 36%, transparent)" }}
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
          box-shadow: 0 12px 30px rgba(15,23,42,0.08) !important;
          transform: translateY(-3px);
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
