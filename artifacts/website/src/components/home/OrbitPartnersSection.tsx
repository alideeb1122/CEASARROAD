"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useReveal } from "./useReveal";
import { withBasePath } from "@/lib/base-path";

interface OrbitPartnersSectionProps {
  locale?: "ar" | "en";
}

interface Airline {
  name: string;
  logo: string;
  scale: number;
}

interface NodeAnchor {
  key: string;
  x: number;
  y: number;
  delay: number;
}

const AIRLINES: Airline[] = [
  { name: "Emirates", logo: "/images/airlines/emirates.svg", scale: 0.62 },
  { name: "Qatar Airways", logo: "/images/airlines/qatarairways.svg", scale: 0.6 },
  { name: "Turkish Airlines", logo: "/images/airlines/turkishairlines.svg", scale: 0.65 },
  { name: "Lufthansa", logo: "/images/airlines/lufthansa.svg", scale: 0.58 },
  { name: "Etihad Airways", logo: "/images/airlines/etihadairways.svg", scale: 0.56 },
  { name: "Pegasus", logo: "/images/airlines/pegasusairlines.svg", scale: 0.56 },
  { name: "Saudia", logo: "/images/airlines/saudia.svg", scale: 0.61 },
  { name: "Oman Air", logo: "/images/airlines/omanair.svg", scale: 0.54 },
  { name: "Air France", logo: "/images/airlines/airfrance.svg", scale: 0.57 },
  { name: "KLM", logo: "/images/airlines/klm.svg", scale: 0.59 },
  { name: "Delta", logo: "/images/airlines/delta.svg", scale: 0.59 },
  { name: "United", logo: "/images/airlines/united.svg", scale: 0.55 },
];

const NODE_ANCHORS: NodeAnchor[] = [
  { key: "left-top-far", x: 118, y: 120, delay: 0 },
  { key: "left-top-near", x: 270, y: 120, delay: 120 },
  { key: "left-bottom-far", x: 118, y: 356, delay: 220 },
  { key: "left-bottom-near", x: 270, y: 356, delay: 340 },
  { key: "right-top-near", x: 930, y: 120, delay: 80 },
  { key: "right-top-far", x: 1082, y: 120, delay: 180 },
  { key: "right-bottom-near", x: 930, y: 356, delay: 280 },
  { key: "right-bottom-far", x: 1082, y: 356, delay: 380 },
];

const MOBILE_NODE_ANCHORS: NodeAnchor[] = [
  { key: "left-top", x: 150, y: 150, delay: 0 },
  { key: "left-middle", x: 150, y: 244, delay: 120 },
  { key: "left-bottom", x: 150, y: 338, delay: 220 },
  { key: "right-top", x: 1050, y: 150, delay: 80 },
  { key: "right-middle", x: 1050, y: 244, delay: 180 },
  { key: "right-bottom", x: 1050, y: 338, delay: 280 },
];

const BRANCH_PATHS = [
  "M600 232 C520 232 486 120 390 120 L318 120",
  "M600 232 C520 232 486 356 390 356 L318 356",
  "M318 120 L165 120",
  "M318 356 L165 356",
  "M600 232 C680 232 714 120 810 120 L882 120",
  "M600 232 C680 232 714 356 810 356 L882 356",
  "M882 120 L1035 120",
  "M882 356 L1035 356",
  "M470 232 L554 232",
  "M646 232 L730 232",
  "M165 120 L118 120",
  "M165 356 L118 356",
  "M1035 120 L1082 120",
  "M1035 356 L1082 356",
];

const MOBILE_BRANCH_PATHS = [
  "M600 232 C504 232 470 150 336 150 L150 150",
  "M600 232 L336 232 L150 232",
  "M600 232 C504 232 470 338 336 338 L150 338",
  "M600 232 C696 232 730 150 864 150 L1050 150",
  "M600 232 L864 232 L1050 232",
  "M600 232 C696 232 730 338 864 338 L1050 338",
  "M470 232 L554 232",
  "M646 232 L730 232",
];

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 560;
const ROTATE_INTERVAL_MS = 7200;
const SWAP_DURATION_MS = 1800;

