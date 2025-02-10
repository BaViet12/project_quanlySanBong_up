import prisma from "@/prisma/client";
import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const BookingAPI = await prisma.booking.findMany();
    return NextResponse.json(
      { BookingAPI, message: "Các đơn đặt sân" },
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

export async function POST(Request: NextRequest) {
  const body = await Request.json();
  try {
    const newBooking = await prisma.booking.create({
      data: {
        user_id: body.user_id,
        price_id: body.price_id,
        total_price: body.total_price,
        paid_amount: body.paid_amount,
        receipt_image: body.receipt_image,
        payment_status: "DANGXULY",
        status: "DANGXULY",
        created_at: new Date(),
      },
    });
    // await prisma.price.update({
    //   where: { id: body.price_id },
    //   data: { status: "DADAT" },
    // });
    return NextResponse.json({
      message: "Đặt sân thành công! Đợi nhân viên xác nhận.",
      newBooking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi đặt sân",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
