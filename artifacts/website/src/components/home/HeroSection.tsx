import Link from "next/link";
import { WhatsAppIcon, PlaneIcon } from "./Icons";

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

export default function HeroSection({
  content,
  locale,
  servicesHref,
  whatsappNumber = "971501234567",
}: HeroSectionProps) {
  const isRtl = locale === "ar";

  return (
    <section className="relative bg-brand-bg overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#3A3F63_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cta/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
            isRtl ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text content */}
          <div className={`flex-1 ${isRtl ? "text-right" : "text-left"} text-center lg:text-start`}>
            {/* Label pill */}
            <div className={`flex justify-center lg:${isRtl ? "justify-end" : "justify-start"} mb-6`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cta/30 bg-brand-cta/10 text-brand-cta text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cta animate-pulse" />
                {content.heroLabel}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              {content.heroTitle}
            </h1>
            <p className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-cta leading-tight">
              {content.heroTitleAccent}
            </p>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-brand-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              {content.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:${isRtl ? "justify-end" : "justify-start"}`}>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-cta text-brand-bg font-bold rounded-xl hover:bg-brand-cta-hover transition-all duration-200 text-sm sm:text-base shadow-lg shadow-brand-cta/20 hover:shadow-brand-cta/30 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="w-5 h-5" />
                {content.heroWhatsappCta}
              </a>
              <Link
                href={servicesHref}
                className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-white/40 hover:bg-white/8 transition-all duration-200 text-sm sm:text-base"
              >
                {content.heroServicesCta}
              </Link>
            </div>
          </div>

          {/* Media placeholder — prepared for future video or image */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div
              className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-brand-section/60 shadow-2xl"
              data-media-area="hero"
              aria-label={content.heroMediaLabel}
            >
              {/* Decorative inner glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3A3F6380_0%,_transparent_70%)]" />

              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(194,169,107,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(194,169,107,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Placeholder content — replace with <video> or next/image in Phase 3 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-20 h-20 rounded-full bg-brand-cta/15 border border-brand-cta/20 flex items-center justify-center">
                  <PlaneIcon className="w-10 h-10 text-brand-cta" />
                </div>
                <p className="text-brand-muted text-sm font-medium text-center">
                  {content.heroMediaLabel}
                </p>
                <div className="flex gap-1.5">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 rounded-full bg-brand-cta/40 ${i === 0 ? "w-8" : "w-3"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom gradient fade */}
              <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-brand-bg/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
    </section>
  );
}
