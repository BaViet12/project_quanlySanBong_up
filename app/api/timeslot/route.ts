// app/api/timeslot
import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const TimeslotAPI = await prisma.timeslot.findMany();
    return NextResponse.json(
      { TimeslotAPI, message: "Các khung giờ" },
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
  console.log("Request nhận được:", req);
  try {
    const body = await req.json();

    // Kiểm tra body không được rỗng
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ hoặc bị trống" },
        { status: 400 }
      );
    }

    const startTimeVN = addHours(new Date(body.start_time), 7);
    const endTimeVN = addHours(new Date(body.end_time), 7);

    const newTimeSlot = await prisma.timeslot.create({
      data: {
        name: body.name,
        start_time: startTimeVN,
        end_time: endTimeVN,
      },
    });

    return NextResponse.json(
      { newTimeSlot, message: "Tạo khung giờ thành công" },
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
