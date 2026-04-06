import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getAdminCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

const publicAdminPaths = new Set(["/admin/giris", "/api/admin/login", "/api/admin/logout"]);

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(getAdminCookieName())?.value;

  if (!token) {
    return false;
  }

  try {
    await verifyAdminSessionToken(token);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  if (publicAdminPaths.has(pathname)) {
    if (pathname === "/admin/giris" && (await isAuthenticated(request))) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return NextResponse.next();
  }

  if (await isAuthenticated(request)) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ ok: false, message: "Yetkisiz erisim." }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/admin/giris", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