export default function OrbitPartnersSection({
  locale = "en",
}: OrbitPartnersSectionProps) {
  const { ref, visible } = useReveal(0.18);
  const isArabic = locale === "ar";
  const [displayOffset, setDisplayOffset] = useState(0);
  const [previewOffset, setPreviewOffset] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayoutQuery = window.matchMedia("(max-width: 640px)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    const syncCompactLayout = () => setIsCompactLayout(compactLayoutQuery.matches);

    syncPreference();
    syncCompactLayout();
    mediaQuery.addEventListener("change", syncPreference);
    compactLayoutQuery.addEventListener("change", syncCompactLayout);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
      compactLayoutQuery.removeEventListener("change", syncCompactLayout);
    };
  }, []);

  const activeAnchors = isCompactLayout ? MOBILE_NODE_ANCHORS : NODE_ANCHORS;
  const activeBranchPaths = isCompactLayout ? MOBILE_BRANCH_PATHS : BRANCH_PATHS;

  useEffect(() => {
    if (prefersReducedMotion) return;

    let commitTimeout: number | undefined;
    const rotationTimeout = window.setTimeout(() => {
      const nextOffset = (displayOffset + 1) % AIRLINES.length;
      setPreviewOffset(nextOffset);
      setIsSwapping(true);

      commitTimeout = window.setTimeout(() => {
        setDisplayOffset(nextOffset);
        setPreviewOffset(null);
        setIsSwapping(false);
      }, SWAP_DURATION_MS);
    }, ROTATE_INTERVAL_MS);

    return () => {
      window.clearTimeout(rotationTimeout);
      if (commitTimeout !== undefined) {
        window.clearTimeout(commitTimeout);
      }
    };
  }, [displayOffset, prefersReducedMotion]);

  const currentNodes = useMemo(
    () =>
      activeAnchors.map((anchor, index) => ({
        anchor,
        airline: AIRLINES[(displayOffset + index) % AIRLINES.length],
      })),
    [activeAnchors, displayOffset],
  );

  const incomingNodes = useMemo(() => {
    const nextOffset = previewOffset ?? displayOffset;

    return activeAnchors.map((anchor, index) => ({
      anchor,
      airline: AIRLINES[(nextOffset + index) % AIRLINES.length],
    }));
  }, [activeAnchors, displayOffset, previewOffset]);

  return (
    <section
      id="integrations"
      ref={ref}
      className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,#fbfdff_0%,#f2f6fb_48%,#edf3f9_100%)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_46%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(49,111,214,0.06)_0%,transparent_24%),radial-gradient(circle_at_84%_22%,rgba(235,193,33,0.07)_0%,transparent_24%)]" />
      </div>

      <div className="container-custom relative py-16 lg:py-20">
        <div
          className="mx-auto max-w-3xl text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <span className="inline-flex items-center rounded-full border border-[#2f74d2]/15 bg-[#2f74d2]/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2f74d2]">
            {isArabic ? "منصة الحجز الذكية" : "Smart Booking Platform"}
          </span>
          <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {isArabic ? "Argo Fly، ابتكار من القيصر يعيد تعريف حجز تذاكر الطيران بسرعة ومرونة أعلى" : "Argo Fly, Caesar Road's flight booking platform"}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            {isArabic
              ? "Argo Fly هي منصة متخصصة بحجز تذاكر الطيران، طورتها شركة القيصر لتمنح الوكلاء والشركات تجربة أسرع، أوضح، وأكثر كفاءة في الوصول إلى الرحلات والأسعار وإدارة الحجوزات من واجهة واحدة حديثة."
              : "Argo Fly is a flight booking platform developed by Caesar Road to give agencies and businesses a faster, clearer, and more efficient way to access flights, fares, and booking workflows from one modern interface."}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-[15px]">
            {isArabic ? (
              <>
                منصة مصممة لتختصر وقت الحجز، توسع خياراتك، وتربطك بسلاسة مع عالم السفر الرقمي.{" "}
                <Link
                  href="https://b2b.argo-fly.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2f74d2] transition-colors hover:text-[#1d5fb6]"
                >
                  اكتشف Argo Fly
                </Link>
              </>
            ) : (
              <>
                Built to reduce booking time, expand your options, and connect you smoothly to modern travel operations.{" "}
                <Link
                  href="https://b2b.argo-fly.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#2f74d2] transition-colors hover:text-[#1d5fb6]"
                >
                  Discover Argo Fly
                </Link>
              </>
            )}
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="graph-wrap">
            <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="branch-svg" aria-hidden="true">
              <defs>
                <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(149, 180, 228, 0.14)" />
                  <stop offset="45%" stopColor="rgba(109, 165, 234, 0.48)" />
                  <stop offset="55%" stopColor="rgba(232, 203, 94, 0.42)" />
                  <stop offset="100%" stopColor="rgba(149, 180, 228, 0.14)" />
                </linearGradient>
              </defs>

              {activeBranchPaths.map((path, index) => (
                <g key={path}>
                  <path
                    d={path}
                    pathLength={1}
                    className={`branch-path ${visible ? "is-visible" : ""}`}
                    style={{ ["--path-delay" as string]: `${120 + index * 90}ms` }}
                  />
                  <path
                    d={path}
                    pathLength={1}
                    className={`branch-flow ${visible ? "is-visible" : ""}`}
                    style={{ ["--path-delay" as string]: `${220 + index * 90}ms` }}
                  />
                </g>
              ))}
            </svg>

            <div className={`argo-core ${visible ? "is-visible" : ""}`}>
              <div className="argo-orbit-ring argo-orbit-ring-a" />
              <div className="argo-orbit-ring argo-orbit-ring-b" />
              <Image
                src={withBasePath("/images/partners/csr-logo.png")}
                alt="Argo Fly"
                width={560}
                height={220}
                className="argo-logo-image"
                priority
              />
            </div>

            {currentNodes.map(({ anchor, airline }, index) => {
              const incomingAirline = incomingNodes[index].airline;

              return (
                <div
                  key={anchor.key}
                  className={`airline-node ${isSwapping && !prefersReducedMotion ? "is-swapping" : ""}`}
                  style={{
                    left: `${(anchor.x / VIEWBOX_WIDTH) * 100}%`,
                    top: `${(anchor.y / VIEWBOX_HEIGHT) * 100}%`,
                    ["--node-delay" as string]: `${anchor.delay}ms`,
                  }}
                >
                  <div className="airline-layer airline-layer-current">
                    <Image
                      src={withBasePath(airline.logo)}
                      alt={airline.name}
                      width={168}
                      height={168}
                      className={`airline-logo ${
                        isSwapping && !prefersReducedMotion ? "airline-logo-out" : "airline-logo-in"
                      }`}
                      style={{ ["--logo-scale" as string]: `${airline.scale}` }}
                    />
                  </div>

                  <div className="airline-layer airline-layer-next">
                    <Image
                      src={withBasePath(incomingAirline.logo)}
                      alt={incomingAirline.name}
                      width={168}
                      height={168}
                      className={`airline-logo ${
                        isSwapping && !prefersReducedMotion ? "airline-logo-next-in" : "airline-logo-next-out"
                      }`}
                      style={{ ["--logo-scale" as string]: `${incomingAirline.scale}` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .graph-wrap {
          position: relative;
          width: min(96vw, 1180px);
          height: clamp(360px, 42vw, 500px);
        }

        .branch-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .branch-path {
          fill: none;
          stroke: url(#branchGradient);
          stroke-width: 3.6;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          filter: drop-shadow(0 0 8px rgba(109, 165, 234, 0.12));
        }

        .branch-path.is-visible {
          animation: drawBranch 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--path-delay);
        }

        .branch-flow {
          fill: none;
          stroke: rgba(255, 255, 255, 0);
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke-dasharray: 0.12 0.88;
          stroke-dashoffset: 1;
          opacity: 0;
        }

        .branch-flow.is-visible {
          opacity: 0.95;
          animation:
            drawBranch 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards,
            branchWater 3.8s linear infinite;
          animation-delay: var(--path-delay), calc(var(--path-delay) + 900ms);
        }

        .argo-core {
          position: absolute;
          left: 50%;
          top: 41.5%;
          z-index: 3;
          width: 236px;
          height: 236px;
          transform: translate(-50%, -50%) scale(0.94);
          opacity: 0;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.92) 0%, rgba(245, 249, 255, 0.84) 58%, rgba(233, 241, 251, 0.42) 100%);
          box-shadow:
            0 26px 54px -28px rgba(33, 60, 108, 0.24),
            inset 0 0 0 1px rgba(139, 171, 221, 0.26);
          backdrop-filter: blur(6px);
          transition:
            opacity 700ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .argo-core.is-visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .argo-orbit-ring {
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(127, 167, 227, 0.16);
          border-radius: 999px;
          animation: orbitRingFloat 8.5s ease-in-out infinite;
        }

        .argo-orbit-ring-b {
          inset: 28px;
          border-color: rgba(235, 203, 83, 0.22);
          animation-duration: 11s;
          animation-direction: reverse;
        }

        .argo-logo-image {
          width: 72%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 24px rgba(38, 120, 210, 0.12));
        }

        .airline-node {
          position: absolute;
          z-index: 2;
          width: 94px;
          height: 94px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          display: grid;
          place-items: center;
          animation: nodeDrift 7s ease-in-out infinite;
          animation-delay: var(--node-delay);
        }

        .airline-node::before {
          content: "";
          position: absolute;
          inset: 10px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.97) 0%, rgba(255, 255, 255, 0.84) 60%, rgba(255, 255, 255, 0.06) 82%, rgba(255, 255, 255, 0) 100%);
          box-shadow:
            0 14px 24px -22px rgba(29, 58, 110, 0.18),
            inset 0 0 0 1px rgba(148, 163, 184, 0.14);
        }

        .airline-layer {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          transition: opacity ${SWAP_DURATION_MS}ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .airline-layer-current {
          opacity: 1;
        }

        .airline-layer-next {
          opacity: 0;
        }

        .airline-node.is-swapping .airline-layer-current {
          opacity: 0;
          transition-duration: 650ms;
        }

        .airline-node.is-swapping .airline-layer-next {
          opacity: 1;
          transition-delay: 420ms;
          transition-duration: 900ms;
        }

        .airline-logo {
          position: relative;
          z-index: 1;
          width: 70%;
          height: 70%;
          object-fit: contain;
          filter:
            drop-shadow(0 6px 10px rgba(15, 23, 42, 0.08))
            drop-shadow(0 0 1px rgba(15, 23, 42, 0.1));
          transition:
            opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        .airline-logo-in,
        .airline-logo-out,
        .airline-logo-next-in,
        .airline-logo-next-out {
          transform: scale(var(--logo-scale, 0.62));
        }

        .airline-logo-in,
        .airline-logo-next-in {
          opacity: 1;
        }

        .airline-logo-out,
        .airline-logo-next-out {
          opacity: 0;
        }

        @keyframes drawBranch {
          0% {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }

        @keyframes branchWater {
          0% {
            stroke: rgba(124, 176, 239, 0);
            stroke-dashoffset: 1;
          }
          20% {
            stroke: rgba(124, 176, 239, 0.92);
          }
          55% {
            stroke: rgba(232, 203, 94, 0.82);
          }
          100% {
            stroke: rgba(124, 176, 239, 0);
            stroke-dashoffset: 0;
          }
        }

        @keyframes orbitRingFloat {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.72;
          }
          50% {
            transform: scale(1.035) rotate(4deg);
            opacity: 1;
          }
        }

        @keyframes nodeDrift {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-6px);
          }
        }

        @media (max-width: 1024px) {
          .graph-wrap {
            height: 430px;
          }

          .argo-core {
            width: 208px;
            height: 208px;
          }

          .argo-logo-image {
            width: 70%;
          }

          .airline-node {
            width: 86px;
            height: 86px;
          }
        }

        @media (max-width: 768px) {
          .graph-wrap {
            height: 360px;
          }

          .branch-path {
            stroke-width: 2.8;
          }

          .branch-flow {
            stroke-width: 2.2;
          }

          .argo-core {
            top: 46%;
            width: 156px;
            height: 156px;
          }

          .argo-logo-image {
            width: 72%;
          }

          .airline-node {
            width: 62px;
            height: 62px;
          }
        }

        @media (max-width: 560px) {
          .graph-wrap {
            width: min(98vw, 560px);
            height: 332px;
          }

          .argo-core {
            top: 46%;
            width: 134px;
            height: 134px;
          }

          .argo-logo-image {
            width: 70%;
          }

          .airline-node {
            width: 52px;
            height: 52px;
          }

          .airline-node::before {
            inset: 6px;
            background:
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 58%, rgba(255, 255, 255, 0.18) 82%, rgba(255, 255, 255, 0) 100%);
            box-shadow:
              0 16px 26px -20px rgba(29, 58, 110, 0.26),
              inset 0 0 0 1px rgba(129, 150, 189, 0.2);
          }

          .airline-logo {
            width: 74%;
            height: 74%;
            filter:
              drop-shadow(0 8px 14px rgba(15, 23, 42, 0.12))
              drop-shadow(0 0 1px rgba(15, 23, 42, 0.18));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .branch-path,
          .branch-flow {
            opacity: 1;
            stroke-dashoffset: 0;
            animation: none !important;
          }

          .argo-orbit-ring,
          .argo-core,
          .airline-node {
            animation: none !important;
          }

          .airline-layer,
          .airline-logo {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
