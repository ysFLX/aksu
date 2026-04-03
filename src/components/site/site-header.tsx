"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkimizda" },
  { href: "/ilanlar", label: "Ilanlar" },
  { href: "/iletisim", label: "Iletisim" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/72 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Link href="/" className="min-w-0 shrink-0">
            <p className="text-[11px] uppercase tracking-[0.42em] text-amber-200/75">{siteConfig.name}</p>
            <p className="mt-2 font-serif text-2xl leading-none text-white">{siteConfig.title}</p>
          </Link>

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <nav className="flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-white/78 transition duration-300 hover:bg-white/8 hover:text-white",
                      isActive &&
                        "bg-white/8 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_10px_30px_rgba(255,255,255,0.06)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp ile iletisime gec"
              className="inline-flex min-w-[172px] shrink-0 items-center justify-center rounded-full border border-white/15 bg-white px-7 py-3 text-base font-semibold text-neutral-950 shadow-[0_18px_50px_rgba(255,255,255,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              <span className="text-neutral-950">WhatsApp</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
