import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const isProtectedPath = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPath && !token) {
    const loginUrl = new URL(ROUTES.HOME, request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/users/:path*"],
};
