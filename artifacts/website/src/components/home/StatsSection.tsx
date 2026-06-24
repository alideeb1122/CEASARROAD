"use client";

import { useEffect, useRef, useState } from "react";
import { Building2Icon, ClockIcon, GlobeIcon, UserCheckIcon } from "./Icons";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  label: string;
  title: string;
  stats: Stat[];
  variant?: "section" | "attached";
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatStatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface StatItemProps {
  stat: Stat;
  index: number;
  active: boolean;
  duration: number;
  delay: number;
  variant?: "section" | "attached";
}

function getStatIcon(index: number) {
  switch (index) {
    case 0:
      return ClockIcon;
    case 1:
      return Building2Icon;
    case 2:
      return UserCheckIcon;
    default:
      return GlobeIcon;
  }
}

function StatItem({
  stat,
  index,
  active,
  duration,
  delay,
  variant = "section",
}: StatItemProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);
  const Icon = getStatIcon(index);
  const isAttached = variant === "attached";

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const timer = setTimeout(() => {
      setStarted(true);
      startTimeRef.current = null;

      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        setCount(Math.round(eased * stat.value));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, stat.value, duration, delay]);

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center ${
        isAttached
          ? "min-h-[104px] px-3 py-3 sm:min-h-[118px] sm:px-5 sm:py-5"
          : "min-h-[108px] px-4 py-4 sm:min-h-[118px] sm:px-5 sm:py-5"
      } lg:min-h-[124px] lg:px-6`}
    >
      <div
        className="relative"
        style={{
          opacity: 1,
          transform: started ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <p data-stat-value={stat.value} data-stat-suffix={stat.suffix} className="leading-none">
          <span
            className="text-[1.9rem] font-extrabold tracking-tight text-brand-cta sm:text-[2.2rem] lg:text-[2.35rem]"
            style={{
              fontVariantNumeric: "lining-nums tabular-nums",
              fontFeatureSettings: '"lnum" 1, "tnum" 1',
              letterSpacing: "-0.03em",
            }}
          >
            {formatStatNumber(count)}
          </span>
          <span
            className="ms-0.5 text-[1.2rem] font-bold text-brand-cta sm:text-[1.35rem] lg:text-[1.45rem]"
            style={{ fontVariantNumeric: "lining-nums" }}
          >
            {stat.suffix}
          </span>
        </p>
      </div>

      <div
        className={`relative mt-2.5 text-white ${
          isAttached
            ? "flex flex-col items-center justify-center gap-1.5 sm:inline-flex sm:flex-row sm:gap-2"
            : "inline-flex items-center justify-center gap-2"
        }`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-brand-cta/10 text-brand-cta shadow-[0_10px_22px_-18px_rgba(201,168,76,0.5)]">
          <Icon className="h-[0.95rem] w-[0.95rem]" />
        </span>
        <p
          className={`text-[0.82rem] font-medium text-white drop-shadow-[0_1px_10px_rgba(10,16,31,0.42)] sm:text-[0.9rem] lg:text-[0.95rem] ${
            isAttached ? "leading-4 sm:leading-5" : "leading-5"
          }`}
        >
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default function StatsSection({
  label,
  title,
  stats,
  variant = "section",
}: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);
  const isAttached = variant === "attached";

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (isAttached) {
    return (
      <section ref={sectionRef} data-header-theme="dark" className="relative">
        <div className="relative mx-auto w-full max-w-none overflow-hidden rounded-t-[2rem] border border-white/24 border-b-0 bg-[linear-gradient(180deg,rgba(27,34,63,0.24)_0%,rgba(11,18,39,0.34)_100%)] shadow-[0_-24px_70px_-30px_rgba(8,12,28,0.62)] backdrop-blur-[42px] supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(27,34,63,0.18)_0%,rgba(11,18,39,0.25)_100%)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.07)_18%,rgba(255,255,255,0.03)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_34%),radial-gradient(circle_at_82%_0%,rgba(201,168,76,0.14)_0%,rgba(201,168,76,0)_40%)]" />
          <div className="pointer-events-none absolute inset-0 backdrop-blur-[42px] [mask-image:linear-gradient(180deg,rgba(0,0,0,0.96),rgba(0,0,0,0.9))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.48)_50%,rgba(255,255,255,0)_100%)]" />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="relative">
                {i > 0 ? (
                  <div className="pointer-events-none absolute inset-y-7 start-0 hidden w-px bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_30%,rgba(201,168,76,0.28)_50%,rgba(255,255,255,0.18)_70%,rgba(255,255,255,0)_100%)] lg:block" />
                ) : null}
                {i % 2 === 0 ? (
                  <div className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_50%,rgba(255,255,255,0)_100%)] lg:hidden" />
                ) : null}
                <StatItem stat={stat} index={i} active={active} duration={1800} delay={i * 180} variant="attached" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f8f5ee_0%,#ffffff_100%)] py-4 sm:py-5 lg:py-6"
    >
      <div className="pointer-events-none absolute left-[10%] top-0 h-32 w-32 rounded-full bg-brand-cta/10 blur-3xl sm:h-40 sm:w-40" />
      <div className="pointer-events-none absolute right-[12%] top-6 h-36 w-36 rounded-full bg-brand-bg/8 blur-3xl sm:h-44 sm:w-44" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_100%)]" />

      <div className="container-custom">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative text-center">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-[2rem]">{title}</h2>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-3 sm:mt-3 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#e8dfcb] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,245,238,0.94)_100%)] px-4 py-4 text-center shadow-[0_24px_55px_-36px_rgba(22,30,54,0.38)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-cta/45 hover:shadow-[0_28px_65px_-34px_rgba(22,30,54,0.44)] sm:px-5 sm:py-5"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.14)_0%,rgba(201,168,76,0)_58%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-cta/45 to-transparent opacity-90" />
                <StatItem stat={stat} index={i} active={active} duration={1800} delay={i * 200} variant="section" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
