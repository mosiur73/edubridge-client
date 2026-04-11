import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/dashboard", "/tutor-dashboard", "/admin-dashboard", "/profile"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivatePath = privatePaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/"),
  );

  if (isPrivatePath) {
    // ✅ Mentor pattern — cookie name check
    const token =
      request.cookies.get("__Secure-session_token") ||
      request.cookies.get("session_token");

    if (!token) {
      console.log("No token found. Redirecting to login...");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};