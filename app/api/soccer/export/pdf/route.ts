import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const pdf = require("html-pdf-node");

const prisma = new PrismaClient();

export async function GET() {
  try {
    const fields = await prisma.fields.findMany({
      select: {
        id: true,
        name: true,
        field_type: true,
        status: true,
        MoTa: true,
      },
    });

    // HTML template cho PDF
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>Danh Sách Sân Bóng</h1>
        <table>
          <tr>
            <th>ID</th>
            <th>Tên sân</th>
            <th>Loại sân</th>
            <th>Trạng thái</th>
            <th>Mô tả</th>
          </tr>
          ${fields
            .map(
              (field) => `
            <tr>
              <td>${field.id}</td>
              <td>${field.name}</td>
              <td>${field.field_type}</td>
              <td>${field.status}</td>
              <td>${field.MoTa || "Không có mô tả"}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
      </html>
    `;

    const file = { content: htmlContent };

    // Tạo PDF
    const pdfBuffer = await pdf.generatePdf(file, { format: "A4" });

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="fields_list.pdf"',
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("🔥 Lỗi xuất file PDF:", error);
    return new NextResponse("Lỗi khi xuất file PDF", { status: 500 });
  }
}
