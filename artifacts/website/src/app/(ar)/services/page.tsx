import type { Metadata } from "next";
import ServicesListingPage from "@/components/services/ServicesListingPage";
import { getServicesCommon, getServicesListing } from "@/lib/data/services";

export const metadata: Metadata = { title: "???????" };

export default function ArabicServicesPage() {
  return (
    <ServicesListingPage
      locale="ar"
      content={getServicesListing("ar")}
      common={getServicesCommon("ar")}
    />
  );
}
