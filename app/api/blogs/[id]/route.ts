import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import cloudinary from "@/lib/cloudinary";

/* =========================
   GET SINGLE BLOG
========================= */
export async function GET(
  req: Request,
  context: any
) {
  try {
    await dbConnect();

    const { id } =
      await context.params;

    const blog =
      await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

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
          "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    await dbConnect();

    const { id } =
      await context.params;

    const blog =
      await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    // DELETE IMAGE FROM CLOUDINARY
    if (
      blog.featuredImage &&
      blog.featuredImage.public_id
    ) {
      await cloudinary.uploader.destroy(
        blog.featuredImage.public_id
      );
    }

    // DELETE BLOG FROM DB
    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: any
) {
  try {
    await dbConnect();

    const { id } =
      await context.params;

    const body = await req.json();

    const existingBlog =
      await Blog.findById(id);

    if (!existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    // DELETE OLD IMAGE
    if (
      body.featuredImage?.public_id &&
      existingBlog.featuredImage
        ?.public_id &&
      body.featuredImage
        .public_id !==
        existingBlog
          .featuredImage
          .public_id
    ) {
      await cloudinary.uploader.destroy(
        existingBlog
          .featuredImage
          .public_id
      );
    }

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      blog: updatedBlog,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update blog",
      },
      { status: 500 }
    );
  }
}