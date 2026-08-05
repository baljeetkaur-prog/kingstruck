import type { Metadata } from "next";

import BlogsPage from "./BlogsPage";
import getSeo from "@/lib/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const seo: any = await getSeo("blogs");

  return {
    title:
      seo?.metaTitle ||
      "Truck Repair Blog | Tips & Insights | Kings Truck Center Sacramento",
    description:
      seo?.metaDescription ||
      "Read expert truck repair tips, diesel maintenance guides, and industry insights from Kings Truck Center in Sacramento, CA.",
    keywords:
      seo?.metaKeywords ||
      "truck repair blog, diesel maintenance tips, truck service guide Sacramento, fleet maintenance articles",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <BlogsPage initialSearch={params.search || ""} />
  );
}