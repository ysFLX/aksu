import type { CompanyStat, ServiceItem } from "@/types/inventory";

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Hüseyin Aksu Otomotiv",
  title: "",
  description:
    "Modern tasarim, guven veren iletisim ve ozenle secilmis arac portfoyu ile yeni nesil galerici vitrini.",
  phone: "+90 532 000 00 00",
  whatsapp: "905320000000",
  email: "info@aksuotomotiv.com",
  address: "Turkiye",
  hero: {
    title: "Güven, şeffaflık ve güçlü portföy ile fark yaratan bir otomotiv deneyimi.",
    description:
      "Araç seçmekten fazlasını sunuyoruz. Her ilanda net bilgi, her görüşmede samimiyet ve her teslimatta premium bir deneyim.",
  },
};

export const companyStats: CompanyStat[] = [
  {
    value: "10+",
    label: "Yıllık Tecrübe",
    detail: "Sektörü ve müşterinin beklentisini yakından bilen deneyimli ekip.",
  },
  {
    value: "300+",
    label: "Mutlu Teslimat",
    detail: "Referansla büyuyen güven odaklı satış yapısı.",
  },
  {
    value: "24 saat",
    label: "Hızlı Dönüş",
    detail: "Ekspertiz, finansman ve araç bilgileri için hızlı destek.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Arac Alim ve Satis Danismanligi",
    description:
      "Müşterinin ihtiyaçlarına göre filtrelenmiş, net ve yönlendirici bir araç seçimi süreci sunuyoruz.",
  },
  {
    title: "Takas ve Değerleme",
    description: "Mevcut aracınız için hızlı teklif ve piyasa dengelerine uygun değerlendirme hizmeti.",
  },
  {
    title: "Finansman Yönü",
    description: "Kredi ve ödeme senaryolarını sade anlatarak karar sürecini kolaylaştırmaya çalışıyoruz.",
  },
  {
    title: "Ekspertiz ve Şeffaf Bilgilendirme",
    description: "İlanlarda ve görüşmelerde araç geçmişi, durumu ve önemli detaylar açıkça paylaşılır.",
  },
];

export const trustPoints = [
  "Her araç için detaylı bilgi, net ilan dili ve şeffaf iletisim",
  "Sahibinden akışını merkez vitrinde de gösterebilen altyapı",
  "Mobilde de premium his veren modern arayüz",
  "İleride randevu, CRM ve teklif formu ile genişlemeye uygun mimari",
];
