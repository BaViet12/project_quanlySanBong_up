import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const SoccerId = parseInt(params.id);
  try {
    const Soccer = await prisma.timeslot.findUnique({
      where: { id: SoccerId },
    });
    return NextResponse.json(
      { Soccer, message: `Thông tin khung giờ ${params.id}` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Lỗi" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const SoccerId = parseInt(params.id);
  try {
    const DeleteSoccer = await prisma.timeslot.delete({
      where: { id: SoccerId },
    });
    return NextResponse.json(
      {
        DeleteSoccer,
        message: `Đã xóa thành công khung giờ có id ${params.id}`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Xóa thất bại", error: error.message },
      { status: 400, statusText: "Fail" }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const SoccerId = parseInt(params.id);
    const se = await prisma.timeslot.findFirst({ where: { name: body.name } });
    if (se == null) {
      const PutSoccer = await prisma.timeslot.update({
        where: { id: SoccerId },
        data: {
          name: body.name,
          start_time: body.start_time,
          end_time: body.end_time,
          status: body.status,
        },
      });
      return NextResponse.json(
        { PutSoccer, message: `Đã cập nhật thành công Khung giờ ${params.id}` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Khung giờ đã tồn tại" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "Xảy ra lỗi", error: error.message },
      { status: 400 }
    );
  }
}
