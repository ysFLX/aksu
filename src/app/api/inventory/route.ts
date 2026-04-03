import { NextResponse } from "next/server";

import { getInventory } from "@/lib/inventory/service";

export async function GET() {
  const vehicles = await getInventory();
  return NextResponse.json({
    vehicles,
    total: vehicles.length,
    syncedAt: new Date().toISOString(),
  });
}

