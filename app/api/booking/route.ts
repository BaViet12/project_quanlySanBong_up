import { getSession } from "@/app/lib/auth";
import { pusherServer } from "@/app/lib/pusher";
import prisma from "@/prisma/client";

import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const BookingAPI = await prisma.booking.findMany({
      where: {
        status: "DANGXULY",
      },
    });
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
    // 1. Tạo đơn đặt sân
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
      include: {
        user: true,
        price: {
          include: {
            field: true,
            timeslot: true,
          },
        },
      },
    });
    // 2. Thên đơn hàng vào giỏ hàng
    const cartItems = await prisma.cart.create({
      data: {
        user_id: body.user_id,
        booking_id: newBooking.id,
        quantity: 1,
      },
    });
    // 3. Cập nhật trạng thái sân đã đặt
    await prisma.price.update({
      where: { id: body.price_id },
      data: { status: "DADAT" },
    });

    // 4. Gửi thông báo về đơn đặt sân
    const notification = await prisma.notification.create({
      data: {
        message: `Đơn đặt sân mới từ ${newBooking.user.Hoten}`,
        user_id: body.user_id,
        booking_id: newBooking.id,
      },
    });

    await pusherServer.trigger("notifications", "new-booking", {
      notification,
      bookingDetails: {
        id: newBooking.id,
        userName: newBooking.user.Hoten,
        fieldName: newBooking.price.field.name,
        timeslot: `${newBooking.price.timeslot.start_time} - ${newBooking.price.timeslot.end_time}`,
        totalPrice: newBooking.total_price,
        status: newBooking.status,
      },
    });

    return NextResponse.json({
      message: "Đặt sân thành công! Đợi nhân viên xác nhận.",
      newBooking,
    });
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi đặt sân",
        error: error.message || "Không xác định lỗi ",
      },
      { status: 500 }
    );
  }
}
