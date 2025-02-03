import { NextRequest, NextResponse } from "next/server";

export async function GET(Request: NextRequest) {
  try {
  } catch (error: any) {
    console.log("Error", error);
    return NextResponse.json(
      {
        message: "Thất bại",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
