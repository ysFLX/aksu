export type VehicleTag =
  | "Yeni"
  | "Otomatik"
  | "Dizel"
  | "Benzin"
  | "SUV"
  | "Sedan"
  | "Hatcback"
  | "4x4"
  | "Firsat";

export type Vehicle = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: "TRY";
  km: number;
  fuel: string;
  transmission: string;
  location: string;
  image: string;
  gallery: string[];
  tags: VehicleTag[];
  featured?: boolean;
  sourceUrl?: string;
};

export type CompanyStat = {
  label: string;
  value: string;
  detail: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

