import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours } from "date-fns";

// export async function GET(req: NextRequest) {
//   try {
//     const Soccer = await prisma.fields.findMany({
//       include: {
//         Price: {
//           include: {
//             timeslot: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(
//       { Soccer, message: "Các sân bóng" },
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
    // Lấy toàn bộ danh sách sân bóng kèm khung giờ và giá
    const fields = await prisma.fields.findMany({
      include: {
        Price: {
          include: {
            timeslot: true, // Bao gồm thông tin khung giờ
          },
        },
      },
    });

    // Chuyển giờ hiện tại sang giờ Việt Nam
    const nowUTC = new Date();
    const nowVN = addHours(nowUTC, 7); // UTC → GMT+7

    // Xử lý dữ liệu
    const updatedFields = fields.map((field) => {
      const updatedPrices = field.Price.map((price) => {
        const timeslot = price.timeslot;
        const startTime = new Date(timeslot.start_time);
        const endTime = new Date(timeslot.end_time);

        // Kiểm tra trạng thái của khung giờ
        const isExpired = endTime < nowVN; // Quá giờ hiện tại
        const isAvailable = timeslot.status === "TRONG" && !isExpired;

        return {
          id: timeslot.id,
          name: timeslot.name,
          startTime: startTime,
          endTime: endTime,
          price: price.price,
          status: isAvailable, // true hoặc false
        };
      });

      return {
        id: field.id,
        name: field.name,
        fieldType: field.field_type,
        status: field.status,
        image: field.HinhAnh,
        description: field.MoTa,
        timeslots: updatedPrices,
      };
    });

    return NextResponse.json(
      {
        fields: updatedFields,
        message: "Danh sách tất cả các sân bóng và khung giờ",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Không thể lấy danh sách sân bóng",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const se = await prisma.fields.findUnique({ where: { name: body.name } });
    if (se == null) {
      const newSan = await prisma.fields.create({
        data: {
          name: body.name,
          field_type: parseInt(body.field_type),
          status: body.status,
          HinhAnh: body.HinhAnh,
          MoTa: body.MoTa,
          update_at: new Date(),
        },
      });
      return NextResponse.json(
        { newSan, message: "Tạo sân thành công" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Sân đã tồn tại" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Tạo sân thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const Delete = await prisma.fields.deleteMany();
    return NextResponse.json(
      { Delete, message: "Xóa thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: "Xóa thất bại" }, { status: 400 });
  }
}
