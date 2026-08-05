import type { Metadata } from "next";

import FAQPage from "./FAQPage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("faq");

  return {
    title:
      seo?.metaTitle ||
      "FAQ | Truck Repair Questions Answered | Kings Truck Center Sacramento",
    description:
      seo?.metaDescription ||
      "Find answers to frequently asked questions about truck repair, diesel engine service, maintenance, and roadside assistance at Kings Truck Center in Sacramento, CA.",
    keywords:
      seo?.metaKeywords ||
      "truck repair FAQ, diesel repair questions, truck maintenance FAQ Sacramento, Kings Truck Center FAQ, heavy duty truck service questions",
  };
}

export default function Page() {
  return <FAQPage />;
}