import { NextResponse } from "next/server";

import { getManualInventory, saveManualInventory } from "@/lib/inventory/manual";
import type { Vehicle } from "@/types/inventory";

export async function GET() {
  const vehicles = getManualInventory();

  return NextResponse.json({
    vehicles,
    total: vehicles.length,
  });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as { vehicles?: Vehicle[] };
  const vehicles = Array.isArray(body.vehicles) ? body.vehicles : [];
  const saved = saveManualInventory(vehicles);

  return NextResponse.json({
    ok: true,
    vehicles: saved,
    total: saved.length,
  });
}
