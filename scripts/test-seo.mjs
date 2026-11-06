import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import { get as httpGet } from "node:http";
import forestMedia from "../src/data/forest-media.json" with { type: "json" };

// Read-only assertions against a running production build; never submits forms.
const base = process.env.SEO_BASE_URL || "http://localhost:3106";
const production = "https://hyzhinalesnika.ru";
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map(match => match[0]);
const attr = (tag, name) => decode(tag?.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "");
const meta = (html, name) => attr(tags(html, "meta").find(tag => attr(tag, "name") === name || attr(tag, "property") === name), "content");
const canonical = html => attr(tags(html, "link").find(tag => attr(tag, "rel") === "canonical"), "href");
const get = path => fetch(new URL(path, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
const sitemap = await (await get("/sitemap.xml")).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decode(match[1]));
assert.equal(urls.length, 17, "16 existing pages and current consent document belong in sitemap");
assert.equal(new Set(urls).size, urls.length, "No duplicate sitemap entries");
const rows = [], titles = new Set(), descriptions = new Set(), links = new Set();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const response = await get(pathname);
  assert.equal(response.status, 200, pathname);
  const html = await response.text();
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || "");
  const description = meta(html, "description");
  assert.ok(title && description, `Metadata: ${pathname}`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `Unique metadata: ${pathname}`);
  titles.add(title); descriptions.add(description);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `One H1: ${pathname}`);
  assert.equal(new URL(canonical(html)).toString(), new URL(url).toString(), `Self canonical: ${pathname}`);
  assert.equal(new URL(meta(html, "og:url")).toString(), new URL(url).toString(), `OG canonical: ${pathname}`);
  assert.ok(!meta(html, "robots").includes("noindex"), `Indexable: ${pathname}`);
  assert.ok(meta(html, "og:image").startsWith(production), `Social image: ${pathname}`);
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  const nodes = graphs.flatMap(schema => schema["@graph"] || [schema]);
  assert.ok(nodes.some(node => node["@type"] === "LodgingBusiness"), `Business schema: ${pathname}`);
  const business = nodes.find(node => node["@type"] === "LodgingBusiness");
  assert.equal(business.address.streetAddress, "улица Лесная, 40", "Correct business identity");
  assert.equal(business.telephone, "+79280201001", "Official booking phone");
  assert.match(business.petsAllowed, /оплачивается отдельно/, "Pet policy does not imply free accommodation");
  assert.ok(nodes.some(node => ["WebPage", "CollectionPage"].includes(node["@type"]) && node.url === new URL(url).toString() && node.name === title), `Page schema matches title: ${pathname}`);
  assert.ok(!nodes.some(node => node.aggregateRating), "No self-serving review aggregate in JSON-LD");
  const images = tags(html, "img");
  assert.ok(images.every(tag => /\balt="/.test(tag)), `Image alternatives: ${pathname}`);
  if (["/dom-dlya-semi", "/dvuhetazhnyj-barnhouse", "/shale-s-vidom-na-gory"].includes(pathname)) {
    const cabin = nodes.find(node => node["@type"] === "Accommodation");
    assert.ok(cabin?.floorSize?.value > 0 && cabin.image.length > 0, `Cabin schema: ${pathname}`);
    const capacity = { "/dom-dlya-semi": 5, "/dvuhetazhnyj-barnhouse": 7, "/shale-s-vidom-na-gory": 4 }[pathname];
    assert.equal(cabin.occupancy.maxValue, capacity, `Published cabin capacity: ${pathname}`);
    assert.ok(html.includes("партнёрского парк-отеля «Адреналин»"), "Partner SPA is distinguished from cabin amenities");
    assert.ok(html.includes("Посещение СПА и питание оплачиваются отдельно."), "No implied inclusion in accommodation");
    assert.ok(!html.includes("электрических конвектора"), "Removed stale heating descriptions");
    assert.ok(!tags(html, "details").some(tag => /\bopen(?:[=>\s])/.test(tag)), "Cabin accordions initially closed");
  }
  if (pathname === "/") {
    const faq = [...html.matchAll(/<details\b[^>]*name="home-faq"[^>]*>(.*?)<\/details>/gs)];
    const questions = nodes.find(node => node["@type"] === "FAQPage").mainEntity;
    assert.equal(faq.length, questions.length, "FAQ answers rendered in server HTML");
    assert.ok(faq.every(match => !/\bopen(?:[=>\s])/.test(match[0].split(">")[0])), "FAQ initially closed");
    assert.ok(faq.some(match => match[1].includes("водяными тёплыми полами")), "Winter answer present without JavaScript");
    assert.ok(faq.some(match => match[1].includes("Навигационный адрес: ул. Лесная, 40")), "Business identity rendered in FAQ");
    const cabins = nodes.filter(node => node["@type"] === "Accommodation");
    assert.equal(cabins.length, 3, "All cabins described on the server-rendered home page");
    assert.deepEqual(cabins.map(cabin => cabin.occupancy.maxValue).sort(), [4, 5, 7]);
    for (const cabin of cabins) {
      assert.ok(tags(html, "a").some(tag => attr(tag, "href") === new URL(cabin.url).pathname), "Direct cabin links rendered without interaction");
    }
    const forest = images.find(tag => attr(tag, "alt") === "Лес и горы Архыза в тумане");
    assert.ok(forest && !attr(forest, "src").includes("/_next/image"), "Forest card avoids cold on-demand image encoding");
    const forestSources = tags(html, "source").filter(tag => attr(tag, "srcset").includes("forest-seclusion-"));
    assert.equal(forestSources.length, 2, "Responsive AVIF and WebP forest sources");
    for (const [format, sources] of [["avif", forestMedia.avif], ["webp", forestMedia.webp]]) {
      assert.ok(sources.every(source => source.width <= forestMedia.width), "No enlarged forest derivative");
      for (const source of sources) {
        const response = await get(source.src);
        assert.equal(response.status, 200, source.src);
        assert.ok(response.headers.get("content-type")?.includes(`image/${format}`));
        assert.match(response.headers.get("cache-control"), /max-age=31536000.*immutable/, "Hashed forest image cached immutably");
        assert.equal((await response.arrayBuffer()).byteLength, source.bytes, "Encoded forest derivative intact");
      }
    }
    assert.ok(tags(html, "a").some(tag => attr(tag, "href") === "/spa"), "Crawlable navigation");
    const hero = images.find(tag => attr(tag, "alt").includes("буковом лесу Архыза"));
    assert.ok(attr(hero, "srcset"), "Responsive hero image");
    const portraitSources = tags(html, "source").filter(tag => attr(tag, "srcset").includes("hero-mobile."));
    assert.equal(portraitSources.length, 2, "Portrait AVIF and WebP sources available");
    for (const source of portraitSources) {
      assert.ok(attr(source, "media").includes("max-aspect-ratio: 9/16"), "Crop only used where cover framing stays identical");
      const media = await get(attr(source, "srcset"));
      assert.equal(media.status, 200, "Portrait derivative exists");
      assert.match(media.headers.get("cache-control"), /immutable/, "Hashed portrait cached immutably");
      assert.ok(media.headers.get("content-type")?.includes(attr(source, "type")));
      await media.arrayBuffer();
    }
  }
  for (const tag of tags(html, "a")) {
    const href = attr(tag, "href");
    if (href.startsWith("/") && !href.startsWith("//")) links.add(href);
  }
  rows.push({ path: pathname, status: response.status, title, description, canonical: canonical(html), h1: 1, schemaTypes: nodes.map(node => node["@type"]), images: images.length, bytes: Buffer.byteLength(html) });
}
const aliases = { "/house": "/dom-dlya-semi", "/barnhouse": "/dvuhetazhnyj-barnhouse", "/shale": "/shale-s-vidom-na-gory", "/user/agreement": "/users/agreement", "/blog": "/news", "/putevoditeli-marshruty": "/news" };
for (const [from, to] of Object.entries(aliases)) {
  const response = await get(from);
  assert.equal(response.status, 308, `Permanent redirect: ${from}`);
  assert.equal(new URL(response.headers.get("location"), production).pathname, to);
}
// Node fetch rewrites Host; use the HTTP client to exercise the actual host rule.
const www = await new Promise((resolve, reject) => {
  httpGet(`${base}/spa?seo=audit`, { headers: { Host: "www.hyzhinalesnika.ru" } }, response => { response.resume(); resolve(response); }).on("error", reject);
});
assert.equal(www.statusCode, 308, "www redirect");
assert.equal(www.headers.location, `${production}/spa?seo=audit`);
const missing = await get("/missing-seo-regression-20261105");
assert.equal(missing.status, 404, "Real HTTP 404");
const missingHtml = await missing.text();
assert.ok(meta(missingHtml, "robots").includes("noindex"), "404 noindex");
assert.equal(canonical(missingHtml), "", "404 does not inherit home canonical");
const search = await (await get("/search")).text();
assert.ok(meta(search, "robots").includes("noindex"), "Search noindex");
const robots = await (await get("/robots.txt")).text();
assert.ok(robots.includes(`${production}/sitemap.xml`) && !robots.includes("Disallow: /search"), "Crawler can read search noindex");
for (const href of links) {
  const path = new URL(href, base);
  const response = await get(path.pathname + path.search);
  assert.equal(response.status, 200, `Internal link without redirect/error: ${href}`);
  if (path.hash) {
    const html = await response.text();
    assert.ok(html.includes(`id="${decodeURIComponent(path.hash.slice(1))}"`), `Anchor exists: ${href}`);
  }
}
const fontManifestResponse = await get("/fonts/subsets/manifest.json");
assert.ok(!fontManifestResponse.headers.get("cache-control")?.includes("immutable"), "Manifest can be revalidated");
const fontManifest = await fontManifestResponse.json();
for (const font of fontManifest.fonts) {
  assert.match(font.subset, /\.[0-9a-f]{12}\.woff2$/, "Font filename includes content hash");
  const response = await get(`/fonts/subsets/${font.subset}`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /max-age=31536000.*immutable/, "Versioned font cached immutably");
}
// The same responsive URL must negotiate formats without breaking older clients.
const heroUrl = new URL("/_next/image?url=%2Fimages%2Fhome%2Fhero-bg.jpg&w=750&q=60", base);
for (const [accept, mime] of [["image/avif,image/webp", "image/avif"], ["image/webp", "image/webp"], ["image/jpeg", "image/jpeg"]]) {
  const response = await fetch(heroUrl, { headers: { Accept: accept } });
  assert.equal(response.status, 200, `Hero image available: ${accept}`);
  assert.ok(response.headers.get("content-type")?.includes(mime), `Negotiated image format: ${mime}`);
  assert.match(response.headers.get("vary"), /accept/i, "Proxy caches distinguish supported image formats");
  await response.arrayBuffer();
}
if (process.env.SEO_REPORT_PATH) await writeFile(process.env.SEO_REPORT_PATH, JSON.stringify({ checkedAt: new Date().toISOString(), base, pages: rows, internalLinks: [...links], redirects: aliases, result: "passed" }, null, 2));
console.log(`SEO PASS: ${rows.length} pages; ${links.size} internal targets; 6 redirects; www; 404; metadata; schema; SSR FAQ; responsive hero.`);
