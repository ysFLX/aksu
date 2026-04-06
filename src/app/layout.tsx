import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://aksu-delta.vercel.app"),
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${display.variable} ${sans.variable} bg-neutral-950 font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
