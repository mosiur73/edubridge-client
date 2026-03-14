import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Cookie check — rewrite এর কারণে cookie এখন same-origin এ set হবে
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // Token নেই → login
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Token আছে → allow
  // Role based redirect client side এ LoginForm এ করা হয়েছে
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/profile",
  ],
};