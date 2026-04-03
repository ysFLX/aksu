import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const STORE_URL = "https://gorkemoto.sahibinden.com/";
const OUTPUT_PATH = path.join(process.cwd(), "src", "lib", "data", "generated", "sahibinden-store.generated.json");

function parsePrice(value) {
  return Number(value.replace(/[^\d]/g, ""));
}

function parseKm(value) {
  const normalized = value.replace(/[^\d]/g, "");
  return normalized ? Number(normalized) : undefined;
}

function parseYear(text) {
  const match = text.match(/\b(20\d{2}|19\d{2})\b/);
  return match ? Number(match[1]) : undefined;
}

function absoluteUrl(url) {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return new URL(url, STORE_URL).toString();
}

async function waitForManualVerification(page) {
  const hasBotWall =
    (await page.locator("text=Olagandisi bir durum tespit ettik").count()) > 0 ||
    (await page.locator("text=Olağandışı bir durum tespit ettik").count()) > 0 ||
    (await page.locator("text=Enable JavaScript and cookies to continue").count()) > 0;

  if (!hasBotWall) {
    return;
  }

  console.log("Sahibinden bot kontrolu acildi. Chrome penceresinde dogrulamayi tamamlayip Enter'a basin.");
  process.stdin.resume();
  await new Promise((resolve) => process.stdin.once("data", resolve));
}

async function collectListingLinks(page) {
  await page.goto(STORE_URL, { waitUntil: "domcontentloaded", timeout: 120000 });
  await waitForManualVerification(page);
  await page.goto(STORE_URL, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector('a[href*="/ilan/"]', { timeout: 120000 });

  const items = await page.$$eval('a[href*="/ilan/"]', (anchors) => {
    const seen = new Set();
    const results = [];

    for (const anchor of anchors) {
      const href = anchor.getAttribute("href");
      const text = anchor.textContent?.trim();
      if (!href || !text || seen.has(href)) continue;
      if (!/karta|gorkem|sorunsuz|hatasiz/i.test(text)) continue;
      seen.add(href);

      const row = anchor.closest("tr") ?? anchor.parentElement;
      const rowText = row?.textContent ?? "";
      const cells = Array.from(row?.querySelectorAll("td") ?? []).map((cell) => cell.textContent?.trim() ?? "");

      results.push({
        href,
        title: text,
        rowText,
        cells,
      });
    }

    return results.slice(0, 20);
  });

  return items.map((item, index) => ({
    id: String(64 + index),
    title: item.title,
    price: parsePrice(item.cells[1] ?? item.rowText),
    detailUrl: absoluteUrl(item.href),
  }));
}

async function collectListingDetail(browser, listing) {
  const page = await browser.newPage();

  try {
    await page.goto(listing.detailUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
    await page.waitForTimeout(2500);

    const imageCandidates = await page.$$eval("img", (images) =>
      images
        .map((image) => image.getAttribute("src") || image.getAttribute("data-src") || image.getAttribute("data-original"))
        .filter(Boolean),
    );

    const gallery = Array.from(
      new Set(imageCandidates.filter((url) => /shbdn|sahibinden|jpg|jpeg|webp|png/i.test(url))),
    ).map((url) => absoluteUrl(url));

    const detailText = await page.locator("body").innerText();
    const kmMatch = detailText.match(/(\d{1,3}(?:\.\d{3})+)\s*km/i);
    const fuelMatch = detailText.match(/Yak.t\s+([^\n]+)/i);
    const transmissionMatch = detailText.match(/Vites\s+([^\n]+)/i);
    const locationMatch = detailText.match(/Konum\s+([^\n]+)/i);

    return {
      id: listing.id,
      title: listing.title,
      price: listing.price,
      image: gallery[0],
      gallery,
      sourceUrl: listing.detailUrl,
      km: kmMatch ? parseKm(kmMatch[1]) : undefined,
      fuel: fuelMatch?.[1]?.trim(),
      transmission: transmissionMatch?.[1]?.trim(),
      location: locationMatch?.[1]?.trim(),
      year: parseYear(listing.title),
    };
  } finally {
    await page.close();
  }
}

async function main() {
  const userDataDir = path.join(process.cwd(), ".playwright", "sahibinden-profile");
  const browser = await chromium.launchPersistentContext(userDataDir, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1440, height: 1100 },
  });

  try {
    const page = browser.pages()[0] ?? (await browser.newPage());
    const listings = await collectListingLinks(page);
    const details = [];

    for (const listing of listings) {
      console.log(`Syncing: ${listing.title}`);
      const detail = await collectListingDetail(browser, listing);
      details.push(detail);
    }

    await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, `${JSON.stringify(details, null, 2)}\n`, "utf8");
    console.log(`Sahibinden sync tamamlandi: ${OUTPUT_PATH}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
