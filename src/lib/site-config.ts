import type { CompanyStat, ServiceItem } from "@/types/inventory";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Görkem Otomotiv",
  title: "",
  description:
    "Modern tasarım, güven veren iletişim ve özenle seçilmiş arac portfoyu ile yeni nesil galerici vitrini.",
  phone: "+90 532 000 00 00",
  whatsapp: "905320000000",
  email: "info@gorkemoto.com",
  address: "Istanbul / Basaksehir Oto Ticaret Merkezi",
  hero: {
    eyebrow: "Yeni Nesil Galeri Vitrini",
    title: "Güvenden Beslenen, Tasarımla Fark Yaratan Bir Otomotiv Deneyimi",
    description:
      "Araç seçmekten fazlasını sunuyoruz. Her ilanda net bilgi, her görüşmede samimiyet ve her teslimatta premium bir deneyim.",
  },
};

export const companyStats: CompanyStat[] = [
  {
    value: "12+",
    label: "Yıllık Tecrube",
    detail: "Sektörü ve müşteri beklentisini yakından bilen ekip.",
  },
  {
    value: "350+",
    label: "Mutlu Teslimat",
    detail: "Referansla büyüyen güven odaklı satış yapısı.",
  },
  {
    value: "24 saat",
    label: "Hızlı Dönüş",
    detail: "Ekspertiz, finansman ve arac bilgileri için hızlı destek.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Araç Alım ve Satış Danışmanlığı",
    description:
      "Müşterinin ihtiyaçlarına göre filtrelenmüş, net ve yönlendirici bir araç seçimi süreci sunuyoruz.",
  },
  {
    title: "Takas ve Değerleme",
    description:
      "Mevcut araciniz icin hizli teklif ve piyasa dengelerine uygun degerlendirme hizmeti.",
  },
  {
    title: "Finansman Yonu",
    description:
      "Kredi ve ödeme senaryolarını sade anlatarak karar sürecini kolaylaştıryoruz.",
  },
  {
    title: "Ekspertiz ve Şeffaf Bilgilendirme",
    description:
      "İlanlarda ve showroom görüşmelerinde arac geçmişi, durum ve önemli detaylar açıkça paylaşıılır.",
  },
];

export const trustPoints = [
  "Her araç için detaylı bilgi, net ilan dili ve şeffaf iletişim",
  "Sahibinden akışını merkez vitrinde de gösterebilen altyapı",
  "Mobilde de premium his veren modern arayüz",
  "İleride randevu, CRM ve teklif formu ile genişlemeye uygun mimari",
];

