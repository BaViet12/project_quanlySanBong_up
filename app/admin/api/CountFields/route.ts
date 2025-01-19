import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const totalField = await prisma.fields.count();
    const Field5 = await prisma.fields.count({
      where: { field_type: 5 },
    });
    const Field7 = await prisma.fields.count({
      where: { field_type: 7 },
    });

    return NextResponse.json(
      {
        totalField,
        Field5,
        Field7,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json(
      {
        message: "Thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
