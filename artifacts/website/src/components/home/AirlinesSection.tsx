"use client";

import { useState } from "react";
import { useReveal } from "./useReveal";
import { withBasePath } from "@/lib/base-path";

interface AirlinesSectionProps {
  label: string;
  trust: string;
  locale?: "ar" | "en";
}

type Airline = {
  name: string;
  code?: string;
  logoSrc?: string;
  fitClassName?: string;
};

const ROW_A: Airline[] = [
  {
    name: "Royal Jordanian",
    logoSrc: "/images/airlines/custom/royaljordanian-wordmark.png",
    fitClassName: "max-w-[104px] h-[30px]",
  },
  { code: "AF", name: "Air France" },
  { code: "KL", name: "KLM" },
  {
    name: "JET",
    logoSrc: "/images/airlines/custom/jet-wordmark.png",
    fitClassName: "max-w-[106px] h-[34px]",
  },
  { code: "EY", name: "Etihad Airways" },
  {
    name: "Emirates",
    logoSrc: "/images/airlines/custom/emirates-wordmark.png",
    fitClassName: "max-w-[94px] h-[34px]",
  },
  { code: "LH", name: "Lufthansa" },
  { code: "QR", name: "Qatar Airways" },
  { code: "SQ", name: "Singapore Airlines" },
  { code: "TK", name: "Turkish Airlines" },
];

const ROW_B: Airline[] = [
  { code: "FZ", name: "flydubai" },
  {
    name: "Fly Cham",
    logoSrc: "/images/airlines/custom/flycham-wordmark.png",
    fitClassName: "max-w-[100px] h-[28px]",
  },
  {
    name: "Air Arabia",
    logoSrc: "/images/airlines/custom/airarabia-wordmark.png",
    fitClassName: "max-w-[112px] h-[36px]",
  },
  {
    name: "Jazeera Airways",
    logoSrc: "/images/airlines/custom/jazeera-wordmark.png",
    fitClassName: "max-w-[112px] h-[34px]",
  },
  { code: "6E", name: "IndiGo" },
  { code: "PC", name: "Pegasus Airlines" },
  {
    name: "flynas",
    logoSrc: "/images/airlines/custom/flynas-wordmark.png",
    fitClassName: "max-w-[108px] h-[34px]",
  },
  { code: "AK", name: "AirAsia" },
  { code: "U2", name: "easyJet" },
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
  const fallbackCode = airline.code ?? airline.name.slice(0, 3).toUpperCase();
  const logoUrl = airline.logoSrc
    ? withBasePath(airline.logoSrc)
    : `https://www.gstatic.com/flights/airline_logos/70px/${encodeURIComponent(airline.code ?? fallbackCode)}.png`;

  return (
    <div className="cr-airline-pill" aria-label={airline.name} title={airline.name}>
      {failed ? (
        <FallbackBadge code={fallbackCode} />
      ) : (
        <img
          src={logoUrl}
          alt={airline.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`w-auto object-contain ${airline.fitClassName ?? "h-10 max-w-[88px]"}`}
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
      className="relative overflow-hidden border-y border-slate-200/60 bg-[linear-gradient(180deg,#f3f6fb_0%,#f8fafc_46%,#f6f8fb_100%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-36 w-36 rounded-full bg-brand-bg/8 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-32 w-44 rounded-full bg-brand-cta/10 blur-3xl" />
        <div className="absolute inset-x-[18%] top-8 h-24 rounded-full bg-white/60 blur-3xl" />
      </div>

      <div className="container-custom relative pb-10 pt-9 lg:pb-12 lg:pt-10">
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 className="mx-auto max-w-3xl text-[1.65rem] font-bold tracking-[-0.04em] text-slate-900 sm:text-[2rem] lg:text-[2.35rem]">
            {label}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-[0.95rem]">
            {trust}
          </p>
        </div>
      </div>

      <div
        dir={locale === "ar" ? "ltr" : undefined}
        className="relative pb-6"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
        }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-20 bg-[linear-gradient(90deg,rgba(243,246,251,0.98),rgba(243,246,251,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-20 bg-[linear-gradient(270deg,rgba(243,246,251,0.98),rgba(243,246,251,0))]" />

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
          border: 1px solid rgba(191, 203, 224, 0.42);
          background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(244,248,253,0.94) 100%);
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.045), inset 0 1px 0 rgba(255,255,255,0.72);
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
            radial-gradient(circle at 18% 20%, rgba(201,164,76,0.08), transparent 20%),
            radial-gradient(circle at 82% 78%, rgba(62,103,167,0.08), transparent 24%);
          pointer-events: none;
        }

        .cr-airline-pill:hover {
          transform: translateY(-2px);
          border-color: rgba(201, 164, 76, 0.22);
          background: linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(246,249,254,1) 100%);
          box-shadow: 0 16px 34px rgba(66, 97, 153, 0.08), inset 0 1px 0 rgba(255,255,255,0.78);
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

        @media (max-width: 560px) {
          .cr-airline-pill {
            width: 108px;
            height: 58px;
            margin: 0 0.45rem;
            border-radius: 16px;
          }

          .cr-airline-pill img {
            max-width: 74px;
            height: 34px;
          }
        }
      `}</style>
    </section>
  );
}
