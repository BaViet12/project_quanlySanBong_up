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

export async function POST(Request: NextRequest) {
  try {
    const body = await Request.json();
    const price = await prisma.price.findUnique({
      where: { id: Number(body.price_id) },
    });
    if (!price) {
      return NextResponse.json(
        { message: "Khung giờ không tồn tại" },
        { status: 400 }
      );
    }
    if (price.status === "DADAT") {
      return NextResponse.json(
        { message: "Khung giờ này đã được đặt" },
        { status: 400 }
      );
    }

    const newBooking = await prisma.booking.create({
      data: {
        user: {
          connect: { id: Number(body.user_id) },
        },
        price: {
          connect: { id: Number(body.price_id) },
        },
        total_price: body.total_price,
        status: body.status,
        created_at: new Date(),
      },
    });

    await prisma.price.update({
      where: { id: Number(body.price_id) },
      data: {
        status:"DADAT"
      },
    });

    return NextResponse.json(
      { newBooking, message: "Đặt sân thành công" },
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
    const deleteBooking = await prisma.booking.deleteMany();
    return NextResponse.json(
      { deleteBooking, message: "Xóa thành công " },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Thất bại", error: error.message },
      { status: 500 }
    );
  }
}
