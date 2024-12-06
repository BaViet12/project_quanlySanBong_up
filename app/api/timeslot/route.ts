import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    const TimeslotAPI = await prisma.timeslot.findMany();

    // Chuyển giờ now sang giờ Việt Nam
    const nowUTC = new Date();
    const nowVN = addHours(nowUTC, 7); // Chuyển từ UTC sang GMT+7

    const updatedSoccer = TimeslotAPI.map((slot) => {
      const startTime = new Date(slot.start_time);
      const endTime = new Date(slot.end_time);

      const isExpired = endTime < nowVN; // So sánh với giờ Việt Nam
      const isAvailable = slot.status !== "DADAT" && !isExpired;

      console.log("now (Việt Nam):", nowVN);
      console.log("startTime:", startTime);
      console.log("endTime:", endTime);
      console.log("isExpired:", isExpired);

      return {
        ...slot,
        status: isAvailable,
      };
    });

    return NextResponse.json(
      { TimeslotAPI: updatedSoccer, message: "Các khung giờ" },
      { status: 201 }
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

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const date = searchParams.get("date"); // Lấy ngày từ query

//     if (!date) {
//       return NextResponse.json(
//         { message: "Vui lòng cung cấp ngày (date)" },
//         { status: 400 }
//       );
//     }

//     // Chuyển giờ ngày bắt đầu và ngày kết thúc (start và end của ngày)
//     const startOfDay = addHours(new Date(`${date}T00:00:00`), -7);
//     const endOfDay = addHours(new Date(`${date}T23:59:59`), -7);

//     // Lấy dữ liệu từ database, lọc theo ngày
//     const Soccer = await prisma.timeslot.findMany({
//       where: {
//         start_time: {
//           gte: startOfDay, // >= bắt đầu từ 00:00
//           lte: endOfDay, // <= kết thúc 23:59
//         },
//       },
//     });

//     const nowUTC = new Date();
//     const nowVN = addHours(nowUTC, 7); // Chuyển giờ sang GMT+7

//     const updatedSoccer = Soccer.map((slot) => {
//       const endTime = new Date(slot.end_time);
//       const isExpired = endTime < nowVN; // So sánh giờ hiện tại

//       return {
//         ...slot,
//         // status: slot.status !== "DADAT" && !isExpired, // Đặt trạng thái khung giờ
//         start_time: addHours(new Date(slot.start_time), 7), // Chuyển sang GMT+7
//         end_time: addHours(new Date(slot.end_time), 7), // Chuyển sang GMT+7
//       };
//     });

//     return NextResponse.json(
//       { Soccer: updatedSoccer, message: "Các khung giờ theo ngày" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.log("Error", error);
//     return NextResponse.json(
//       {
//         message: "Lấy dữ liệu thất bại",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: NextRequest) {
  try {
    const Delete = await prisma.timeslot.deleteMany();
    return NextResponse.json(
      { Delete, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newSan = await prisma.timeslot.create({
      data: {
        name: body.name,
        start_time: body.start_time,
        end_time: body.end_time,
        status: body.status,
      },
    });

    return NextResponse.json(
      { newSan, message: "Tạo khung giờ thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Tạo khung giờ thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
