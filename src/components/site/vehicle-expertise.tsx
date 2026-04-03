import type { ExpertiseStatus, VehicleExpertise } from "@/types/inventory";

const statusStyles: Record<
  ExpertiseStatus,
  { fill: string; badge: string; label: string; text: string }
> = {
  Orijinal: {
    fill: "#bfbfbf",
    badge: "border-neutral-400/25 bg-neutral-300/15 text-neutral-200",
    label: "Orijinal",
    text: "Aracin parcasi orijinal gorunuyor.",
  },
  "Lokal Boyalı": {
    fill: "#ff9a45",
    badge: "border-orange-400/25 bg-orange-400/15 text-orange-100",
    label: "Lokal Boyali",
    text: "Parcada lokal boya islemi bulunuyor.",
  },
  Boyalı: {
    fill: "#4f86c6",
    badge: "border-sky-400/25 bg-sky-400/15 text-sky-100",
    label: "Boyali",
    text: "Parca komple boyali gorunuyor.",
  },
  "Değişen": {
    fill: "#ff5b3d",
    badge: "border-rose-400/25 bg-rose-400/15 text-rose-100",
    label: "Degisen",
    text: "Parca degisim islemi gormus.",
  },
};

const parts: Array<{
  key: keyof VehicleExpertise;
  label: string;
  description: string;
  shape: (fill: string) => JSX.Element;
}> = [
  {
    key: "hood",
    label: "Kaput",
    description: "On ust bolum",
    shape: (fill) => <path d="M165 103C180 88 220 88 235 103L246 158C220 146 180 146 154 158L165 103Z" fill={fill} />,
  },
  {
    key: "roof",
    label: "Tavan",
    description: "Orta ust bolum",
    shape: (fill) => <path d="M162 163C183 151 217 151 238 163V256C217 267 183 267 162 256V163Z" fill={fill} />,
  },
  {
    key: "frontBumper",
    label: "On Tampon",
    description: "On alt bolum",
    shape: (fill) => <rect x="165" y="49" width="70" height="28" rx="8" fill={fill} />,
  },
  {
    key: "rearBumper",
    label: "Arka Tampon",
    description: "Arka alt bolum",
    shape: (fill) => <rect x="165" y="324" width="70" height="28" rx="8" fill={fill} />,
  },
  {
    key: "leftFrontFender",
    label: "Sol On Camurluk",
    description: "Sol on cember",
    shape: (fill) => <path d="M124 100L146 121V176L108 165V112L124 100Z" fill={fill} />,
  },
  {
    key: "rightFrontFender",
    label: "Sag On Camurluk",
    description: "Sag on cember",
    shape: (fill) => <path d="M276 100L292 112V165L254 176V121L276 100Z" fill={fill} />,
  },
  {
    key: "leftRearFender",
    label: "Sol Arka Camurluk",
    description: "Sol arka cember",
    shape: (fill) => <path d="M108 214L146 203V258L124 279L108 267V214Z" fill={fill} />,
  },
  {
    key: "rightRearFender",
    label: "Sag Arka Camurluk",
    description: "Sag arka cember",
    shape: (fill) => <path d="M254 203L292 214V267L276 279L254 258V203Z" fill={fill} />,
  },
  {
    key: "leftFrontDoor",
    label: "Sol On Kapi",
    description: "Sol orta on",
    shape: (fill) => <path d="M108 169L146 180V224L108 213V169Z" fill={fill} />,
  },
  {
    key: "rightFrontDoor",
    label: "Sag On Kapi",
    description: "Sag orta on",
    shape: (fill) => <path d="M254 180L292 169V213L254 224V180Z" fill={fill} />,
  },
  {
    key: "leftRearDoor",
    label: "Sol Arka Kapi",
    description: "Sol orta arka",
    shape: (fill) => <path d="M108 214L146 225V270L108 252V214Z" fill={fill} />,
  },
  {
    key: "rightRearDoor",
    label: "Sag Arka Kapi",
    description: "Sag orta arka",
    shape: (fill) => <path d="M254 225L292 214V252L254 270V225Z" fill={fill} />,
  },
];

type VehicleExpertiseProps = {
  expertise?: VehicleExpertise;
};

function getDominantStatus(expertise: VehicleExpertise) {
  const ordered: ExpertiseStatus[] = ["Değişen", "Boyalı", "Lokal Boyalı", "Orijinal"];
  return ordered.find((status) =>
    parts.some((part) => expertise[part.key] === status),
  ) ?? "Orijinal";
}

export function VehicleExpertise({ expertise }: VehicleExpertiseProps) {
  if (!expertise) {
    return null;
  }

  const dominantStatus = getDominantStatus(expertise);

  return (
    <section className="mt-10 rounded-[2rem] border border-[#f0d889]/20 bg-[#20170f] p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">Boyali Veya Degisen Parca</p>

      <div className="mt-6 rounded-[1.75rem] border border-[#f0d889]/25 bg-[#f7f0dc] p-6 text-neutral-900">
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          {(Object.keys(statusStyles) as ExpertiseStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-[4px]" style={{ backgroundColor: statusStyles[status].fill }} />
              <span>{statusStyles[status].label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[1.5rem] bg-white/40 p-4">
            <svg viewBox="0 0 400 400" className="mx-auto h-auto w-full max-w-[420px]">
              <circle cx="94" cy="146" r="28" fill="#d9d9d9" />
              <circle cx="94" cy="260" r="28" fill="#d9d9d9" />
              <circle cx="306" cy="146" r="28" fill="#d9d9d9" />
              <circle cx="306" cy="260" r="28" fill="#d9d9d9" />

              {(Object.keys(statusStyles) as ExpertiseStatus[]).map(() => null)}
              {parts.map((part) => part.shape(statusStyles[expertise[part.key] as ExpertiseStatus].fill))}

              <path d="M155 90C175 70 225 70 245 90L257 112L238 163V256L257 307L245 330C225 350 175 350 155 330L143 307L162 256V163L143 112L155 90Z" fill="none" stroke="#d7d3c8" strokeWidth="7" />
              <rect x="172" y="33" width="22" height="12" rx="4" fill="#d7d3c8" />
              <rect x="206" y="33" width="22" height="12" rx="4" fill="#d7d3c8" />
              <rect x="172" y="355" width="22" height="12" rx="4" fill="#d7d3c8" />
              <rect x="206" y="355" width="22" height="12" rx="4" fill="#d7d3c8" />
            </svg>
          </div>

          <div className="flex flex-col justify-start">
            <div className="flex items-start gap-3">
              <span className="mt-2 h-3 w-3 rounded-[2px]" style={{ backgroundColor: statusStyles[dominantStatus].fill }} />
              <div>
                <h3 className="text-3xl font-semibold">{statusStyles[dominantStatus].label}</h3>
                <p className="mt-4 max-w-md text-lg leading-8 text-neutral-700">
                  {expertise.notes ?? statusStyles[dominantStatus].text}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {parts.map((part) => {
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
