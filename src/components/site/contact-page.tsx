import Link from "next/link";
import { Clock3, Mail, MapPinned, MessageCircleMore, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const contactCards = [
  {
    icon: Phone,
    title: "Telefon",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: MessageCircleMore,
    title: "WhatsApp",
    value: "Hemen yazin",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    icon: Mail,
    title: "E-Posta",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
];

export function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">Iletisim</p>
          <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight">
            Musteri ile ilk temas anini bile premium ve guven verici hale getiriyoruz.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
            Telefon, WhatsApp ve showroom konumu net gorunsun; musteri saniyeler icinde ulasabilsin diye bu sayfayi odakli
            tasarladik.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;

              return (
                <a
                  key={card.title}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                  className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:bg-white/8"
                >
                  <Icon className="h-5 w-5 text-amber-200" />
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/55">{card.title}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{card.value}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-black/25 p-8">
          <h2 className="text-3xl font-semibold">Showroom Bilgileri</h2>
          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="flex items-center gap-3 text-white">
                <MapPinned className="h-5 w-5 text-amber-200" />
                Adres
              </p>
              <p className="mt-3 leading-7 text-white/68">{siteConfig.address}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-5">
              <p className="flex items-center gap-3 text-white">
                <Clock3 className="h-5 w-5 text-amber-200" />
                Calisma Saatleri
              </p>
              <p className="mt-3 leading-7 text-white/68">Pazartesi - Cumartesi / 09:00 - 19:30</p>
            </div>
          </div>

          <Button asChild className="mt-8" size="lg">
            <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp Uzerinden Randevu Al
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

