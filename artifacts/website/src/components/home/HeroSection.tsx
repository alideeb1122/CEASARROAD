"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "./Icons";
import AnimatedWords from "./AnimatedWords";

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
}: HeroSectionProps) {
  const heroVideos = [
    "/videos/hero/hero-travel.mp4",
    "/videos/hero/hero-travel-2.mp4",
    "/videos/hero/hero-travel-3.mp4",
  ];

  const [mounted, setMounted] = useState(false);
  const [pointer, setPointer] = useState({ x: 50, y: 42 });
  const [wordIndex, setWordIndex] = useState(0);
  const [slotAIndex, setSlotAIndex] = useState(0);
  const [slotBIndex, setSlotBIndex] = useState(1);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % 4);
    }, 3200);

    return () => window.clearInterval(intervalId);
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
      }, 260);
    }, 11200);

    return () => window.clearInterval(intervalId);
  }, [activeSlot, heroVideos.length, slotAIndex, slotBIndex]);

  const rotatingWords =
    locale === "ar"
      ? ["العالم", "وجهتك", "رحلتك", "آفاقك"]
      : ["World", "Destination", "Journey", "Horizons"];

  const staticTitle =
    locale === "ar" ? content.heroTitle.replace(/\s+\S+$/, "") : "Your Gateway to the";

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
          className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${activeSlot === "a" ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/hero-poster.jpg"
        >
          <source src={heroVideos[slotAIndex]} type="video/mp4" />
        </video>
        <video
          className={`hero-video absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${activeSlot === "b" ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero/hero-poster.jpg"
        >
          <source src={heroVideos[slotBIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(13,18,38,0.58)_0%,rgba(20,30,66,0.52)_36%,rgba(13,20,46,0.64)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12)_0%,transparent_48%),radial-gradient(ellipse_at_88%_20%,rgba(194,169,107,0.18)_0%,transparent_54%)]" />
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
          className="absolute inset-0 opacity-70 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${(pointer.x - 50) * 0.08}px, ${(pointer.y - 42) * 0.08}px)`,
          }}
        >
          <div className="absolute inset-x-[12%] top-[20%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
          <div className="absolute inset-x-[20%] top-[34%] h-px bg-gradient-to-r from-transparent via-brand-cta/16 to-transparent" />
          <div className="absolute inset-x-[16%] bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
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

        <div className="absolute inset-x-0 top-[14%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-[18%] top-[32%] h-px bg-gradient-to-r from-transparent via-brand-cta/12 to-transparent" />
      </div>

      <div className="container-custom relative z-10 py-14 sm:py-16 lg:py-20">
        <div
          className="mx-auto flex min-h-[64vh] max-w-4xl flex-col items-center justify-center pt-2 text-center sm:min-h-[70vh] sm:pt-4 lg:min-h-[78vh] lg:-translate-y-6"
          style={reveal(mounted, 0)}
        >
          <h1 className="max-w-[5.7em] text-4xl font-extrabold leading-[1.3] tracking-[-0.035em] text-white sm:text-5xl lg:text-[5.25rem]">
            <span className="block">
              <AnimatedWords text={staticTitle} visible={mounted} baseDelay={120} />
            </span>
            <span className="mt-5 inline-flex h-[1.24em] items-start overflow-hidden align-top sm:mt-6">
              <span
                className="flex flex-col transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateY(-${wordIndex * 1.24}em)` }}
              >
                {rotatingWords.map((word) => (
                  <span
                    key={word}
                    className="flex h-[1.24em] items-center justify-center pb-[0.06em] text-brand-cta"
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          <p
            className="mt-7 max-w-3xl text-2xl font-semibold leading-[1.4] text-brand-cta sm:mt-8 sm:text-3xl lg:text-[3rem]"
            style={reveal(mounted, 200)}
          >
            <AnimatedWords text={content.heroTitleAccent} visible={mounted} baseDelay={200} />
          </p>

          <p
            className="mt-9 max-w-[48rem] text-base leading-8 text-brand-muted sm:mt-10 sm:text-lg sm:leading-9 lg:mt-12 lg:text-[1.18rem]"
            style={reveal(mounted, 280)}
          >
            <AnimatedWords text={content.heroSubtitle} visible={mounted} baseDelay={300} step={38} />
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-center sm:gap-5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[17rem] items-center justify-center gap-2.5 rounded-xl bg-brand-cta px-8 py-4 text-sm font-bold text-brand-bg shadow-lg shadow-brand-cta/20 transition-all duration-200 hover:-translate-y-1 hover:bg-brand-cta-hover hover:shadow-brand-cta/40 active:translate-y-0 sm:text-base"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {content.heroWhatsappCta}
            </a>
            <Link
              href={servicesHref}
              className="inline-flex min-w-[14rem] items-center justify-center rounded-xl border-2 border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 active:translate-y-0 sm:text-base"
            >
              {content.heroServicesCta}
            </Link>
          </div>

          <p
            className="mt-12 text-sm font-medium text-brand-muted/90 sm:mt-14 sm:text-base"
            style={reveal(mounted, 180)}
          >
            {content.heroMediaLabel}
          </p>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />

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
