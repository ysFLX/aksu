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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/78 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">{siteConfig.name}</p>
            <p className="mt-1 font-serif text-xl tracking-[0.08em] text-white">{siteConfig.title}</p>
          </Link>

          <div className="hidden md:block">
            <Button asChild variant="secondary">
              <Link href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </Link>
            </Button>
          </div>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/8 hover:text-white",
                  isActive && "bg-white/10 text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
