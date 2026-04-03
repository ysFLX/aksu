import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, MapPin, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatKm, formatVehicleMetaValue } from "@/lib/utils";
import type { Vehicle } from "@/types/inventory";

type GalleryPageProps = {
  vehicles: Vehicle[];
};

export function GalleryPage({ vehicles }: GalleryPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Ilanlar</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight">
            Tum portfoyu tek ekranda gosteren ilan vitrini
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/68">
          Her kart kendi detay sayfasina acilir. Boylece ziyaretci once listeyi gorur, sonra ilgilendigi aracin tum bilgilerine iner.
        </p>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <Link href={`/ilanlar/${vehicle.slug}`} className="block">
              <div className="relative h-72">
                <Image src={vehicle.image} alt={vehicle.title} fill className="object-cover" />
                <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                  {vehicle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/85 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/ilanlar/${vehicle.slug}`} className="text-2xl font-semibold hover:text-amber-100">
                    {vehicle.title}
                  </Link>
                  <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                    <MapPin className="h-4 w-4" />
                    {vehicle.location}
                  </p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">
                  {formatVehicleMetaValue(vehicle.year)}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                <div className="rounded-2xl bg-black/20 p-3 text-white/72">
                  <Fuel className="h-4 w-4 text-amber-200" />
                  <p className="mt-3">{vehicle.fuel}</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-3 text-white/72">
                  <Settings2 className="h-4 w-4 text-amber-200" />
                  <p className="mt-3">{vehicle.transmission}</p>
                </div>
                <div className="rounded-2xl bg-black/20 p-3 text-white/72">
                  <Gauge className="h-4 w-4 text-amber-200" />
                  <p className="mt-3">{vehicle.km ? `${formatKm(vehicle.km)} km` : "Bilinmiyor"}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-3xl font-semibold text-amber-200">{formatCurrency(vehicle.price)}</p>
                <Button asChild variant="secondary">
                  <Link href={`/ilanlar/${vehicle.slug}`}>Detay Sayfasi</Link>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
