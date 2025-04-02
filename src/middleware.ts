import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";
import { route } from "./lib/routes";

async function protectDashboard(
  req: NextRequest
): Promise<NextResponse | void> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(route.login, req.url));
  }
  try {
    await verifyToken(token);
  } catch (err) {
    console.error("[MIDDLEWARE_VERIFY_TOKEN_ERROR]:", err);
    return NextResponse.redirect(new URL(route.login, req.url));
  }
}

async function protectLogin(req: NextRequest): Promise<NextResponse | void> {
  const token = req.cookies.get("token")?.value;

  if (!token) return;

  try {
    await verifyToken(token);
    return NextResponse.redirect(new URL(route.dashboard, req.url));
  } catch {
    return;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const dashboardMW = await protectDashboard(req);
    if (dashboardMW) return dashboardMW;
  }

  if (pathname === "/login") {
    const loginMW = await protectLogin(req);
    if (loginMW) return loginMW;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
