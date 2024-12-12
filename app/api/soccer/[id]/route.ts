import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const SoccerId = parseInt(params.id);
  try {
    const Soccer = await prisma.fields.findUnique({ where: { id: SoccerId } });
    return NextResponse.json(
      { Soccer, message: `Thông tin sân ${params.id}` },
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
    const DeleteSoccer = await prisma.fields.delete({
      where: { id: SoccerId },
    });
    return NextResponse.json(
      {
        DeleteSoccer,
        message: `Đã xóa thành công sân bóng có id ${params.id}`,
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
    const PutSoccer = await prisma.fields.update({
      where: { id: SoccerId },
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
      { PutSoccer, message: `Đã cập nhật thành công Sân bóng ${params.id}` },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Xảy ra lỗi", error: error.message },
      { status: 400 }
    );
  }
}
