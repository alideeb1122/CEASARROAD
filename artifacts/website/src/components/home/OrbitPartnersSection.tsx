"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AwardIcon, Building2Icon, PassportIcon, PlaneIcon } from "./Icons";
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

interface SectionStat {
  value: string;
  title: string;
  detail: string;
}

interface DisplayStat extends SectionStat {
  target: number;
}

interface SectionCopy {
  label: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  description: string;
  cta: string;
  hubLabel: string;
  highlights: string[];
  stats: SectionStat[];
}

const AIRLINES: Airline[] = [
  { name: "Emirates", logo: "/images/airlines/emirates.svg", scale: 0.62 },
  { name: "Lufthansa", logo: "/images/airlines/lufthansa.svg", scale: 0.58 },
  { name: "Qatar Airways", logo: "/images/airlines/qatarairways.svg", scale: 0.6 },
  { name: "British Airways", logo: "/images/airlines/britishairways.svg", scale: 0.58 },
  { name: "Saudia", logo: "/images/airlines/saudia.svg", scale: 0.61 },
  { name: "Air France", logo: "/images/airlines/airfrance.svg", scale: 0.57 },
  { name: "Singapore Airlines", logo: "/images/airlines/singaporeairlines.svg", scale: 0.58 },
  { name: "Turkish Airlines", logo: "/images/airlines/turkishairlines.svg", scale: 0.65 },
  { name: "KLM", logo: "/images/airlines/klm.svg", scale: 0.59 },
  { name: "Etihad Airways", logo: "/images/airlines/etihadairways.svg", scale: 0.56 },
  { name: "Delta", logo: "/images/airlines/delta.svg", scale: 0.59 },
  { name: "Air Canada", logo: "/images/airlines/aircanada.svg", scale: 0.55 },
  { name: "Oman Air", logo: "/images/airlines/omanair.svg", scale: 0.54 },
  { name: "United", logo: "/images/airlines/united.svg", scale: 0.55 },
];

const NODE_ANCHORS: NodeAnchor[] = [
  { key: "left-top-outer", x: 88, y: 112, delay: 0 },
  { key: "left-top-far", x: 210, y: 176, delay: 90 },
  { key: "left-top-near", x: 356, y: 176, delay: 180 },
  { key: "left-bottom-outer", x: 88, y: 460, delay: 260 },
  { key: "left-bottom-far", x: 210, y: 396, delay: 350 },
  { key: "left-bottom-near", x: 356, y: 396, delay: 440 },
  { key: "right-top-near", x: 844, y: 176, delay: 120 },
  { key: "right-top-far", x: 990, y: 176, delay: 210 },
  { key: "right-top-outer", x: 1112, y: 112, delay: 300 },
  { key: "right-bottom-near", x: 844, y: 396, delay: 390 },
  { key: "right-bottom-far", x: 990, y: 396, delay: 480 },
  { key: "right-bottom-outer", x: 1112, y: 460, delay: 570 },
];

const MOBILE_NODE_ANCHORS: NodeAnchor[] = [
  { key: "left-top", x: 188, y: 160, delay: 0 },
  { key: "left-mid", x: 224, y: 260, delay: 110 },
  { key: "left-bottom", x: 188, y: 360, delay: 220 },
  { key: "right-top", x: 1012, y: 160, delay: 80 },
  { key: "right-mid", x: 976, y: 260, delay: 190 },
  { key: "right-bottom", x: 1012, y: 360, delay: 300 },
];

const BRANCH_PATHS = [
  "M600 286 C520 286 494 176 428 176 L356 176",
  "M356 176 L210 176",
  "M210 176 C166 176 148 144 116 124 L88 112",
  "M600 286 C520 286 494 396 428 396 L356 396",
  "M356 396 L210 396",
  "M210 396 C166 396 148 428 116 448 L88 460",
  "M600 286 C680 286 706 176 772 176 L844 176",
  "M844 176 L990 176",
  "M990 176 C1034 176 1052 144 1084 124 L1112 112",
  "M600 286 C680 286 706 396 772 396 L844 396",
  "M844 396 L990 396",
  "M990 396 C1034 396 1052 428 1084 448 L1112 460",
  "M486 286 L554 286",
  "M646 286 L714 286",
];

