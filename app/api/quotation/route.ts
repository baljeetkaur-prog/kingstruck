import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import Quotation from "@/models/Quotation";

export async function POST(
  req: Request
) {
  try {

    await dbConnect();

    const body = await req.json();

    const quotation =
      await Quotation.create(body);

    return NextResponse.json({
      success: true,
      quotation,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );

  }
}
export async function GET() {
  try {
    await dbConnect();

    const quotations = await Quotation.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: quotations.length,
      quotations,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}