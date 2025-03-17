import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const Soccer = await prisma.price.findMany();
    return NextResponse.json(
      { Soccer, message: "Các mức giá" },
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
    const se = await prisma.price.findUnique({ where: { name: body.name } });
    if (se == null) {
      const newSan = await prisma.price.create({
        data: {
          name: body.name,
          field: {
            connect: { id: Number(body.field_id) }, // Liên kết với trường field_id
          },
          timeslot: {
            connect: { id: Number(body.timeslot_id) }, // Liên kết với trường field_id
          },
          price: Number(body.price),
          status: body.status,
          update_at: new Date(),
        },
      });
      return NextResponse.json(
        { newSan, message: "Tạo mức giá sân thành công" },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Mức giá sân đã tồn tại" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Tạo thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const Delete = await prisma.price.deleteMany();
    return NextResponse.json(
      { Delete, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 400 });
  }
}
