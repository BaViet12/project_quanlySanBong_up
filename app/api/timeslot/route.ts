import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours } from "date-fns";

// export async function GET(req: NextRequest) {
//   try {
//     const Soccer = await prisma.timeslot.findMany();

//     // Lấy thời gian hiện tại
//     const now = new Date();

//     // Xử lý status trả về true hoặc false
//     const updatedSoccer = Soccer.map((slot) => {
//       const startTime = new Date(slot.start_time);
//       const endTime = new Date(slot.end_time);
//       // const isExpired = endTime.getTime() < now.getTime();
//       const isExpired = isAfter(now, endTime);

//       const isAvailable = slot.status !== "DADAT" && !isExpired;

//       console.log("now:", now);
//       console.log("startTime:", startTime);
//       console.log("endTime:", endTime);
//       console.log("isExpired:", isExpired);

//       return {
//         ...slot,
//         status: isAvailable ? true : false, // Chuyển đổi status
//       };
//     });

//     return NextResponse.json(
//       { Soccer: updatedSoccer, message: "Các khung giờ" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.log("Error", error);
//     return NextResponse.json(
//       {
//         message: "Thất bại",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const Soccer = await prisma.timeslot.findMany();

    // Chuyển giờ now sang giờ Việt Nam
    const nowUTC = new Date();
    const nowVN = addHours(nowUTC, 7); // Chuyển từ UTC sang GMT+7

    const updatedSoccer = Soccer.map((slot) => {
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
      { Soccer: updatedSoccer, message: "Các khung giờ" },
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
