import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const Booking = await prisma.booking.findMany();
    return NextResponse.json(
      { Booking, message: "Các đơn đặt sân" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Thất bại", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(Request: NextRequest) {
  try {
    // Lấy danh sách tất cả các booking sẽ bị xóa
    const bookings = await prisma.booking.findMany({
      select: {
        price_id: true, // Lấy thông tin price_id của booking
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "Không có booking nào để xóa" },
        { status: 404 }
      );
    }
    // Sử dụng giao dịch để đảm bảo tính nhất quán
    await prisma.$transaction([
      // Xóa tất cả bookings
      prisma.booking.deleteMany(),
      // Cập nhật trạng thái của các price liên quan
      prisma.price.updateMany({
        where: {
          id: {
            in: bookings.map((booking) => Number(booking.price_id)),
          },
        },
        data: {
          status: "TRONG", // Cập nhật trạng thái về "TRONG"
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Xóa booking và cập nhật trạng thái thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Thất bại", error: error.message },
      { status: 500 }
    );
  }
}
