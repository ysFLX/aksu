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

      <circle cx="96" cy="148" r="20" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="264" cy="148" r="20" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="96" cy="322" r="20" fill={bodyBase} stroke={cut} strokeWidth="5" />
      <circle cx="264" cy="322" r="20" fill={bodyBase} stroke={cut} strokeWidth="5" />

      <path d="M94 100L112 94L122 108L126 182L108 198L94 188V100Z" fill={fill("leftFrontFender")} />
      <path d="M266 100L248 94L238 108L234 182L252 198L266 188V100Z" fill={fill("rightFrontFender")} />
      <path d="M94 190L108 198L148 208L148 236L108 248L94 240V190Z" fill={fill("leftFrontDoor")} />
      <path d="M266 190L252 198L212 208L212 236L252 248L266 240V190Z" fill={fill("rightFrontDoor")} />
      <path d="M94 242L108 250L148 240L148 304L108 346L94 338V242Z" fill={fill("leftRearDoor")} />
      <path d="M266 242L252 250L212 240L212 304L252 346L266 338V242Z" fill={fill("rightRearDoor")} />
      <path d="M112 94L132 110L148 176L148 202L126 196L112 186V94Z" fill={fill("leftRearFender")} />
      <path d="M248 94L228 110L212 176L212 202L234 196L248 186V94Z" fill={fill("rightRearFender")} />

      <path
        d="M158 92C165 82 195 82 202 92L210 126L214 210L210 314L202 352C195 362 165 362 158 352L150 314L146 210L150 126L158 92Z"
        fill="none"
        stroke={bodyBase}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M160 100C166 94 194 94 200 100L206 172C196 166 164 166 154 172L160 100Z" fill={fill("hood")} />
      <path d="M154 182C164 176 196 176 206 182V238C196 244 164 244 154 238V182Z" fill={cut} />
      <rect x="158" y="246" width="44" height="50" rx="3" fill={fill("roof")} />
      <path d="M154 306C164 312 196 312 206 306L200 350C194 356 166 356 160 350L154 306Z" fill={cut} />

      <path d="M150 170L156 176V236L150 244Z" fill={cut} />
      <path d="M204 176L210 170V244L204 236Z" fill={cut} />
      <path d="M150 248L156 240V312L150 332Z" fill={cut} />
      <path d="M204 240L210 248V332L204 312Z" fill={cut} />
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
