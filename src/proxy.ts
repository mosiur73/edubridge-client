import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: string | null = null;

 
  try {
    const res = await fetch(`${API_URL}/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.user) {
        isAuthenticated = true;
        userRole = data.user.role;
      }
    }
  } catch {
    
  }

 
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
  //Student
  if (userRole === "STUDENT") {
    if (
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  //Tutor
  if (userRole === "TUTOR") {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

 //Admin
  if (userRole === "ADMIN") {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Student routes
    "/dashboard",
    "/dashboard/:path*",

    // Tutor routes
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",

    // Admin routes
    "/admin-dashboard",
    "/admin-dashboard/:path*",

    // Shared profile page
    "/profile",
  ],
};
