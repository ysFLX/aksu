import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import type { ExpertiseStatus, Vehicle, VehicleExpertise, VehicleTag } from "@/types/inventory";

const manualInventoryPath = path.join(process.cwd(), "src", "lib", "data", "manual-inventory.json");

type ManualVehicleInput = Omit<Vehicle, "slug" | "currency"> & {
  slug?: string;
  currency?: "TRY";
};

const expertiseKeys: Array<keyof VehicleExpertise> = [
  "frontBumper",
  "hood",
  "roof",
  "rearBumper",
  "leftFrontFender",
  "leftFrontDoor",
  "leftRearDoor",
  "leftRearFender",
  "rightFrontFender",
  "rightFrontDoor",
  "rightRearDoor",
  "rightRearFender",
];

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeExpertise(expertise?: VehicleExpertise): VehicleExpertise | undefined {
  if (!expertise) {
    return undefined;
  }

  const normalized = {} as VehicleExpertise;

  expertiseKeys.forEach((key) => {
    normalized[key] = (expertise[key] ?? "Orijinal") as ExpertiseStatus;
  });

  if (expertise.notes) {
    normalized.notes = expertise.notes;
  }

  return normalized;
}

function normalizeVehicle(input: ManualVehicleInput): Vehicle {
  const gallery = (input.gallery ?? []).filter(Boolean);
  const image = input.image || gallery[0] || "";

  return {
    ...input,
    slug: input.slug?.trim() || slugify(input.title || input.id),
    currency: "TRY",
    image,
    gallery: gallery.length ? gallery : image ? [image] : [],
    tags: (input.tags ?? []).filter(Boolean) as VehicleTag[],
    expertise: normalizeExpertise(input.expertise),
  };
}

export function getManualInventory(): Vehicle[] {
  if (!existsSync(manualInventoryPath)) {
    return [];
  }

  try {
    const raw = readFileSync(manualInventoryPath, "utf8");
    const parsed = JSON.parse(raw) as ManualVehicleInput[];
    return Array.isArray(parsed) ? parsed.map(normalizeVehicle) : [];
  } catch {
    return [];
  }
}

export function saveManualInventory(vehicles: ManualVehicleInput[]) {
  const dir = path.dirname(manualInventoryPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const normalized = vehicles.map(normalizeVehicle);
  writeFileSync(manualInventoryPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}
