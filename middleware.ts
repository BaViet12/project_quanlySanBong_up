import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const publicPaths = ["/"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  // Allow access to home page without authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Protected routesm
  if (
    !session &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/register")
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin-only routesi
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    session?.vaitro !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
