import { NextResponse } from "next/server";

import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      name,
      email,
      subject,
      phone,
      message,
    } = body;

    if (
      !name ||
      !email ||
      !phone ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      phone,
      message,
    });

    return NextResponse.json({
      success: true,
      contact,
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

    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}