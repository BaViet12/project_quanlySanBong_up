import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const notificationsAPI = await prisma.notification.findMany({
      include: {
        booking: {
          include: {
            user: true,
            price: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(
      { notificationsAPI, message: "Tất cả thông báo" },
      { status: 200 }
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

export async function DELETE(req: NextRequest) {
  try {
    const deleteNotification = await prisma.notification.deleteMany();
    return NextResponse.json(
      {
        deleteNotification,
        message: "Đã xóa toàn bộ thông báo",
      },
      { status: 200 }
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
