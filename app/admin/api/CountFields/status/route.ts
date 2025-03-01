import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hoatDongCount = await prisma.fields.count({
      where: { status: "HOATDONG" },
    });

    const baoTriCount = await prisma.fields.count({
      where: { status: "BAOTRI" },
    });

    return NextResponse.json({
      hoatDong: hoatDongCount,
      baoTri: baoTriCount,
    });
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    return NextResponse.json({ error: "Lỗi khi lấy dữ liệu" }, { status: 500 });
  }
}
