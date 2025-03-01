import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import ExcelJS from "exceljs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const fields = await prisma.fields.findMany({
      select: {
        id: true,
        name: true,
        field_type: true,
        status: true,
        HinhAnh: true,
        MoTa: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh sách sân bóng");

    worksheet.columns = [
      { header: "Mã sân", key: "id", width: 10 },
      { header: "Tên sân", key: "name", width: 20 },
      { header: "Loại sân", key: "field_type", width: 10 },
      { header: "Trạng thái", key: "status", width: 10 },
      { header: "Hình ảnh", key: "HinhAnh", width: 50 },
      { header: "Mô tả", key: "MoTa", width: 30 },
    ];

    fields.forEach((field) => {
      worksheet.addRow(field);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="fields.xlsx"',
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("🔥 Lỗi xuất file Excel:", error);
    return new NextResponse("Lỗi khi xuất file Excel", { status: 500 });
  }
}
