import { NextResponse } from "next/server";

import { fetchSahibindenListingData } from "@/lib/sahibinden-parser";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    url?: string;
  };

  const url = body.url?.trim() ?? "";

  if (!url) {
    return NextResponse.json(
      {
        ok: false,
        message: "Sahibinden linki gerekli.",
      },
      { status: 400 },
    );
  }

  try {
    const data = await fetchSahibindenListingData(url);

    return NextResponse.json({
      ok: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Ilan verileri cekilemedi.",
      },
      { status: 400 },
    );
  }
}
