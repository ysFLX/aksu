import { NextResponse } from "next/server";

import { fallbackSahibindenListingData, fetchSahibindenListingData } from "@/lib/sahibinden-parser";

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
      partial: false,
    });
  } catch (error) {
    const fallback = fallbackSahibindenListingData(url);
    const message = error instanceof Error ? error.message : "Ilan verileri cekilemedi.";

    return NextResponse.json({
      ok: true,
      data: fallback,
      partial: true,
      message: `${message} Temel veriler linkten tahmini olarak dolduruldu.`,
    });
  }
}
