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

      <circle cx="116" cy="148" r="18" fill={bodyBase} />
      <circle cx="244" cy="148" r="18" fill={bodyBase} />
      <circle cx="116" cy="322" r="18" fill={bodyBase} />
      <circle cx="244" cy="322" r="18" fill={bodyBase} />

      <path d="M126 98L142 90L154 108V188L142 194L126 188V98Z" fill={fill("leftFrontFender")} />
      <path d="M234 90L250 98V188L234 194L222 188V108L234 90Z" fill={fill("rightFrontFender")} />
      <path d="M126 192L142 198L154 232L142 238L126 234V192Z" fill={fill("leftFrontDoor")} />
      <path d="M234 198L250 192V234L234 238L222 232V198Z" fill={fill("rightFrontDoor")} />
      <path d="M126 236L142 242L154 336L142 344L126 338V236Z" fill={fill("leftRearDoor")} />
      <path d="M234 242L250 236V338L234 344L222 336V242Z" fill={fill("rightRearDoor")} />
      <path d="M142 90L156 106V350L142 340Z" fill={fill("leftRearFender")} />
      <path d="M218 106L232 90V340L218 350Z" fill={fill("rightRearFender")} />

      <path
        d="M146 92C156 80 204 80 214 92L224 126L228 210L224 314L214 352C204 362 156 362 146 352L136 314L132 210L136 126L146 92Z"
        fill="none"
        stroke={bodyBase}
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M148 100C158 92 202 92 212 100L218 172C202 166 158 166 142 172L148 100Z" fill={fill("hood")} />
      <path d="M142 182C158 174 202 174 218 182V238C202 246 158 246 142 238V182Z" fill={cut} />
      <rect x="146" y="246" width="68" height="50" rx="3" fill={fill("roof")} />
      <path d="M142 306C158 314 202 314 218 306L212 350C202 356 158 356 148 350L142 306Z" fill={cut} />

      <path d="M140 170L146 176V236L140 244Z" fill={cut} />
      <path d="M220 176L226 170V244L220 236Z" fill={cut} />
      <path d="M140 248L146 240V312L140 332Z" fill={cut} />
      <path d="M220 240L226 248V332L220 312Z" fill={cut} />
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
