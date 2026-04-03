"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkimizda" },
  { href: "/galeri", label: "Galeri" },
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
            <nav className="flex items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
              {navigation.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium text-white/72 transition hover:bg-white/8 hover:text-white",
                      isActive && "bg-white text-neutral-950 shadow-[0_8px_24px_rgba(255,255,255,0.18)]",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Button asChild className="xl:ml-3">
              <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
