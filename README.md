# Aksu Otomotiv

Premium galerici vitrini ve ilan akisi icin kurulan Next.js tabanli altyapi.

## Teknoloji

- Next.js 15 + App Router
- TypeScript
- Tailwind CSS 4
- Motion
- Zod
- Supabase

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
- `supabase/vehicles.sql`: admin paneli icin tablo kurulumu

## Admin Panel

Admin paneli `/admin` adresindedir.

Kalici kullanim icin:

1. Supabase projesi olusturun
2. SQL Editor icinde `supabase/vehicles.sql` dosyasini calistirin
3. Vercel veya `.env.local` icine su degiskenleri ekleyin:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Bu degiskenler varsa admin paneli Supabase'e yazar.
Yoksa gecici olarak `src/lib/data/manual-inventory.json` dosyasina yazar.

## Sahibinden Entegrasyonu

`src/lib/inventory/providers/sahibinden.ts` dosyasi entegrasyon icin adapter gorevi gorur.
Su an:

- `SAHIBINDEN_FEED_URL` varsa JSON feed okumayi dener
- `NEXT_PUBLIC_SAHIBINDEN_STORE_URL` olarak `https://huseyinaksuotomotiv.sahibinden.com/` verilirse mevcut magaza ilanlarinin snapshot verisini kullanir
- tarayici otomasyonuyla gercek ilan linkleri ve foto URL'leri `src/lib/data/generated/sahibinden-store.generated.json` dosyasina senkronlanabilir

## Foto Senkronu

Gercek sahibinden fotograflarini almak icin:

1. `npm install`
2. `npx playwright install chrome`
3. `npm run sync:sahibinden`

Bu script acilan Chrome penceresinde sahibinden magazasini gezer.
Bot korumasi cikarsa dogrulamayi tarayicida tamamlayip terminalde Enter'a basin.
Sync sonunda `src/lib/data/generated/sahibinden-store.generated.json` guncellenir ve site bu veriyi otomatik kullanir.

Bu nedenle en saglam cozum:

1. resmi/ozel bir feed varsa onu kullanmak
2. yoksa `npm run sync:sahibinden` ile periyodik gorsel snapshot yenilemek
3. ileri asamada harici ingest servisi eklemek
