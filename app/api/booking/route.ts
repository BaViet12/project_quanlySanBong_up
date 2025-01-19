import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
    const Booking = await prisma.booking.findMany();
    return NextResponse.json(
      { Booking, message: "Các đơn đặt sân" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Thất bại", error: error.message },
      { status: 500 }
    );
  }
}

// export async function POST(Request: NextRequest) {
//   try {
//     const body = await Request.json();
//     const price = await prisma.price.findUnique({
//       where: { id: Number(body.price_id) },
//     });
//     if (!price) {
//       return NextResponse.json(
//         { message: "Khung giờ không tồn tại" },
//         { status: 400 }
//       );
//     }
//     if (price.status === "DADAT") {
//       return NextResponse.json(
//         { message: "Khung giờ này đã được đặt" },
//         { status: 400 }
//       );
//     }

//     const newBooking = await prisma.booking.create({
//       data: {
//         user: {
//           connect: { id: Number(body.user_id) },
//         },
//         price: {
//           connect: { id: Number(body.price_id) },
//         },
//         total_price: body.total_price,
//         status: body.status,
//         created_at: new Date(),
//       },
//     });

//     await prisma.price.update({
//       where: { id: Number(body.price_id) },
//       data: {
//         status:"DADAT"
//       },
//     });

//     return NextResponse.json(
//       { newBooking, message: "Đặt sân thành công" },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: "Thất bại", error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function POST(Request: NextRequest) {
  try {
    const body = await Request.json();
    console.log("Request body:", body);

    // Kiểm tra tồn tại khung giờ (price)
    const price = await prisma.price.findUnique({
      where: { id: Number(body.price_id) },
      select: { id: true, status: true },
    });
    console.log("Gio ", body.price_id);

    if (!price) {
      console.error("Khung giờ không tồn tại:", body.price_id);
      return NextResponse.json(
        { message: "Khung giờ không tồn tại" },
        { status: 400 }
      );
    }

    // Kiểm tra trạng thái khung giờ
    if (price.status === "DADAT") {
      return NextResponse.json(
        { message: "Khung giờ này đã được đặt" },
        { status: 400 }
      );
    }
    // Sử dụng giao dịch để đảm bảo đồng bộ dữ liệu
    const [newBooking, updatedPrice] = await prisma.$transaction([
      // Tạo booking mới
      prisma.booking.create({
        data: {
          user: {
            connect: { id: Number(body.user_id) },
          },
          price: {
            connect: { id: Number(body.price_id) },
          },
          total_price: body.total_price,
          status: body.status || "CHUAXACNHAN",
          created_at: new Date(),
        },
      }),
      // Cập nhật trạng thái khung giờ
      prisma.price.update({
        where: { id: Number(body.price_id) },
        data: {
          status: "DADAT",
        },
      }),
    ]);
    console.log("Cập nhật trạng thái khung giờ sau:", updatedPrice.status);
    // Trả về thông tin booking
    return NextResponse.json(
      { newBooking, message: "Đặt sân thành công" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in Booking API:", error);

    return NextResponse.json(
      {
        message: "Đặt sân thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(Request: NextRequest) {
  try {
    // Lấy danh sách tất cả các booking sẽ bị xóa
    const bookings = await prisma.booking.findMany({
      select: {
        price_id: true, // Lấy thông tin price_id của booking
      },
    });

    if (bookings.length === 0) {
      return NextResponse.json(
        { message: "Không có booking nào để xóa" },
        { status: 404 }
      );
    }
    // Sử dụng giao dịch để đảm bảo tính nhất quán
    await prisma.$transaction([
      // Xóa tất cả bookings
      prisma.booking.deleteMany(),
      // Cập nhật trạng thái của các price liên quan
      prisma.price.updateMany({
        where: {
          id: {
            in: bookings.map((booking) => Number(booking.price_id)),
          },
        },
        data: {
          status: "TRONG", // Cập nhật trạng thái về "TRONG"
        },
      }),
    ]);

    return NextResponse.json(
      { message: "Xóa booking và cập nhật trạng thái thành công" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Thất bại", error: error.message },
      { status: 500 }
    );
  }
}
