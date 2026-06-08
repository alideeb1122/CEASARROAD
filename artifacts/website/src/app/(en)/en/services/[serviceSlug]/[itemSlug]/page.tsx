import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceItemPage from "@/components/services/ServiceItemPage";
import {
  getAdjacentItems,
  getServiceItemBySlug,
  getServicesCommon,
  getServicesListing,
} from "@/lib/data/services";

type Props = {
  params: Promise<{ serviceSlug: string; itemSlug: string }>;
};

export async function generateStaticParams() {
  const listing = getServicesListing("en");
  return listing.services.flatMap((service: { slug: string; items: Array<{ slug: string }> }) =>
    service.items.map((item: { slug: string }) => ({
      serviceSlug: service.slug,
      itemSlug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, itemSlug } = await params;
  const result = getServiceItemBySlug("en", serviceSlug, itemSlug);
  return { title: result ? `${result.service.title} - ${result.item.title}` : "Service details" };
}

export default async function EnglishServiceItemPage({ params }: Props) {
  const { serviceSlug, itemSlug } = await params;
  const result = getServiceItemBySlug("en", serviceSlug, itemSlug);
  if (!result) notFound();

  const adjacent = getAdjacentItems("en", serviceSlug, itemSlug);
  const common = getServicesCommon("en");
  const listing = getServicesListing("en");

  return (
    <ServiceItemPage
      locale="en"
      service={result.service}
      item={result.item}
      previousItem={adjacent.previous}
      nextItem={adjacent.next}
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
