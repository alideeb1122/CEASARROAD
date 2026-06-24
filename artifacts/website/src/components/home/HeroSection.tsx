"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "./Icons";
import AnimatedWords from "./AnimatedWords";
import { withBasePath } from "@/lib/base-path";
import StatsSection, { type Stat } from "./StatsSection";

interface HeroContent {
  heroLabel: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroWhatsappCta: string;
  heroServicesCta: string;
  heroMediaLabel: string;
}

interface HeroSectionProps {
  content: HeroContent;
  locale: "ar" | "en";
  servicesHref: string;
  whatsappNumber?: string;
  statsLabel: string;
  statsTitle: string;
  stats: Stat[];
}

const reveal = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(22px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
  transitionDelay: `${delay}ms`,
});

export default function HeroSection({
  content,
  locale,
  servicesHref,
  whatsappNumber = "971501234567",
  statsLabel,
  statsTitle,
  stats,
}: HeroSectionProps) {
  const isArabic = locale === "ar";
  const videoRotationMs = 4200;
  const videoSwapDelayMs = 180;
  const heroVideos = [
    withBasePath("/videos/hero/hero-travel-5.mp4"),
    withBasePath("/videos/hero/hero-travel-2.mp4"),
    withBasePath("/videos/hero/hero-travel-6.mp4"),
    withBasePath("/videos/hero/hero-travel-4.mp4"),
    withBasePath("/videos/hero/hero-travel-7.mp4"),
  ];

  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 42 });
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(1);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const currentVisibleIndex = activeSlot === "a" ? slotAIndex : slotBIndex;
      const nextIndex = (currentVisibleIndex + 1) % heroVideos.length;

      if (activeSlot === "a") {
        setSlotBIndex(nextIndex);
      } else {
        setSlotAIndex(nextIndex);
      }

      window.setTimeout(() => {
        setActiveSlot((prev) => (prev === "a" ? "b" : "a"));
      }, videoSwapDelayMs);
    }, videoRotationMs);

    return () => window.clearInterval(intervalId);
  }, [activeSlot, heroVideos.length, slotAIndex, slotBIndex, videoRotationMs, videoSwapDelayMs]);
  return (
    <section
      data-header-theme="dark"
      className="relative overflow-hidden bg-brand-bg"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({ x, y });
      }}
      onMouseLeave={() => setPointer({ x: 50, y: 42 })}
    >
      <div className="absolute inset-0 pointer-events-none">
        <video
          key={`hero-video-a-${slotAIndex}`}
          className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${activeSlot === "a" ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={heroVideos[slotAIndex]}
          poster={withBasePath("/images/hero/hero-poster.jpg")}
        />
        <video
          key={`hero-video-b-${slotBIndex}`}
          className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${activeSlot === "b" ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src={heroVideos[slotBIndex]}
          poster={withBasePath("/images/hero/hero-poster.jpg")}
        />
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(10,16,34,0.7)_0%,rgba(17,27,58,0.62)_36%,rgba(10,17,38,0.74)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1)_0%,transparent_44%),radial-gradient(ellipse_at_88%_20%,rgba(194,169,107,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_center,rgba(10,16,31,0.2)_0%,transparent_58%)]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3A3F63_0%,_transparent_60%)] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(39,47,79,0.24)_0%,rgba(46,49,77,0)_28%,rgba(24,30,52,0.2)_100%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cta/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04)_0%,_transparent_56%)]" />
        <div className="hero-sky-glow hero-sky-glow-a absolute left-[6%] top-[10%] h-44 w-64 rounded-full bg-white/8 blur-3xl sm:h-52 sm:w-80 lg:h-64 lg:w-[28rem]" />
        <div className="hero-sky-glow hero-sky-glow-b absolute right-[8%] top-[18%] h-40 w-60 rounded-full bg-brand-cta/8 blur-3xl sm:h-48 sm:w-72 lg:h-56 lg:w-[24rem]" />
        <div className="hero-sky-glow hero-sky-glow-c absolute left-[22%] bottom-[12%] h-32 w-56 rounded-full bg-white/6 blur-3xl sm:h-40 sm:w-72 lg:h-48 lg:w-[26rem]" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-[-8%] opacity-80 transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${(pointer.x - 50) * -0.18}px, ${(pointer.y - 42) * -0.14}px) scale(1.03)`,
            background:
              "radial-gradient(34rem 18rem at 18% 22%, rgba(255,255,255,0.12), transparent 64%), radial-gradient(28rem 17rem at 82% 24%, rgba(194,169,107,0.1), transparent 68%), radial-gradient(30rem 18rem at 30% 82%, rgba(255,255,255,0.08), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-[-10%] opacity-60 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${(pointer.x - 50) * 0.12}px, ${(pointer.y - 42) * 0.1}px) scale(1.04)`,
            background:
              "linear-gradient(115deg, transparent 8%, rgba(255,255,255,0.05) 26%, transparent 44%), linear-gradient(295deg, transparent 12%, rgba(194,169,107,0.045) 36%, transparent 58%)",
          }}
        />
        <div
          className="absolute inset-x-[10%] bottom-[8%] h-28 rounded-[50%] opacity-55 blur-3xl transition-transform duration-900 ease-out"
          style={{
            transform: `translate(${(pointer.x - 50) * 0.12}px, ${(pointer.y - 42) * 0.04}px)`,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.09) 0%, rgba(194,169,107,0.06) 34%, transparent 72%)",
          }}
        />

        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${(pointer.x - 50) * -0.34}px, ${(pointer.y - 42) * -0.18}px)` }}
        >
          <div className="hero-cloud hero-cloud-a absolute left-[-8%] top-[14%] h-24 w-64 rounded-full bg-white/10 blur-2xl sm:h-28 sm:w-80 lg:h-32 lg:w-[24rem]" />
          <div className="hero-cloud hero-cloud-c absolute left-[10%] bottom-[14%] h-24 w-60 rounded-full bg-brand-cta/7 blur-2xl sm:h-28 sm:w-72 lg:h-32 lg:w-80" />
        </div>
        <div
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${(pointer.x - 50) * 0.28}px, ${(pointer.y - 42) * -0.22}px)` }}
        >
          <div className="hero-cloud hero-cloud-b absolute right-[-6%] top-[26%] h-24 w-72 rounded-full bg-white/9 blur-2xl sm:h-30 sm:w-[22rem] lg:h-32 lg:w-[26rem]" />
          <div className="hero-cloud hero-cloud-d absolute right-[12%] bottom-[10%] h-24 w-64 rounded-full bg-white/8 blur-2xl sm:h-28 sm:w-80 lg:h-32 lg:w-[24rem]" />
        </div>
        <div
          className="absolute inset-0 transition-transform duration-1200 ease-out"
          style={{ transform: `translate(${(pointer.x - 50) * 0.16}px, ${(pointer.y - 42) * 0.2}px)` }}
        >
          <div className="hero-cloud hero-cloud-e absolute left-[30%] top-[10%] h-20 w-52 rounded-full bg-white/8 blur-2xl sm:h-24 sm:w-64 lg:h-28 lg:w-72" />
          <div className="hero-cloud hero-cloud-f absolute right-[24%] bottom-[16%] h-18 w-48 rounded-full bg-brand-cta/6 blur-2xl sm:h-22 sm:w-60 lg:h-24 lg:w-64" />
        </div>

      </div>

      <div className="container-custom relative z-10 pt-19 pb-0 sm:pt-21 sm:pb-0 lg:pt-24 lg:pb-0">
        <div className="relative mx-auto w-full max-w-7xl">
          <div
            className="relative flex min-h-[42vh] w-full items-center justify-center pb-20 pt-4 sm:min-h-[52vh] sm:pb-32 sm:pt-0 lg:min-h-[58vh] lg:pb-36"
            style={reveal(mounted, 0)}
          >
            <div className="relative z-10 w-full max-w-[64rem]">
              <div className="flex flex-col items-center text-center">
                <h1
                  className={`font-extrabold tracking-[-0.04em] text-brand-cta ${
                    isArabic
                      ? "text-[2.2rem] leading-[1.06] sm:text-[2.9rem] sm:leading-[1.06] lg:text-[4.15rem] lg:leading-[1.05]"
                      : "text-[1.95rem] leading-[1.06] sm:text-[2.55rem] sm:leading-[1.08] lg:text-[3.35rem] lg:leading-[1.08]"
                  }`}
                  style={reveal(mounted, 120)}
                >
                  <AnimatedWords
                    text={content.heroTitle}
                    visible={mounted}
                    baseDelay={120}
                  />
                </h1>

                {content.heroTitleAccent ? (
                  <p
                    className={`mt-2.5 max-w-[26rem] font-semibold text-white ${
                      isArabic
                        ? "text-[0.96rem] leading-[1.12] sm:text-[1.1rem] sm:leading-[1.12] lg:text-[1.24rem] lg:leading-[1.14]"
                        : "text-[0.96rem] leading-[1.12] sm:text-[1.08rem] sm:leading-[1.12] lg:text-[1.2rem] lg:leading-[1.14]"
                    }`}
                    style={reveal(mounted, 200)}
                  >
                    <AnimatedWords
                      text={content.heroTitleAccent}
                      visible={mounted}
                      baseDelay={200}
                    />
                  </p>
                ) : null}

                {content.heroSubtitle ? (
                  <p
                    className={`mt-3 mx-auto max-w-[21rem] text-[0.98rem] leading-6 text-white sm:max-w-[34rem] sm:text-[1.05rem] sm:leading-7 lg:w-max lg:max-w-none lg:whitespace-nowrap ${
                      isArabic ? "" : ""
                    }`}
                    style={reveal(mounted, 260)}
                  >
                    <AnimatedWords
                      text={content.heroSubtitle}
                      visible={mounted}
                      baseDelay={280}
                      step={38}
                    />
                  </p>
                ) : null}

                <div
                  className="mt-6 grid w-full max-w-[34rem] grid-cols-1 gap-3 sm:mt-7 sm:grid-cols-2"
                  style={reveal(mounted, 320)}
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2.5 rounded-[1rem] bg-brand-cta px-7 py-3 text-sm font-bold text-brand-bg shadow-lg shadow-brand-cta/20 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-cta-hover hover:shadow-brand-cta/40 active:translate-y-0"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {content.heroWhatsappCta}
                  </a>
                  <Link
                    href={servicesHref}
                    className="inline-flex min-h-[3rem] w-full items-center justify-center rounded-[1rem] border border-white/24 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 active:translate-y-0"
                  >
                    {content.heroServicesCta}
                  </Link>
                </div>

                {content.heroMediaLabel ? (
                  <p
                    className="mt-3 text-sm font-medium text-white/72 sm:text-[0.95rem]"
                    style={reveal(mounted, 360)}
                  >
                    {content.heroMediaLabel}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 -mt-6 w-full px-2 sm:-mt-7 sm:px-3 lg:-mt-8 lg:px-4">
        <StatsSection
          label={statsLabel}
          title={statsTitle}
          stats={stats}
          variant="attached"
        />
      </div>

      <style>{`
        @keyframes heroCloudFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(48px, -16px, 0); }
        }

        @keyframes heroCloudFloatReverse {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-42px, 18px, 0); }
        }

        @keyframes heroGlowDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
          50% { transform: translate3d(24px, -14px, 0) scale(1.08); opacity: 0.88; }
        }

        .hero-cloud-a,
        .hero-cloud-c,
        .hero-cloud-e {
          animation: heroCloudFloat 14s ease-in-out infinite;
        }

        .hero-cloud-b,
        .hero-cloud-d,
        .hero-cloud-f {
          animation: heroCloudFloatReverse 18s ease-in-out infinite;
        }

        .hero-sky-glow-a,
        .hero-sky-glow-c {
          animation: heroGlowDrift 16s ease-in-out infinite;
        }

        .hero-sky-glow-b {
          animation: heroGlowDrift 20s ease-in-out infinite reverse;
        }

        @media (max-width: 640px) {
          .hero-cloud-a,
          .hero-cloud-b,
          .hero-cloud-c,
          .hero-cloud-d,
          .hero-cloud-e,
          .hero-cloud-f {
            opacity: 0.82;
            filter: blur(24px);
          }
        }

        @media (max-width: 1024px) {
          .hero-cloud-a,
          .hero-cloud-b,
          .hero-cloud-c,
          .hero-cloud-d,
          .hero-cloud-e,
          .hero-cloud-f {
            opacity: 0.74;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-cloud-a,
          .hero-cloud-b,
          .hero-cloud-c,
          .hero-cloud-d,
          .hero-sky-glow-a,
          .hero-sky-glow-b,
          .hero-sky-glow-c {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
