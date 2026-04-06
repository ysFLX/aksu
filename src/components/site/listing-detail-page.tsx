import Link from "next/link";
import { ArrowLeft, CalendarDays, CarFront, ExternalLink, Fuel, Gauge, MapPin, Settings2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VehicleExpertise } from "@/components/site/vehicle-expertise";
import { VehicleGallery } from "@/components/site/vehicle-gallery";
import { formatCurrency, formatKm, formatVehicleMetaValue } from "@/lib/utils";
import type { Vehicle } from "@/types/inventory";

type ListingDetailPageProps = {
  vehicle: Vehicle;
};

function inferBrand(title: string, brand?: string) {
  if (brand?.trim()) {
    return brand.trim();
  }

  return title.split(" ")[0]?.trim() || "Arac";
}

function inferModel(title: string, brand: string, model?: string) {
  if (model?.trim()) {
    return model.trim();
  }

  const normalizedTitle = title.trim();
  const withoutBrand = normalizedTitle.toLocaleLowerCase("tr-TR").startsWith(brand.toLocaleLowerCase("tr-TR"))
    ? normalizedTitle.slice(brand.length).trim()
    : normalizedTitle;

  return withoutBrand.split(" ").slice(0, 3).join(" ") || "Model";
}

export function ListingDetailPage({ vehicle }: ListingDetailPageProps) {
  const brand = inferBrand(vehicle.title, vehicle.brand);
  const model = inferModel(vehicle.title, brand, vehicle.model);
  const overview = [
    { label: "Marka", value: brand },
    { label: "Model", value: model },
    { label: "Yil", value: formatVehicleMetaValue(vehicle.year) },
    { label: "KM", value: vehicle.km ? `${formatKm(vehicle.km)} km` : "Bilinmiyor" },
    { label: "Yakit", value: vehicle.fuel || "Bilinmiyor" },
    { label: "Vites", value: vehicle.transmission || "Bilinmiyor" },
  ];
  const specs = [
    { label: "Marka", value: brand, icon: CarFront },
    { label: "Model", value: model, icon: ShieldCheck },
    { label: "Yil", value: formatVehicleMetaValue(vehicle.year), icon: CalendarDays },
    { label: "Yakit", value: vehicle.fuel, icon: Fuel },
    { label: "Vites", value: vehicle.transmission, icon: Settings2 },
    { label: "KM", value: vehicle.km ? `${formatKm(vehicle.km)} km` : "Bilinmiyor", icon: Gauge },
  ];

  return (
    <main className="mx-auto max-w-7xl overflow-x-hidden px-6 py-16 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant="secondary">
          <Link href="/ilanlar">
            <ArrowLeft className="h-4 w-4" />
            Ilanlara Don
          </Link>
        </Button>

        <Link
          href={vehicle.sourceUrl ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white px-7 py-3 text-base font-semibold text-neutral-950 shadow-[0_18px_50px_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
            Sahibinden Ilani
            <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <VehicleGallery title={vehicle.title} images={vehicle.gallery} tags={vehicle.tags} />
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Ilan Detayi</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">{vehicle.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-white/68">
            <MapPin className="h-4 w-4 text-amber-200" />
            {vehicle.location}
          </p>
          <p className="mt-8 text-5xl font-semibold text-amber-200">{formatCurrency(vehicle.price)}</p>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
            <div className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {overview.map((item) => (
                <div key={item.label} className="px-5 py-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">{item.label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {specs.map((spec) => {
              const Icon = spec.icon;

              return (
                <div key={spec.label} className="rounded-2xl bg-black/20 p-4">
                  <div className="flex items-center gap-2 text-white/50">
                    <Icon className="h-4 w-4 text-amber-200" />
                    <span className="text-sm">{spec.label}</span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-white">{spec.value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-white/50">Aciklama</p>
            <p className="mt-4 leading-8 text-white/72">
              {vehicle.description?.trim()
                ? vehicle.description
                : "Bu arac icin aciklama bilgisi henuz eklenmedi. Daha fazla detay icin iletisime gecebilirsiniz."}
            </p>
          </div>
        </div>
      </section>

      <VehicleExpertise expertise={vehicle.expertise} image={vehicle.image} />
    </main>
  );
}
