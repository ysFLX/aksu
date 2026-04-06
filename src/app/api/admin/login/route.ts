import { NextResponse } from "next/server";

import {
  createAdminSessionToken,
  getAdminCookieName,
  getAdminCredentialsConfigured,
  getAdminSessionMaxAge,
  isValidAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!getAdminCredentialsConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "Admin girisi icin env ayarlari eksik.",
      },
      { status: 500 },
    );
  }

  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const username = body.username?.trim() ?? "";
  const password = body.password?.trim() ?? "";

  if (!isValidAdminCredentials(username, password)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Kullanici adi veya sifre hatali.",
      },
      { status: 401 },
    );
  }

  const token = await createAdminSessionToken(username);
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: getAdminCookieName(),
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge(),
  });

  return response;
}
