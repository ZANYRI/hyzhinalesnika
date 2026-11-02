import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import React from "react";
import { ImageResponse } from "next/og.js";

// Use Next's installed image processor; no additional dependency is required.
const requireFromNext = createRequire(import.meta.resolve("next/package.json"));
const sharp = requireFromNext("sharp");
const root = process.cwd();
const brandDir = path.join(root, "public/images/brand");
const socialDir = path.join(root, "public/images/social");
const previews = JSON.parse(await fs.readFile("src/data/social-previews.json", "utf8"));
const wordmark = await fs.readFile(path.join(brandDir, "logo-wordmark-light.png"));
const wordmarkUrl = `data:image/png;base64,${wordmark.toString("base64")}`;
await fs.mkdir(socialDir, { recursive: true });

// Preserve the exact current wordmark on a square forest-green canvas.
const logoLayer = await sharp(wordmark).resize({ width: 448 }).png().toBuffer();
const icon = await sharp({ create: { width: 512, height: 512, channels: 4, background: "#102219" } })
  .composite([{ input: logoLayer, gravity: "centre" }]).png().toBuffer();
for (const [filename, size] of [["favicon-96.png", 96], ["favicon-512.png", 512], ["apple-touch-icon.png", 180]]) {
  await sharp(icon).resize(size, size).png().toFile(path.join(brandDir, filename));
}
await fs.writeFile(path.join(brandDir, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#102219"/><image href="${wordmarkUrl}" x="32" y="190" width="448" height="132"/></svg>`);

const sizes = [16, 32, 48, 64, 128, 256];
const pngs = await Promise.all(sizes.map(size => sharp(icon).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const entry = 6 + 16 * i;
  header[entry] = sizes[i] % 256;
  header[entry + 1] = sizes[i] % 256;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
const ico = Buffer.concat([header, ...pngs]);
await fs.writeFile("src/app/favicon.ico", ico);
await fs.writeFile(path.join(brandDir, "favicon.ico"), ico);

// ImageResponse requires TTF/OTF/WOFF. Set SOCIAL_FONT_REGULAR/BOLD on other systems.
const fonts = await Promise.all([400, 700].map(async weight => ({
  name: "Social", weight, style: "normal",
  data: await fs.readFile(weight === 700
    ? process.env.SOCIAL_FONT_BOLD || "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    : process.env.SOCIAL_FONT_REGULAR || "/System/Library/Fonts/Supplemental/Arial.ttf"),
})));
for (const preview of Object.values(previews)) {
  const photo = await sharp(path.join(root, "public", preview.photo)).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 88 }).toBuffer();
  const photoUrl = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const response = new ImageResponse(React.createElement("div", {
    style: { width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#102219", fontFamily: "Social", color: "#f3f5f0", position: "relative" },
  },
    React.createElement("img", { src: photoUrl, width: 1200, height: 630, alt: "", style: { position: "absolute", top: 0, left: 0, objectFit: "cover" } }),
    React.createElement("div", { style: { position: "absolute", top: 0, left: 0, width: 1200, height: 630, background: "linear-gradient(90deg, rgba(16,34,25,0.96) 0%, rgba(16,34,25,0.8) 45%, rgba(16,34,25,0.28) 100%)" } }),
    React.createElement("div", { style: { position: "relative", display: "flex", flexDirection: "column", height: "100%", padding: "48px 56px" } },
      React.createElement("img", { src: wordmarkUrl, width: 290, height: 85, alt: "Хижина лесника" }),
      React.createElement("div", { style: { display: "flex", marginTop: "auto", maxWidth: 900, fontSize: 60, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-1.5px" } }, preview.title),
      React.createElement("div", { style: { display: "flex", marginTop: 25, justifyContent: "space-between", color: "#e6c7a0", fontSize: 24 } },
        React.createElement("span", null, "Архыз · Отдых в буковом лесу"),
        React.createElement("span", null, "hyzhinalesnika.ru"),
      ),
    ),
  ), { width: 1200, height: 630, fonts });
  await sharp(Buffer.from(await response.arrayBuffer())).jpeg({ quality: 88 }).toFile(path.join(socialDir, preview.file));
}
console.log(`Generated favicon assets and ${Object.keys(previews).length} social previews`);