const MOBILE_BRANCH_PATHS = [
  "M600 286 C494 286 446 188 332 176 L188 160",
  "M600 286 L390 286 L224 260",
  "M600 286 C494 286 446 384 332 376 L188 360",
  "M600 286 C706 286 754 188 868 176 L1012 160",
  "M600 286 L810 286 L976 260",
  "M600 286 C706 286 754 384 868 376 L1012 360",
  "M488 286 L554 286",
  "M646 286 L712 286",
];

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 560;
const ROTATE_INTERVAL_MS = 7200;
const SWAP_DURATION_MS = 1800;
const BACKGROUND_IMAGE_SRC = withBasePath("/images/argo-b2b-section-background-replacement.png");
const AMADEUS_LOGO_SRC = withBasePath("/images/integrations/amadeus-crs-logo.png");
const GALILEO_LOGO_SRC = withBasePath("/images/integrations/galileo-travelport.png");

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function parseStatValue(value: string): number {
  return Number(value.replace(/[^\d]/g, ""));
}

function formatCount(value: number): string {
  return value.toLocaleString("en-US");
}

const SECTION_COPY: Record<"ar" | "en", SectionCopy> = {
  en: {
    label: "B2B Aviation Distribution Platform",
    titlePrefix: "Argo Fly connects airlines with booking businesses through one operational",
    titleAccent: "B2B",
    titleSuffix: "network.",
    description:
      "A distribution and booking platform built for agencies, OTAs, and travel businesses that need wider airline access, clearer pricing, and faster booking execution.",
    cta: "Explore Argo Fly",
    hubLabel: "",
    highlights: [
      "Global airline distribution and booking infrastructure",
      "Real-time inventory, pricing intelligence, and booking workflows",
      "Amadeus and Galileo connectivity for broader market access",
    ],
    stats: [
      {
        value: "400+",
        title: "Airlines",
        detail: "Full-service and hybrid carriers",
      },
      {
        value: "150+",
        title: "Low-Cost Carriers",
        detail: "LCC and ULCC partners worldwide",
      },
      {
        value: "1,600+",
        title: "Booking Companies",
        detail: "Agencies and OTAs",
      },
      {
        value: "2,100+",
        title: "Daily Bookings",
        detail: "Passenger bookings per day",
      },
    ] satisfies SectionStat[],
  },
  ar: {
    label: "منصة B2B لتوزيع الطيران",
    titlePrefix: "Argo Fly منصة",
    titleAccent: "B2B",
    titleSuffix: "تربط مكاتب السفر مع أهم شركات الطيران",
    description:
      "بنية توزيع وحجز تربط شركات الطيران والناقلات الاقتصادية بشركاء الحجز عبر اتصال مباشر وتشغيل أسرع.",
    cta: "اكتشف Argo Fly",
    hubLabel: "",
    highlights: [
      "توزيع جوي عالمي وبنية حجز موحدة",
      "مخزون فوري، تسعير أوضح، وتدفق حجز أسرع",
      "تكامل مهم مع Amadeus و Galileo لتوسيع الوصول",
    ],
    stats: [
      {
        value: "400+",
        title: "شركة طيران",
        detail: "ناقلات كاملة الخدمة وناقلات هجينة",
      },
      {
        value: "150+",
        title: "ناقلة اقتصادية",
        detail: "شركات LCC و ULCC حول العالم",
      },
      {
        value: "1,600+",
        title: "شركة حجز",
        detail: "وكالات سفر ومنصات OTA",
      },
      {
        value: "2,100+",
        title: "حجز يومي",
        detail: "حجوزات مسافرين يومياً",
      },
    ] satisfies SectionStat[],
  },
} as const;

