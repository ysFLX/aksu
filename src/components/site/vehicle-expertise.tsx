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
    <svg viewBox="0 0 360 440" className="mx-auto h-auto w-full max-w-[360px]">
      <rect x="160" y="18" width="18" height="16" rx="4" fill="#d8d1c5" />
      <rect x="182" y="18" width="18" height="16" rx="4" fill="#d8d1c5" />

      <rect x="145" y="42" width="70" height="28" rx="8" fill={fill("frontBumper")} />
      <path d="M145 86C156 68 204 68 215 86L224 138C197 126 163 126 136 138L145 86Z" fill={fill("hood")} />
      <path d="M138 146C154 135 206 135 222 146V292C206 304 154 304 138 292V146Z" fill={fill("roof")} />
      <path d="M145 316C159 304 201 304 215 316L224 364C196 376 164 376 136 364L145 316Z" fill="#f2eee6" />
      <rect x="145" y="378" width="70" height="28" rx="8" fill={fill("rearBumper")} />
      <rect x="160" y="410" width="18" height="16" rx="4" fill="#d8d1c5" />
      <rect x="182" y="410" width="18" height="16" rx="4" fill="#d8d1c5" />

      <circle cx="86" cy="142" r="28" fill="#d8d1c5" />
      <circle cx="86" cy="298" r="28" fill="#d8d1c5" />
      <circle cx="274" cy="142" r="28" fill="#d8d1c5" />
      <circle cx="274" cy="298" r="28" fill="#d8d1c5" />

      <path d="M114 84L136 106V178L114 168L104 102L114 84Z" fill={fill("leftFrontFender")} />
      <path d="M246 106L268 84L278 102V168L246 178V106Z" fill={fill("rightFrontFender")} />
      <path d="M108 176L136 186V236L108 226V176Z" fill={fill("leftFrontDoor")} />
      <path d="M252 186L280 176V226L252 236V186Z" fill={fill("rightFrontDoor")} />
      <path d="M108 230L136 240V292L108 274V230Z" fill={fill("leftRearDoor")} />
      <path d="M252 240L280 230V274L252 292V240Z" fill={fill("rightRearDoor")} />
      <path d="M114 282L136 260V332L114 354L104 336V292L114 282Z" fill={fill("leftRearFender")} />
      <path d="M246 260L268 282L278 292V336L268 354L246 332V260Z" fill={fill("rightRearFender")} />

      <path d="M136 106C151 84 209 84 224 106L236 144V294L224 336C209 358 151 358 136 336L124 294V144L136 106Z" fill="none" stroke="#d8d1c5" strokeWidth="7" />
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
