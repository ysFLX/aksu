import { z } from "zod";

import { demoVehicles } from "@/lib/data/inventory";
import { sahibindenStoreSnapshot } from "@/lib/data/sahibinden-store";
import type { Vehicle } from "@/types/inventory";

const DEFAULT_SAHIBINDEN_STORE_URL = "https://huseyinaksuotomotiv.sahibinden.com/";

const remoteVehicleSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  price: z.number(),
  km: z.number().optional(),
  fuel: z.string().optional(),
  transmission: z.string().optional(),
  location: z.string().optional(),
  image: z.string().url(),
  gallery: z.array(z.string().url()).optional(),
  url: z.string().url().optional(),
});

function normalizeVehicle(input: z.infer<typeof remoteVehicleSchema>): Vehicle {
  const title = input.title.trim();
  const baseSlug = title
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const inferredModel = title.split(" ").slice(1, 3).join(" ");

  return {
    id: String(input.id),
    slug: baseSlug || String(input.id),
    title,
    brand: input.brand ?? title.split(" ")[0] ?? "Arac",
    model: (input.model ?? inferredModel) || "Model",
    year: input.year ?? new Date().getFullYear(),
    price: input.price,
    currency: "TRY",
    km: input.km ?? 0,
    fuel: input.fuel ?? "Bilinmiyor",
    transmission: input.transmission ?? "Bilinmiyor",
    location: input.location ?? "Turkiye",
    image: input.image,
    gallery: input.gallery?.length ? input.gallery : [input.image],
    tags: ["Firsat"],
    sourceUrl: input.url ?? process.env.NEXT_PUBLIC_SAHIBINDEN_STORE_URL,
  };
}

export async function getSahibindenVehicles(): Promise<Vehicle[]> {
  const feedUrl = process.env.SAHIBINDEN_FEED_URL;
  const storeUrl = process.env.NEXT_PUBLIC_SAHIBINDEN_STORE_URL ?? DEFAULT_SAHIBINDEN_STORE_URL;
  const storeSnapshot =
    storeUrl?.includes("huseyinaksuotomotiv.sahibinden.com") ? sahibindenStoreSnapshot : demoVehicles;

  if (!feedUrl) {
    return storeSnapshot;
  }

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 900 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return storeSnapshot;
    }

    const json = await response.json();
    const parsed = z.array(remoteVehicleSchema).safeParse(json);

    if (!parsed.success) {
      return storeSnapshot;
    }

    return parsed.data.map(normalizeVehicle);
  } catch {
    return storeSnapshot;
  }
}