export default function OrbitPartnersSection({
  locale = "en",
}: OrbitPartnersSectionProps) {
  const { ref, visible } = useReveal(0.18);
  const isArabic = locale === "ar";
  const copy = SECTION_COPY[isArabic ? "ar" : "en"];
  const stats = useMemo<DisplayStat[]>(
    () =>
      copy.stats.map((stat) => ({
        ...stat,
        target: parseStatValue(stat.value),
      })),
    [copy.stats],
  );
  const featuredIntegration = copy.highlights[2];
  const supportingHighlights = copy.highlights.slice(0, 2);
  const [displayOffset, setDisplayOffset] = useState(0);
  const [previewOffset, setPreviewOffset] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [hasActivatedStats, setHasActivatedStats] = useState(false);
  const [statCounts, setStatCounts] = useState(() => stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    setHasActivatedStats(false);
    setStatCounts(stats.map(() => 0));
  }, [stats]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el || hasActivatedStats) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasActivatedStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasActivatedStats]);

  useEffect(() => {
    if (!hasActivatedStats) return;

    if (prefersReducedMotion) {
      setStatCounts(stats.map((stat) => stat.target));
      return;
    }

    let rafId = 0;
    let startTime = 0;
    const duration = 1700;
    const delays = stats.map((_, index) => index * 110);
    const maxDelay = delays[delays.length - 1] ?? 0;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      setStatCounts(
        stats.map((stat, index) => {
          const progress = Math.min(Math.max((elapsed - delays[index]) / duration, 0), 1);
          return Math.round(easeOutCubic(progress) * stat.target);
        }),
      );

      if (elapsed < duration + maxDelay) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setStatCounts(stats.map((stat) => stat.target));
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [hasActivatedStats, prefersReducedMotion, stats]);

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

  const statIconByTitle = useMemo<Record<string, typeof PlaneIcon>>(
    () => ({
      Airlines: PlaneIcon,
      "شركة طيران": PlaneIcon,
      "Low-Cost Carriers": AwardIcon,
      "ناقلة اقتصادية": AwardIcon,
      "Booking Companies": Building2Icon,
      "شركة حجز": Building2Icon,
      "Daily Bookings": PassportIcon,
      "حجز يومي": PassportIcon,
    }),
    [],
  );

  return (
    <section
      id="integrations"
      ref={ref}
      className="relative overflow-hidden border-y border-slate-200/80 bg-[#eef4fb]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={BACKGROUND_IMAGE_SRC}
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(74,136,220,0.12)_0%,rgba(255,255,255,0.12)_28%,rgba(59,122,210,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.1)_100%)]" />
      </div>

      <div className="container-custom relative py-16 lg:py-20">
        <div
          className="mx-auto max-w-[88rem]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="mx-auto w-full max-w-[88rem] text-center">
            <h3 className="orbit-title mx-auto flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl lg:flex-nowrap lg:text-[2.52rem] lg:leading-[1.04] xl:text-[2.92rem]">
              <span>{copy.titlePrefix}</span>
              <span className="orbit-title-accent">{copy.titleAccent}</span>
              <span>{copy.titleSuffix}</span>
            </h3>
            <p className="mx-auto mt-5 max-w-[54rem] text-base leading-8 text-slate-600 md:text-[17px] lg:text-[1.08rem]">
              {copy.description}
            </p>
            <div className="orbit-top-zone">
              <div className="mt-6 flex justify-center">
              <div className="integration-capsule">
                <div className="integration-copy">
                  <span className="integration-kicker">
                    {isArabic ? "تكاملات التوزيع" : "Distribution Integrations"}
                  </span>
                  <p className="integration-text">{featuredIntegration}</p>
                </div>
                <div className="integration-brands" aria-label="Amadeus and Galileo integrations">
                  <Image
                    src={AMADEUS_LOGO_SRC}
                    alt="Amadeus"
                    width={132}
                    height={28}
                    className="integration-logo integration-logo-amadeus"
                  />
                  <span className="integration-divider" aria-hidden="true" />
                  <Image
                    src={GALILEO_LOGO_SRC}
                    alt="Galileo"
                    width={118}
                    height={28}
                    className="integration-logo integration-logo-galileo"
                  />
                </div>
              </div>
              </div>
              <div className="orbit-highlight-zone">
                <div className="mx-auto mt-5 grid max-w-[54rem] gap-3 sm:grid-cols-2">
              {supportingHighlights.map((highlight) => (
                <span key={highlight} className="highlight-chip">
                  {highlight}
                </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div ref={statsRef} className="orbit-stats-zone mx-auto mt-10 grid max-w-[82rem] gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {stats.map((stat, index) => {
              const Icon = statIconByTitle[stat.title] ?? PlaneIcon;
              return (
              <div
                key={stat.title}
                className={`stat-panel ${isArabic ? "stat-panel-ar" : "stat-panel-en"}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${120 + index * 90}ms`,
                }}
              >
                <div className="stat-heading">
                  <span className="stat-icon-shell">
                    <Icon className="stat-icon" />
                  </span>
                  <span className="stat-title">{stat.title}</span>
                </div>
                <p className="stat-detail">{stat.detail}</p>
                <span className="stat-value">
                  <span className="stat-value-prefix">+</span>
                  <span className="stat-value-number">{formatCount(statCounts[index] ?? 0)}</span>
                </span>
              </div>
            )})}
          </div>

          <div className="orbit-cta-zone mt-11 flex justify-center">
            <Link
              href="https://b2b.argo-fly.com/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="argo-cta group inline-flex w-full max-w-[380px] items-center justify-center rounded-full px-14 py-4 text-[1.02rem] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="argo-cta-glow" aria-hidden="true" />
              <span className="argo-cta-sheen" aria-hidden="true" />
              <span className="argo-cta-label">{copy.cta}</span>
            </Link>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="graph-wrap">
              <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className="branch-svg" aria-hidden="true">
                <defs>
                  <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(151, 183, 229, 0.18)" />
                    <stop offset="44%" stopColor="rgba(90, 149, 222, 0.54)" />
                    <stop offset="57%" stopColor="rgba(226, 189, 67, 0.52)" />
                    <stop offset="100%" stopColor="rgba(151, 183, 229, 0.16)" />
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
                      style={{ ["--path-delay" as string]: `${240 + index * 90}ms` }}
                    />
                  </g>
                ))}
              </svg>

              <div className={`argo-core ${visible ? "is-visible" : ""}`}>
                <div className="argo-orbit-ring argo-orbit-ring-a" />
                <div className="argo-orbit-ring argo-orbit-ring-b" />
                <div className="argo-pulse argo-pulse-a" />
                <div className="argo-pulse argo-pulse-b" />
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
      </div>

      <style>{`
        .orbit-top-zone {
          width: min(100%, 44rem);
          margin: 1.5rem auto 0;
        }

        .orbit-highlight-zone {
          width: 100%;
        }

        .orbit-stats-zone {
          width: min(100%, 86rem);
        }

        .orbit-cta-zone {
          width: min(100%, 40rem);
          margin-inline: auto;
        }

        .stat-panel {
          border-radius: 24px;
          border: 1px solid rgba(168, 191, 226, 0.4);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.88) 0%, rgba(244, 248, 253, 0.8) 100%);
          min-height: 148px;
          padding: 1.05rem 1.62rem;
          box-shadow:
            0 16px 32px -28px rgba(33, 66, 118, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
          transition:
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.6s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .stat-panel-en {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(7.6rem, 8.8rem);
          grid-template-areas:
            "heading value"
            "detail value";
          align-items: start;
          direction: ltr;
          column-gap: 1.35rem;
          row-gap: 0.7rem;
        }

        .stat-panel-ar {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          grid-template-areas:
            "value heading heading"
            "value detail detail";
          align-items: center;
          direction: rtl;
          column-gap: 1.2rem;
          row-gap: 0.7rem;
        }

        .stat-panel:hover {
          transform: translateY(-2px);
          border-color: rgba(102, 148, 214, 0.58);
          box-shadow:
            0 18px 38px -30px rgba(33, 66, 118, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.78);
        }

        .stat-panel-en .stat-value {
          grid-area: value;
          min-width: 0;
          align-self: center;
          text-align: end;
          display: inline-flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 0.08em;
          font-size: clamp(2.15rem, 2.65vw, 2.9rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #123763;
          font-variant-numeric: tabular-nums;
          unicode-bidi: isolate;
        }

        .stat-panel-ar .stat-value {
          grid-area: value;
          min-width: 6.9rem;
          align-self: center;
          text-align: start;
          display: inline-flex;
          align-items: baseline;
          justify-content: flex-start;
          gap: 0.08em;
          font-size: clamp(2.15rem, 2.65vw, 2.9rem);
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #123763;
          font-variant-numeric: tabular-nums;
          unicode-bidi: isolate;
        }

        .stat-value-prefix,
        .stat-value-number {
          direction: ltr;
        }

        .stat-value-prefix {
          font-size: 0.86em;
        }

        .stat-value-number {
          display: inline-block;
        }

        .stat-panel-en .stat-heading {
          grid-area: heading;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr);
          align-items: center;
          gap: 0.82rem;
          min-width: 0;
          direction: ${isArabic ? "rtl" : "ltr"};
        }

        .stat-panel-ar .stat-heading {
          grid-area: heading;
          display: flex;
          align-items: center;
          gap: 0.82rem;
          flex-direction: row-reverse;
          justify-content: flex-start;
          min-width: 0;
          direction: rtl;
        }

        .stat-icon-shell {
          display: inline-flex;
          height: 2.7rem;
          width: 2.7rem;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(141, 177, 229, 0.42);
          background: linear-gradient(180deg, rgba(244, 249, 255, 0.98) 0%, rgba(229, 239, 251, 0.92) 100%);
          color: #3979cf;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .stat-icon {
          height: 1.26rem;
          width: 1.26rem;
          stroke-width: 1.9;
        }

        .stat-title {
          display: block;
          min-width: 0;
          flex: 1 1 auto;
          font-size: 1.08rem;
          font-weight: 600;
          color: #0f172a;
          unicode-bidi: plaintext;
          line-height: 1.34;
        }

        .stat-panel-en .stat-detail {
          grid-area: detail;
          margin: 0;
          font-size: 0.84rem;
          line-height: 1.52;
          color: #516174;
          unicode-bidi: plaintext;
          min-width: 0;
          text-align: start;
          direction: ${isArabic ? "rtl" : "ltr"};
        }

        .stat-panel-ar .stat-detail {
          grid-area: detail;
          margin: 0;
          font-size: 0.84rem;
          line-height: 1.52;
          color: #516174;
          unicode-bidi: plaintext;
          min-width: 0;
          text-align: right;
          direction: rtl;
        }

        .argo-cta {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(42, 106, 196, 0.64);
          background:
            linear-gradient(180deg, #3d89ea 0%, #2b6fd1 100%);
          box-shadow:
            0 24px 40px -24px rgba(28, 82, 166, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.24),
            inset 0 -12px 22px -16px rgba(13, 58, 128, 0.34);
          letter-spacing: -0.01em;
        }

        .argo-cta-glow,
        .argo-cta-sheen {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .argo-cta-glow {
          background:
            radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.24) 0%, transparent 34%),
            radial-gradient(circle at 82% 82%, rgba(173, 212, 255, 0.2) 0%, transparent 40%);
          opacity: 1;
        }

        .argo-cta-sheen {
          inset-inline-start: -32%;
          width: 42%;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.34) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-24deg);
          opacity: 0;
          transition: transform 0.55s ease, opacity 0.35s ease;
        }

        .argo-cta:hover {
          box-shadow:
            0 30px 54px -24px rgba(27, 78, 156, 0.58),
            inset 0 1px 0 rgba(255, 255, 255, 0.28),
            inset 0 -14px 24px -16px rgba(14, 52, 113, 0.38);
          background:
            linear-gradient(180deg, #4693f1 0%, #2f75d6 100%);
        }

        .argo-cta:hover .argo-cta-sheen {
          opacity: 0.72;
          transform: translateX(240%) skewX(-24deg);
        }

        .argo-cta-label {
          position: relative;
          z-index: 1;
        }

        .highlight-chip {
          display: inline-flex;
          width: 100%;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(132, 167, 220, 0.36);
          background: rgba(255, 255, 255, 0.66);
          padding: 0.75rem 1rem;
          text-align: center;
          font-size: 0.86rem;
          line-height: 1.65;
          color: #35506f;
          box-shadow: 0 18px 30px -28px rgba(34, 65, 116, 0.28);
        }

        .orbit-title {
          line-height: 1.16;
        }

        .orbit-title-accent {
          display: inline-block;
          color: #2f74d2;
          font-size: 1.14em;
          font-weight: 700;
          line-height: inherit;
          vertical-align: baseline;
        }

        .integration-capsule {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1.15rem;
          width: 100%;
          max-width: min(100%, 44rem);
          border-radius: 999px;
          border: 1px solid rgba(130, 167, 221, 0.34);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 249, 255, 0.84) 100%);
          padding: 0.9rem 1rem 0.9rem 1.25rem;
          box-shadow:
            0 22px 38px -30px rgba(29, 64, 118, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.78);
        }

        .integration-copy {
          display: grid;
          gap: 0.2rem;
          min-width: 0;
          text-align: ${isArabic ? "right" : "left"};
        }

        .integration-kicker {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(46, 95, 168, 0.74);
        }

        .integration-text {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.7;
          color: #23405f;
        }

        .integration-brands {
          display: inline-flex;
          align-items: center;
          gap: 0.72rem;
          flex-shrink: 0;
          border-radius: 999px;
          border: 1px solid rgba(169, 192, 228, 0.38);
          background: rgba(255, 255, 255, 0.82);
          padding: 0.52rem 0.8rem;
        }

        .integration-divider {
          width: 1px;
          height: 1.2rem;
          background: linear-gradient(180deg, rgba(150, 178, 220, 0.12) 0%, rgba(126, 160, 214, 0.72) 50%, rgba(150, 178, 220, 0.12) 100%);
        }

        .integration-logo {
          display: block;
          width: auto;
          object-fit: contain;
          filter: saturate(0.96) contrast(1.02);
        }

        .integration-logo-amadeus {
          height: 0.92rem;
        }

        .integration-logo-galileo {
          height: 0.88rem;
        }

        .graph-wrap {
          position: relative;
          width: min(100%, 1180px);
          height: clamp(420px, 46vw, 560px);
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
          filter: drop-shadow(0 0 10px rgba(109, 165, 234, 0.12));
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
          top: 51%;
          z-index: 3;
          width: 220px;
          height: 220px;
          transform: translate(-50%, -50%) scale(0.94);
          opacity: 0;
          border-radius: 999px;
          display: grid;
          place-items: center;
          padding: 1rem;
          text-align: center;
          background:
            radial-gradient(circle at 50% 44%, rgba(255, 255, 255, 0.97) 0%, rgba(242, 247, 255, 0.94) 48%, rgba(229, 238, 249, 0.82) 74%, rgba(231, 190, 58, 0.12) 100%);
          box-shadow:
            0 30px 60px -30px rgba(33, 60, 108, 0.28),
            inset 0 0 0 1px rgba(139, 171, 221, 0.24);
          transition:
            opacity 700ms ease,
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .argo-core.is-visible {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .argo-orbit-ring,
        .argo-pulse {
          position: absolute;
          border-radius: 999px;
        }

        .argo-orbit-ring {
          inset: 14px;
          border: 1px solid rgba(127, 167, 227, 0.18);
          animation: orbitRingFloat 8.5s ease-in-out infinite;
        }

        .argo-orbit-ring-b {
          inset: 28px;
          border-color: rgba(235, 203, 83, 0.24);
          animation-duration: 11s;
          animation-direction: reverse;
        }

        .argo-pulse {
          inset: -18px;
          border: 1px solid rgba(132, 176, 236, 0.16);
          animation: pulseOrbit 6.8s ease-out infinite;
        }

        .argo-pulse-b {
          inset: -34px;
          border-color: rgba(234, 196, 74, 0.16);
          animation-delay: 1.9s;
        }

        .argo-logo-image {
          width: 76%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 24px rgba(38, 120, 210, 0.12));
        }

        .airline-node {
          position: absolute;
          z-index: 2;
          width: 102px;
          height: 102px;
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
          inset: 8px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.995) 0%, rgba(249, 252, 255, 0.96) 64%, rgba(233, 242, 252, 0.92) 100%);
          box-shadow:
            0 18px 34px -22px rgba(24, 57, 109, 0.34),
            inset 0 0 0 1px rgba(139, 171, 221, 0.28);
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
          width: 72%;
          height: 72%;
          object-fit: contain;
          filter:
            drop-shadow(0 8px 14px rgba(15, 23, 42, 0.1))
            drop-shadow(0 0 1px rgba(15, 23, 42, 0.12));
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

        @keyframes pulseOrbit {
          0% {
            transform: scale(0.96);
            opacity: 0;
          }
          18% {
            opacity: 0.5;
          }
          100% {
            transform: scale(1.14);
            opacity: 0;
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
            height: 474px;
          }

          .argo-core {
            top: 51%;
            width: 194px;
            height: 194px;
          }

          .argo-logo-image {
            width: 76%;
          }

          .airline-node {
            width: 90px;
            height: 90px;
          }
        }

        @media (max-width: 768px) {
          .orbit-top-zone,
          .orbit-stats-zone,
          .orbit-cta-zone {
            width: 100%;
          }

          .orbit-title {
            line-height: 1.18;
          }

          .orbit-title-accent {
            font-size: 1.1em;
          }

          .integration-capsule {
            width: 100%;
            border-radius: 28px;
            padding: 1rem;
          }

          .stat-panel {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: start;
            min-height: 132px;
            gap: 0.78rem 1rem;
            padding: 0.95rem 1rem;
          }

          .stat-value {
            min-width: 4.8rem;
            align-self: center;
            font-size: 1.72rem;
          }

          .stat-icon-shell {
            height: 2.3rem;
            width: 2.3rem;
          }

          .stat-icon {
            height: 1.06rem;
            width: 1.06rem;
          }

          .stat-copy {
            gap: 0.34rem;
          }

          .stat-heading {
            gap: 0.62rem;
          }

          .stat-title {
            font-size: 1rem;
          }

          .stat-detail {
            font-size: 0.78rem;
            line-height: 1.45;
          }

          .argo-cta {
            width: min(100%, 320px);
            padding: 0.92rem 2.4rem;
          }

          .graph-wrap {
            height: 340px;
          }

          .branch-path {
            stroke-width: 2.8;
          }

          .branch-flow {
            stroke-width: 2.2;
          }

          .argo-core {
            top: 50%;
            width: 138px;
            height: 138px;
            padding: 0.72rem;
          }

          .argo-logo-image {
            width: 78%;
          }

          .airline-node {
            width: 60px;
            height: 60px;
          }
        }

        @media (max-width: 560px) {
          .integration-capsule {
            display: grid;
            justify-items: center;
            gap: 0.85rem;
            text-align: center;
          }

          .integration-copy {
            text-align: center;
          }

          .integration-text {
            font-size: 0.9rem;
            line-height: 1.65;
          }

          .integration-brands {
            gap: 0.75rem;
            padding: 0.54rem 0.8rem;
          }

          .integration-logo-amadeus {
            height: 0.82rem;
          }

          .integration-logo-galileo {
            height: 0.8rem;
          }

          .stat-panel {
            min-height: 122px;
            gap: 0.7rem 0.88rem;
            padding: 0.88rem 0.88rem;
          }

          .stat-value {
            min-width: 4.3rem;
            font-size: 1.54rem;
          }

          .stat-icon-shell {
            height: 2rem;
            width: 2rem;
          }

          .stat-icon {
            height: 0.94rem;
            width: 0.94rem;
          }

          .stat-title {
            font-size: 0.9rem;
          }

          .stat-detail {
            font-size: 0.74rem;
            line-height: 1.4;
          }

          .argo-cta {
            width: min(100%, 280px);
            padding: 0.88rem 1.8rem;
            font-size: 0.95rem;
          }

          .graph-wrap {
            width: min(98vw, 560px);
            height: 292px;
          }

          .argo-core {
            top: 50%;
            width: 118px;
            height: 118px;
          }

          .argo-logo-image {
            width: 80%;
          }

          .airline-node {
            width: 52px;
            height: 52px;
          }

          .airline-node::before {
            inset: 5px;
            background:
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.995) 0%, rgba(249, 252, 255, 0.96) 58%, rgba(233, 242, 252, 0.92) 100%);
            box-shadow:
              0 18px 28px -20px rgba(29, 58, 110, 0.34),
              inset 0 0 0 1px rgba(129, 150, 189, 0.24);
          }

          .airline-logo {
            width: 76%;
            height: 76%;
            filter:
              drop-shadow(0 8px 14px rgba(15, 23, 42, 0.14))
              drop-shadow(0 0 1px rgba(15, 23, 42, 0.2));
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
          .argo-pulse,
          .argo-core,
          .airline-node {
            animation: none !important;
          }

          .airline-layer,
          .airline-logo,
          .stat-panel {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
