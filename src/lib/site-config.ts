import type { CompanyStat, ServiceItem } from "@/types/inventory";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Hüseyin Aksu Otomotiv",
  title: "Premium Galeri Deneyimi",
  description:
    "Modern tasarim, guven veren iletisim ve ozenle secilmis arac portfoyu ile yeni nesil galerici vitrini.",
  phone: "+90 532 000 00 00",
  whatsapp: "905320000000",
  email: "info@aksuotomotiv.com",
  address: "Turkiye",
  hero: {
    eyebrow: "Yeni Nesil Galeri Vitrini",
    title: "Guven, seffaflik ve guclu portfoy ile fark yaratan bir otomotiv deneyimi.",
    description:
      "Arac secmekten fazlasini sunuyoruz. Her ilanda net bilgi, her gorusmede samimiyet ve her teslimatta premium bir deneyim.",
  },
};

export const companyStats: CompanyStat[] = [
  {
    value: "10+",
    label: "Yillik Tecrube",
    detail: "Sektoru ve musteri beklentisini yakindan bilen deneyimli ekip.",
  },
  {
    value: "300+",
    label: "Mutlu Teslimat",
    detail: "Referansla buyuyen guven odakli satis yapisi.",
  },
  {
    value: "24 saat",
    label: "Hizli Donus",
    detail: "Ekspertiz, finansman ve arac bilgileri icin hizli destek.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Arac Alim ve Satis Danismanligi",
    description:
      "Musterinin ihtiyaclarina gore filtrelenmis, net ve yonlendirici bir arac secimi sureci sunuyoruz.",
  },
  {
    title: "Takas ve Degerleme",
    description: "Mevcut araciniz icin hizli teklif ve piyasa dengelerine uygun degerlendirme hizmeti.",
  },
  {
    title: "Finansman Yonu",
    description: "Kredi ve odeme senaryolarini sade anlatarak karar surecini kolaylastiriyoruz.",
  },
  {
    title: "Ekspertiz ve Seffaf Bilgilendirme",
    description: "Ilanlarda ve gorusmelerde arac gecmisi, durumu ve onemli detaylar acikca paylasilir.",
  },
];

export const trustPoints = [
  "Her arac icin detayli bilgi, net ilan dili ve seffaf iletisim",
  "Sahibinden akisini merkez vitrinde de gosterebilen altyapi",
  "Mobilde de premium his veren modern arayuz",
  "Ileride randevu, CRM ve teklif formu ile genislemeye uygun mimari",
];
