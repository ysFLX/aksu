import generatedStore from "@/lib/data/generated/sahibinden-store.generated.json";
import type { Vehicle, VehicleTag } from "@/types/inventory";

const DEFAULT_SAHIBINDEN_STORE_URL = "https://gorkemoto.sahibinden.com/";

type SeedVehicleInput = {
  id: string;
  title: string;
  color: string;
  price: number;
  publishedAt: string;
};

type SyncedVehicleRecord = {
  id: string;
  title?: string;
  price?: number;
  image?: string;
  gallery?: string[];
  sourceUrl?: string;
  location?: string;
  fuel?: string;
  transmission?: string;
  km?: number;
  year?: number;
  brand?: string;
  model?: string;
  description?: string;
};

const brandImages: Record<string, string> = {
  Fiat:
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80",
  Renault:
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1200&q=80",
  Volkswagen:
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
  Skoda:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  BMW:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
};

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferBrand(title: string) {
  if (/egea/i.test(title)) return "Fiat";
  if (/clio|fluence|master/i.test(title)) return "Renault";
  if (/golf|caddy/i.test(title)) return "Volkswagen";
  if (/octavia|scala/i.test(title)) return "Skoda";
  if (/520i|bmw/i.test(title)) return "BMW";
  return "Arac";
}

function inferModel(title: string) {
  if (/egea/i.test(title)) return "Egea";
  if (/clio/i.test(title)) return "Clio";
  if (/golf style/i.test(title)) return "Golf Style";
  if (/golf 1\.5tsi/i.test(title)) return "Golf";
  if (/caddy/i.test(title)) return "Caddy";
  if (/octavia/i.test(title)) return "Octavia";
  if (/master/i.test(title)) return "Master";
  if (/scala/i.test(title)) return "Scala";
  if (/fluence/i.test(title)) return "Fluence";
  if (/520i/i.test(title)) return "520i";
  return "Model";
}

function inferFuel(title: string) {
  if (/tdi|dci/i.test(title)) return "Dizel";
  if (/etsi|tsi|520i/i.test(title)) return "Benzin";
  return "Bilinmiyor";
}

function inferTransmission(title: string) {
  if (/otomatik/i.test(title)) return "Otomatik";
  return "Bilinmiyor";
}

function inferTags(title: string): VehicleTag[] {
  const tags: VehicleTag[] = ["Firsat"];

  if (/otomatik/i.test(title)) {
    tags.push("Otomatik");
  }

  if (/tdi|dci/i.test(title)) {
    tags.push("Dizel");
  }

  if (/tsi|etsi|520i/i.test(title)) {
    tags.push("Benzin");
  }

  if (/caddy|master/i.test(title)) {
    tags.push("Hatcback");
  }

  return Array.from(new Set(tags));
}

function inferKm(title: string) {
  const match = title.match(/(\d{2,3}\.\d{3})\s*km/i);
  if (!match) return undefined;
  return Number(match[1].replace(/\./g, ""));
}

function inferYear(title: string) {
  const match = title.match(/\b(20\d{2}|19\d{2})\b/);
  return match ? Number(match[1]) : undefined;
}

function toVehicle(input: SeedVehicleInput, synced?: SyncedVehicleRecord): Vehicle {
  const resolvedTitle = synced?.title ?? input.title;
  const brand = synced?.brand ?? inferBrand(resolvedTitle);
  const fallbackImage = brandImages[brand] ?? brandImages.BMW;
  const image = synced?.image ?? fallbackImage;
  const gallery = synced?.gallery?.length ? synced.gallery : [image];

  return {
    id: input.id,
    slug: slugify(resolvedTitle),
    title: resolvedTitle,
    brand,
    model: synced?.model ?? inferModel(resolvedTitle),
    year: synced?.year ?? inferYear(resolvedTitle),
    price: synced?.price ?? input.price,
    currency: "TRY",
    km: synced?.km ?? inferKm(resolvedTitle),
    fuel: synced?.fuel ?? inferFuel(resolvedTitle),
    transmission: synced?.transmission ?? inferTransmission(resolvedTitle),
    location: synced?.location ?? "Konya / Karatay",
    image,
    gallery,
    tags: inferTags(resolvedTitle),
    featured: ["64", "65", "66"].includes(input.id),
    sourceUrl: synced?.sourceUrl ?? process.env.NEXT_PUBLIC_SAHIBINDEN_STORE_URL ?? DEFAULT_SAHIBINDEN_STORE_URL,
  };
}

const seedVehicles: SeedVehicleInput[] = [
  {
    id: "64",
    title: "Gorkem | Hatasiz Boyasiz! | Urban Egea Otomatik | Karta Taksit!",
    color: "Fume",
    price: 1159000,
    publishedAt: "2025-12-20",
  },
  {
    id: "65",
    title: "Gorkem | Sorunsuz | Dusuk Km Touch Clio | Karta Taksit!",
    color: "Beyaz",
    price: 725000,
    publishedAt: "2025-12-20",
  },
  {
    id: "66",
    title: "Gorkem | Sorunsuz 1.0eTSI Golf Style | Karta Taksit!",
    color: "Mavi",
    price: 1485000,
    publishedAt: "2025-12-19",
  },
  {
    id: "67",
    title: "Gorkem | Sorunsuz | Otomatik Caddy Comfortline | Karta Taksit",
    color: "Gumus Gri",
    price: 719000,
    publishedAt: "2025-12-15",
  },
  {
    id: "68",
    title: "Gorkem | Hatasiz! 1 Boya | 1.6 TDI Octavia | Karta Taksit",
    color: "Beyaz",
    price: 1195000,
    publishedAt: "2025-12-11",
  },
  {
    id: "69",
    title: "Gorkem | 2.3 dCi Renault Master 15m3 | Karta Taksit!",
    color: "Beyaz",
    price: 450000,
    publishedAt: "2025-12-10",
  },
  {
    id: "70",
    title: "Gorkem | Hatasiz Boyasiz! | 1.6 TDI Scala | Karta Taksit!",
    color: "Mavi",
    price: 1439000,
    publishedAt: "2025-12-08",
  },
  {
    id: "71",
    title: "Gorkem | Hatasiz Boyasiz! | Touch Plus Fluence | 63.000 Km",
    color: "Gri",
    price: 925000,
    publishedAt: "2025-12-07",
  },
  {
    id: "72",
    title: "Gorkem | Hatasiz Boyasiz! | 520i Special Edition Luxury",
    color: "Gri",
    price: 3685000,
    publishedAt: "2025-12-07",
  },
  {
    id: "73",
    title: "Gorkem | Hatasiz Boyasiz! | VW Golf 1.5 TSI Otomatik | Sorunsuz!",
    color: "Siyah",
    price: 1359000,
    publishedAt: "2025-12-07",
  },
];

const syncedById = new Map(
  (generatedStore as SyncedVehicleRecord[]).map((vehicle) => [vehicle.id, vehicle]),
);

export const sahibindenStoreSnapshot: Vehicle[] = seedVehicles.map((vehicle) =>
  toVehicle(vehicle, syncedById.get(vehicle.id)),
);
