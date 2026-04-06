import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { createClient } from "@supabase/supabase-js";

import type { ExpertiseStatus, Vehicle, VehicleExpertise, VehicleTag } from "@/types/inventory";

const manualInventoryPath = path.join(process.cwd(), "src", "lib", "data", "manual-inventory.json");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

type ManualVehicleInput = Omit<Vehicle, "slug" | "currency"> & {
  slug?: string;
  currency?: "TRY";
};

type VehicleRow = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number | null;
  price: number;
  currency: "TRY";
  km: number | null;
  fuel: string;
  transmission: string;
  location: string;
  image: string;
  gallery: string[];
  tags: VehicleTag[];
  featured: boolean;
  source_url: string | null;
  expertise: VehicleExpertise | null;
  sort_order: number;
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

function getFileInventory(): Vehicle[] {
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

function saveFileInventory(vehicles: ManualVehicleInput[]) {
  const dir = path.dirname(manualInventoryPath);

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const normalized = vehicles.map(normalizeVehicle);
  writeFileSync(manualInventoryPath, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}

function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

function getSupabaseAdminClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function mapRowToVehicle(row: VehicleRow): Vehicle {
  return normalizeVehicle({
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    model: row.model,
    year: row.year ?? undefined,
    price: row.price,
    currency: row.currency,
    km: row.km ?? undefined,
    fuel: row.fuel,
    transmission: row.transmission,
    location: row.location,
    image: row.image,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: row.featured,
    sourceUrl: row.source_url ?? undefined,
    expertise: row.expertise ?? undefined,
  });
}

function mapVehicleToRow(vehicle: Vehicle, sortOrder: number): VehicleRow {
  const normalized = normalizeVehicle(vehicle);

  return {
    id: normalized.id,
    slug: normalized.slug,
    title: normalized.title,
    brand: normalized.brand,
    model: normalized.model,
    year: normalized.year ?? null,
    price: normalized.price,
    currency: "TRY",
    km: normalized.km ?? null,
    fuel: normalized.fuel,
    transmission: normalized.transmission,
    location: normalized.location,
    image: normalized.image,
    gallery: normalized.gallery,
    tags: normalized.tags,
    featured: Boolean(normalized.featured),
    source_url: normalized.sourceUrl ?? null,
    expertise: normalized.expertise ?? null,
    sort_order: sortOrder,
  };
}

async function getSupabaseInventory() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, slug, title, brand, model, year, price, currency, km, fuel, transmission, location, image, gallery, tags, featured, source_url, expertise, sort_order",
    )
    .order("sort_order", { ascending: true });

  if (error || !data) {
    throw error ?? new Error("Supabase inventory could not be loaded.");
  }

  return (data as VehicleRow[]).map(mapRowToVehicle);
}

async function saveSupabaseInventory(vehicles: ManualVehicleInput[]) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return [];
  }

  const normalized = vehicles.map(normalizeVehicle);
  const rows = normalized.map((vehicle, index) => mapVehicleToRow(vehicle, index));

  const { error: deleteError } = await supabase.from("vehicles").delete().gte("sort_order", 0);

  if (deleteError) {
    throw deleteError;
  }

  if (!rows.length) {
    return normalized;
  }

  const { data, error } = await supabase.from("vehicles").insert(rows).select(
    "id, slug, title, brand, model, year, price, currency, km, fuel, transmission, location, image, gallery, tags, featured, source_url, expertise, sort_order",
  );

  if (error || !data) {
    throw error ?? new Error("Supabase inventory could not be saved.");
  }

  return (data as VehicleRow[]).sort((a, b) => a.sort_order - b.sort_order).map(mapRowToVehicle);
}

export function getInventoryBackend() {
  return isSupabaseConfigured() ? "supabase" : "file";
}

export async function getManualInventory(): Promise<Vehicle[]> {
  if (!isSupabaseConfigured()) {
    return getFileInventory();
  }

  try {
    return await getSupabaseInventory();
  } catch {
    return getFileInventory();
  }
}

export async function saveManualInventory(vehicles: ManualVehicleInput[]) {
  if (!isSupabaseConfigured()) {
    return saveFileInventory(vehicles);
  }

  try {
    return await saveSupabaseInventory(vehicles);
  } catch {
    return saveFileInventory(vehicles);
  }
}
