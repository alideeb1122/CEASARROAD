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

interface StatItemProps {
  stat: Stat;
  active: boolean;
  duration: number;
}

function StatItem({ stat, active, duration }: StatItemProps) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;
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

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, stat.value, duration]);

  return (
    <div className="bg-brand-section px-6 py-8 text-center">
      <p
        className="leading-none text-white"
        data-stat-value={stat.value}
        data-stat-suffix={stat.suffix}
      >
        <span
          className="text-5xl sm:text-6xl font-extrabold tracking-tight"
          style={{
            fontVariantNumeric: "lining-nums tabular-nums",
            fontFeatureSettings: '"lnum" 1, "tnum" 1',
            letterSpacing: "-0.03em",
          }}
        >
          {count.toLocaleString()}
        </span>
        <span
          className="text-3xl sm:text-4xl font-bold text-brand-cta ms-0.5"
          style={{ fontVariantNumeric: "lining-nums" }}
        >
          {stat.suffix}
        </span>
      </p>
      <p className="mt-3 text-sm sm:text-base text-brand-muted font-medium">
        {stat.label}
      </p>
    </div>
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
    <section ref={sectionRef} className="bg-brand-section section-padding-sm">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-3 bg-white/10 text-brand-cta">
            {label}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <StatItem
              key={i}
              stat={stat}
              active={active}
              duration={1800}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
