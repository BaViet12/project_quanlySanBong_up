import { signUp } from "@/app/lib/auth";
import RegisterFormSchema from "@/app/zodschema/zodregister/route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(Request: NextRequest) {
  try {
    const body = await Request.json();
    const result = RegisterFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    } else {
      const { UserName, MatKhau, Hoten, phone, email } = result.data;
      const user = await signUp(email, UserName, MatKhau, Hoten, phone);
      return NextResponse.json(
        { user, message: "Đăng ký thành công" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Đăng ký thất bại" }, { status: 400 });
  }
}
