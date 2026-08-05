import type { Metadata } from "next";

import AboutPage from "./AboutPage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("about");

  return {
    title: seo?.metaTitle || "About Us | Kings Truck Center Sacramento",
    description: seo?.metaDescription || "",
    keywords: seo?.metaKeywords || "",
  };
}

export default function Page() {
  return <AboutPage />;
}