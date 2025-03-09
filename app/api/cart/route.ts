import { getSession } from "@/app/lib/auth";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    console.log(session);
    const cartItems = await prisma.cart.findMany({
      where: {
        user_id: session.idUsers,
      },
      include: {
        booking: {
          include: {
            price: {
              include: {
                field: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json({
      cartItems,
      message: `Các đơn hàng trong giỏ hàng của người dùng ${session.idUsers} `,
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu", error);
    return NextResponse.json(
      {
        message: "Lỗi khi đặt sân",
        error: error.message || "Không xác định lỗi ",
      },
      { status: 500 }
    );
  }
}
