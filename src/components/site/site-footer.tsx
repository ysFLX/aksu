import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 text-sm text-white/65 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm leading-7">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-white">Menu</p>
          <div className="mt-4 grid gap-2">
            <Link href="/">Anasayfa</Link>
            <Link href="/hakkimizda">Hakkimizda</Link>
            <Link href="/ilanlar">Ilanlar</Link>
            <Link href="/iletisim">Iletisim</Link>
          </div>
        </div>
        <div>
          <p className="text-white">Iletisim</p>
          <div className="mt-4 grid gap-2">
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p>{siteConfig.address}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
