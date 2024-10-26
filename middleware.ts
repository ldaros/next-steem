import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded: any = jwtDecode(token.value);

    if (decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/404", request.url));
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: "/admin/:path*",
};
