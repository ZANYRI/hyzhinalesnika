import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, mkdtemp, copyFile, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const images = JSON.parse(await readFile("src/data/seasonal-images.json", "utf8"));
const seasons = ["winter", "autumn", "summer"];
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const originals = new Map();
for (const [original, variants] of Object.entries(images)) {
  const input = await readFile(`public${original}`);
  const metadata = await sharp(input).metadata();
  const group = originals.get(hash(input)) ?? [];
  group.push(variants); originals.set(hash(input), group);
  for (const season of seasons) {
    assert.ok(variants[season], `${original}: ${season} variant missing`);
    const result = await sharp(`public${variants[season]}`).metadata();
    assert.equal(result.width, metadata.width, `${original}: seasonal width preserved`);
    assert.equal(result.height, metadata.height, `${original}: seasonal height preserved`);
  }
}
for (const group of originals.values()) for (const variants of group) assert.deepEqual(variants, group[0], "Exact duplicate photos share the same season in every gallery");
function moduleFor(filename, imports) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(awaitText[filename], {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, { exports, process: { env: {} }, require(name) { assert.ok(name in imports, name); return imports[name]; } });
  return exports;
}
const awaitText = Object.fromEntries(await Promise.all(["src/lib/season.ts", "src/data/atmosphere.ts", "src/components/Snowfall.tsx"].map(async name => [name, await readFile(name, "utf8")])));
for (const season of seasons) {
  const config = moduleFor("src/lib/season.ts", { "@/data/season.json": { season }, "@/data/seasonal-images.json": images });
  assert.equal(config.SITE_SEASON, season);
  for (const [original, variants] of Object.entries(images)) assert.equal(config.seasonalImage(original), variants[season]);
  assert.equal(config.seasonalImage("/images/brand/logo.png"), "/images/brand/logo.png", "Logos and nonseasonal photos unchanged");
  const atmosphere = moduleFor("src/data/atmosphere.ts", { "@/lib/season": config });
  const snow = moduleFor("src/components/Snowfall.tsx", {
    "@/data/atmosphere": atmosphere,
    react: { useRef: () => ({ current: null }), useEffect() {} },
    "react/jsx-runtime": { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) },
  }).Snowfall();
  assert.equal(snow !== null, season === "winter", "Snow only renders in winter");
  if (snow) assert.equal(snow.props.children.length, 20, "Snow keeps its fixed particle budget");
}

// Real child-process execution from a Cyrillic path with spaces catches Mac URL
// encoding regressions; failures must restore all three source manifests.
const fixture = await mkdtemp(path.join(tmpdir(), "Хижина проверка сезона "));
try {
  await mkdir(path.join(fixture, "scripts"));
  await mkdir(path.join(fixture, "src/data"), { recursive: true });
  await mkdir(path.join(fixture, "public/images"), { recursive: true });
  await copyFile("scripts/set-season.mjs", path.join(fixture, "scripts/set-season.mjs"));
  const entry = Object.fromEntries(seasons.map(season => [season, `/images/${season}.webp`]));
  for (const name of ["original", ...seasons]) await writeFile(path.join(fixture, `public/images/${name}.webp`), "fixture");
  await writeFile(path.join(fixture, "src/data/seasonal-images.json"), JSON.stringify({ "/images/original.webp": entry }));
  const files = ["season.json", "hero-media.json", "forest-media.json"];
  for (const filename of files) await writeFile(path.join(fixture, "src/data", filename), JSON.stringify({ season: "winter" }));
  for (const name of ["hero", "forest"]) await writeFile(path.join(fixture, `scripts/prepare-${name}.mjs`), `import {readFile,writeFile} from 'node:fs/promises';const config=await readFile('src/data/season.json');await writeFile('src/data/${name}-media.json',config);`);
  const run = season => spawnSync(process.execPath, [path.join(fixture, "scripts/set-season.mjs"), season, "--no-build"], { encoding: "utf8" });
  for (const season of seasons) {
    const result = run(season); assert.equal(result.status, 0, result.stderr);
    for (const filename of files) assert.equal(JSON.parse(await readFile(path.join(fixture, "src/data", filename))).season, season);
  }
  const before = await Promise.all(files.map(filename => readFile(path.join(fixture, "src/data", filename), "utf8")));
  assert.notEqual(run("spring").status, 0, "Unknown season rejected");
  await rm(path.join(fixture, "public/images/autumn.webp"));
  assert.notEqual(run("autumn").status, 0, "Missing asset rejected before changing config");
  await writeFile(path.join(fixture, "public/images/autumn.webp"), "fixture");
  await writeFile(path.join(fixture, "scripts/prepare-forest.mjs"), "process.exit(2)");
  assert.notEqual(run("autumn").status, 0, "Preparation failure rejected");
  assert.deepEqual(await Promise.all(files.map(filename => readFile(path.join(fixture, "src/data", filename), "utf8"))), before, "Previous season and both media manifests restored on failure");
} finally { await rm(fixture, { recursive: true, force: true }); }
console.log(`PASS seasons: ${Object.keys(images).length} original paths, three variants with preserved dimensions, duplicate galleries, shared resolver, winter-only snow, Cyrillic CLI path and failure rollback.`);
