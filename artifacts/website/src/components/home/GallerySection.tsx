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

export default function GallerySection({
  label,
  title,
  subtitle,
  items,
}: GallerySectionProps) {
  const { ref, visible } = useReveal(0.1);

  return (
    <section
      ref={ref}
      data-header-theme="light"
      className="bg-white section-padding"
      style={{ borderTop: "1px solid #f0ede8" }}
    >
      <div className="container-custom">
        <SectionHeading label={label} title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {items.slice(0, 6).map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23e8e4dc'/%3E%3C/svg%3E"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(27,42,74,0.65) 0%, rgba(27,42,74,0.1) 55%, transparent 100%)",
                }}
              />

              <div className="absolute bottom-0 inset-x-0 px-5 py-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-brand-cta/90 text-brand-bg mb-2">
                  {item.tag}
                </span>
                <p className="text-white text-sm font-semibold leading-snug">
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
