import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json({ user, message: "Tất cả tài khoản " });
  } catch (error: any) {
    return NextResponse.json({ message: "Không tìm thấy tài khoản" });
  }
}
