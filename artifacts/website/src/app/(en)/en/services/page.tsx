import type { Metadata } from "next";
import ServicesListingPage from "@/components/services/ServicesListingPage";
import { getServicesCommon, getServicesListing } from "@/lib/data/services";

export const metadata: Metadata = { title: "Our Services" };

export default function EnglishServicesPage() {
  return (
    <ServicesListingPage
      locale="en"
      content={getServicesListing("en")}
      common={getServicesCommon("en")}
    />
  );
}
