// Pre-encode the existing photo once, without cropping or upscaling.
// The public, content-addressed files avoid cold on-demand AVIF encoding.
import { createRequire } from "node:module";
import { readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const check = process.argv.includes("--check");
const input = await readFile(new URL("../public/images/home/forest-seclusion.webp", import.meta.url));
const metadata = await sharp(input).metadata();
const result = {
  sourceSha256: createHash("sha256").update(input).digest("hex"),
  width: metadata.width,
  height: metadata.height,
  avif: [],
  webp: [],
};

for (const width of [480, 768, metadata.width]) {
  for (const format of ["avif", "webp"]) {
    const bytes = await sharp(input).resize({ width, withoutEnlargement: true })
      .toFormat(format, format === "avif" ? { quality: 35, effort: 6, chromaSubsampling: "4:2:0" } : { quality: 50 }).toBuffer();
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 12);
    const name = `forest-seclusion-${width}.${hash}.${format}`;
    const destination = new URL(`../public/images/home/${name}`, import.meta.url);
    if (check) assert.deepEqual(await readFile(destination), bytes, `Regenerate ${name}`);
    else await writeFile(destination, bytes);
    result[format].push({ src: `/images/home/${name}`, width, bytes: bytes.length });
    console.log(`${name}: ${bytes.length} bytes`);
  }
}

const manifest = new URL("../src/data/forest-media.json", import.meta.url);
const content = JSON.stringify(result, null, 2) + "\n";
if (check) assert.equal(await readFile(manifest, "utf8"), content, "Regenerate forest-media.json");
else await writeFile(manifest, content);
