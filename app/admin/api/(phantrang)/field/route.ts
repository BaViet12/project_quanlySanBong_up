import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const limit_size: number = searchParams.get("limit_size")
    ? Number(searchParams.get("limit_size"))
    : 10;

  const skip = (page - 1) * limit_size;

  const totalRecords = await prisma.fields.count();
  const totalPage = Math.ceil(totalRecords / limit_size);
  const data = await prisma.fields.findMany({
    skip,
    take: limit_size,
  });
  return NextResponse.json(
    { data, meta: { totalRecords, totalPage, page, limit_size, skip } },
    { status: 200 }
  );
}
