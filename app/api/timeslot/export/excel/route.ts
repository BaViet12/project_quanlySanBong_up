import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET() {
  try {
    const timeslots = await prisma.timeslot.findMany({
      select: {
        id: true,
        name: true,
        start_time: true,
        end_time: true,
      },
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách các khung giờ");
    worksheet.columns = [
      { header: "Mã giờ", key: "id", width: 10 },
      { header: "Tên khung giờ", key: "name", width: 30 },
      { header: "Giờ bắt đầu", key: "start_time", width: 30 },
      { header: "Giờ kết thúc", key: "end_time", width: 30 },
    ];
    worksheet.getColumn("start_time").numFmt = "yyyy-mm-dd hh:mm:ss";
    worksheet.getColumn("end_time").numFmt = "yyyy-mm-dd hh:mm:ss";
    timeslots.forEach((time) => {
      worksheet.addRow({
        id: time.id,
        name: time.name,
        start_time: time.start_time,
        end_time: time.end_time,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="timeslot.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error: any) {
    console.error("Lỗi xuất file Excel", error);
    return NextResponse.json("Lỗi khi xuất file Excel", { status: 500 });
  }
}
