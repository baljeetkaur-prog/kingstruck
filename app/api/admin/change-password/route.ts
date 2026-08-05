import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import bcrypt from "bcryptjs";

import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";

import Admin from "@/models/Admin";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      currentPassword,
      newPassword,
    } = body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields required",
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({
      email: session.user.email,
    });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 }
      );
    }

    // CHECK CURRENT PASSWORD
    const isMatch = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password incorrect",
        },
        { status: 400 }
      );
    }

    // HASH NEW PASSWORD
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    return NextResponse.json({
      success: true,
      message: "Password updated",
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