// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  console.log("[Token]:", token);
  const pathname = request.nextUrl.pathname;
  const isProtectedRoute =
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/category-management") ||
  pathname.startsWith("/content-analytics") ||  
  pathname.startsWith("/user-management") ||
  pathname.startsWith("/video-management") 



  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/category-management/:path*"
    , "/content-analytics/:path*","/user-management/:path*", "/video-management/:path*" ],
};
