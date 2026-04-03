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
    <svg viewBox="30 0 300 440" className="mx-auto h-auto w-full max-w-[340px] md:max-w-[380px]">
      <g fill={bodyBase}>
        <rect x="153" y="18" width="24" height="14" rx="4" />
        <rect x="183" y="18" width="24" height="14" rx="4" />
        <rect x="153" y="408" width="24" height="14" rx="4" />
        <rect x="183" y="408" width="24" height="14" rx="4" />
      </g>

      <rect x="136" y="42" width="88" height="28" rx="8" fill={fill("frontBumper")} />
      <rect x="145" y="50" width="24" height="10" rx="5" fill={cut} />
      <rect x="191" y="50" width="24" height="10" rx="5" fill={cut} />

      <rect x="136" y="372" width="88" height="28" rx="8" fill={fill("rearBumper")} />
      <rect x="145" y="382" width="24" height="10" rx="5" fill={cut} />
      <rect x="191" y="382" width="24" height="10" rx="5" fill={cut} />

      <circle cx="92" cy="148" r="23" fill={bodyBase} />
      <circle cx="268" cy="148" r="23" fill={bodyBase} />
      <circle cx="92" cy="322" r="23" fill={bodyBase} />
      <circle cx="268" cy="322" r="23" fill={bodyBase} />

      <path d="M96 96L118 88L132 106V192L118 198L96 188V96Z" fill={fill("leftFrontFender")} />
      <path d="M264 96L242 88L228 106V192L242 198L264 188V96Z" fill={fill("rightFrontFender")} />
      <path d="M96 192L118 198L132 234L118 246L96 238V192Z" fill={fill("leftFrontDoor")} />
      <path d="M264 192L242 198L228 234L242 246L264 238V192Z" fill={fill("rightFrontDoor")} />
      <path d="M96 246L118 238L132 344L118 356L96 348V246Z" fill={fill("leftRearDoor")} />
      <path d="M264 246L242 238L228 344L242 356L264 348V246Z" fill={fill("rightRearDoor")} />
      <path d="M120 88L138 106V358L120 348Z" fill={fill("leftRearFender")} />
      <path d="M240 88L222 106V358L240 348Z" fill={fill("rightRearFender")} />

      <path
        d="M144 92C154 80 206 80 216 92L228 130L232 210L228 310L216 350C206 360 154 360 144 350L132 310L128 210L132 130L144 92Z"
        fill="none"
        stroke={bodyBase}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M146 100C156 92 204 92 214 100L218 172C203 166 157 166 142 172L146 100Z" fill={fill("hood")} />
      <path d="M142 182C158 174 202 174 218 182V236C202 244 158 244 142 236V182Z" fill={cut} />
      <rect x="146" y="246" width="68" height="52" rx="3" fill={fill("roof")} />
      <path d="M142 308C157 316 203 316 218 308L214 350C204 356 156 356 146 350L142 308Z" fill={cut} />

      <path d="M126 168L142 176V232L126 244Z" fill={cut} />
      <path d="M234 168L218 176V232L234 244Z" fill={cut} />
      <path d="M126 248L142 240V300L126 334Z" fill={cut} />
      <path d="M234 248L218 240V300L234 334Z" fill={cut} />
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
