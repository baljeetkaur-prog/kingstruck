import type { Metadata } from "next";

import RequestServicePage from "./RequestServicePage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("request-service");

  return {
    title:
      seo?.metaTitle ||
      "Request Truck Service | Book Repair Appointment | Kings Truck Center Sacramento",
    description:
      seo?.metaDescription ||
      "Request professional truck repair and maintenance service at Kings Truck Center in Sacramento, California. Book engine diagnostics, brake repair, roadside assistance, and fleet services online.",
    keywords:
      seo?.metaKeywords ||
      "request truck service Sacramento, truck repair appointment California, Kings Truck Center booking, diesel repair scheduling, truck maintenance booking Sacramento, roadside assistance request",
    openGraph: {
      title:
        seo?.metaTitle ||
        "Request Truck Service - Kings Truck Center",
      description:
        seo?.metaDescription ||
        "Book heavy-duty truck repair and maintenance service in Sacramento, CA.",
      type: "website",
    },
  };
}

export default function Page() {
  return <RequestServicePage />;
}