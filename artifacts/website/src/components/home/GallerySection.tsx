"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { useReveal } from "./useReveal";

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  tag: string;
}

interface GallerySectionProps {
  label: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

const GRID_SPANS = [
  "md:col-span-8",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-12",
];

const ASPECT_RATIOS = [
  "aspect-[16/9]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[21/6]",
];

export default function GallerySection({
  label,
  title,
  subtitle,
  items,
}: GallerySectionProps) {
  const { ref, visible } = useReveal(0.08);

  return (
    <section
      ref={ref}
      className="bg-[#FAFAF8] section-padding"
      style={{ borderTop: "1px solid #f0ede8" }}
    >
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {items.slice(0, 8).map((item, i) => (
            <div
              key={i}
              className={`col-span-1 ${GRID_SPANS[i] ?? "md:col-span-6"} group relative overflow-hidden rounded-2xl bg-gray-100 ${ASPECT_RATIOS[i] ?? "aspect-[4/3]"}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition:
                  "opacity 0.65s ease, transform 0.65s ease",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e8e4dc'/%3E%3C/svg%3E"
              />

              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(27,42,74,0.72) 0%, rgba(27,42,74,0.18) 50%, transparent 100%)",
                }}
              />

              <div
                className="absolute bottom-0 inset-x-0 px-5 py-4 transition-transform duration-500 ease-out group-hover:-translate-y-1"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-brand-cta/90 text-brand-bg mb-2">
                  {item.tag}
                </span>
                <p className="text-white text-sm font-semibold leading-snug drop-shadow-sm">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
