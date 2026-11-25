import { readFile, writeFile, access, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const season = process.argv[2];
if (!["winter", "autumn", "summer"].includes(season)) {
  console.error("Укажите сезон: npm run season:winter, season:autumn или season:summer");
  process.exit(1);
}
const images = JSON.parse(await readFile(new URL("src/data/seasonal-images.json", root), "utf8"));
// Validate the complete set before changing the active season.
for (const [original, variants] of Object.entries(images)) {
  if (!variants[season]) throw Error(`Нет версии ${season}: ${original}`);
  await access(new URL(`public${original}`, root));
  await access(new URL(`public${variants[season]}`, root));
}
await writeFile(new URL("src/data/season.json", root), JSON.stringify({ season }, null, 2) + "\n");
function run(script, args = []) {
  const result = spawnSync(process.execPath, [new URL(script, root).pathname, ...args], { cwd: fileURLToPath(root), stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}
run("scripts/prepare-hero.mjs");
run("scripts/prepare-forest.mjs");
if (!process.argv.includes("--no-build")) {
  await rm(new URL(".next/cache/turbopack", root), { recursive: true, force: true });
  run("node_modules/next/dist/bin/next", ["build"]);
}
console.log(`Сезон включён: ${season}. Фото, первый экран и снег переключены.`);
if (!process.argv.includes("--no-build")) console.log("Сборка готова. Перезапустите локальный сервер или опубликуйте изменения обычным способом.");
