import { NextResponse } from "next/server";
import slugify from "slugify";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";

/* =========================
   GET ALL BLOGS
========================= */
export async function GET() {
  try {
    await dbConnect();

    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

/* =========================
   CREATE BLOG
========================= */
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      title,
      slug,
      category,
      tags,
      excerpt,
      featuredImage,
      content,
      author,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const finalSlug = slug
      ? slugify(slug, {
          lower: true,
          strict: true,
        })
      : slugify(title, {
          lower: true,
          strict: true,
        });

    const existingBlog =
      await Blog.findOne({
        slug: finalSlug,
      });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slug already exists",
        },
        { status: 400 }
      );
    }

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      category,
      tags,
      excerpt,
      featuredImage,
      content,
      author,
    });

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}