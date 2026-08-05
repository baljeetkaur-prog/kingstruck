import type { Metadata } from "next";

import ContactPage from "./ContactPage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("contact");

  return {
    title:
      seo?.metaTitle ||
      "Contact Kings Truck Center | Truck Repair Sacramento, CA",
    description:
      seo?.metaDescription ||
      "Get in touch with Kings Truck Center in Sacramento, California for heavy-duty truck repair, diagnostics, maintenance, and roadside assistance. Call or send us a message today.",
    keywords:
      seo?.metaKeywords ||
      "contact truck repair Sacramento, Kings Truck Center contact, truck service phone number, diesel repair contact California, roadside assistance Sacramento",
    openGraph: {
      title:
        seo?.metaTitle ||
        "Contact Kings Truck Center",
      description:
        seo?.metaDescription ||
        "Reach out for professional truck repair services in Sacramento, CA.",
      type: "website",
    },
  };
}

export default function Page() {
  return <ContactPage />;
}