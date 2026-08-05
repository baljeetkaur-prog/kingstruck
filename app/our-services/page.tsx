import type { Metadata } from "next";

import ServicesPage from "./ServicesPage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("services");

  return {
    title:
      seo?.metaTitle ||
      "Truck Repair Services in Sacramento | Kings Truck Center",
    description: seo?.metaDescription || "",
    keywords: seo?.metaKeywords || "",
  };
}

export default function Page() {
  return <ServicesPage />;
}