import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

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
        message: "Đã xác nhận thành công",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Lỗi khi xác nhận trạng thái",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const BookingId = parseInt(params.id);

  try {
    // Kiểm tra sự tồn tại của Booking
    const booking = await prisma.booking.findUnique({
      where: { id: BookingId },
      include: { price: true, Carts: true }, // Lấy thông tin Price và Cart liên quan
    });

    if (!booking) {
      return NextResponse.json(
        {
          message: "Đơn đặt sân không tồn tại.",
        },
        { status: 404 }
      );
    }

    // Bắt đầu giao dịch
    const deleteBooking = await prisma.$transaction(async (prisma) => {
      // Xóa các bản ghi trong Cart liên quan đến Booking
      await prisma.cart.deleteMany({
        where: {
          booking_id: BookingId,
        },
      });

      // Cập nhật trạng thái của Price
      await prisma.price.update({
        where: { id: booking.price_id },
        data: {
          status: "TRONG", // Cập nhật trạng thái của Price thành "TRONG"
        },
      });

      await prisma.notification.deleteMany({
        where: {
          booking_id: BookingId, // Giả sử bạn có trường `booking_id` trong bảng `notification`
        },
      });

      // Xóa đơn đặt sân (Booking)
      const DeleteBookingID = await prisma.booking.delete({
        where: { id: BookingId },
      });

      return DeleteBookingID;
    });

    return NextResponse.json(
      {
        deleteBooking,
        message: `Xóa thành công đơn đặt sân theo ID: ${params.id}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Lỗi khi hủy",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
