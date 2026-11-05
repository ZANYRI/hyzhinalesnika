// Build a portrait derivative matching object-fit:cover on tall phones.
// No upscaling or content changes: the retained pixels are the same centre crop.
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
// Reuse the optimizer dependency already pinned by Next.js in package-lock.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const check = process.argv.includes("--check");

const source = new URL("../public/images/home/hero-bg.jpg", import.meta.url);
const input = await readFile(source);
const metadata = await sharp(input).metadata();
const height = metadata.height;
const width = Math.round(height * 9 / 16);
const crop = { left: Math.floor((metadata.width - width) / 2), top: 0, width, height };
const result = { sourceSha256: createHash("sha256").update(input).digest("hex"), width, height };
for (const format of ["avif", "webp"]) {
  const bytes = await sharp(input).extract(crop).toFormat(format, { quality: format === "avif" ? 45 : 60 }).toBuffer();
  const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
  const name = `hero-mobile.${hash}.${format}`;
  const destination = new URL(`../public/images/home/${name}`, import.meta.url);
  if (check) assert.deepEqual(await readFile(destination), bytes, `Regenerate ${name}`);
  else await writeFile(destination, bytes);
  result[format] = `/images/home/${name}`;
  console.log(`${format}: ${bytes.length} bytes, ${width} × ${height}`);
}
const manifest = new URL("../src/data/hero-media.json", import.meta.url);
const content = JSON.stringify(result, null, 2) + "\n";
if (check) assert.equal(await readFile(manifest, "utf8"), content, "Regenerate hero-media.json");
else await writeFile(manifest, content);
