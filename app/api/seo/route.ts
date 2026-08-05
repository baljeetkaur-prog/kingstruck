import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import Seo from "@/models/Seo";

export async function GET() {

  try {

    await dbConnect();

    const seo = await Seo.find();

    return NextResponse.json({
      success: true,
      seo,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );

  }

}

export async function POST(
  req: Request
) {

  try {

    await dbConnect();

    const body = await req.json();

    const {
      page,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = body;

    const updatedSeo =
      await Seo.findOneAndUpdate(
        { page },
        {
          metaTitle,
          metaDescription,
          metaKeywords,
        },
        {
          upsert: true,
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      seo: updatedSeo,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );

  }

}