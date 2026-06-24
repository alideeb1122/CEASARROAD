import type { Metadata } from "next";
import { en } from "@/lib/content/en";
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
  title: "Caesar Road Travel & Tourism",
  description:
    "Caesar Road Travel & Tourism â€” your trusted companion for unforgettable journeys. Flights, visas, hotels, and health insurance.",
};

const p = en.pages.home;
const branchesPage = en.pages.branches;
const WHATSAPP = "971501234567";
const servicesListing = getServicesListing("en");

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
          locale="en"
          variant="compact"
          items={servicesListing.services.slice(0, 5).map((service) => ({
            title: service.title,
            subtitle: service.detail,
            href: `/en/services/${service.slug}`,
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
          locale="en"
        />
        <OrbitPartnersSection locale="en" />

        <BranchesSection
          label={p.branchesLabel}
          title={p.branchesTitle}
          subtitle={p.branchesSubtitle}
          branches={branchesPage.branches}
          branchCta={p.branchCta}
          mapCta={branchesPage.mapCta}
          hoursLabel={p.hoursLabel}
          branchSocials={en.pages.contact.socials}
        />
      </div>
    </HomepageIntro>
  );
}




