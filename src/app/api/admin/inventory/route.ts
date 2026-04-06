import { NextResponse } from "next/server";

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
  const body = (await request.json()) as { vehicles?: Vehicle[] };
  const vehicles = Array.isArray(body.vehicles) ? body.vehicles : [];
  const saved = await saveManualInventory(vehicles);

  return NextResponse.json({
    backend: getInventoryBackend(),
    ok: true,
    vehicles: saved,
    total: saved.length,
  });
}
