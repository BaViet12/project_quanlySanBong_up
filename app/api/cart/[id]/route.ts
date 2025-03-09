import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const CartId = parseInt(params.id);
  try {
    const DeleteCartID = await prisma.cart.delete({
      where: { id: CartId },
    });
    await prisma.price.update({
      where: { id: DeleteCartID.booking_id },
      data: {
        status: "TRONG",
      },
    });
    return NextResponse.json(
      {
        DeleteCartID,
        message: `Hủy thành công đơn đặt sân:${params.id}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi khi hủy sân" });
  }
}
