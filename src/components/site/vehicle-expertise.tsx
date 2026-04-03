import type { ExpertiseStatus, VehicleExpertise } from "@/types/inventory";

const statusStyles: Record<
  ExpertiseStatus,
  { fill: string; badge: string; label: string; text: string }
> = {
  Orijinal: {
    fill: "#bfbfbf",
    badge: "border-neutral-400/25 bg-neutral-300/15 text-neutral-200",
    label: "Orijinal",
    text: "Aracin parcalari orijinal gorunuyor.",
  },
  "Lokal Boyalı": {
    fill: "#ff9a45",
    badge: "border-orange-400/25 bg-orange-400/15 text-orange-100",
    label: "Lokal Boyali",
    text: "Bazi parcalarda lokal boya islemi bulunuyor.",
  },
  Boyalı: {
    fill: "#4f86c6",
    badge: "border-sky-400/25 bg-sky-400/15 text-sky-100",
    label: "Boyali",
    text: "Bazi parcalar komple boyali gorunuyor.",
  },
  "Değişen": {
    fill: "#ff5b3d",
    badge: "border-rose-400/25 bg-rose-400/15 text-rose-100",
    label: "Degisen",
    text: "Aracta degisen parca bulunuyor.",
  },
};

const partLabels: Array<{ key: keyof VehicleExpertise; label: string }> = [
  { key: "hood", label: "Kaput" },
  { key: "roof", label: "Tavan" },
  { key: "frontBumper", label: "On Tampon" },
  { key: "rearBumper", label: "Arka Tampon" },
  { key: "leftFrontFender", label: "Sol On Camurluk" },
  { key: "rightFrontFender", label: "Sag On Camurluk" },
  { key: "leftRearFender", label: "Sol Arka Camurluk" },
  { key: "rightRearFender", label: "Sag Arka Camurluk" },
  { key: "leftFrontDoor", label: "Sol On Kapi" },
  { key: "rightFrontDoor", label: "Sag On Kapi" },
  { key: "leftRearDoor", label: "Sol Arka Kapi" },
  { key: "rightRearDoor", label: "Sag Arka Kapi" },
];

type VehicleExpertiseProps = {
  expertise?: VehicleExpertise;
};

function dominantStatus(expertise: VehicleExpertise): ExpertiseStatus {
  const order: ExpertiseStatus[] = ["Değişen", "Boyalı", "Lokal Boyalı", "Orijinal"];
  return order.find((status) => partLabels.some((part) => expertise[part.key] === status)) ?? "Orijinal";
}

function CarDiagram({ expertise }: { expertise: VehicleExpertise }) {
  const fill = (key: keyof VehicleExpertise) => statusStyles[expertise[key] as ExpertiseStatus].fill;
  const bodyBase = "#d8d1c5";
  const cut = "#f7f0dc";

  return (
    <svg viewBox="0 0 360 440" className="mx-auto h-auto w-full max-w-[340px] md:max-w-[380px]">
      <g fill={bodyBase}>
        <rect x="154" y="18" width="24" height="14" rx="4" />
        <rect x="182" y="18" width="24" height="14" rx="4" />
        <rect x="154" y="408" width="24" height="14" rx="4" />
        <rect x="182" y="408" width="24" height="14" rx="4" />
      </g>

      <rect x="132" y="48" width="96" height="30" rx="10" fill={fill("frontBumper")} />
      <rect x="146" y="56" width="26" height="10" rx="5" fill={cut} />
      <rect x="188" y="56" width="26" height="10" rx="5" fill={cut} />
      <rect x="132" y="366" width="96" height="30" rx="10" fill={fill("rearBumper")} />
      <rect x="146" y="378" width="26" height="10" rx="5" fill={cut} />
      <rect x="188" y="378" width="26" height="10" rx="5" fill={cut} />

      <circle cx="98" cy="150" r="22" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="262" cy="150" r="22" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="98" cy="318" r="22" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="262" cy="318" r="22" fill={bodyBase} stroke={cut} strokeWidth="5" />

      <path d="M86 100L112 86L132 106L142 170L128 196L86 182V100Z" fill={fill("leftFrontFender")} />
      <path d="M274 100L248 86L228 106L218 170L232 196L274 182V100Z" fill={fill("rightFrontFender")} />
      <path d="M86 184L128 198L150 206L150 236L128 246L86 232V184Z" fill={fill("leftFrontDoor")} />
      <path d="M274 184L232 198L210 206L210 236L232 246L274 232V184Z" fill={fill("rightFrontDoor")} />
      <path d="M86 234L128 248L150 240L150 300L128 346L86 332V234Z" fill={fill("leftRearDoor")} />
      <path d="M274 234L232 248L210 240L210 300L232 346L274 332V234Z" fill={fill("rightRearDoor")} />
      <path d="M110 88L132 106L150 178L150 204L132 196L110 182V88Z" fill={fill("leftRearFender")} />
      <path d="M250 88L228 106L210 178L210 204L228 196L250 182V88Z" fill={fill("rightRearFender")} />

      <path
        d="M148 96C158 84 202 84 212 96L224 136L228 210L224 304L212 344C202 356 158 356 148 344L136 304L132 210L136 136L148 96Z"
        fill="none"
        stroke={bodyBase}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M150 104C160 96 200 96 210 104L216 176C202 170 158 170 144 176L150 104Z" fill={fill("hood")} />
      <path d="M144 186C158 180 202 180 216 186V236C202 242 158 242 144 236V186Z" fill={cut} />
      <rect x="150" y="246" width="60" height="52" rx="3" fill={fill("roof")} />
      <path d="M144 308C158 316 202 316 216 308L210 346C200 352 160 352 150 346L144 308Z" fill={cut} />

      <path d="M126 166L144 176V238L126 250Z" fill={cut} />
      <path d="M234 166L216 176V238L234 250Z" fill={cut} />
      <path d="M126 248L144 240V296L126 330Z" fill={cut} />
      <path d="M234 248L216 240V296L234 330Z" fill={cut} />
    </svg>
  );
}

export function VehicleExpertise({ expertise }: VehicleExpertiseProps) {
  if (!expertise) {
    return null;
  }

  const topStatus = dominantStatus(expertise);

  return (
    <section className="mt-10 max-w-full overflow-hidden rounded-[2rem] border border-[#f0d889]/20 bg-[#20170f] p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">Boyali Veya Degisen Parca</p>

      <div className="mt-6 max-w-full overflow-hidden rounded-[1.75rem] border border-[#f0d889]/25 bg-[#f7f0dc] p-5 text-neutral-900 md:p-6">
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          {(Object.keys(statusStyles) as ExpertiseStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-[4px]" style={{ backgroundColor: statusStyles[status].fill }} />
              <span>{statusStyles[status].label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="min-w-0 rounded-[1.5rem] bg-white/40 p-4">
            <CarDiagram expertise={expertise} />
          </div>

          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-3 w-3 rounded-[2px]" style={{ backgroundColor: statusStyles[topStatus].fill }} />
              <div className="min-w-0">
                <h3 className="text-3xl font-semibold">{statusStyles[topStatus].label}</h3>
                <p className="mt-3 max-w-xl text-lg leading-8 text-neutral-700">
                  {expertise.notes ?? statusStyles[topStatus].text}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {partLabels.map((part) => {
                const status = expertise[part.key] as ExpertiseStatus;

                return (
                  <div key={part.key} className="rounded-2xl border border-black/8 bg-white/55 p-4">
                    <p className="text-sm text-neutral-500">{part.label}</p>
                    <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm ${statusStyles[status].badge}`}>
                      {statusStyles[status].label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
