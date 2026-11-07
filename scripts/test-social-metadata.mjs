import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

// Read-only checks: bots must receive complete metadata without executing JS.
const base = process.env.SEO_BASE_URL || "http://127.0.0.1:3107";
const origin = "https://hyzhinalesnika.ru";
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const decode = value => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(match => match[0]);
const attr = (tag, name) => decode(tag?.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] || "");
const meta = (html, name) => attr(tags(html, "meta").find(tag => attr(tag, "property") === name || attr(tag, "name") === name), "content");
const get = (path, userAgent) => fetch(new URL(path, base), { headers: { "User-Agent": userAgent }, redirect: "manual", signal: AbortSignal.timeout(30000) });
const sitemap = await (await get("/sitemap.xml", "TelegramBot")).text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(decode(match[1])).pathname);
paths.push("/search");
const assets = new Map(), cards = new Set(), pages = [];
let expectedIcons;

for (const path of paths) {
  for (const userAgent of ["TelegramBot", "WhatsApp/2.24.0"]) {
    const response = await get(path, userAgent);
    assert.equal(response.status, 200, `${path}: ${userAgent}`);
    const head = (await response.text()).split("</head>")[0];
    const image = meta(head, "og:image");
    assert.ok(meta(head, "og:title") && meta(head, "og:description"), `Metadata in head: ${path}`);
    assert.equal(meta(head, "twitter:card"), "summary_large_image");
    assert.equal(meta(head, "twitter:image"), image);
    assert.equal(meta(head, "og:image:secure_url"), image);
    assert.equal(meta(head, "og:image:width"), "1200");
    assert.equal(meta(head, "og:image:height"), "630");
    const imageUrl = new URL(image);
    assert.equal(imageUrl.origin, origin);
    assert.match(imageUrl.searchParams.get("v"), /^[0-9a-f]{12}$/, "Image content version");
    assert.ok(!imageUrl.pathname.endsWith("/brand.jpg"), `Page-specific preview: ${path}`);
    cards.add(image);
    assets.set(image, { kind: "card" });
    const icons = tags(head, "link").filter(tag => ["icon", "shortcut icon", "apple-touch-icon"].includes(attr(tag, "rel")));
    assert.ok(icons.some(tag => attr(tag, "rel") === "apple-touch-icon"), `Apple icon: ${path}`);
    assert.ok(icons.some(tag => attr(tag, "href") === "/images/brand/favicon-96.png"), `Search PNG icon: ${path}`);
    const signature = icons.map(tag => `${attr(tag, "rel")}:${attr(tag, "href")}`).sort();
    if (!expectedIcons) expectedIcons = signature;
    assert.deepEqual(signature, expectedIcons, `Consistent site icons: ${path}`);
    for (const tag of icons) assets.set(new URL(attr(tag, "href"), origin).toString(), { kind: "icon" });
    pages.push({ path, userAgent, image, icons: icons.length });
  }
}
assert.equal(cards.size, paths.length, "Every published page and search has its own preview");
for (const [url, asset] of assets) {
  const source = new URL(url);
  const response = await get(source.pathname + source.search, "TelegramBot");
  assert.equal(response.status, 200, url);
  const bytes = Buffer.from(await response.arrayBuffer());
  const type = response.headers.get("content-type") || "";
  assert.match(type, /^image\//, url);
  if (asset.kind === "card") {
    assert.match(type, /image\/jpeg/);
    assert.equal(createHash("sha256").update(bytes).digest("hex").slice(0, 12), source.searchParams.get("v"));
    const info = await sharp(bytes).metadata();
    assert.equal(info.width, 1200); assert.equal(info.height, 630);
  } else if (type.includes("png")) {
    const info = await sharp(bytes).metadata();
    assert.equal(info.width, info.height);
    assert.ok(info.width >= 96);
  } else if (type.includes("svg")) {
    assert.ok(bytes.toString().includes("<svg"));
  } else {
    assert.equal(bytes.readUInt16LE(0), 0);
    assert.equal(bytes.readUInt16LE(2), 1, "Valid ICO header");
    assert.ok(bytes.readUInt16LE(4) > 0, "ICO contains images");
  }
}
if (process.env.SOCIAL_REPORT_PATH) await writeFile(process.env.SOCIAL_REPORT_PATH, JSON.stringify({ checkedAt: new Date().toISOString(), base, pages, assets: [...assets.keys()], result: "passed" }, null, 2) + "\n");
console.log(`SOCIAL PASS: ${paths.length} pages, 2 bot user agents, ${cards.size} distinct 1200x630 previews, shared favicons and image versions.`);
