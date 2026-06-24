"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import { ChevronRightIcon } from "@/components/home/Icons";
import { withBasePath } from "@/lib/base-path";

type CarouselItem = {
  title: string;
  subtitle: string;
  href?: string;
  eyebrow?: string;
  cta?: string;
  icon?: string;
  highlights?: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
};

interface AboutServicesCarouselProps {
  label: string;
  title: string;
  subtitle: string;
  items: CarouselItem[];
  locale: "ar" | "en";
  variant?: "default" | "compact";
}

type CardPosition = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  blur: number;
  z: number;
};

function getPositions(isCompact: boolean, isMobile: boolean): CardPosition[] {
  if (isMobile) {
    return [
      { x: -162, y: 28, scale: 0.8, rotate: -5, opacity: 0.14, blur: 3.4, z: 3 },
      { x: -88, y: 8, scale: 0.9, rotate: -2.8, opacity: 0.54, blur: 0.55, z: 9 },
      { x: 0, y: -6, scale: 0.97, rotate: 0, opacity: 1, blur: 0, z: 20 },
      { x: 88, y: 8, scale: 0.9, rotate: 2.8, opacity: 0.54, blur: 0.55, z: 9 },
      { x: 162, y: 28, scale: 0.8, rotate: 5, opacity: 0.14, blur: 3.4, z: 3 },
    ];
  }

  if (isCompact) {
    return [
      { x: -418, y: 62, scale: 0.74, rotate: -5.2, opacity: 0.12, blur: 5, z: 3 },
      { x: -234, y: 18, scale: 0.9, rotate: -2.6, opacity: 0.68, blur: 0.8, z: 10 },
      { x: 0, y: -12, scale: 1.03, rotate: 0, opacity: 1, blur: 0, z: 20 },
      { x: 234, y: 18, scale: 0.9, rotate: 2.6, opacity: 0.68, blur: 0.8, z: 10 },
      { x: 418, y: 62, scale: 0.74, rotate: 5.2, opacity: 0.12, blur: 5, z: 3 },
    ];
  }

  return [
    { x: -510, y: 76, scale: 0.72, rotate: -5.4, opacity: 0.12, blur: 5.2, z: 3 },
    { x: -276, y: 22, scale: 0.9, rotate: -2.6, opacity: 0.7, blur: 0.8, z: 10 },
    { x: 0, y: -14, scale: 1.05, rotate: 0, opacity: 1, blur: 0, z: 20 },
    { x: 276, y: 22, scale: 0.9, rotate: 2.6, opacity: 0.7, blur: 0.8, z: 10 },
    { x: 510, y: 76, scale: 0.72, rotate: 5.4, opacity: 0.12, blur: 5.2, z: 3 },
  ];
}

