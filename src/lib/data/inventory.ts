import type { Vehicle } from "@/types/inventory";

export const demoVehicles: Vehicle[] = [
  {
    id: "bmw-520d-2022",
    slug: "bmw-520d-m-sport-2022",
    title: "BMW 520d M Sport Executive",
    brand: "BMW",
    model: "520d",
    year: 2022,
    price: 3125000,
    currency: "TRY",
    km: 48500,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Yeni", "Otomatik", "Dizel", "Firsat"],
    featured: true,
    sourceUrl: "https://www.sahibinden.com/",
  },
  {
    id: "mercedes-c200-2021",
    slug: "mercedes-c200-amg-2021",
    title: "Mercedes-Benz C200 AMG",
    brand: "Mercedes-Benz",
    model: "C200",
    year: 2021,
    price: 2875000,
    currency: "TRY",
    km: 62000,
    fuel: "Benzin",
    transmission: "Otomatik",
    location: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1617814076668-8df5b77d239b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617814076668-8df5b77d239b?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["Benzin", "Otomatik", "Sedan"],
    sourceUrl: "https://www.sahibinden.com/",
  },
  {
    id: "volvo-xc90-2020",
    slug: "volvo-xc90-inscription-2020",
    title: "Volvo XC90 Inscription 4x4",
    brand: "Volvo",
    model: "XC90",
    year: 2020,
    price: 4190000,
    currency: "TRY",
    km: 71000,
    fuel: "Dizel",
    transmission: "Otomatik",
    location: "Istanbul",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    ],
    tags: ["SUV", "4x4", "Dizel", "Otomatik"],
    featured: true,
    sourceUrl: "https://www.sahibinden.com/",
  },
];

