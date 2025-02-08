import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json(); // Lấy dữ liệu từ request body
    const { payment_status } = body; // Lấy giá trị payment_status từ body
    const idBooking = parseInt(params.id);

    // Kiểm tra booking có tồn tại không
    const booking = await prisma.booking.findUnique({
      where: { id: idBooking },
    });

    if (!booking) {
      return NextResponse.json(
        {
          message: "Không tìm thấy đơn đặt sân",
        },
        { status: 500 }
      );
    }

    // Cập nhật trạng thái booking
    const updateBooking = await prisma.booking.update({
      where: { id: idBooking },
      data: {
        payment_status,
        status: payment_status === "THANHCONG" ? "DAXACNHAN" : "DAHUY",
        confirmed_at: payment_status === "THANHCONG" ? new Date() : null,
      },
    });

    return NextResponse.json(
      {
        updateBooking,
        message: "Đã cập nhật trạng thái",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Lỗi khi cập nhật trạng thái",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
