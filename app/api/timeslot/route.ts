import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const Soccer = await prisma.timeslot.findMany();
    return NextResponse.json(
      { Soccer, message: "Các khung giờ" },
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

export async function DELETE(req: NextRequest) {
  try {
    const Delete = await prisma.timeslot.deleteMany();
    return NextResponse.json(
      { Delete, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newSan = await prisma.timeslot.create({
      data: {
        name: body.name,
        start_time: body.start_time,
        end_time: body.end_time,
      },
    });
    return NextResponse.json(
      { newSan, message: "Tạo khung giờ thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Tạo khung giờ thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
