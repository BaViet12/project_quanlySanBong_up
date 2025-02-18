import { login } from "@/app/lib/auth";
import LoginFormSchema from "@/app/zodschema/zodlogin/route";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = LoginFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }
    const { UserName, MatKhau } = result.data;
    const user = await login(UserName, MatKhau);
    return NextResponse.json(
      { user, message: "Đăng nhập thành công" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 }
    );
  }
}
