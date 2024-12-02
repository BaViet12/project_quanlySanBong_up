import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const PriceId = parseInt(params.id);
  try {
    const Price = await prisma.price.findUnique({ where: { id: PriceId } });
    return NextResponse.json(
      { Price, message: `Thông tin giá sân ${params.id}` },
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
  const PriceId = parseInt(params.id);
  try {
    const DeletePrice = await prisma.price.delete({
      where: { id: PriceId },
    });
    return NextResponse.json(
      {
        DeletePrice,
        message: `Đã xóa thành công mức giá có id ${params.id}`,
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
    const PriceId = parseInt(params.id);
    const se = await prisma.price.findUnique({ where: { name: body.name } });
    if (se == null) {
      const PutSoccer = await prisma.price.update({
        where: { id: PriceId },
        data: {
          name: body.name,
          field: {
            connect: { id: body.field_id }, // Liên kết với trường field_id
          },
          timeslot: {
            connect: { id: body.timeslot_id }, // Liên kết với trường field_id
          },
          price: body.price,
          update_at: new Date(),
        },
      });
      return NextResponse.json(
        {
          PutSoccer,
          message: `Đã cập nhật thành công mức giá có id ${params.id}`,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Mức giá đã tồn tại" },
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
