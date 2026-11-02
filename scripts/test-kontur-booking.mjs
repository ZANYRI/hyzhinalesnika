import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(fs.readFileSync("src/lib/kontur-hotel.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

class Cell {
  constructor(day, price, month = "ноябрь 2099") {
    this.children = [{ textContent: String(day) }, { textContent: price }];
    this.firstElementChild = this.children[0];
    this.section = {
      firstElementChild: { textContent: month },
      parentElement: { getAttribute: () => month },
    };
  }
  closest() { return this.section; }
}

const hosts = new Map();
const adds = [], removals = [];
let initCount = 0, config;
const sdk = {
  init(value) { initCount++; config = value; },
  add(value) { adds.push(value); return `widget-${adds.length}`; },
  remove(id) { removals.push(id); },
};
const exportsObject = {};
vm.runInNewContext(source, {
  exports: exportsObject,
  require: () => ({ SITE_CONFIG: { konturHotelId: "test-hotel" } }),
  HTMLElement: Cell,
  document: { body: null, addEventListener() {}, getElementById: id => hosts.get(id) },
  window: { HotelWidget: sdk, setTimeout, clearTimeout, location: { href: "https://test.example" } },
  fetch: async () => ({ ok: true, json: async () => true }),
  URL, console, setTimeout, clearTimeout,
});

// Missing years are rejected, rather than silently booking a guessed year.
async function run() {
  const { extractKonturCalendarDayInfo, mountKonturWidget, countNightsBetweenIso } = exportsObject;
  const cell = new Cell(2, "8 320");
  cell["__reactFiber$test"] = { memoizedProps: { day: 2, disabled: true, data: {} }, return: null };
  assert.equal(extractKonturCalendarDayInfo(cell).hasPrice, true);
  cell.children[1].textContent = "пн";
  assert.equal(extractKonturCalendarDayInfo(cell).hasPrice, false);
  cell.children[1].textContent = "12 480";
  assert.equal(extractKonturCalendarDayInfo(cell).hasPrice, true);
  assert.equal(extractKonturCalendarDayInfo(new Cell(1, "12000", "январь 2099")).isoDate, "2099-01-01");
  assert.equal(extractKonturCalendarDayInfo(new Cell(31, "12000", "февраль 2099")), null);
  assert.equal(extractKonturCalendarDayInfo(new Cell(1, "12000", "ноябрь")), null);
  assert.equal(countNightsBetweenIso("2028-02-28", "2028-03-01"), 2);

  hosts.set("calendar", {});
  hosts.set("rooms", {});
  const cancelled = new AbortController();
  const staleMount = mountKonturWidget({ type: "availabilityCalendar", appearance: { container: "calendar" } }, undefined, cancelled.signal);
  const activeMount = mountKonturWidget({ type: "availabilityCalendar", appearance: { container: "calendar" } });
  const roomsMount = mountKonturWidget({ type: "roomsList", appearance: { container: "rooms" } });
  cancelled.abort();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(initCount, 1);
  assert.equal(adds.length, 0, "Mount waits for the SDK readiness callback");
  config.hooks.onInit();
  const results = await Promise.all([staleMount, activeMount, roomsMount]);
  assert.equal(adds.length, 2, "Cancelled Strict Mode effect does not register a widget");
  hosts.clear();
  results.forEach(result => result.cleanup());
  assert.deepEqual(removals, ["widget-1", "widget-2"], "Detached hosts still release SDK instances");
  console.log("PASS booking: house availability updates, exact dates, shared initialization, cancellation and cleanup");
}

run().catch(error => { console.error(error); process.exitCode = 1; });
