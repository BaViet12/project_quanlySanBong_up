import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { date } from "zod";

export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const revenueMonth = await Promise.all(
      Array.from({ length: 12 }, async (_, i) => {
        const firstDay = new Date(year, i, 1);
        const lastDay = new Date(year, i + 1, 0, 23, 59, 59);
        const totalRevenue = await prisma.booking.aggregate({
          where: {
            status: "DAXACNHAN",
            created_at: {
              gte: firstDay,
              lte: lastDay,
            },
          },
          _sum: {
            total_price: true,
          },
        });
        return {
          month: i + 1,
          revenue: Number(totalRevenue._sum.total_price),
        };
      })
    );
    return NextResponse.json(
      {
        revenueMonth,
        message: "Doanh thu từng tháng trong năm nay",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Thất bại khi tính doanh thu",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
