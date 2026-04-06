import { load } from "cheerio";

type FetchedListingData = {
  title: string;
  brand: string;
  model: string;
  year?: number;
  price?: number;
  km?: number;
  fuel?: string;
  transmission?: string;
  location?: string;
  sourceUrl: string;
};

function decodeHtml(value: string) {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ouml;/g, "ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&ccedil;/g, "ç")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&Ccedil;/g, "Ç")
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"');
}

function normalizeText(value?: string | null) {
  return decodeHtml(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumber(value?: string | null) {
  const normalized = normalizeText(value).replace(/[^\d]/g, "");
  return normalized ? Number(normalized) : undefined;
}

function inferBrand(title: string) {
  return normalizeText(title.split(" ")[0]) || "Arac";
}

function inferModel(title: string, brand: string) {
  const normalizedTitle = normalizeText(title);
  const normalizedBrand = normalizeText(brand);
  const withoutBrand = normalizedTitle.startsWith(normalizedBrand)
    ? normalizedTitle.slice(normalizedBrand.length).trim()
    : normalizedTitle;

  return withoutBrand.split(" ").slice(0, 2).join(" ") || "Model";
}

function extractByLabel(text: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escapedLabel}\\s*[:]?\\s*([^\\n\\r<]{1,80})`, "i");
  return normalizeText(text.match(pattern)?.[1]);
}

function extractTitle($: ReturnType<typeof load>) {
  return (
    normalizeText($('meta[property="og:title"]').attr("content")) ||
    normalizeText($('meta[name="twitter:title"]').attr("content")) ||
    normalizeText($("title").text()).replace(/\s*\|\s*Sahibinden.*$/i, "")
  );
}

function extractPrice($: ReturnType<typeof load>, bodyText: string) {
  return (
    parseNumber($('meta[property="product:price:amount"]').attr("content")) ??
    parseNumber($('[itemprop="price"]').attr("content")) ??
    parseNumber(extractByLabel(bodyText, "Fiyat")) ??
    parseNumber(bodyText.match(/([\d\.\,]+)\s*TL/i)?.[1])
  );
}

function extractJsonLdData($: ReturnType<typeof load>) {
  const scripts = $('script[type="application/ld+json"]')
    .map((_, element) => $(element).html())
    .get()
    .filter(Boolean);

  for (const script of scripts) {
    try {
      const parsed = JSON.parse(script as string);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];

      for (const node of nodes) {
        const title = normalizeText(node?.name);
        const price = parseNumber(node?.offers?.price ?? node?.price);
        const brand = normalizeText(node?.brand?.name ?? node?.brand);
        const model = normalizeText(node?.model);

        if (title || price || brand || model) {
          return { title, price, brand, model };
        }
      }
    } catch {
      continue;
    }
  }

  return null;
}

export async function fetchSahibindenListingData(url: string): Promise<FetchedListingData> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "tr-TR,tr;q=0.9,en;q=0.8",
      Referer: "https://www.sahibinden.com/",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Ilan sayfasi cekilemedi. Kod: ${response.status}`);
  }

  const html = await response.text();
  const $ = load(html);
  const bodyText = normalizeText($("body").text());
  const jsonLdData = extractJsonLdData($);

  const title = jsonLdData?.title || extractTitle($);

  if (!title) {
    throw new Error("Ilan basligi okunamadi.");
  }

  const brand = jsonLdData?.brand || inferBrand(title);
  const model = jsonLdData?.model || inferModel(title, brand);

  return {
    title,
    brand,
    model,
    year:
      parseNumber(extractByLabel(bodyText, "Yıl")) ??
      parseNumber(extractByLabel(bodyText, "Model Yılı")) ??
      parseNumber(title.match(/\b(19\d{2}|20\d{2})\b/)?.[0]),
    price: jsonLdData?.price ?? extractPrice($, bodyText),
    km: parseNumber(extractByLabel(bodyText, "KM")) ?? parseNumber(extractByLabel(bodyText, "Kilometre")),
    fuel:
      extractByLabel(bodyText, "Yakıt") ||
      extractByLabel(bodyText, "Yakıt Tipi") ||
      extractByLabel(bodyText, "Fuel Type"),
    transmission:
      extractByLabel(bodyText, "Vites") ||
      extractByLabel(bodyText, "Transmission") ||
      extractByLabel(bodyText, "Vites Tipi"),
    location:
      extractByLabel(bodyText, "İl / İlçe") ||
      extractByLabel(bodyText, "Il / Ilce") ||
      normalizeText(
        $(".classifiedInfo h2 a, .classifiedInfo h2 span, .classifiedInfo h3 a, .classifiedInfo h3 span")
          .map((_, element) => $(element).text())
          .get()
          .join(" / "),
      ),
    sourceUrl: url,
  };
}
