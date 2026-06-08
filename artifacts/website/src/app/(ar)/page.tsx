import type { Metadata } from "next";
import { ar } from "@/lib/content/ar";
import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import StatsSection from "@/components/home/StatsSection";
import BranchesSection from "@/components/home/BranchesSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import AirlinesSection from "@/components/home/AirlinesSection";
import OrbitPartnersSection from "@/components/home/OrbitPartnersSection";
import HomeScrollLuxuryFx from "@/components/home/HomeScrollLuxuryFx";
import HomepageIntro from "@/components/home/HomepageIntro";

export const metadata: Metadata = {
  title: "طريق القيصر للسياحة والسفر",
  description:
    "طريق القيصر للسياحة والسفر - رفيقك الموثوق في رحلات لا تنسى حول العالم. تذاكر طيران، تأشيرات، حجز فنادق، وتأمين صحي.",
};

const p = ar.pages.home;
const branchesPage = ar.pages.branches;
const WHATSAPP = "971501234567";

export default function ArabicHomePage() {
  return (
    <HomepageIntro kicker="CAESAR ROAD" title="طريق القيصر">
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
          locale="ar"
          servicesHref="/services"
          whatsappNumber={WHATSAPP}
        />

        <AirlinesSection
          label={p.airlinesLabel}
          trust={p.airlinesTrust}
          locale="ar"
        />
        <OrbitPartnersSection locale="ar" />
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
