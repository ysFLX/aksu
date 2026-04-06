import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getInventoryBackend, getManualInventory, saveManualInventory } from "@/lib/inventory/manual";
import type { Vehicle } from "@/types/inventory";

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
        message:
          error instanceof Error
            ? error.message
            : "Kayit sirasinda bir hata olustu. Supabase tablo yapisini ve env ayarlarini kontrol et.",
      },
      { status: 500 },
    );
  }
}
