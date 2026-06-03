"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface StatsSectionProps {
  label: string;
  title: string;
  stats: Stat[];
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatStatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface StatItemProps {
  stat: Stat;
  active: boolean;
  duration: number;
  delay: number;
}

function StatItem({ stat, active, duration, delay }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);

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
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] px-5 py-6 text-center shadow-[0_18px_40px_-28px_rgba(0,0,0,0.65)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-cta/45 hover:shadow-[0_26px_50px_-28px_rgba(0,0,0,0.7)] sm:px-6 sm:py-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.24)_0%,rgba(201,168,76,0)_58%)] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand-cta/60 to-transparent opacity-80" />

      <div
        className="relative"
        style={{
          opacity: started ? 1 : 0,
          transform: started ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <p
          data-stat-value={stat.value}
          data-stat-suffix={stat.suffix}
          className="leading-none"
        >
          <span
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-cta"
            style={{
              fontVariantNumeric: "lining-nums tabular-nums",
              fontFeatureSettings: '"lnum" 1, "tnum" 1',
              letterSpacing: "-0.03em",
            }}
          >
            {formatStatNumber(count)}
          </span>
          <span
            className="text-2xl sm:text-3xl font-bold text-brand-cta ms-0.5"
            style={{ fontVariantNumeric: "lining-nums" }}
          >
            {stat.suffix}
          </span>
        </p>

        <div
          style={{
            height: "2px",
            background: "var(--color-brand-cta, #C9A84C)",
            borderRadius: "9999px",
            width: "2.2rem",
            margin: "0.65rem auto 0",
            transform: started ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 0.6s ease 0.2s",
            transformOrigin: "center",
          }}
        />
      </div>

      <p className="relative mt-3 text-sm sm:text-base text-brand-muted font-medium">
        {stat.label}
      </p>
    </article>
  );
}

export default function StatsSection({ label, title, stats }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#3f466f_0%,#3a426a_100%)] section-padding-sm"
    >
      <div className="pointer-events-none absolute left-[6%] top-8 h-48 w-48 rounded-full bg-brand-cta/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-8 h-56 w-56 rounded-full bg-brand-bg/16 blur-3xl" />

      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-brand-cta">
            {label}
          </span>
          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              active={active}
              duration={1800}
              delay={i * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
