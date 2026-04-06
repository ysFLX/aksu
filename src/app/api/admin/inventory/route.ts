import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getInventoryBackend, getManualInventory, saveManualInventory } from "@/lib/inventory/manual";
import type { Vehicle } from "@/types/inventory";

function formatRouteError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const errorObject = error as Record<string, unknown>;
    const parts = [errorObject.message, errorObject.details, errorObject.hint]
      .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
      .map((value) => value.trim());

    if (parts.length) {
      return parts.join(" | ");
    }
  }

  return "Kayit sirasinda bir hata olustu. Supabase tablo yapisini ve env ayarlarini kontrol et.";
}

export async function GET() {
  const vehicles = await getManualInventory();

  return NextResponse.json({
    backend: getInventoryBackend(),
    vehicles,
    total: vehicles.length,
  });
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { vehicles?: Vehicle[] };
    const vehicles = Array.isArray(body.vehicles) ? body.vehicles : [];
    const saved = await saveManualInventory(vehicles);

    revalidatePath("/");
    revalidatePath("/ilanlar");
    revalidatePath("/admin");
    saved.forEach((vehicle) => {
      revalidatePath(`/ilanlar/${vehicle.slug}`);
    });

    return NextResponse.json({
      backend: getInventoryBackend(),
      ok: true,
      vehicles: saved,
      total: saved.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: formatRouteError(error),
      },
      { status: 500 },
    );
  }
}
