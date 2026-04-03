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

  return (
    <svg viewBox="0 0 360 440" className="mx-auto h-auto w-full max-w-[290px] md:max-w-[330px]">
      <g fill="#d8d1c5">
        <rect x="159" y="18" width="18" height="16" rx="4" />
        <rect x="183" y="18" width="18" height="16" rx="4" />
        <rect x="159" y="406" width="18" height="16" rx="4" />
        <rect x="183" y="406" width="18" height="16" rx="4" />
        <circle cx="92" cy="136" r="28" />
        <circle cx="268" cy="136" r="28" />
        <circle cx="92" cy="304" r="28" />
        <circle cx="268" cy="304" r="28" />
      </g>

      <rect x="140" y="40" width="80" height="28" rx="10" fill={fill("frontBumper")} />
      <path d="M145 88C154 72 206 72 215 88L224 136C196 126 164 126 136 136L145 88Z" fill={fill("hood")} />
      <path d="M136 145C148 134 212 134 224 145V292C212 304 148 304 136 292V145Z" fill={fill("roof")} />
      <path d="M145 313C154 328 206 328 215 313L224 360C196 370 164 370 136 360L145 313Z" fill="#efe6d2" />
      <rect x="140" y="372" width="80" height="28" rx="10" fill={fill("rearBumper")} />

      <path d="M118 92L136 108V174L114 164L106 104L118 92Z" fill={fill("leftFrontFender")} />
      <path d="M242 108L260 92L272 104V164L246 174V108Z" fill={fill("rightFrontFender")} />

      <path d="M110 176L136 186V228L110 220V176Z" fill={fill("leftFrontDoor")} />
      <path d="M250 186L276 176V220L250 228V186Z" fill={fill("rightFrontDoor")} />

      <path d="M110 224L136 232V276L110 286V224Z" fill={fill("leftRearDoor")} />
      <path d="M250 232L276 224V286L250 276V232Z" fill={fill("rightRearDoor")} />

      <path d="M118 268L136 250V316L118 348L106 336V284L118 268Z" fill={fill("leftRearFender")} />
      <path d="M242 250L260 268L272 284V336L260 348L242 316V250Z" fill={fill("rightRearFender")} />

      <path
        d="M136 108C148 82 212 82 224 108L236 150V288L224 332C212 356 148 356 136 332L124 288V150L136 108Z"
        fill="none"
        stroke="#d8d1c5"
        strokeWidth="8"
        strokeLinejoin="round"
      />
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
