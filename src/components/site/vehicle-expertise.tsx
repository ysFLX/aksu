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

      <circle cx="104" cy="148" r="20" fill={bodyBase} />
      <circle cx="256" cy="148" r="20" fill={bodyBase} />
      <circle cx="104" cy="322" r="20" fill={bodyBase} />
      <circle cx="256" cy="322" r="20" fill={bodyBase} />

      <path d="M114 98L132 90L146 108V192L132 198L114 190V98Z" fill={fill("leftFrontFender")} />
      <path d="M246 90L264 98V190L246 198L232 192V108L246 90Z" fill={fill("rightFrontFender")} />
      <path d="M114 194L132 200L146 234L132 242L114 236V194Z" fill={fill("leftFrontDoor")} />
      <path d="M246 200L264 194V236L246 242L232 234V200Z" fill={fill("rightFrontDoor")} />
      <path d="M114 240L132 246L146 340L132 350L114 344V240Z" fill={fill("leftRearDoor")} />
      <path d="M246 246L264 240V344L246 350L232 340V246Z" fill={fill("rightRearDoor")} />
      <path d="M132 90L148 106V356L132 346Z" fill={fill("leftRearFender")} />
      <path d="M228 106L244 90V346L228 356Z" fill={fill("rightRearFender")} />

      <path
        d="M150 92C160 82 200 82 210 92L220 128L224 210L220 312L210 348C200 356 160 356 150 348L140 312L136 210L140 128L150 92Z"
        fill="none"
        stroke={bodyBase}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M152 100C161 94 199 94 208 100L214 172C201 167 159 167 146 172L152 100Z" fill={fill("hood")} />
      <path d="M146 182C160 176 200 176 214 182V236C200 242 160 242 146 236V182Z" fill={cut} />
      <rect x="150" y="246" width="60" height="48" rx="3" fill={fill("roof")} />
      <path d="M146 306C160 312 200 312 214 306L208 348C199 352 161 352 152 348L146 306Z" fill={cut} />

      <path d="M144 172L150 176V232L144 238Z" fill={cut} />
      <path d="M216 176L222 172V238L216 232Z" fill={cut} />
      <path d="M144 246L150 240V304L144 326Z" fill={cut} />
      <path d="M216 240L222 246V326L216 304Z" fill={cut} />
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
