import { getSession } from "@/app/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(null);
    }

    // Fetch full user data from database
    const user = await prisma.user.findUnique({
      where: {
        id: session.idUsers,
      },
      select: {
        id: true,
        email: true,
        UserName: true,
        Hoten: true,
        phone: true,
        MaVaiTro: true,
        vaitro: {
          select: {
            Ten: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(null);
    }

    // Return user data without sensitive information
    return NextResponse.json({
      id: user.id,
      email: user.email,
      UserName: user.UserName,
      Hoten: user.Hoten,
      phone: user.phone,
      vaitro: user.vaitro,
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null);
  }
}
