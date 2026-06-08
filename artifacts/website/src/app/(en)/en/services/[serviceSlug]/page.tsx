import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "@/components/services/ServiceDetailPage";
import { getServiceBySlug, getServicesCommon, getServicesListing } from "@/lib/data/services";

type Props = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateStaticParams() {
  const listing = getServicesListing("en");
  return listing.services.map((service: { slug: string }) => ({ serviceSlug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug("en", serviceSlug);
  return { title: service ? service.title : "Services" };
}

export default async function EnglishServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug("en", serviceSlug);
  if (!service) notFound();

  const listing = getServicesListing("en");
  const common = getServicesCommon("en");

  return (
    <ServiceDetailPage
      locale="en"
      service={service}
      common={common}
      listingCta={{
        title: listing.ctaTitle,
        subtitle: listing.ctaSubtitle,
        button: listing.ctaBtn,
        whatsapp: listing.whatsapp,
      }}
    />
  );
}
