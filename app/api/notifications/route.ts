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
