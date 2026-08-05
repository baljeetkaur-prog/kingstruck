import { notFound } from "next/navigation";
import type { Metadata } from "next";

import BlogDetailPage from "./BlogDetailPage";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

async function getBlog(slug: string) {
  try {
    await dbConnect();

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) return null;

    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {

  const { slug } = await props.params; // ✅ FIX HERE

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Kings Truck Center",
    };
  }

  return {
   title: `${blog.title} | Kings Truck Center Blog`,
    description: blog.excerpt,
    keywords: blog.tags?.join(", ") || "",
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params; // ✅ FIX HERE

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailPage blog={blog} />;
}