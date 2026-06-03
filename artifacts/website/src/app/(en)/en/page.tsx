import type { Metadata } from "next";
import { en } from "@/lib/content/en";
import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import BranchesSection from "@/components/home/BranchesSection";
import SocialSection from "@/components/home/SocialSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import AirlinesSection from "@/components/home/AirlinesSection";
import OrbitPartnersSection from "@/components/home/OrbitPartnersSection";
import HomeScrollLuxuryFx from "@/components/home/HomeScrollLuxuryFx";
import HomepageIntro from "@/components/home/HomepageIntro";

export const metadata: Metadata = {
  title: "Caesar Road Travel & Tourism",
  description:
    "Caesar Road Travel & Tourism â€” your trusted companion for unforgettable journeys. Flights, visas, hotels, and health insurance.",
};

const p = en.pages.home;
const branchesPage = en.pages.branches;
const WHATSAPP = "971501234567";

export default function EnglishHomePage() {
  return (
    <HomepageIntro kicker="CAESAR ROAD" title="Caesar Road">
      <div className="luxury-home">
        <HomeScrollLuxuryFx />
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
          locale="en"
          servicesHref="/en/services"
          whatsappNumber={WHATSAPP}
        />

        <AirlinesSection
          label={p.airlinesLabel}
          trust={p.airlinesTrust}
          locale="en"
        />
        <OrbitPartnersSection locale="en" />
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
          branches={branchesPage.branches}
          branchCta={p.branchCta}
          hoursLabel={p.hoursLabel}
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
      </div>
    </HomepageIntro>
  );
}




