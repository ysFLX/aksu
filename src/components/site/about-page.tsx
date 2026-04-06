import { BadgeCheck, ShieldCheck, Users } from "lucide-react";

import { companyStats, services, trustPoints } from "@/lib/site-config";

export function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Hakkimizda</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight">
            Guven, seffaflik ve premium sunum anlayisini ayni cizgide bulusturuyoruz.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-white/68">
          Hüseyin Aksu Otomotiv, arac ilanlarini sadece listeleyen bir galeri degil; musterinin kararini kolaylastiran,
          detaylari saklamayan ve her temasta profesyonellik hissettiren bir marka deneyimi kurmak icin tasarlandi.
        </p>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-3">
        {companyStats.map((item) => (
          <article key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <p className="text-3xl font-semibold text-white">{item.value}</p>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-amber-100/70">{item.label}</p>
            <p className="mt-4 text-sm leading-7 text-white/65">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <article className="rounded-[2rem] border border-white/10 bg-black/25 p-8">
          <Users className="h-6 w-6 text-amber-200" />
          <h2 className="mt-5 text-3xl font-semibold">Kim Oldugumuz</h2>
          <p className="mt-4 leading-8 text-white/68">
            Mutfakta hizli satis degil, dogru eslesme var. Portfoy seciminden musteri iletisime kadar her noktada
            daha rafine bir galeri deneyimi sunmaya odaklaniyoruz.
          </p>
          <div className="mt-8 grid gap-3">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
                <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-amber-200" />
                <p className="text-sm leading-7 text-white/72">{point}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <BadgeCheck className="h-6 w-6 text-amber-200" />
          <h2 className="mt-5 text-3xl font-semibold">Nasil Calisiyoruz</h2>
          <div className="mt-8 grid gap-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/68">{service.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
