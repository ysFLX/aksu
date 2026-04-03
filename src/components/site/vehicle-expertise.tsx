import type { ExpertiseStatus, VehicleExpertise } from "@/types/inventory";

const statusStyles: Record<
  ExpertiseStatus,
  { badge: string; label: string; text: string; panel: string; dot: string }
> = {
  Orijinal: {
    badge: "border-neutral-400/25 bg-neutral-300/15 text-neutral-200",
    label: "Orijinal",
    text: "Aracin parcalari orijinal gorunuyor.",
    panel: "border-neutral-300/10 bg-neutral-200/8",
    dot: "bg-neutral-300",
  },
  "Lokal Boyal\u0131": {
    badge: "border-orange-400/25 bg-orange-400/15 text-orange-100",
    label: "Lokal Boyali",
    text: "Bazi parcalarda lokal boya islemi bulunuyor.",
    panel: "border-orange-400/15 bg-orange-400/8",
    dot: "bg-orange-400",
  },
  "Boyal\u0131": {
    badge: "border-sky-400/25 bg-sky-400/15 text-sky-100",
    label: "Boyali",
    text: "Bazi parcalar komple boyali gorunuyor.",
    panel: "border-sky-400/15 bg-sky-400/8",
    dot: "bg-sky-400",
  },
  "De\u011fi\u015fen": {
    badge: "border-rose-400/25 bg-rose-400/15 text-rose-100",
    label: "Degisen",
    text: "Aracta degisen parca bulunuyor.",
    panel: "border-rose-400/15 bg-rose-400/8",
    dot: "bg-rose-400",
  },
};

const partGroups: Array<{
  title: string;
  parts: Array<{ key: keyof VehicleExpertise; label: string }>;
}> = [
  {
    title: "On Bolum",
    parts: [
      { key: "frontBumper", label: "On Tampon" },
      { key: "hood", label: "Kaput" },
      { key: "leftFrontFender", label: "Sol On Camurluk" },
      { key: "rightFrontFender", label: "Sag On Camurluk" },
    ],
  },
  {
    title: "Orta Bolum",
    parts: [
      { key: "roof", label: "Tavan" },
      { key: "leftFrontDoor", label: "Sol On Kapi" },
      { key: "rightFrontDoor", label: "Sag On Kapi" },
    ],
  },
  {
    title: "Arka Bolum",
    parts: [
      { key: "leftRearDoor", label: "Sol Arka Kapi" },
      { key: "rightRearDoor", label: "Sag Arka Kapi" },
      { key: "leftRearFender", label: "Sol Arka Camurluk" },
      { key: "rightRearFender", label: "Sag Arka Camurluk" },
      { key: "rearBumper", label: "Arka Tampon" },
    ],
  },
];

type VehicleExpertiseProps = {
  expertise?: VehicleExpertise;
};

function SportbackSilhouette() {
  return (
    <div className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.18))] px-4 py-6">
      <div className="absolute inset-x-8 bottom-8 h-px bg-neutral-400/25" />
      <svg viewBox="0 0 760 240" className="relative h-auto w-full">
        <path
          d="M56 164L92 160L126 132L170 126L226 100L302 76L436 72L520 86L592 102L642 116L688 146L718 150L718 170L684 174L658 174L638 150L572 146L548 174L206 174L184 148L126 148L106 174L74 174L56 170Z"
          fill="#d3ccc0"
        />
        <path
          d="M170 128L230 100L304 82L430 78L504 90L560 102L610 116L640 142L568 142L520 102L338 92L270 102L220 126L170 132Z"
          fill="#bdb9b7"
        />
        <path
          d="M238 126L276 100L336 90L430 88L488 98L528 126L470 126L438 98L336 100L284 108L252 126Z"
          fill="#f5eddc"
        />
        <path d="M228 128H300V148L204 148Z" fill="#f5eddc" />
        <path d="M530 128H610L646 146H564Z" fill="#f5eddc" />
        <path d="M324 150H476V170H324Z" fill="#b9b6b5" />
        <path d="M202 146L228 148L194 174H156Z" fill="#c5bba6" opacity="0.65" />
        <path d="M564 146L598 146L642 174H606Z" fill="#c5bba6" opacity="0.65" />
        <circle cx="188" cy="174" r="32" fill="#d3ccc0" />
        <circle cx="188" cy="174" r="22" fill="#f8f1e2" />
        <circle cx="188" cy="174" r="9" fill="#c8c1b3" />
        <circle cx="564" cy="174" r="32" fill="#d3ccc0" />
        <circle cx="564" cy="174" r="22" fill="#f8f1e2" />
        <circle cx="564" cy="174" r="9" fill="#c8c1b3" />
        <path d="M88 174H696" stroke="#c9bea8" strokeWidth="4" strokeLinecap="round" opacity="0.45" />
      </svg>
      <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-neutral-500">
        <span>Sportback Silueti</span>
        <span>Premium Profil</span>
      </div>
    </div>
  );
}

