import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Cookie থেকে session token check করা — fetch দরকার নেই
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  // ✅ Login নেই → /login এ redirect
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Session আছে কিন্তু role check করতে হবে
  // Role check এর জন্য backend call করতে হবে
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const userRole = data?.user?.role;

      // STUDENT
      if (userRole === "STUDENT") {
        if (
          pathname.startsWith("/tutor-dashboard") ||
          pathname.startsWith("/admin-dashboard")
        ) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
      }

      // TUTOR
      if (userRole === "TUTOR") {
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/admin-dashboard")
        ) {
          return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
        }
      }

      // ADMIN
      if (userRole === "ADMIN") {
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/tutor-dashboard")
        ) {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
      }
    }
  } catch {
    // fetch fail হলে block করব না
  }

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