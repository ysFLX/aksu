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
    <svg viewBox="0 0 360 440" className="mx-auto h-auto w-full max-w-[280px] md:max-w-[320px]">
      <g fill="#d8d1c5">
        <rect x="156" y="18" width="20" height="16" rx="4" />
        <rect x="184" y="18" width="20" height="16" rx="4" />
        <rect x="156" y="406" width="20" height="16" rx="4" />
        <rect x="184" y="406" width="20" height="16" rx="4" />

        <rect x="72" y="110" width="24" height="64" rx="12" />
        <rect x="72" y="266" width="24" height="64" rx="12" />
        <rect x="264" y="110" width="24" height="64" rx="12" />
        <rect x="264" y="266" width="24" height="64" rx="12" />
      </g>

      <rect x="136" y="40" width="88" height="30" rx="10" fill={fill("frontBumper")} />
      <path d="M148 84C157 70 203 70 212 84L220 132C194 123 166 123 140 132L148 84Z" fill={fill("hood")} />
      <rect x="144" y="142" width="72" height="150" rx="28" fill={fill("roof")} />
      <path d="M148 306C158 322 202 322 212 306L220 356C193 365 167 365 140 356L148 306Z" fill="#efe6d2" />
      <rect x="136" y="370" width="88" height="30" rx="10" fill={fill("rearBumper")} />

      <path d="M114 92L138 110V176L114 188L102 164V114L114 92Z" fill={fill("leftFrontFender")} />
      <path d="M246 110L270 92L282 114V164L270 188L246 176V110Z" fill={fill("rightFrontFender")} />

      <path d="M112 182L138 192V232L112 240V182Z" fill={fill("leftFrontDoor")} />
      <path d="M248 192L274 182V240L248 232V192Z" fill={fill("rightFrontDoor")} />

      <path d="M112 236L138 244V284L112 294V236Z" fill={fill("leftRearDoor")} />
      <path d="M248 244L274 236V294L248 284V244Z" fill={fill("rightRearDoor")} />

      <path d="M114 248L138 260V326L114 348L102 326V272L114 248Z" fill={fill("leftRearFender")} />
      <path d="M246 260L270 248L282 272V326L270 348L246 326V260Z" fill={fill("rightRearFender")} />

      <path
        d="M146 102C158 82 202 82 214 102L230 148V290L214 338C202 358 158 358 146 338L130 290V148L146 102Z"
        fill="none"
        stroke="#d8d1c5"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path d="M146 148C162 138 198 138 214 148" fill="none" stroke="#f7f0dc" strokeWidth="8" strokeLinecap="round" />
      <path d="M146 292C162 302 198 302 214 292" fill="none" stroke="#f7f0dc" strokeWidth="8" strokeLinecap="round" />
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