export default function AboutServicesCarousel({
  label: _label,
  title,
  subtitle,
  items,
  locale,
  variant = "default",
}: AboutServicesCarouselProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const total = items.length;
  const isArabic = locale === "ar";
  const isCompact = variant === "compact";
  const minSwipeDistance = 42;

  if (!total) return null;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !isInView || total <= 1) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isInView, paused, total]);

  const positions = getPositions(isCompact, isMobile);

  const getCardPosition = (index: number): CardPosition | null => {
    if (index === active) return positions[2];
    if (index === (active + 1) % total) return positions[3];
    if (index === (active - 1 + total) % total) return positions[1];
    if (index === (active + 2) % total) return positions[4];
    if (index === (active - 2 + total) % total) return positions[0];
    return null;
  };

  const resolveImageSrc = (src?: string) => {
    if (!src) return null;
    return src.startsWith("http://") || src.startsWith("https://") ? src : withBasePath(src);
  };

  const prev = () => setActive((current) => (current - 1 + total) % total);
  const next = () => setActive((current) => (current + 1) % total);

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.targetTouches[0]?.clientX ?? null);
    setTouchEnd(null);
  };

  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.targetTouches[0]?.clientX ?? null);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) next();
    if (distance < -minSwipeDistance) prev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const sectionClassName = isCompact ? "pb-20 pt-14 lg:pb-24 lg:pt-16" : "pb-24 pt-16 lg:pb-28 lg:pt-20";
  const headingWrapClassName = isCompact ? "max-w-5xl" : "max-w-6xl";
  const titleClassName = isCompact
    ? "text-[1.7rem] font-extrabold tracking-tight text-text-primary sm:text-[2.05rem] lg:text-[2.65rem]"
    : "text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-[4rem]";
  const subtitleClassName = isCompact
    ? "mt-6 text-sm leading-7 text-text-muted sm:text-base"
    : "mt-7 text-base leading-8 text-text-muted sm:text-lg";
  const controlClassName = isCompact
    ? "absolute top-1/2 z-30 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/85 bg-white/92 text-slate-600 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.34)] transition duration-300 hover:border-brand-cta/40 hover:text-brand-bg"
    : "absolute top-1/2 z-30 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/85 bg-white/92 text-slate-600 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.34)] transition duration-300 hover:border-brand-cta/40 hover:text-brand-bg";
  const stageClassName = isMobile
    ? "relative h-[392px] w-full max-w-[372px]"
    : isCompact
      ? "relative h-[430px] w-full max-w-[1120px]"
      : "relative h-[520px] w-full max-w-[1320px]";
  const cardClassName = isMobile
    ? "absolute left-1/2 top-1/2 h-[286px] w-[204px] overflow-hidden rounded-[28px] border border-[#efe4d1] bg-[#fbf6ee] shadow-[0_24px_54px_-32px_rgba(18,28,49,0.34)] transition-[transform,opacity,filter,box-shadow,border-color] duration-[520ms] ease-[cubic-bezier(0.22,0.84,0.24,1)] will-change-transform"
    : isCompact
      ? "absolute left-1/2 top-1/2 h-[380px] w-[288px] overflow-hidden rounded-[32px] border border-[#efe4d1] bg-[#fbf6ee] shadow-[0_28px_62px_-34px_rgba(18,28,49,0.36)] transition-[transform,opacity,filter,box-shadow,border-color] duration-[720ms] ease-[cubic-bezier(0.22,0.84,0.24,1)] will-change-transform"
      : "absolute left-1/2 top-1/2 h-[470px] w-[340px] overflow-hidden rounded-[34px] border border-[#efe4d1] bg-[#fbf6ee] shadow-[0_28px_70px_-34px_rgba(18,28,49,0.36)] transition-[transform,opacity,filter,box-shadow,border-color] duration-[720ms] ease-[cubic-bezier(0.22,0.84,0.24,1)] will-change-transform";

  return (
    <section
      ref={sectionRef}
      data-header-theme="light"
      className={`relative overflow-hidden bg-[#eef2f6] ${sectionClassName}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_36%),radial-gradient(circle_at_50%_72%,rgba(205,177,112,0.14),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-[8%] bottom-10 h-24 rounded-full bg-[radial-gradient(circle,rgba(15,23,42,0.14),transparent_68%)] blur-3xl" />

      <div className="container-custom relative z-10">
        <div className={`mx-auto text-center ${headingWrapClassName}`}>
          <h2 className={titleClassName}>{title}</h2>
          <p className={subtitleClassName}>{subtitle}</p>
        </div>

        <div
          className={isCompact ? "relative mt-10 flex items-center justify-center" : "relative mt-14 flex items-center justify-center"}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {!isMobile ? (
            <button
              type="button"
              onClick={prev}
              className={`${controlClassName} ${isArabic ? "right-0" : "left-0"}`}
              aria-label="Previous slide"
            >
              <ChevronRightIcon className={`h-5 w-5 ${isArabic ? "" : "rotate-180"}`} />
            </button>
          ) : null}

          <div
            className={stageClassName}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {items.map((item, index) => {
              const pos = getCardPosition(index);
              const isCenter = index === active;
              const isInnerSideCard =
                index === (active + 1) % total || index === (active - 1 + total) % total;
              const imageSrc = resolveImageSrc(item.image);
              const isVisible = pos !== null;

              return (
                <div
                  key={`${item.title}-${index}`}
                  onClick={() => setActive(index)}
                  className={`${cardClassName} group cursor-pointer text-start ${
                    isCenter
                      ? "border-[#f2dfb6] shadow-[0_56px_120px_-44px_rgba(18,28,49,0.56),0_18px_38px_-20px_rgba(205,177,112,0.24)]"
                      : "hover:border-brand-cta/25"
                  }`}
                  style={{
                    transform: isVisible
                      ? `translate3d(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px), 0) scale(${pos.scale}) rotate(${pos.rotate}deg)`
                      : "translate3d(-50%, -50%, 0) scale(0.9)",
                    opacity: isVisible ? pos.opacity : 0,
                    zIndex: isVisible ? pos.z : 0,
                    filter: `blur(${isVisible ? pos.blur : 0}px)`,
                  }}
                >
                  <div className="absolute inset-[10px] rounded-[24px] bg-[#f6efdf]" />
                  <div className="absolute inset-[10px] overflow-hidden rounded-[24px]">
                    {imageSrc ? (
                      <div
                        role="img"
                        aria-label={item.imageAlt || item.title}
                        className={`absolute inset-0 transition-transform ${isMobile ? "duration-[520ms]" : "duration-[720ms]"} ease-[cubic-bezier(0.22,0.84,0.24,1)] ${
                          isCenter ? "scale-100" : "scale-[1.03]"
                        }`}
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(6,12,24,0.06) 0%, rgba(6,12,24,0.12) 22%, rgba(6,12,24,0.28) 48%, rgba(6,12,24,0.82) 82%, rgba(6,12,24,0.94) 100%), linear-gradient(135deg, rgba(205,177,112,0.12) 0%, rgba(205,177,112,0.04) 22%, rgba(15,23,42,0.08) 60%, rgba(15,23,42,0.26) 100%), url("${imageSrc}")`,
                          backgroundPosition: item.imagePosition || "center center",
                          backgroundSize: "cover",
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6efdf_0%,#ddcfae_100%)]" />
                    )}
                  </div>

                  <div className="pointer-events-none absolute inset-[10px] rounded-[24px] border border-white/24" />
                  <div className="pointer-events-none absolute inset-x-[10px] bottom-[10px] h-[70%] rounded-b-[24px] bg-[linear-gradient(180deg,rgba(8,15,30,0)_0%,rgba(8,15,30,0.18)_22%,rgba(8,15,30,0.52)_52%,rgba(8,15,30,0.9)_84%,rgba(8,15,30,0.96)_100%)]" />
                  <div className="pointer-events-none absolute inset-x-[10px] bottom-[10px] h-[38%] rounded-b-[24px] bg-[linear-gradient(180deg,rgba(205,177,112,0)_0%,rgba(205,177,112,0.08)_52%,rgba(205,177,112,0.14)_100%)]" />

                  <div
                    className={`relative z-10 flex h-full flex-col justify-end px-7 pb-7 ${
                      isMobile ? "pt-20" : isCenter ? "pt-28" : "pt-24"
                    }`}
                  >
                    {item.eyebrow ? (
                      <p
                        className={`text-[10px] font-semibold tracking-[0.22em] text-[#ecd7a4] [text-shadow:0_1px_10px_rgba(4,10,22,0.8)] ${
                          isArabic ? "" : "uppercase"
                        }`}
                      >
                        {item.eyebrow}
                      </p>
                    ) : null}

                    <h3
                      className={`mt-2 font-bold tracking-tight text-white [text-shadow:0_2px_16px_rgba(6,12,28,0.88)] ${
                        isMobile
                          ? isCenter
                            ? "text-[1.45rem] leading-[1.15]"
                            : "text-[1.02rem] leading-5"
                          : isCenter
                            ? "text-[1.9rem] leading-[1.12]"
                            : "text-[1.22rem] leading-6"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div className="mt-5">
                      {item.href && item.cta && isCenter ? (
                        <Link
                          href={item.href}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-full border border-white/42 bg-[linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_100%)] px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-[10px] transition duration-300 hover:border-[#f0ddb4] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.12)_100%)]"
                        >
                          <span>{item.cta}</span>
                          <ChevronRightIcon className={`h-4 w-4 ${isArabic ? "rotate-180" : ""}`} />
                        </Link>
                      ) : isInnerSideCard ? (
                        <span className="inline-flex items-center text-[0.8rem] font-medium text-white/76 [text-shadow:0_1px_10px_rgba(6,12,28,0.78)]">
                          {item.cta || "View service"}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isMobile ? (
            <button
              type="button"
              onClick={next}
              className={`${controlClassName} ${isArabic ? "left-0" : "right-0"}`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className={`h-5 w-5 ${isArabic ? "rotate-180" : ""}`} />
            </button>
          ) : null}
        </div>

        <div className={isCompact ? "mt-5 flex items-center justify-center gap-2" : "mt-7 flex items-center justify-center gap-2"}>
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === active ? "w-8 bg-brand-bg" : "w-2.5 bg-slate-300 hover:bg-slate-500"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
