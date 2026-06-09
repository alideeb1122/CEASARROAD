"use client";

import { useState } from "react";
import { ChevronRightIcon } from "@/components/home/Icons";
import { withBasePath } from "@/lib/base-path";

type CarouselItem = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

interface AboutServicesCarouselProps {
  label: string;
  title: string;
  subtitle: string;
  items: CarouselItem[];
  locale: "ar" | "en";
}

export default function AboutServicesCarousel({
  label,
  title,
  subtitle,
  items,
  locale,
}: AboutServicesCarouselProps) {
  const [active, setActive] = useState(0);
  const total = items.length;
  const isArabic = locale === "ar";

  if (!total) return null;

  const ring = [0, 1, 2, 3, 4].map((offset) => items[(active + offset - 2 + total) % total]);

  const prev = () => setActive((current) => (current - 1 + total) % total);
  const next = () => setActive((current) => (current + 1) % total);

  const positions = [
    { x: -450, y: 78, scale: 0.84, rotate: -10, opacity: 0.28, blur: 9, z: 5 },
    { x: -225, y: 32, scale: 0.93, rotate: -5, opacity: 0.62, blur: 4, z: 10 },
    { x: 0, y: 0, scale: 1.12, rotate: 0, opacity: 1, blur: 0, z: 20 },
    { x: 225, y: 32, scale: 0.93, rotate: 5, opacity: 0.62, blur: 4, z: 10 },
    { x: 450, y: 78, scale: 0.84, rotate: 10, opacity: 0.28, blur: 9, z: 5 },
  ];

  return (
    <section data-header-theme="light" className="relative overflow-hidden bg-[#eef1f4] section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),transparent_42%),radial-gradient(circle_at_50%_70%,rgba(194,169,107,0.14),transparent_30%)]" />
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-brand-cta">{label}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary">
            {title}
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-8 text-text-muted">{subtitle}</p>
        </div>

        <div className="relative mt-14 flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            className="absolute start-0 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-cta/35 hover:text-brand-bg"
            aria-label={isArabic ? "السابق" : "Previous"}
          >
            <ChevronRightIcon className={`h-5 w-5 ${isArabic ? "rotate-180" : "rotate-180"}`} />
          </button>

          <div className="relative h-[500px] w-full max-w-[1280px]">
            {ring.map((item, index) => {
              const pos = positions[index];
              return (
                <button
                  key={`${item.title}-${index}`}
                  type="button"
                  onClick={() => setActive((active + index - 2 + total) % total)}
                  className="absolute left-1/2 top-1/2 h-[455px] w-[330px] overflow-hidden rounded-[30px] bg-white shadow-[0_30px_70px_-34px_rgba(18,28,49,0.32)] transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${pos.scale}) rotate(${pos.rotate}deg)`,
                    opacity: pos.opacity,
                    zIndex: pos.z,
                    filter: `blur(${pos.blur}px)`,
                  }}
                >
                  <img src={withBasePath(item.image)} alt={item.imageAlt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,12,20,0.06),rgba(9,12,20,0.14)_35%,rgba(9,12,20,0.72)_86%)]" />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute end-0 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand-cta/35 hover:text-brand-bg"
            aria-label={isArabic ? "التالي" : "Next"}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === active ? "w-8 bg-brand-bg" : "w-2.5 bg-slate-300 hover:bg-slate-500"}`}
              aria-label={isArabic ? `انتقل إلى ${index + 1}` : `Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
