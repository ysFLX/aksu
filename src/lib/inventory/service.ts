import { getManualInventory } from "@/lib/inventory/manual";
import { getSahibindenVehicles } from "@/lib/inventory/providers/sahibinden";

export async function getInventory() {
  const manualVehicles = await getManualInventory();
  const vehicles = manualVehicles.length ? manualVehicles : await getSahibindenVehicles();
  return vehicles.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export async function getFeaturedInventory(limit = 3) {
  const vehicles = await getInventory();
  return vehicles.slice(0, limit);
}

export async function getVehicleBySlug(slug: string) {
  const vehicles = await getInventory();
  return vehicles.find((vehicle) => vehicle.slug === slug) ?? null;
}
