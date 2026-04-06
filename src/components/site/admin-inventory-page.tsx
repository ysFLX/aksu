"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { ExpertiseStatus, Vehicle, VehicleExpertise } from "@/types/inventory";

const expertiseFields: Array<{ key: keyof VehicleExpertise; label: string }> = [
  { key: "frontBumper", label: "On Tampon" },
  { key: "hood", label: "Kaput" },
  { key: "roof", label: "Tavan" },
  { key: "rearBumper", label: "Arka Tampon" },
  { key: "leftFrontFender", label: "Sol On Camurluk" },
  { key: "rightFrontFender", label: "Sag On Camurluk" },
  { key: "leftFrontDoor", label: "Sol On Kapi" },
  { key: "rightFrontDoor", label: "Sag On Kapi" },
  { key: "leftRearDoor", label: "Sol Arka Kapi" },
  { key: "rightRearDoor", label: "Sag Arka Kapi" },
  { key: "leftRearFender", label: "Sol Arka Camurluk" },
  { key: "rightRearFender", label: "Sag Arka Camurluk" },
];

const expertiseOptions: ExpertiseStatus[] = ["Orijinal", "Lokal Boyalı", "Boyalı", "Değişen"];

function createVehicle(): Vehicle {
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    brand: "",
    model: "",
    year: undefined,
    price: 0,
    currency: "TRY",
    km: undefined,
    fuel: "",
    transmission: "",
    location: "",
    image: "",
    gallery: [],
    tags: [],
    featured: false,
    sourceUrl: "",
    expertise: {
      frontBumper: "Orijinal",
      hood: "Orijinal",
      roof: "Orijinal",
      rearBumper: "Orijinal",
      leftFrontFender: "Orijinal",
      rightFrontFender: "Orijinal",
      leftFrontDoor: "Orijinal",
      rightFrontDoor: "Orijinal",
      leftRearDoor: "Orijinal",
      rightRearDoor: "Orijinal",
      leftRearFender: "Orijinal",
      rightRearFender: "Orijinal",
      notes: "",
    },
  };
}

