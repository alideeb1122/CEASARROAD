"use client";

import { useEffect, useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import { useReveal } from "./useReveal";

interface Testimonial {
  name: string;
  text: string;
  context: string;
  gender?: "male" | "female";
}

interface TestimonialsSectionProps {
  label: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
}

function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

function pickVisual(context: string, index: number): string {
  const normalized = context.toLowerCase();
  if (normalized.includes("dubai") || normalized.includes("دبي")) return "/images/branches-dubai.jpg";
  if (normalized.includes("erbil") || normalized.includes("أربيل")) return "/images/branches-erbil.jpg";
  if (normalized.includes("homs") || normalized.includes("حمص")) return "/images/branches-homs.jpg";
  return ["/images/branches-dubai.jpg", "/images/branches-erbil.jpg", "/images/branches-homs.jpg"][index % 3];
}

function pickAvatar(name: string, index: number, gender?: "male" | "female"): string {
  if (gender === "male") return "/images/testimonial-avatar-mohamed.jpg";
  if (gender === "female") return "/images/testimonial-avatar-nour.jpg";
  const normalized = name.toLowerCase();
  if (normalized.includes("mohamed") || normalized.includes("mohammad") || normalized.includes("محمد")) {
    return "/images/testimonial-avatar-mohamed.jpg";
  }
  if (normalized.includes("nour") || normalized.includes("نور")) {
    return "/images/testimonial-avatar-nour.jpg";
  }
  if (normalized.includes("reem") || normalized.includes("ريم")) {
    return "/images/testimonial-avatar-reem.jpg";
  }
  return [
    "/images/testimonial-avatar-mohamed.jpg",
    "/images/testimonial-avatar-nour.jpg",
    "/images/testimonial-avatar-reem.jpg",
  ][index % 3];
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

export default function TestimonialsSection({
  label,
  title,
  subtitle,
  testimonials,
}: TestimonialsSectionProps) {
  const { ref, visible } = useReveal(0.1);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const isArabic = isArabicText(title);
  const total = testimonials.length;

  const items = useMemo(
    () =>
      testimonials.map((t, i) => ({
        ...t,
        image: pickVisual(t.context, i),
        avatar: pickAvatar(t.name, i, t.gender),
      })),
    [testimonials]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(() => setActive((prev) => (prev + 1) % total), 5200);
    return () => clearInterval(timer);
  }, [paused, total]);

  const prev = () => setActive((v) => (v - 1 + total) % total);
  const next = () => setActive((v) => (v + 1) % total);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f8fb_0%,#f3f4f7_100%)] section-padding"
    >
      <div className="pointer-events-none absolute left-[6%] top-10 h-64 w-64 rounded-full bg-brand-cta/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] bottom-8 h-72 w-72 rounded-full bg-brand-bg/10 blur-3xl" />

      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div
          className="mx-auto mt-6 grid max-w-[1180px] grid-cols-1 items-stretch gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.6s, 0.6s",
            transitionTimingFunction: "ease, ease",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_24px_52px_-32px_rgba(15,23,42,0.35)] sm:p-8">
            <h3 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h3>

            <div className="mt-7 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition-all duration-200 hover:border-brand-cta/60 hover:bg-brand-bg hover:text-brand-cta"
                aria-label={isArabic ? "السابق" : "Previous"}
              >
                <ArrowIcon dir={isArabic ? "right" : "left"} />
              </button>

              <div className="relative h-[185px] w-[185px] overflow-hidden rounded-full border-[5px] border-brand-cta shadow-[0_14px_28px_-12px_rgba(15,23,42,0.35)]">
                {items.map((item, i) => (
                  <img
                    key={`av-${item.name}-${i}`}
                    src={item.avatar}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? "scale(1)" : "scale(1.08)",
                    }}
                    aria-hidden={i !== active}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/20 to-transparent" />
              </div>

              <button
                type="button"
                onClick={next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 transition-all duration-200 hover:border-brand-cta/60 hover:bg-brand-bg hover:text-brand-cta"
                aria-label={isArabic ? "التالي" : "Next"}
              >
                <ArrowIcon dir={isArabic ? "left" : "right"} />
              </button>
            </div>

            <div className="relative mt-7 min-h-[230px]">
              {items.map((item, i) => (
                <article
                  key={`${item.name}-${i}`}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "translateX(0)" : isArabic ? "translateX(-14px)" : "translateX(14px)",
                    pointerEvents: i === active ? "auto" : "none",
                  }}
                  aria-hidden={i !== active}
                >
                  <p className="text-[18px] leading-9 text-slate-700">"{item.text}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-xl font-bold tracking-[0.08em] text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.context}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={isArabic ? `اذهب للرأي ${i + 1}` : `Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-brand-cta" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_24px_52px_-32px_rgba(15,23,42,0.35)]">
            {items.map((item, i) => (
              <div
                key={`${item.image}-${i}`}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.06)",
                }}
                aria-hidden={i !== active}
              >
                <img src={item.image} alt={item.context} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/75 via-brand-bg/15 to-transparent" />
              </div>
            ))}
            <div className="relative z-10 flex h-full min-h-[430px] items-end p-6">
              <div className="rounded-xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-cta">
                  {isArabic ? "تجربة عميل" : "Client Story"}
                </p>
                <p className="mt-1 text-lg font-bold text-white">{items[active]?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
