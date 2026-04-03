import { getSahibindenVehicles } from "@/lib/inventory/providers/sahibinden";

export async function getInventory() {
  const vehicles = await getSahibindenVehicles();
  return vehicles.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

