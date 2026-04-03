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

- `SAHIBINDEN_FEED_URL` varsa JSON feed okumayi dener
- `NEXT_PUBLIC_SAHIBINDEN_STORE_URL` olarak `https://gorkemoto.sahibinden.com/` verilirse mevcut magaza ilanlarinin snapshot verisini kullanir
- dogrudan sahibinden HTML cekimi Cloudflare tarafinda engellenebildigi icin tamamen canli scraping her ortamda garantili degildir

Bu nedenle en saglam cozum:

1. resmi/ozel bir feed varsa onu kullanmak
2. yoksa periyodik snapshot yenilemek
3. ileri asamada browser otomasyonu veya harici ingest servisi eklemek
