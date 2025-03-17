import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const limit_size: number = searchParams.get("limit_size")
    ? Number(searchParams.get("limit_size"))
    : 10;
  const skip = (page - 1) * limit_size;
  const totalRecords = await prisma.notification.count();
  const totalPage = Math.ceil(totalRecords / limit_size);
  const notificationsAPI = await prisma.notification.findMany({
    skip,
    take: limit_size,
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
    {
      notificationsAPI,
      totalNotifications: totalRecords,
      meta: { totalRecords, totalPage, page, limit_size, skip },
    },
    { status: 200 }
  );
}
