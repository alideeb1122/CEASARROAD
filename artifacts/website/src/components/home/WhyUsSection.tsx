"use client";

import SectionHeading from "./SectionHeading";
import { getServiceIcon } from "./Icons";
import { useReveal } from "./useReveal";

interface WhyPoint {
  icon: string;
  title: string;
  desc: string;
}

interface WhyUsSectionProps {
  label: string;
  title: string;
  subtitle: string;
  points: WhyPoint[];
}

export default function WhyUsSection({
  label,
  title,
  subtitle,
  points,
}: WhyUsSectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f7f9_0%,#f3f5f8_100%)] section-padding"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-bg/[0.08] to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-brand-bg/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-10 h-64 w-64 rounded-full bg-brand-cta/12 blur-3xl" />
      <div className="why-flight-bg pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.36]"
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M-80 310 C 260 120, 540 640, 980 380 C 1200 250, 1410 290, 1680 180"
            fill="none"
            stroke="rgba(152,165,191,0.35)"
            strokeWidth="2.5"
            strokeDasharray="7 10"
            strokeLinecap="round"
          />
          <path
            d="M20 720 C 280 570, 620 760, 920 620 C 1180 500, 1350 540, 1620 460"
            fill="none"
            stroke="rgba(194,169,107,0.28)"
            strokeWidth="2.4"
            strokeDasharray="6 12"
            strokeLinecap="round"
          />
          <path
            d="M220 -60 C 420 180, 820 160, 1010 340 C 1200 520, 1380 510, 1660 660"
            fill="none"
            stroke="rgba(157,172,201,0.16)"
            strokeWidth="2"
            strokeDasharray="5 11"
            strokeLinecap="round"
          />
        </svg>
        <div className="why-flight-track why-flight-track-a">
          <span className="why-flight-dot" />
          <span className="why-flight-plane">✈</span>
        </div>
        <div className="why-flight-track why-flight-track-b">
          <span className="why-flight-dot" />
          <span className="why-flight-plane">✈</span>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="mx-auto grid max-w-[1040px] grid-cols-1 gap-4 pt-2 sm:grid-cols-2 lg:gap-5">
          {points.map((point, i) => (
            <article
              key={i}
              className="group why-glass-card relative z-20 isolate overflow-hidden rounded-[22px] border border-white/58 bg-white/24 px-4 py-4 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.34)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:border-brand-cta/70 hover:bg-white/32 hover:shadow-[0_24px_54px_-26px_rgba(15,23,42,0.45)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionProperty:
                  "opacity, transform, box-shadow, border-color, background-color",
                transitionDuration: "0.65s, 0.65s, 0.35s, 0.35s, 0.35s",
                transitionTimingFunction:
                  "ease, ease, ease, ease, ease",
                transitionDelay: `${i * 95}ms`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(194,169,107,0.2)_0%,rgba(194,169,107,0.06)_26%,transparent_58%)] opacity-65 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.46)_0%,rgba(255,255,255,0.14)_34%,rgba(255,255,255,0.04)_100%)] opacity-80" />
              <div className="why-glass-reflect pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(194,169,107,0.08)_45%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute start-0 top-5 bottom-5 w-0.5 rounded-full bg-brand-cta/65 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute end-0 top-5 bottom-5 w-px bg-brand-cta/20" />

              <div className="relative flex items-start gap-3.5 sm:gap-4">
                <div className={`why-icon-wrap why-icon-${point.icon} flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center rounded-xl border border-brand-cta/20 bg-[linear-gradient(180deg,#2f355e_0%,#252c52_100%)] text-brand-cta shadow-[0_10px_18px_-12px_rgba(15,23,42,0.85)] transition-all duration-300 group-hover:border-brand-cta/70`}>
                  {getServiceIcon(point.icon, "why-icon h-[22px] w-[22px]")}
                </div>

                <div className="pt-0.5">
                  <h3 className="mb-1 text-[20px] leading-tight font-bold tracking-tight text-slate-900 sm:text-[24px]">
                    {point.title}
                  </h3>
                  <p className="text-[16px] leading-7 text-slate-600">{point.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .why-icon {
          transform-origin: center;
          transition: transform 280ms ease, filter 280ms ease;
        }

        .why-glass-card {
          backdrop-filter: blur(19px) saturate(1.22) brightness(1.04);
          -webkit-backdrop-filter: blur(19px) saturate(1.22) brightness(1.04);
        }

        .why-glass-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.38);
          pointer-events: none;
          opacity: 0.8;
        }

        .why-glass-reflect::before {
          content: "";
          position: absolute;
          top: -25%;
          bottom: -25%;
          width: 45%;
          left: -55%;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(212, 184, 118, 0.12) 36%,
            rgba(141, 166, 210, 0.18) 52%,
            rgba(255, 255, 255, 0.26) 64%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(1px);
          transform: skewX(-18deg);
          animation: whyGlassSweep 1500ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes whyGlassSweep {
          0% {
            left: -55%;
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            left: 120%;
            opacity: 0;
          }
        }

        .group:hover .why-icon-wrap {
          transform: translateY(-1px) scale(1.06);
          box-shadow: 0 18px 28px -14px rgba(15, 23, 42, 0.9);
        }

        .group:hover .why-icon-check .why-icon {
          animation: whyCheckDone 640ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .why-icon-globe .why-icon {
          animation: whyGlobeSpin 1300ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .why-icon-star .why-icon {
          animation: whyStarPop 760ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .group:hover .why-icon-headset .why-icon {
          animation: whyHeadsetRing 820ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes whyCheckDone {
          0% { transform: scale(0.86) rotate(-8deg); filter: brightness(0.9); }
          40% { transform: scale(1.15) rotate(3deg); filter: brightness(1.1); }
          100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
        }

        @keyframes whyGlobeSpin {
          0% { transform: rotate(0deg) scale(1); }
          65% { transform: rotate(320deg) scale(1.06); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes whyStarPop {
          0% { transform: scale(0.9) rotate(0deg); }
          45% { transform: scale(1.18) rotate(8deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes whyHeadsetRing {
          0% { transform: rotate(0deg); }
          18% { transform: rotate(-10deg); }
          36% { transform: rotate(8deg); }
          54% { transform: rotate(-5deg); }
          72% { transform: rotate(4deg); }
          100% { transform: rotate(0deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .why-flight-bg {
            display: none;
          }

          .why-icon,
          .group:hover .why-icon {
            animation: none !important;
            transform: none !important;
          }

          .group:hover {
            transform: none !important;
          }

          .why-glass-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(255, 255, 255, 0.9);
          }
        }

        .why-flight-track {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .why-flight-dot,
        .why-flight-plane {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform, opacity;
        }

        .why-flight-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(227, 204, 149, 0.95), rgba(227, 204, 149, 0.2));
          box-shadow: 0 0 16px rgba(212, 184, 118, 0.7);
          opacity: 0.85;
        }

        .why-flight-plane {
          font-size: 24px;
          color: rgba(58, 68, 108, 0.82);
          filter: drop-shadow(0 8px 14px rgba(28, 34, 64, 0.24));
          transform-origin: center;
          opacity: 0.8;
        }

        .why-flight-track-a .why-flight-dot,
        .why-flight-track-a .why-flight-plane {
          offset-path: path("M-80 310 C 260 120, 540 640, 980 380 C 1200 250, 1410 290, 1680 180");
          offset-rotate: auto;
        }

        .why-flight-track-b .why-flight-dot,
        .why-flight-track-b .why-flight-plane {
          offset-path: path("M20 720 C 280 570, 620 760, 920 620 C 1180 500, 1350 540, 1620 460");
          offset-rotate: auto;
        }

        .why-flight-track-a .why-flight-dot {
          animation: whyFlightDotA 16s linear infinite;
        }
        .why-flight-track-a .why-flight-plane {
          animation: whyFlightPlaneA 16s linear infinite;
        }
        .why-flight-track-b .why-flight-dot {
          animation: whyFlightDotB 22s linear infinite 1.8s;
        }
        .why-flight-track-b .why-flight-plane {
          animation: whyFlightPlaneB 22s linear infinite 1.8s;
        }

        @keyframes whyFlightDotA {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 0.85; }
          92% { opacity: 0.85; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes whyFlightPlaneA {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 0.8; }
          92% { opacity: 0.8; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes whyFlightDotB {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes whyFlightPlaneB {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 0.75; }
          90% { opacity: 0.75; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
