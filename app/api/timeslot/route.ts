// app/api/timeslot
import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours, isBefore } from "date-fns";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const limit_size: number = searchParams.get("limit_size")
    ? Number(searchParams.get("limit_size"))
    : 10;
  const filter = searchParams.get("filter");

  const skip = (page - 1) * limit_size;

  try {
    let totalRecords;
    if (filter === "active") {
      totalRecords = await prisma.timeslot.count({
        where: {
          start_time: {
            gte: new Date(),
          },
        },
      });
    } else if (filter === "inactive") {
      totalRecords = await prisma.timeslot.count({
        where: {
          end_time: {
            lt: new Date(),
          },
        },
      });
    } else {
      totalRecords = await prisma.timeslot.count();
    }

    const totalPage = Math.ceil(totalRecords / limit_size);
    let data;
    if (filter === "active") {
      data = await prisma.timeslot.findMany({
        where: {
          start_time: {
            gte: new Date(),
          },
        },
        skip,
        take: limit_size,
      });
    } else if (filter === "inactive") {
      data = await prisma.timeslot.findMany({
        where: {
          end_time: {
            lt: new Date(),
          },
        },
        skip,
        take: limit_size,
      });
    } else {
      data = await prisma.timeslot.findMany({
        skip,
        take: limit_size,
      });
    }

    return NextResponse.json(
      {
        data,
        meta: {
          totalRecords,
          totalPage,
          page,
          limit_size,
          skip,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching timeslots:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi lấy dữ liệu khung giờ",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { message: "Không có ID nào được gửi" },
        { status: 400 }
      );
    }

    const deleted = await prisma.timeslot.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json(
      { deleted, message: "Xóa thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 500 });
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
