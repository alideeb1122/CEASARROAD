"use client";

import { useState } from "react";
import { useReveal } from "./useReveal";

interface AirlinesSectionProps {
  label: string;
  trust: string;
  locale?: "ar" | "en";
}

type Airline = {
  code: string;
  name: string;
};

const ROW_A: Airline[] = [
  { code: "QR", name: "Qatar Airways" },
  { code: "TK", name: "Turkish Airlines" },
  { code: "BA", name: "British Airways" },
  { code: "AF", name: "Air France" },
  { code: "KL", name: "KLM" },
  { code: "DL", name: "Delta" },
  { code: "EY", name: "Etihad Airways" },
  { code: "EK", name: "Emirates" },
  { code: "LH", name: "Lufthansa" },
  { code: "SQ", name: "Singapore Airlines" },
];

const ROW_B: Airline[] = [
  { code: "FZ", name: "flydubai" },
  { code: "6E", name: "IndiGo" },
  { code: "U2", name: "easyJet" },
  { code: "FR", name: "Ryanair" },
  { code: "VY", name: "Vueling" },
  { code: "W6", name: "Wizz Air" },
  { code: "AK", name: "AirAsia" },
  { code: "PC", name: "Pegasus Airlines" },
  { code: "TO", name: "Transavia" },
  { code: "FZ", name: "flydubai" },
];

function FallbackBadge({ code }: { code: string }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-[11px] font-bold tracking-[0.12em] text-gold">
      {code}
    </div>
  );
}

function AirlinePill({ airline }: { airline: Airline }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = `https://www.gstatic.com/flights/airline_logos/70px/${encodeURIComponent(airline.code)}.png`;

  return (
    <div className="cr-airline-pill" aria-label={airline.name} title={airline.name}>
      {failed ? (
        <FallbackBadge code={airline.code} />
      ) : (
        <img
          src={logoUrl}
          alt={airline.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-10 w-auto max-w-[88px] object-contain"
        />
      )}
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Airline[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`cr-marquee-row ${reverse ? "reverse" : ""}`}>
      <div className="cr-marquee-track">
        {doubled.map((airline, index) => (
          <AirlinePill key={`${airline.code}-${index}`} airline={airline} />
        ))}
      </div>
    </div>
  );
}

export default function AirlinesSection({
  label,
  trust,
  locale = "en",
}: AirlinesSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,#f7f7f3_0%,#faf9f6_100%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-36 w-36 rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-32 w-44 rounded-full bg-navy/6 blur-3xl" />
      </div>

      <div className="container-custom relative py-14 lg:py-16">
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-1 w-1 rounded-full bg-gold/70" />
            {label}
          </span>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">
            {trust}
          </p>
        </div>
      </div>

      <div
        dir={locale === "ar" ? "ltr" : undefined}
        className="relative pb-8"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-[linear-gradient(90deg,rgba(247,247,243,0.98),rgba(247,247,243,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-[linear-gradient(270deg,rgba(247,247,243,0.98),rgba(247,247,243,0))]" />

        <div className="border-y border-slate-200/70">
          <MarqueeRow items={ROW_A} />
        </div>
        <div className="border-b border-slate-200/70">
          <MarqueeRow items={ROW_B} reverse />
        </div>
      </div>

      <style>{`
        .cr-marquee-row {
          overflow: hidden;
        }

        .cr-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          min-width: max-content;
          padding: 8px 0;
          animation: crMarqueeLeft 48s linear infinite;
        }

        .cr-marquee-row.reverse .cr-marquee-track {
          animation-name: crMarqueeRight;
          animation-duration: 56s;
        }

        .cr-marquee-row:hover .cr-marquee-track {
          animation-play-state: paused;
        }

        .cr-airline-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 132px;
          height: 64px;
          margin: 0 0.65rem;
          border-radius: 18px;
          border: 1px solid rgba(201, 164, 76, 0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.74) 0%, rgba(246,243,236,0.92) 100%);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255,255,255,0.65);
          color: #c9a44c;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }

        .cr-airline-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, rgba(201,164,76,0.10), transparent 20%),
            radial-gradient(circle at 82% 78%, rgba(36,59,107,0.07), transparent 24%);
          pointer-events: none;
        }

        .cr-airline-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(201, 164, 76, 0.28);
          background: linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(249,245,236,1) 100%);
          box-shadow: 0 16px 34px rgba(201, 164, 76, 0.12), inset 0 1px 0 rgba(255,255,255,0.72);
        }

        .cr-airline-pill img {
          position: relative;
          z-index: 1;
          filter: saturate(1.02) contrast(1.03);
        }

        @keyframes crMarqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes crMarqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .cr-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
