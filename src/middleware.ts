import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/auth";
import { route } from "./lib/routes";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!(await getCurrentUser(req.cookies));

  if (pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL(route.login, req.url));
  }

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL(route.dashboard, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
