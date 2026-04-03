import type { ExpertiseStatus, VehicleExpertise } from "@/types/inventory";

const statusClasses: Record<ExpertiseStatus, string> = {
  Orijinal: "bg-emerald-500/15 text-emerald-200 border-emerald-400/20",
  "Lokal Boyalı": "bg-amber-500/15 text-amber-100 border-amber-400/20",
  Boyalı: "bg-orange-500/15 text-orange-100 border-orange-400/20",
  "Değişen": "bg-rose-500/15 text-rose-100 border-rose-400/20",
};

const statusLabels: Record<ExpertiseStatus, string> = {
  Orijinal: "Orijinal",
  "Lokal Boyalı": "Lokal Boyali",
  Boyalı: "Boyali",
  "Değişen": "Degisen",
};

const parts: Array<{ key: keyof VehicleExpertise; label: string }> = [
  { key: "frontBumper", label: "On Tampon" },
  { key: "hood", label: "Kaput" },
  { key: "roof", label: "Tavan" },
  { key: "rearBumper", label: "Arka Tampon" },
  { key: "leftFrontFender", label: "Sol On Camurluk" },
  { key: "leftFrontDoor", label: "Sol On Kapi" },
  { key: "leftRearDoor", label: "Sol Arka Kapi" },
  { key: "leftRearFender", label: "Sol Arka Camurluk" },
  { key: "rightFrontFender", label: "Sag On Camurluk" },
  { key: "rightFrontDoor", label: "Sag On Kapi" },
  { key: "rightRearDoor", label: "Sag Arka Kapi" },
  { key: "rightRearFender", label: "Sag Arka Camurluk" },
];

type VehicleExpertiseProps = {
  expertise?: VehicleExpertise;
};

export function VehicleExpertise({ expertise }: VehicleExpertiseProps) {
  if (!expertise) {
    return null;
  }

  return (
    <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Ekspertiz Semasi</p>
          <h2 className="mt-3 text-3xl font-semibold">Parca bazli durum ozeti</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          {(Object.keys(statusClasses) as ExpertiseStatus[]).map((status) => (
            <span key={status} className={`rounded-full border px-3 py-1 ${statusClasses[status]}`}>
              {statusLabels[status]}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {parts.map((part) => {
          const status = expertise[part.key] as ExpertiseStatus;

          return (
            <div key={part.key} className="rounded-[1.25rem] border border-white/8 bg-black/20 p-4">
              <p className="text-sm text-white/55">{part.label}</p>
              <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm ${statusClasses[status]}`}>
                {statusLabels[status]}
              </span>
            </div>
          );
        })}
      </div>

      {expertise.notes ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/68">
          {expertise.notes}
        </div>
      ) : null}
    </section>
  );
}
