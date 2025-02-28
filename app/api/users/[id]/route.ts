import prisma from "@/prisma/client";
import { Phone } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idUser = parseInt(params.id);
    const deleteUser = await prisma.user.delete({
      where: { id: idUser },
    });
    return NextResponse.json({
      deleteUser,
      message: `Xóa thành công người dùng có id ${params.id}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Xóa Không Thành Công" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idUser = parseInt(params.id);
    const data = await req.json();
    const updateData: any = {
      UserName: data.UserName,
      email: data.email,
      Hoten: data.Hoten,
      phone: data.phone,
    };
    const updateUser = await prisma.user.update({
      where: { id: idUser },
      data: updateData,
    });
    return NextResponse.json({
      updateUser,
      message: `Cập nhật thành công Tài khoản`,
    });
  } catch (error: any) {
    console.error("Update error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