function dominantStatus(expertise: VehicleExpertise): ExpertiseStatus {
  const ordered: ExpertiseStatus[] = ["De\u011fi\u015fen", "Boyal\u0131", "Lokal Boyal\u0131", "Orijinal"];
  const keys = partGroups.flatMap((group) => group.parts.map((part) => part.key));

  return ordered.find((status) => keys.some((key) => expertise[key] === status)) ?? "Orijinal";
}

export function VehicleExpertise({ expertise }: VehicleExpertiseProps) {
  if (!expertise) {
    return null;
  }

  const topStatus = dominantStatus(expertise);

  return (
    <section className="mt-10 overflow-hidden rounded-[2rem] border border-[#f0d889]/20 bg-[#20170f] p-6 md:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">Boyali Veya Degisen Parca</p>

      <div className="mt-6 rounded-[1.75rem] border border-[#f0d889]/25 bg-[#f7f0dc] p-5 text-neutral-900 md:p-6">
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          {(Object.keys(statusStyles) as ExpertiseStatus[]).map((status) => (
            <div key={status} className="flex items-center gap-2">
              <span className={`h-5 w-5 rounded-[4px] ${statusStyles[status].dot}`} />
              <span>{statusStyles[status].label}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.75rem] border border-black/6 bg-white/45 p-5">
            <div className={`rounded-[1.5rem] border p-5 ${statusStyles[topStatus].panel}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">Genel Durum</p>
                  <h3 className="mt-3 text-3xl font-semibold">{statusStyles[topStatus].label}</h3>
                  <p className="mt-3 max-w-md text-base leading-7 text-neutral-700">
                    {expertise.notes ?? statusStyles[topStatus].text}
                  </p>
                </div>

                <span className={`inline-flex rounded-full border px-3 py-1 text-sm ${statusStyles[topStatus].badge}`}>
                  {statusStyles[topStatus].label}
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {partGroups.map((group) => {
                const statuses = group.parts.map((part) => expertise[part.key] as ExpertiseStatus);
                const groupStatus =
                  (["De\u011fi\u015fen", "Boyal\u0131", "Lokal Boyal\u0131", "Orijinal"] as ExpertiseStatus[]).find((status) =>
                    statuses.includes(status),
                  ) ?? "Orijinal";

                return (
                  <div key={group.title} className={`rounded-2xl border p-4 ${statusStyles[groupStatus].panel}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-neutral-800">{group.title}</p>
                      <span className={`h-2.5 w-2.5 rounded-full ${statusStyles[groupStatus].dot}`} />
                    </div>
                    <p className="mt-3 text-sm text-neutral-600">{statusStyles[groupStatus].label}</p>
                  </div>
                );
              })}
            </div>

            <SportbackSilhouette />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {partGroups.flatMap((group) =>
              group.parts.map((part) => {
                const status = expertise[part.key] as ExpertiseStatus;

                return (
                  <div key={part.key} className="rounded-2xl border border-black/8 bg-white/55 p-4">
                    <p className="text-sm text-neutral-500">{group.title}</p>
                    <div className="mt-2 flex items-start justify-between gap-3">
                      <p className="text-lg font-semibold text-neutral-900">{part.label}</p>
                      <span className={`mt-0.5 h-2.5 w-2.5 rounded-full ${statusStyles[status].dot}`} />
                    </div>
                    <span className={`mt-4 inline-flex rounded-full border px-3 py-1 text-sm ${statusStyles[status].badge}`}>
                      {statusStyles[status].label}
                    </span>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
