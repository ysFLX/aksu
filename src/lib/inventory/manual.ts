import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { createClient } from "@supabase/supabase-js";

import type { ExpertiseStatus, Vehicle, VehicleExpertise, VehicleTag } from "@/types/inventory";

const manualInventoryPath = path.join(process.cwd(), "src", "lib", "data", "manual-inventory.json");
const uploadDirectoryPath = path.join(process.cwd(), "public", "uploads", "vehicles");
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseStorageBucket = process.env.SUPABASE_STORAGE_BUCKET || "vehicle-images";

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
  description: string | null;
  expertise: VehicleExpertise | null;
  sort_order: number;
};

type LegacyVehicleRow = Omit<VehicleRow, "description">;

type ExpertisePayload = VehicleExpertise & {
  __description?: string;
};

const vehicleSelectColumns =
  "id, slug, title, brand, model, year, price, currency, km, fuel, transmission, location, image, gallery, tags, featured, source_url, description, expertise, sort_order";
const legacyVehicleSelectColumns =
  "id, slug, title, brand, model, year, price, currency, km, fuel, transmission, location, image, gallery, tags, featured, source_url, expertise, sort_order";

function formatSupabaseError(error: unknown) {
  if (!error || typeof error !== "object") {
    return "";
  }

  const errorObject = error as Record<string, unknown>;

  return [errorObject.message, errorObject.details, errorObject.hint]
    .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
    .join(" | ");
}

function isMissingDescriptionColumnError(error: unknown) {
  const message = formatSupabaseError(error).toLocaleLowerCase("tr-TR");
  return message.includes("description") && (message.includes("column") || message.includes("schema cache"));
}

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

function inferBrand(value: string) {
  return value.split(" ")[0]?.trim() || "Arac";
}

function inferModel(title: string, brand: string) {
  const normalizedTitle = title.trim();
  const normalizedBrand = brand.trim();
  const withoutBrand = normalizedTitle.toLocaleLowerCase("tr-TR").startsWith(normalizedBrand.toLocaleLowerCase("tr-TR"))
    ? normalizedTitle.slice(normalizedBrand.length).trim()
    : normalizedTitle;

  return withoutBrand.split(" ").slice(0, 2).join(" ") || "Model";
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

function extractDescriptionFromExpertise(expertise: VehicleExpertise | null | undefined) {
  if (!expertise || typeof expertise !== "object") {
    return undefined;
  }

  const payload = expertise as ExpertisePayload;
  return typeof payload.__description === "string" && payload.__description.trim() ? payload.__description.trim() : undefined;
}

function normalizeVehicle(input: ManualVehicleInput): Vehicle {
  const gallery = (input.gallery ?? []).filter(Boolean);
  const image = input.image || gallery[0] || "";
  const title = input.title?.trim() || input.id;
  const brand = input.brand?.trim() || inferBrand(title);
  const model = input.model?.trim() || inferModel(title, brand);

  return {
    ...input,
    title,
    brand,
    model,
    slug: input.slug?.trim() || slugify(title),
    currency: "TRY",
    image,
    gallery: gallery.length ? gallery : image ? [image] : [],
    tags: (input.tags ?? []).filter(Boolean) as VehicleTag[],
    description: input.description?.trim() || undefined,
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

function canUseFileFallback() {
  return process.env.NODE_ENV !== "production";
}

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function getSupabaseAdminClient() {
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

async function ensureStorageBucket() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const { data: buckets, error: listError } = await supabase.storage.listBuckets();

  if (listError) {
    throw listError;
  }

  const exists = buckets?.some((bucket) => bucket.name === supabaseStorageBucket);

  if (!exists) {
    const { error: createError } = await supabase.storage.createBucket(supabaseStorageBucket, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    });

    if (createError) {
      throw createError;
    }
  }

  return supabase;
}

function ensureUploadDirectory() {
  if (!existsSync(uploadDirectoryPath)) {
    mkdirSync(uploadDirectoryPath, { recursive: true });
  }
}

function sanitizeFileName(fileName: string) {
  const extension = path.extname(fileName) || ".jpg";
  const baseName = path.basename(fileName, extension).toLocaleLowerCase("tr-TR").replace(/[^a-z0-9]+/g, "-");
  return `${baseName || "gorsel"}-${randomUUID()}${extension.toLocaleLowerCase("tr-TR")}`;
}

export async function uploadVehicleImage(file: File) {
  const fileName = sanitizeFileName(file.name);

  if (isSupabaseConfigured()) {
    try {
      const supabase = await ensureStorageBucket();

      if (!supabase) {
        throw new Error("Supabase storage is not configured.");
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `admin/${fileName}`;

      const { error: uploadError } = await supabase.storage.from(supabaseStorageBucket).upload(filePath, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: false,
      });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(supabaseStorageBucket).getPublicUrl(filePath);

      return data.publicUrl;
    } catch {
      // file fallback below
    }
  }

  ensureUploadDirectory();
  const targetPath = path.join(uploadDirectoryPath, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  writeFileSync(targetPath, buffer);

  return `/uploads/vehicles/${fileName}`;
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
    description: row.description ?? undefined,
    expertise: row.expertise ?? undefined,
  });
}

function mapLegacyRowToVehicle(row: LegacyVehicleRow): Vehicle {
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
    description: extractDescriptionFromExpertise(row.expertise),
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
    description: normalized.description ?? null,
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
    .select(vehicleSelectColumns)
    .order("sort_order", { ascending: true });

  if (!error && data) {
    return (data as VehicleRow[]).map(mapRowToVehicle);
  }

  const legacy = await supabase.from("vehicles").select(legacyVehicleSelectColumns).order("sort_order", { ascending: true });

  if (legacy.error || !legacy.data) {
    throw legacy.error ?? error ?? new Error("Supabase inventory could not be loaded.");
  }

  return (legacy.data as LegacyVehicleRow[]).map(mapLegacyRowToVehicle);
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

  const insertResult = await supabase.from("vehicles").insert(rows);

  if (!insertResult.error) {
    return await getSupabaseInventory();
  }

  if (!isMissingDescriptionColumnError(insertResult.error)) {
    throw insertResult.error;
  }

  const legacyRows = rows.map((row) => {
    const { description, expertise, ...rest } = row;
    const nextExpertise =
      description && description.trim()
        ? ({ ...(expertise ?? {}), __description: description.trim() } as ExpertisePayload)
        : expertise;

    return {
      ...rest,
      expertise: nextExpertise,
    };
  });

  const legacyInsert = await supabase.from("vehicles").insert(legacyRows);

  if (legacyInsert.error) {
    throw new Error(
      "Aciklama kaydedilemedi. Supabase tablosunda description kolonu eksik. supabase/vehicles.sql dosyasini tekrar calistir.",
    );
  }

  return await getSupabaseInventory();
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
    if (canUseFileFallback()) {
      return getFileInventory();
    }

    return [];
  }
}

export async function saveManualInventory(vehicles: ManualVehicleInput[]) {
  if (!isSupabaseConfigured()) {
    if (!canUseFileFallback()) {
      throw new Error("Supabase ayarlari eksik. Production ortaminda dosyaya yazilamaz.");
    }

    return saveFileInventory(vehicles);
  }

  try {
    return await saveSupabaseInventory(vehicles);
  } catch (error) {
    if (canUseFileFallback()) {
      return saveFileInventory(vehicles);
    }

    throw error;
  }
}
