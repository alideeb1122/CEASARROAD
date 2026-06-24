import type { Metadata } from "next";
import { ar } from "@/lib/content/ar";
import HeroSection from "@/components/home/HeroSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import BranchesSection from "@/components/home/BranchesSection";
import AirlinesSection from "@/components/home/AirlinesSection";
import OrbitPartnersSection from "@/components/home/OrbitPartnersSection";
import HomeScrollLuxuryFx from "@/components/home/HomeScrollLuxuryFx";
import HomepageIntro from "@/components/home/HomepageIntro";
import AboutServicesCarousel from "@/components/about/AboutServicesCarousel";
import { getServicesListing } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "طريق القيصر للسياحة والسفر",
  description:
    "طريق القيصر للسياحة والسفر - رفيقك الموثوق في رحلات لا تنسى حول العالم. تذاكر طيران، تأشيرات، حجز فنادق، وتأمين صحي.",
};

const p = ar.pages.home;
const branchesPage = ar.pages.branches;
const WHATSAPP = "971501234567";
const servicesListing = getServicesListing("ar");

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
          statsLabel={p.statsLabel}
          statsTitle={p.statsTitle}
          stats={p.stats}
        />

        <WhyUsSection
          label={p.whyLabel}
          title={p.whyTitle}
          subtitle={p.whySubtitle}
          points={p.why}
        />

        <AboutServicesCarousel
          label={p.servicesLabel}
          title={p.servicesTitle}
          subtitle={p.servicesSubtitle}
          locale="ar"
          variant="compact"
          items={servicesListing.services.slice(0, 5).map((service) => ({
            title: service.title,
            subtitle: service.summary,
            href: `/services/${service.slug}`,
            eyebrow: service.eyebrow,
            cta: service.cardCta,
            icon: service.icon,
            highlights: service.highlights,
            image: service.previewImage,
            imageAlt: service.previewImageAlt,
            imagePosition: service.previewImagePosition,
          }))}
        />

        <AirlinesSection
          label={p.airlinesLabel}
          trust={p.airlinesTrust}
          locale="ar"
        />
        <OrbitPartnersSection locale="ar" />

        <BranchesSection
          label={p.branchesLabel}
          title={p.branchesTitle}
          subtitle={p.branchesSubtitle}
          branches={branchesPage.branches}
          branchCta={p.branchCta}
          mapCta={branchesPage.mapCta}
          hoursLabel={p.hoursLabel}
          branchSocials={ar.pages.contact.socials}
        />
      </div>
    </HomepageIntro>
  );
}
