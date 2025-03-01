import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileType = formData.get("fileType") as string;
    if (!file) {
      return NextResponse.json(
        { error: "Không có file nào được tải lên!" },
        { status: 400 }
      );
    }
    const buffer = await file.arrayBuffer();
    const data = new Uint8Array(buffer);
    let records: any[] = [];
    if (fileType === "excel") {
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      records = XLSX.utils.sheet_to_json(worksheet);
    } else if (fileType === "csv") {
      return NextResponse.json(
        { error: "Định dạng CSV chưa được hỗ trợ!" },
        { status: 400 }
      );
    }

    const transformedRecords = await Promise.all(
      records.map(async (record) => ({
        name: record["Tên sân"] || "Không có tên",
        field_type: Number(record["Loại sân"]) || 0,
        status: record["Trạng thái"] || "HOATDONG",
        HinhAnh: record["Hình ảnh"] || "",
        MoTa: record["Mô tả"] || "",
        update_at: new Date(),
      }))
    );

    // Chèn dữ liệu vào database bằng Prisma
    const result = await prisma.fields.createMany({
      data: transformedRecords,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      data: transformedRecords,
    });
  } catch (error: any) {
    console.error("🔥 Lỗi nhập file Excel:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
