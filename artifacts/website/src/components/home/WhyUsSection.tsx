"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { getServiceIcon } from "./Icons";
import { useReveal } from "./useReveal";
import { withBasePath } from "@/lib/base-path";

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

const WHY_US_HERO_IMAGES = [
  withBasePath("/images/branches/why-us/why-us-branch-hero.png"),
  withBasePath("/images/branches/why-us/why-us-branch-hero-02.png"),
  withBasePath("/images/branches/why-us/why-us-branch-hero-03.png"),
];
const WHY_US_SUPPORT_IMAGES = [
  withBasePath("/images/branches/why-us/why-us-branch-hover-01.png"),
  withBasePath("/images/branches/why-us/why-us-branch-hover-02.png"),
  withBasePath("/images/branches/why-us/why-us-branch-hover-03.png"),
];

export default function WhyUsSection({
  title,
  subtitle,
  points,
}: WhyUsSectionProps) {
  const { ref, visible } = useReveal(0.1);
  const [leadPoint, ...supportPoints] = points;
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    if (WHY_US_HERO_IMAGES.length <= 1) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % WHY_US_HERO_IMAGES.length);
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative -mt-2 overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#f2f4f8_100%)] pb-14 pt-8 sm:-mt-3 sm:pb-16 sm:pt-9 lg:-mt-4 lg:pb-20 lg:pt-10"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-bg/[0.08] to-transparent" />
      <div className="pointer-events-none absolute left-[8%] top-20 h-72 w-72 rounded-full bg-brand-bg/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-10 h-64 w-64 rounded-full bg-brand-cta/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-[16%] top-[22%] h-48 rounded-full bg-white/55 blur-3xl" />
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
          <svg className="why-flight-plane" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21.7 3.2a1.2 1.2 0 0 0-1.28-.15L9.56 8.38 5.7 5.76a1 1 0 0 0-.82-.13l-1.9.54a.56.56 0 0 0-.18 1l2.88 2.01-2.85 3.06-2.06-.4a.56.56 0 0 0-.63.73l.69 1.93c.1.3.43.45.73.35l2.2-.73 3.22 2.65-1.18 3.43a.88.88 0 0 0 1.16 1.09l2.26-.9a1 1 0 0 0 .46-.38l2.25-3.5 6.56-.95a1.6 1.6 0 0 0 .92-.44l2.42-2.42c.45-.45.45-1.18 0-1.63l-2.3-2.3 2.5-4.7a1.2 1.2 0 0 0-.12-1.35Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="why-flight-track why-flight-track-b">
          <svg className="why-flight-plane" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21.7 3.2a1.2 1.2 0 0 0-1.28-.15L9.56 8.38 5.7 5.76a1 1 0 0 0-.82-.13l-1.9.54a.56.56 0 0 0-.18 1l2.88 2.01-2.85 3.06-2.06-.4a.56.56 0 0 0-.63.73l.69 1.93c.1.3.43.45.73.35l2.2-.73 3.22 2.65-1.18 3.43a.88.88 0 0 0 1.16 1.09l2.26-.9a1 1 0 0 0 .46-.38l2.25-3.5 6.56-.95a1.6 1.6 0 0 0 .92-.44l2.42-2.42c.45-.45.45-1.18 0-1.63l-2.3-2.3 2.5-4.7a1.2 1.2 0 0 0-.12-1.35Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="why-us-heading-wrap pt-4 sm:pt-5 lg:pt-7">
          <SectionHeading title={title} subtitle={subtitle} />
        </div>

        <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-5 pt-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.96fr)] lg:items-stretch">
          <article
            className="group why-hero-card relative z-20 isolate overflow-hidden rounded-[30px] border border-white/58 bg-white/22 p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.38)] transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-cta/70 hover:shadow-[0_30px_75px_-34px_rgba(15,23,42,0.48)] sm:p-7 lg:min-h-[164px] lg:p-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(22px)",
              transitionProperty:
                "opacity, transform, box-shadow, border-color, background-color",
              transitionDuration: "0.75s, 0.75s, 0.45s, 0.45s, 0.45s",
              transitionDelay: "40ms",
            }}
          >
            {WHY_US_HERO_IMAGES.map((image, index) => (
              <div
                key={image}
                className="pointer-events-none absolute inset-0 bg-cover bg-center transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
                style={{
                  backgroundImage: `url("${image}")`,
                  opacity: activeHeroImage === index ? 1 : 0,
                  transform: activeHeroImage === index ? "scale(1)" : "scale(1.03)",
                }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(14,22,42,0.02)_0%,rgba(14,22,42,0.03)_45%,rgba(14,22,42,0.14)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_78%,rgba(194,169,107,0.14)_0%,rgba(194,169,107,0.08)_20%,rgba(194,169,107,0.03)_34%,transparent_54%)]" />
            <div className="why-card-pattern pointer-events-none absolute inset-0 transition-opacity duration-500" />
            <div className="why-glass-reflect pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute end-7 top-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-cta/18 bg-[linear-gradient(180deg,#2f355e_0%,#252c52_100%)] text-brand-cta shadow-[0_18px_32px_-18px_rgba(15,23,42,0.95)] sm:h-16 sm:w-16">
              {leadPoint ? getServiceIcon(leadPoint.icon, "why-icon h-7 w-7 sm:h-8 sm:w-8") : null}
            </div>
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-cta/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex h-full flex-col justify-end pb-16 pt-28 sm:pb-18 sm:pt-[8.5rem] lg:pb-20 lg:pt-[10rem]">
              <div className="max-w-[31rem]">
                <h3 className="max-w-[18ch] text-[1.8rem] font-bold leading-[1.08] tracking-[-0.05em] !text-white [text-shadow:0_6px_20px_rgba(14,22,42,0.42)] sm:text-[2.1rem] lg:text-[2.2rem]">
                  {leadPoint?.title}
                </h3>
                <p className="mt-3 max-w-[31ch] text-[0.96rem] leading-7 !text-white/95 [text-shadow:0_4px_16px_rgba(14,22,42,0.34)] sm:text-[1rem]">
                  {leadPoint?.desc}
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:pt-5">
            {supportPoints.map((point, i) => (
              <article
                key={point.title}
                className="group why-glass-card relative z-20 isolate overflow-hidden rounded-[24px] border border-white/56 bg-white/24 px-5 py-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-cta/70 hover:bg-white/32 hover:shadow-[0_24px_54px_-26px_rgba(15,23,42,0.45)] sm:px-6 sm:py-6 lg:min-h-[164px]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transitionProperty:
                    "opacity, transform, box-shadow, border-color, background-color",
                  transitionDuration: "0.65s, 0.65s, 0.35s, 0.35s, 0.35s",
                  transitionTimingFunction:
                    "ease, ease, ease, ease, ease",
                  transitionDelay: `${160 + i * 110}ms`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-0 scale-[1.02] transition-[opacity,transform] duration-500 group-hover:opacity-[0.42] group-hover:scale-100"
                  style={{ backgroundImage: `url("${WHY_US_SUPPORT_IMAGES[i] || WHY_US_SUPPORT_IMAGES[0]}")` }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,252,246,0.8)_0%,rgba(255,255,255,0.64)_42%,rgba(255,255,255,0.52)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(194,169,107,0.24)_0%,rgba(194,169,107,0.08)_26%,transparent_58%)] opacity-72 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.1)_34%,rgba(255,255,255,0.02)_100%)] opacity-72" />
                <div className="why-card-pattern pointer-events-none absolute inset-0 transition-opacity duration-300" />
                <div className="why-glass-reflect pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(194,169,107,0.08)_45%,transparent_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute end-0 top-6 bottom-6 w-px bg-brand-cta/20" />

                <div className="relative flex items-start gap-4">
                  <div className={`why-icon-wrap why-icon-${point.icon} flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-2xl border border-brand-cta/20 bg-[linear-gradient(180deg,#2f355e_0%,#252c52_100%)] text-brand-cta shadow-[0_10px_18px_-12px_rgba(15,23,42,0.85)] transition-all duration-300 group-hover:border-brand-cta/70`}>
                    {getServiceIcon(point.icon, "why-icon h-[22px] w-[22px]")}
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="mb-1 text-[1.35rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[1.55rem]">
                      {point.title}
                    </h3>
                    <p className="text-[0.98rem] leading-7 text-slate-600">{point.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .why-us-heading-wrap h2 {
          font-size: 1.7rem;
          line-height: 1.18;
        }

        @media (min-width: 640px) {
          .why-us-heading-wrap h2 {
            font-size: 2.05rem;
          }
        }

        @media (min-width: 1024px) {
          .why-us-heading-wrap h2 {
            font-size: 2.65rem;
          }
        }

        .why-icon {
          transform-origin: center;
          transition: transform 280ms ease, filter 280ms ease;
        }

        .why-glass-card {
          backdrop-filter: blur(19px) saturate(1.22) brightness(1.04);
          -webkit-backdrop-filter: blur(19px) saturate(1.22) brightness(1.04);
        }

        .why-card-pattern {
          background-image:
            radial-gradient(circle at 18% 22%, rgba(194, 169, 107, 0.22) 0, rgba(194, 169, 107, 0.22) 1.4px, transparent 1.5px),
            radial-gradient(circle at 82% 76%, rgba(58, 68, 108, 0.1) 0, rgba(58, 68, 108, 0.1) 1.2px, transparent 1.3px),
            linear-gradient(135deg, rgba(194, 169, 107, 0.12) 0, rgba(194, 169, 107, 0.12) 1px, transparent 1px, transparent 18px),
            linear-gradient(45deg, rgba(58, 68, 108, 0.06) 0, rgba(58, 68, 108, 0.06) 1px, transparent 1px, transparent 22px);
          background-size: 132px 132px, 176px 176px, 26px 26px, 30px 30px;
          background-position: center;
          opacity: 0;
          mask-image: linear-gradient(135deg, transparent 4%, rgba(0, 0, 0, 0.9) 26%, rgba(0, 0, 0, 0.92) 76%, transparent 100%);
          -webkit-mask-image: linear-gradient(135deg, transparent 4%, rgba(0, 0, 0, 0.9) 26%, rgba(0, 0, 0, 0.92) 76%, transparent 100%);
        }

        .why-hero-card {
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .why-hero-card::before,
        .why-glass-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: inherit;
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

        .group:hover .why-card-pattern {
          opacity: 0.9;
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

          .why-card-pattern {
            opacity: 0 !important;
          }

          .why-glass-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(255, 255, 255, 0.9);
          }

          .why-hero-card {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: rgba(255, 255, 255, 0.92);
          }
        }

        .why-flight-track {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .why-flight-plane {
          position: absolute;
          top: 0;
          left: 0;
          will-change: transform, opacity;
        }

        .why-flight-plane {
          width: 20px;
          height: 20px;
          display: block;
          color: rgba(98, 108, 142, 0.76);
          filter: drop-shadow(0 6px 10px rgba(28, 34, 64, 0.16));
          transform-origin: center;
          opacity: 0.8;
        }

        .why-flight-track-a .why-flight-plane {
          offset-path: path("M-80 310 C 260 120, 540 640, 980 380 C 1200 250, 1410 290, 1680 180");
          offset-rotate: auto;
        }

        .why-flight-track-b .why-flight-plane {
          offset-path: path("M20 720 C 280 570, 620 760, 920 620 C 1180 500, 1350 540, 1620 460");
          offset-rotate: auto;
        }

        .why-flight-track-a .why-flight-plane {
          animation: whyFlightPlaneA 16s linear infinite;
        }

        .why-flight-track-b .why-flight-plane {
          animation: whyFlightPlaneB 22s linear infinite 1.8s;
        }

        @keyframes whyFlightPlaneA {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 0.8; }
          92% { opacity: 0.8; }
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
