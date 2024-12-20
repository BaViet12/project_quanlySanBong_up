import prisma from "@/prisma/client";
import { timeStamp } from "console";
import { NextRequest, NextResponse } from "next/server";
import { parseISO, isAfter, addHours } from "date-fns";

export async function GET(req: NextRequest) {
  try {
    // Lấy dữ liệu sân bóng kèm khung giờ và giá
    const fields = await prisma.fields.findMany({
      include: {
        Price: {
          include: {
            timeslot: true, // Bao gồm thông tin khung giờ từ bảng Timeslot
          },
        },
      },
    });

    // Giờ hiện tại Việt Nam
    const nowUTC = new Date();
    const nowVN = addHours(nowUTC, 7); // Giờ UTC + 7

    // Xử lý logic để kiểm tra trạng thái khung giờ và giá
    const updatedFields = fields.map((field) => {
      // Kiểm tra mỗi price trong bảng Price
      const updatedPrices = field.Price.map((price) => {
        const { timeslot } = price; // Giải nén thông tin timeslot và status của Price
        const endTime = new Date(timeslot.end_time);

        // Logic xử lý trạng thái
        let updatedStatus: boolean;

        if (endTime < nowVN && price.status === "DADAT") {
          updatedStatus = false; // Quá giờ hiện tại và đã đặt
        } else if (endTime >= nowVN && price.status === "TRONG") {
          updatedStatus = true; // Chưa qua giờ hiện tại và còn trống
        } else {
          updatedStatus = false; // Trạng thái mặc định khác (nếu không thỏa điều kiện)
        }

        return {
          id: price.id,
          name: timeslot.name,
          startTime: timeslot.start_time,
          endTime: timeslot.end_time,
          price: price.price,
          status: updatedStatus, // Gán trạng thái mới (true hoặc false)
        };
      });

      // Trả về dữ liệu sân bóng và khung giờ
      return {
        id: field.id,
        name: field.name,
        fieldType: field.field_type,
        status: field.status,
        image: field.HinhAnh,
        description: field.MoTa,
        timeslots: updatedPrices, // Danh sách khung giờ đã cập nhật trạng thái
      };
    });

    // Trả dữ liệu về JSON
    return NextResponse.json(
      {
        fields: updatedFields,
        message: "Danh sách sân bóng và trạng thái khung giờ",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
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
    console.error("Error creating field:", error);
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
