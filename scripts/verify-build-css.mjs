import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// A successful incremental build once reused stale CSS. Check the emitted
// artifact before reloading production, including builds that report success.
const directory = path.join(process.cwd(), ".next/static/chunks");
const files = (await readdir(directory)).filter(file => file.endsWith(".css"));
assert.ok(files.length, "Production CSS exists");
const css = (await Promise.all(files.map(file => readFile(path.join(directory, file), "utf8")))).join("\n");
assert.ok(css.includes("MobilePopup__root"), "Production CSS includes the mobile booking menu fix; clear the Turbopack build cache and rebuild");
console.log("PASS production CSS: mobile booking menu fix included");
