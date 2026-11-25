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
// Check every asset before changing the active season.
for (const [original, variants] of Object.entries(images)) {
  if (!variants[season]) throw Error(`Нет версии ${season}: ${original}`);
  await access(new URL(`public${original}`, root));
  await access(new URL(`public${variants[season]}`, root));
}
const files = ["src/data/season.json", "src/data/hero-media.json", "src/data/forest-media.json"];
const previous = await Promise.all(files.map(file => readFile(new URL(file, root))));
function run(script, args = []) {
  // fileURLToPath also supports Cyrillic and spaces in the Mac project path.
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(script, root)), ...args], {
    cwd: fileURLToPath(root), stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw Error(`Не выполнен ${script} (код ${result.status ?? result.signal})`);
}
try {
  await writeFile(new URL(files[0], root), JSON.stringify({ season }, null, 2) + "\n");
  run("scripts/prepare-hero.mjs");
  run("scripts/prepare-forest.mjs");
  if (!process.argv.includes("--no-build")) {
    await rm(new URL(".next/cache/turbopack", root), { recursive: true, force: true });
    run("node_modules/next/dist/bin/next", ["build"]);
  }
  console.log(`Сезон включён: ${season}. Фото, первый экран и снег переключены.`);
  if (!process.argv.includes("--no-build")) console.log("Сборка готова. Перезапустите локальный сервер или опубликуйте изменения обычным способом.");
} catch (error) {
  // A failed preparation/build must not leave conflicting image manifests.
  await Promise.all(files.map((file, index) => writeFile(new URL(file, root), previous[index])));
  console.error("Переключение не завершено. Предыдущие настройки сезона восстановлены.");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
