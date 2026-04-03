# Gorkemoto

Premium galerici vitrini ve ilan akisi icin kurulan Next.js tabanli altyapi.

## Teknoloji

- Next.js 15 + App Router
- TypeScript
- Tailwind CSS 4
- Motion
- Zod

## Baslangic

1. Node.js `20.9` veya ustunu kurun.
2. `npm install`
3. `.env.example` dosyasini `.env.local` olarak kopyalayin.
4. `npm run dev`

## Proje Yapisi

- `src/app`: sayfalar ve API route'lari
- `src/components`: UI ve sayfa bolumleri
- `src/lib`: konfigurasyon, veri kaynaklari, entegrasyon katmani
- `src/types`: tip tanimlari

## Sahibinden Entegrasyonu

`src/lib/inventory/providers/sahibinden.ts` dosyasi entegrasyon icin adapter gorevi gorur.
Su an:

- ornek bir feed URL'si varsa oradan veri cekmeyi dener
- uygun veri yoksa lokal demo araclariyla devam eder

Bir sonraki adimda bu katmani, arkadasinin kullandigi ilan yayim akisi neyse ona gore netlestirip canliya baglayabiliriz.

