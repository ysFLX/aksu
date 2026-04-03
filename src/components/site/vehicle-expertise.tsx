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
    <svg viewBox="0 0 360 440" className="mx-auto h-auto w-full max-w-[300px] md:max-w-[340px]">
      <g fill="#d8d1c5">
        <rect x="154" y="20" width="24" height="14" rx="4" />
        <rect x="184" y="20" width="24" height="14" rx="4" />
        <rect x="154" y="406" width="24" height="14" rx="4" />
        <rect x="184" y="406" width="24" height="14" rx="4" />
      </g>

      <rect x="136" y="44" width="88" height="32" rx="9" fill={fill("frontBumper")} />
      <path d="M150 84C160 70 200 70 210 84L216 108H144L150 84Z" fill={fill("hood")} />
      <path d="M140 118C148 104 212 104 220 118L226 180C210 170 150 170 134 180L140 118Z" fill={fill("hood")} />
      <path d="M140 188C150 180 210 180 220 188V250C210 258 150 258 140 250V188Z" fill="#f7f0dc" />
      <rect x="146" y="250" width="68" height="54" rx="4" fill={fill("roof")} />
      <path d="M140 304C150 296 210 296 220 304L226 360C208 370 152 370 134 360L140 304Z" fill="#f7f0dc" />
      <rect x="136" y="372" width="88" height="32" rx="9" fill={fill("rearBumper")} />

      <circle cx="88" cy="148" r="24" fill="#d8d1c5" />
      <circle cx="272" cy="148" r="24" fill="#d8d1c5" />
      <circle cx="88" cy="322" r="24" fill="#d8d1c5" />
      <circle cx="272" cy="322" r="24" fill="#d8d1c5" />

      <path d="M98 102L116 92L128 110V226L116 232L98 222V102Z" fill={fill("leftFrontFender")} />
      <path d="M232 110L244 92L262 102V222L244 232L232 226V110Z" fill={fill("rightFrontFender")} />

      <path d="M98 222L116 232L128 270L98 282V222Z" fill={fill("leftFrontDoor")} />
      <path d="M232 232L250 222V282L220 270L232 232Z" fill={fill("rightFrontDoor")} />

      <path d="M98 286L128 274V328L116 350L98 340V286Z" fill={fill("leftRearDoor")} />
      <path d="M232 274L262 286V340L244 350L232 328V274Z" fill={fill("rightRearDoor")} />

      <path d="M98 94L116 94V358L98 358Z" fill="none" />
      <path d="M98 94L116 94L134 178L134 256L116 358L98 340V94Z" fill={fill("leftRearFender")} opacity="0.98" />
      <path d="M262 94L244 94L226 178L226 256L244 358L262 340V94Z" fill={fill("rightRearFender")} opacity="0.98" />

      <path
        d="M136 112C148 98 212 98 224 112L236 190V248L224 330C212 346 148 346 136 330L124 248V190L136 112Z"
        fill="none"
        stroke="#d8d1c5"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <path d="M148 52H212" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
      <path d="M154 58L168 70" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
      <path d="M206 58L192 70" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
      <path d="M148 388H212" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
      <path d="M154 390L168 382" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
      <path d="M206 390L192 382" stroke="#f7f0dc" strokeWidth="7" strokeLinecap="round" />
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
