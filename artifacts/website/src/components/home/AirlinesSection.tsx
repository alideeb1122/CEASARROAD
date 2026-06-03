"use client";

import { useReveal } from "./useReveal";

interface AirlinesSectionProps {
  label: string;
  trust: string;
  locale?: "ar" | "en";
}

const AIRLINES = [
  { name: "Emirates", src: "/images/airlines/emirates.svg" },
  { name: "Turkish Airlines", src: "/images/airlines/turkishairlines.svg", wordmarkColor: "#C70A2C" },
  { name: "Qatar Airways", src: "/images/airlines/qatarairways.svg" },
  { name: "Etihad Airways", src: "/images/airlines/etihadairways.svg" },
  { name: "Pegasus Airlines", src: "/images/airlines/pegasusairlines.svg" },
  { name: "Saudia", src: "/images/airlines/saudia.svg" },
  { name: "Lufthansa", src: "/images/airlines/lufthansa.svg" },
  { name: "Singapore Airlines", src: "/images/airlines/singaporeairlines.svg" },
  { name: "Japan Airlines", src: "/images/airlines/japanairlines.svg" },
  { name: "Air France", src: "/images/airlines/airfrance.svg", wordmarkColor: "#002157" },
  { name: "British Airways", src: "/images/airlines/britishairways.svg" },
  { name: "KLM", src: "/images/airlines/klm.svg", wordmarkColor: "#00A1DE" },
  { name: "ANA", src: "/images/airlines/ana.svg" },
  { name: "SWISS", src: "/images/airlines/swiss.svg" },
  { name: "Delta", src: "/images/airlines/delta.svg" },
  { name: "United", src: "/images/airlines/united.svg" },
  { name: "Air Canada", src: "/images/airlines/aircanada.svg" },
  { name: "Iberia", src: "/images/airlines/iberia.svg" },
  { name: "Oman Air", src: "/images/airlines/omanair.svg" },
  { name: "Ryanair", src: "/images/airlines/ryanair.svg" },
];

function AirlineLogo({ name, src, wordmarkColor }: { name: string; src: string; wordmarkColor?: string }) {
  return (
    <div className="airline-logo-card group flex h-[98px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 px-6">
      {wordmarkColor ? (
        <div className="flex items-center gap-2">
          <img src={src} alt={name} loading="lazy" className="airline-logo h-8 w-auto max-w-[56px] object-contain" />
          <span
            className="airline-wordmark text-[15px] font-semibold tracking-[0.04em]"
            style={{ color: wordmarkColor }}
          >
            {name}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          className="airline-logo h-12 w-auto max-w-[158px] object-contain"
        />
      )}
    </div>
  );
}

export default function AirlinesSection({ label, trust, locale = "en" }: AirlinesSectionProps) {
  const { ref, visible } = useReveal(0.1);
  const splitIndex = Math.ceil(AIRLINES.length / 2);
  const rowA = AIRLINES.slice(0, splitIndex);
  const rowB = AIRLINES.slice(splitIndex);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,#f8f8f4_0%,#fcfcfa_100%)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-0 h-32 w-32 rounded-full bg-brand-cta/6 blur-3xl" />
        <div className="absolute right-[10%] bottom-0 h-28 w-40 rounded-full bg-brand-section/5 blur-3xl" />
      </div>

      <div className="container-custom py-14 lg:py-16">
        <div
          className="text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cta/20 bg-brand-cta/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-cta">
            <span className="h-1 w-1 rounded-full bg-brand-cta/70" />
            {label}
          </span>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-500">{trust}</p>
        </div>

        <div
          dir={locale === "ar" ? "ltr" : undefined}
          className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}
        >
          <div className="airline-marquee-row">
            <div className="airline-marquee-track">
              <div className="airline-marquee-group">
                {rowA.map((airline, idx) => (
                  <AirlineLogo
                    key={`${airline.name}-a-${idx}`}
                    name={airline.name}
                    src={airline.src}
                    wordmarkColor={airline.wordmarkColor}
                  />
                ))}
              </div>
              <div className="airline-marquee-group" aria-hidden="true">
                {rowA.map((airline, idx) => (
                  <AirlineLogo
                    key={`${airline.name}-a-copy-${idx}`}
                    name={airline.name}
                    src={airline.src}
                    wordmarkColor={airline.wordmarkColor}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="airline-marquee-row reverse">
            <div className="airline-marquee-track">
              <div className="airline-marquee-group">
                {rowB.map((airline, idx) => (
                  <AirlineLogo
                    key={`${airline.name}-b-${idx}`}
                    name={airline.name}
                    src={airline.src}
                    wordmarkColor={airline.wordmarkColor}
                  />
                ))}
              </div>
              <div className="airline-marquee-group" aria-hidden="true">
                {rowB.map((airline, idx) => (
                  <AirlineLogo
                    key={`${airline.name}-b-copy-${idx}`}
                    name={airline.name}
                    src={airline.src}
                    wordmarkColor={airline.wordmarkColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .airline-marquee-row {
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
        }

        .airline-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeLeft 62s linear infinite;
        }

        .airline-marquee-group {
          display: flex;
          gap: 18px;
          flex-shrink: 0;
          padding-right: 18px;
        }

        .airline-marquee-row.reverse .airline-marquee-track {
          animation-name: marqueeRight;
          animation-duration: 56s;
        }

        .airline-marquee-row:hover .airline-marquee-track {
          animation-play-state: paused;
        }

        .airline-logo-card {
          flex: 0 0 260px;
          transition: border-color 0.26s ease, background-color 0.26s ease, transform 0.26s ease, box-shadow 0.26s ease;
        }

        .airline-logo {
          opacity: 0.9;
          filter: saturate(1.06) contrast(1.04);
          transition: opacity 0.28s ease, filter 0.28s ease, transform 0.28s ease;
          animation: logoBreath 4.2s ease-in-out infinite;
        }

        .airline-wordmark {
          transition: opacity 0.28s ease, transform 0.28s ease;
        }

        .airline-logo-card:hover {
          border-color: rgba(194, 169, 107, 0.3);
          background: rgba(255,255,255,0.98);
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(15,23,42,0.1), 0 0 0 1px rgba(194,169,107,0.08) inset;
        }

        .airline-logo-card:hover .airline-logo {
          opacity: 1;
          filter: saturate(1.15) contrast(1.08);
          transform: scale(1.04);
        }

        .airline-logo-card:hover .airline-wordmark {
          transform: translateY(-1px);
          opacity: 0.95;
        }

        @keyframes logoBreath {
          0%, 100% { transform: translateY(0); opacity: 0.88; }
          50% { transform: translateY(-2px); opacity: 1; }
        }

        .airline-logo-card:nth-child(2n) .airline-logo { animation-delay: 0.35s; }
        .airline-logo-card:nth-child(3n) .airline-logo { animation-delay: 0.7s; }
        .airline-logo-card:nth-child(4n) .airline-logo { animation-delay: 1.05s; }

        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 640px) {
          .airline-marquee-group {
            gap: 12px;
            padding-right: 12px;
          }

          .airline-marquee-track {
            animation-duration: 42s;
          }

          .airline-marquee-row.reverse .airline-marquee-track {
            animation-duration: 38s;
          }

          .airline-logo-card {
            flex-basis: 190px;
            height: 82px;
            border-radius: 14px;
            padding-left: 14px;
            padding-right: 14px;
          }

          .airline-logo {
            height: 34px;
            max-width: 120px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .airline-logo {
            animation: none !important;
          }

          .airline-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
