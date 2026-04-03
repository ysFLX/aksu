"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CarFront, MapPin, MessagesSquare, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { companyStats, services, siteConfig, trustPoints } from "@/lib/site-config";
import { formatCurrency, formatKm } from "@/lib/utils";
import type { Vehicle } from "@/types/inventory";

type LandingPageProps = {
  vehicles: Vehicle[];
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export function LandingPage({ vehicles }: LandingPageProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#2b180d_0%,#120e0c_42%,#080808_100%)] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(218,165,32,0.08),transparent_35%,rgba(255,255,255,0.04)_100%)]" />
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="mx-auto grid min-h-screen max-w-7xl gap-16 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
          <div className="flex flex-col">
            <header className="flex items-center justify-between py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Gorkemoto</p>
                <h2 className="mt-2 font-serif text-2xl tracking-wide text-white">{siteConfig.title}</h2>
              </div>
              <div className="hidden items-center gap-3 md:flex">
                <Link href={`tel:${siteConfig.phone}`} className="text-sm text-white/80 transition hover:text-white">
                  {siteConfig.phone}
                </Link>
                <Button asChild variant="secondary">
                  <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
                    WhatsApp
                  </Link>
                </Button>
              </div>
            </header>

            <motion.div className="mt-14 max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-amber-100/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {siteConfig.hero.eyebrow}
              </div>
              <h1 className="mt-8 text-5xl font-semibold leading-tight text-white md:text-7xl">
                {siteConfig.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">{siteConfig.hero.description}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <a href="#araclar">
                    Araclari Kesfet
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="#hakkimizda">Bizi Taniyin</a>
                </Button>
              </div>
            </motion.div>

            <div className="mt-auto grid gap-4 pb-8 pt-14 md:grid-cols-3">
              {companyStats.map((item) => (
                <motion.div
                  key={item.label}
                  {...fadeUp}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <p className="text-3xl font-semibold text-white">{item.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.22em] text-amber-100/70">{item.label}</p>
                  <p className="mt-4 text-sm leading-6 text-white/65">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative flex items-end"
          >
            <div className="relative min-h-[680px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_28%,rgba(0,0,0,0.4)_100%)]" />
              <Image
                src={vehicles[0]?.image ?? "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"}
                alt={vehicles[0]?.title ?? "One cikan arac"}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.75rem] border border-white/15 bg-black/45 p-6 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-amber-100/70">One Cikan Ilan</p>
                    <h3 className="mt-3 text-3xl font-semibold">{vehicles[0]?.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/85">
                    {vehicles[0]?.year}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/80">
                  <span className="rounded-full bg-white/10 px-4 py-2">{vehicles[0]?.transmission}</span>
                  <span className="rounded-full bg-white/10 px-4 py-2">{vehicles[0]?.fuel}</span>
                  <span className="rounded-full bg-white/10 px-4 py-2">{formatKm(vehicles[0]?.km ?? 0)} km</span>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-3xl font-semibold text-amber-200">
                    {formatCurrency(vehicles[0]?.price ?? 0)}
                  </p>
                  <Button asChild variant="secondary">
                    <a href="#araclar">Tum Portfoy</a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="hakkimizda" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div {...fadeUp} className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Hakkimizda</p>
            <h2 className="mt-4 max-w-md text-4xl font-semibold leading-tight">
              Arac satmaktan once guven olusturan bir marka dili kuruyoruz.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {trustPoints.map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <ShieldCheck className="h-5 w-5 text-amber-200" />
                <p className="mt-4 text-base leading-7 text-white/78">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <motion.div {...fadeUp} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Hizmetler</p>
              <h2 className="mt-4 text-4xl font-semibold">Showroom disinda da karar surecini tasarliyoruz.</h2>
            </div>
            <p className="max-w-2xl text-white/68">
              Bu altyapi; arac vitrini, kurumsal anlatim, iletisim ve ilan senkronunu ayni yerde toplamak icin kuruldu.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service.title} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6">
                <BadgeCheck className="h-5 w-5 text-amber-200" />
                <h3 className="mt-4 text-xl font-semibold">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/68">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="araclar" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <motion.div {...fadeUp} className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Portfoy</p>
            <h2 className="mt-4 text-4xl font-semibold">Sahibinden akisi ile beslenebilen dinamik arac vitrini</h2>
          </div>
          <p className="max-w-xl text-white/68">
            Buradaki kartlar su an demo veriyle geliyor. Feed baglandiginda ayni alan otomatik guncellenecek.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <motion.article
              key={vehicle.id}
              {...fadeUp}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                  {vehicle.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{vehicle.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="h-4 w-4" />
                      {vehicle.location}
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/70">{vehicle.year}</span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-white/72">
                  <div className="rounded-2xl bg-black/20 p-3">
                    <p className="text-white/45">Yakit</p>
                    <p className="mt-2 font-medium text-white">{vehicle.fuel}</p>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-3">
                    <p className="text-white/45">Vites</p>
                    <p className="mt-2 font-medium text-white">{vehicle.transmission}</p>
                  </div>
                  <div className="rounded-2xl bg-black/20 p-3">
                    <p className="text-white/45">KM</p>
                    <p className="mt-2 font-medium text-white">{formatKm(vehicle.km)}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-3xl font-semibold text-amber-200">{formatCurrency(vehicle.price)}</p>
                  <Button asChild variant="secondary">
                    <Link href={vehicle.sourceUrl ?? "#"} target="_blank" rel="noreferrer">
                      Ilani Ac
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <motion.div
          {...fadeUp}
          className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Iletisim</p>
            <h2 className="mt-4 text-4xl font-semibold">Musteri ile temasi da vitrinin bir parcasi olarak kurguladik.</h2>
            <p className="mt-4 max-w-2xl text-white/68">
              Telefon, WhatsApp ve konum bilgisi dogrudan gorunur. Bir sonraki adimda teklif formu ve randevu akisi da ekleyebiliriz.
            </p>
          </div>
          <div className="grid gap-3">
            <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5 py-4 text-white/85">
              <PhoneCall className="h-4 w-4 text-amber-200" />
              {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5 py-4 text-white/85"
            >
              <MessagesSquare className="h-4 w-4 text-amber-200" />
              WhatsApp Uzerinden Ulasin
            </a>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5 py-4 text-white/85">
              <CarFront className="h-4 w-4 text-amber-200" />
              {siteConfig.address}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
