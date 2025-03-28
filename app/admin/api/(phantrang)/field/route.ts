import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const page: number = searchParams.get("page")
//     ? Number(searchParams.get("page"))
//     : 1;
//   const limit_size: number = searchParams.get("limit_size")
//     ? Number(searchParams.get("limit_size"))
//     : 10;

//   const skip = (page - 1) * limit_size;

//   const totalRecords = await prisma.fields.count();
//   const totalPage = Math.ceil(totalRecords / limit_size);
//   const data = await prisma.fields.findMany({
//     skip,
//     take: limit_size,
//   });
//   return NextResponse.json(
//     { data, meta: { totalRecords, totalPage, page, limit_size, skip } },
//     { status: 200 }
//   );
// }

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const limit_size: number = searchParams.get("limit_size")
    ? Number(searchParams.get("limit_size"))
    : 10;
  const filter = searchParams.get("filter");
  const skip = (page - 1) * limit_size;

  try {
    let totalRecords;
    if (filter === "7") {
      totalRecords = await prisma.fields.count({
        where: {
          field_type: 7,
        },
      });
    } else if (filter === "5") {
      totalRecords = await prisma.fields.count({
        where: {
          field_type: 5,
        },
      });
    } else {
      totalRecords = await prisma.fields.count();
    }
    const totalPage = Math.ceil(totalRecords / limit_size);
    let data;
    if (filter === "7") {
      data = await prisma.fields.findMany({
        where: {
          field_type: 7,
        },
        skip,
        take: limit_size,
      });
    } else if (filter === "5") {
      data = await prisma.fields.findMany({
        where: {
          field_type: 5,
        },
        skip,
        take: limit_size,
      });
    } else {
      data = await prisma.fields.findMany({
        skip,
        take: limit_size,
      });
    }
    return NextResponse.json(
      {
        data,
        meta: {
          totalRecords,
          totalPage,
          page,
          limit_size,
          skip,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching field:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi lấy dữ liệu sân bóng",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
