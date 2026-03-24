import type { Metadata } from "next";
import { ar } from "@/lib/content/ar";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import BranchesSection from "@/components/home/BranchesSection";
import GallerySection from "@/components/home/GallerySection";
import SocialSection from "@/components/home/SocialSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import AirlinesSection from "@/components/home/AirlinesSection";

export const metadata: Metadata = {
  title: "طريق القيصر للسياحة والسفر",
  description:
    "طريق القيصر للسياحة والسفر — رفيقك الموثوق في رحلات لا تُنسى حول العالم. تذاكر طيران، تأشيرات، حجز فنادق، وتأمين صحي.",
};

const p = ar.pages.home;
const WHATSAPP = "971501234567";

export default function ArabicHomePage() {
  return (
    <>
      <HeroSection
        content={{
          heroLabel: p.heroLabel,
          heroTitle: p.heroTitle,
          heroTitleAccent: p.heroTitleAccent,
          heroSubtitle: p.heroSubtitle,
          heroWhatsappCta: p.heroWhatsappCta,
          heroServicesCta: p.heroServicesCta,
          heroMediaLabel: p.heroMediaLabel,
        }}
        locale="ar"
        servicesHref="/services"
        whatsappNumber={WHATSAPP}
      />

      <AirlinesSection
        label={p.airlinesLabel}
        trust={p.airlinesTrust}
        locale="ar"
      />

      <ServicesSection
        label={p.servicesLabel}
        title={p.servicesTitle}
        subtitle={p.servicesSubtitle}
        services={p.services}
        locale="ar"
        servicesHref="/services"
      />

      <WhyUsSection
        label={p.whyLabel}
        title={p.whyTitle}
        subtitle={p.whySubtitle}
        points={p.why}
      />

      <StatsSection
        label={p.statsLabel}
        title={p.statsTitle}
        stats={p.stats}
      />

      <BranchesSection
        label={p.branchesLabel}
        title={p.branchesTitle}
        subtitle={p.branchesSubtitle}
        branches={p.branches}
        branchCta={p.branchCta}
        hoursLabel={p.hoursLabel}
      />

      <GallerySection
        label={p.galleryLabel}
        title={p.galleryTitle}
        subtitle={p.gallerySubtitle}
        items={p.galleryItems}
      />

      <SocialSection
        label={p.socialLabel}
        title={p.socialTitle}
        subtitle={p.socialSubtitle}
        socials={p.socials}
      />

      <TestimonialsSection
        label={p.testimonialsLabel}
        title={p.testimonialsTitle}
        subtitle={p.testimonialsSubtitle}
        testimonials={p.testimonials}
      />

      <FinalCtaSection
        label={p.finalCtaLabel}
        title={p.finalCtaTitle}
        subtitle={p.finalCtaSubtitle}
        btnText={p.finalCtaBtn}
        whatsappNumber={WHATSAPP}
      />
    </>
  );
}
