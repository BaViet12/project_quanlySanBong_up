import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const Soccer = await prisma.fields.findMany({
      include: {
        Price: {
          include: {
            timeslot: true,
          },
        },
      },
    });

    return NextResponse.json(
      { Soccer, message: "Các sân bóng" },
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const se = await prisma.fields.findUnique({ where: { name: body.name } });
    if (se == null) {
      const newSan = await prisma.fields.create({
        data: {
          name: body.name,
          field_type: body.field_type,
          status: body.status,
          HinhAnh: body.HinhAnh,
          MoTa: body.MoTa,
          update_at: new Date(),
        },
      });
      return NextResponse.json(
        { newSan, message: "Tạo sân thành công" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Sân đã tồn tại" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Tạo sân thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const Delete = await prisma.fields.deleteMany();
    return NextResponse.json(
      { Delete, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 400 });
  }
}
