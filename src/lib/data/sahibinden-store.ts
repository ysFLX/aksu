import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

import type { Vehicle, VehicleTag } from "@/types/inventory";

const DEFAULT_SAHIBINDEN_STORE_URL = "https://gorkemoto.sahibinden.com/";
const LOCAL_CAR_ROOT = path.join(process.cwd(), "src", "arabalar");

type LocalVehicleSeed = {
  id: string;
  folder: string;
  title: string;
  brand: string;
  model: string;
  year?: number;
  price: number;
  km?: number;
  fuel: string;
  transmission: string;
  location: string;
  tags: VehicleTag[];
  featured?: boolean;
};

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getGalleryForFolder(folder: string) {
  const folderPath = path.join(LOCAL_CAR_ROOT, folder);

  if (!existsSync(folderPath)) {
    return [];
  }

  return readdirSync(folderPath)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "tr"))
    .map((file) => `/api/car-images/${folder}/${file}`);
}

const localVehicleSeeds: LocalVehicleSeed[] = [
  {
    id: "64",
    folder: "520i",
    title: "BMW 520i Special Edition Luxury",
    brand: "BMW",
    model: "520i",
    year: 2020,
    price: 3685000,
    km: 63000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Otomatik"],
    featured: true,
  },
  {
    id: "65",
    folder: "b150",
    title: "Mercedes-Benz B150",
    brand: "Mercedes-Benz",
    model: "B150",
    year: 2011,
    price: 975000,
    km: 142000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Hatcback"],
    featured: true,
  },
  {
    id: "66",
    folder: "c200",
    title: "Mercedes-Benz C200 AMG",
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2021,
    price: 2875000,
    km: 62000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Sedan"],
    featured: true,
  },
  {
    id: "67",
    folder: "clio",
    title: "Renault Clio Touch",
    brand: "Renault",
    model: "Clio",
    year: 2020,
    price: 725000,
    km: 89000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Otomatik"],
  },
  {
    id: "68",
    folder: "corolla",
    title: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    year: 2021,
    price: 1195000,
    km: 54000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Sedan"],
  },
  {
    id: "69",
    folder: "fluence",
    title: "Renault Fluence Touch Plus",
    brand: "Renault",
    model: "Fluence",
    year: 2016,
    price: 925000,
    km: 63000,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Dizel", "Sedan"],
  },
  {
    id: "70",
    folder: "focus",
    title: "Ford Focus",
    brand: "Ford",
    model: "Focus",
    year: 2019,
    price: 1095000,
    km: 97000,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Dizel", "Hatcback"],
  },
  {
    id: "71",
    folder: "iveco",
    title: "Iveco Daily",
    brand: "Iveco",
    model: "Daily",
    year: 2018,
    price: 1450000,
    km: 186000,
    fuel: "Dizel",
    transmission: "Manuel",
    location: "Konya / Karatay",
    tags: ["Firsat", "Dizel"],
  },
  {
    id: "72",
    folder: "megane1.3",
    title: "Renault Megane 1.3 TCe",
    brand: "Renault",
    model: "Megane 1.3",
    year: 2022,
    price: 1439000,
    km: 51000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "Sedan"],
  },
  {
    id: "73",
    folder: "megane1.5",
    title: "Renault Megane 1.5 dCi",
    brand: "Renault",
    model: "Megane 1.5",
    year: 2020,
    price: 1325000,
    km: 78000,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Dizel", "Sedan"],
  },
  {
    id: "74",
    folder: "passat",
    title: "Volkswagen Passat",
    brand: "Volkswagen",
    model: "Passat",
    year: 2020,
    price: 1745000,
    km: 84000,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Dizel", "Sedan"],
  },
  {
    id: "75",
    folder: "tucson",
    title: "Hyundai Tucson",
    brand: "Hyundai",
    model: "Tucson",
    year: 2021,
    price: 1965000,
    km: 47000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Konya / Karatay",
    tags: ["Firsat", "Benzin", "SUV"],
  },
];

export const sahibindenStoreSnapshot: Vehicle[] = localVehicleSeeds.map((vehicle) => {
  const gallery = getGalleryForFolder(vehicle.folder);
  const image = gallery[0] ?? "";

  return {
    id: vehicle.id,
    slug: slugify(vehicle.title),
    title: vehicle.title,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    currency: "TRY",
    km: vehicle.km,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
    location: vehicle.location,
    image,
    gallery,
    tags: vehicle.tags,
    featured: vehicle.featured,
    sourceUrl: process.env.NEXT_PUBLIC_SAHIBINDEN_STORE_URL ?? DEFAULT_SAHIBINDEN_STORE_URL,
  };
});