export function AdminInventoryPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [backend, setBackend] = useState<"file" | "supabase">("file");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/admin/inventory", { cache: "no-store" });
      const json = await response.json();
      setVehicles(json.vehicles ?? []);
      setBackend(json.backend === "supabase" ? "supabase" : "file");
      setLoading(false);
    }

    load();
  }, []);

  function updateVehicle(index: number, patch: Partial<Vehicle>) {
    setVehicles((current) =>
      current.map((vehicle, vehicleIndex) => (vehicleIndex === index ? { ...vehicle, ...patch } : vehicle)),
    );
  }

  function updateExpertise(index: number, key: keyof VehicleExpertise, value: string) {
    setVehicles((current) =>
      current.map((vehicle, vehicleIndex) => {
        if (vehicleIndex !== index) {
          return vehicle;
        }

        return {
          ...vehicle,
          expertise: {
            ...(vehicle.expertise ?? createVehicle().expertise!),
            [key]: value,
          },
        };
      }),
    );
  }

  async function save() {
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/inventory", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicles }),
    });

    const json = await response.json();
    setVehicles(json.vehicles ?? []);
    setBackend(json.backend === "supabase" ? "supabase" : "file");
    setSaving(false);
    setMessage("Kaydedildi.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/giris");
    router.refresh();
  }

  if (loading) {
    return <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">Yukleniyor...</main>;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Admin Panel</p>
          <h1 className="mt-4 text-5xl font-semibold">Ilanlari buradan yonet</h1>
          <p className="mt-4 max-w-2xl text-white/68">
            Baslik, fiyat, galeri, etiketler ve ekspertiz verilerini duzenleyip kaydedebilirsin.
          </p>
          <p className="mt-3 text-sm text-amber-200/70">
            Kayit yeri: {backend === "supabase" ? "Supabase" : "Yerel dosya"}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-white"
          >
            Cikis Yap
          </button>
          <button
            type="button"
            onClick={() => setVehicles((current) => [...current, createVehicle()])}
            className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
          >
            Yeni Ilan
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 disabled:opacity-60"
          >
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </div>

      {message ? <p className="mt-6 text-sm text-emerald-300">{message}</p> : null}

      <div className="mt-10 grid gap-6">
        {vehicles.map((vehicle, index) => (
          <section key={vehicle.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold">{vehicle.title || `Ilan ${index + 1}`}</h2>
              <button
                type="button"
                onClick={() => setVehicles((current) => current.filter((_, vehicleIndex) => vehicleIndex !== index))}
                className="rounded-full border border-rose-400/20 bg-rose-400/10 px-4 py-2 text-sm text-rose-100"
              >
                Sil
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="grid gap-2 text-sm">
                <span>Baslik</span>
                <input value={vehicle.title} onChange={(event) => updateVehicle(index, { title: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Marka</span>
                <input value={vehicle.brand} onChange={(event) => updateVehicle(index, { brand: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Model</span>
                <input value={vehicle.model} onChange={(event) => updateVehicle(index, { model: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Konum</span>
                <input value={vehicle.location} onChange={(event) => updateVehicle(index, { location: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Yil</span>
                <input type="number" value={vehicle.year ?? ""} onChange={(event) => updateVehicle(index, { year: event.target.value ? Number(event.target.value) : undefined })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Fiyat</span>
                <input type="number" value={vehicle.price} onChange={(event) => updateVehicle(index, { price: Number(event.target.value) || 0 })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>KM</span>
                <input type="number" value={vehicle.km ?? ""} onChange={(event) => updateVehicle(index, { km: event.target.value ? Number(event.target.value) : undefined })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Yakit</span>
                <input value={vehicle.fuel} onChange={(event) => updateVehicle(index, { fuel: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Vites</span>
                <input value={vehicle.transmission} onChange={(event) => updateVehicle(index, { transmission: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm xl:col-span-2">
                <span>Kapak Gorsel URL</span>
                <input value={vehicle.image} onChange={(event) => updateVehicle(index, { image: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
              <label className="grid gap-2 text-sm xl:col-span-2">
                <span>Sahibinden Linki</span>
                <input value={vehicle.sourceUrl ?? ""} onChange={(event) => updateVehicle(index, { sourceUrl: event.target.value })} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span>Etiketler</span>
                <input
                  value={vehicle.tags.join(", ")}
                  onChange={(event) =>
                    updateVehicle(index, {
                      tags: event.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean) as Vehicle["tags"],
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span>Galeri URL&apos;leri</span>
                <textarea
                  value={vehicle.gallery.join("\n")}
                  onChange={(event) =>
                    updateVehicle(index, {
                      gallery: event.target.value
                        .split("\n")
                        .map((item) => item.trim())
                        .filter(Boolean),
                    })
                  }
                  rows={4}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                />
              </label>
            </div>

            <label className="mt-4 flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={Boolean(vehicle.featured)}
                onChange={(event) => updateVehicle(index, { featured: event.target.checked })}
              />
              One cikan ilan olarak goster
            </label>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.28em] text-amber-200/70">Ekspertiz</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {expertiseFields.map((field) => (
                  <label key={field.key} className="grid gap-2 text-sm">
                    <span>{field.label}</span>
                    <select
                      value={vehicle.expertise?.[field.key] ?? "Orijinal"}
                      onChange={(event) => updateExpertise(index, field.key, event.target.value)}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                    >
                      {expertiseOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
              <label className="mt-4 grid gap-2 text-sm">
                <span>Ekspertiz Notu</span>
                <textarea
                  value={vehicle.expertise?.notes ?? ""}
                  onChange={(event) => updateExpertise(index, "notes", event.target.value)}
                  rows={3}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                />
              </label>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
