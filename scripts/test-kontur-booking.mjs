import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = ts.transpileModule(fs.readFileSync("src/lib/kontur-hotel.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

class Cell {
  constructor(day, price, month = "ноябрь 2099") {
    this.attributes = new Map();
    this.writes = 0;
    this.children = [{ textContent: String(day) }, { textContent: price }];
    this.firstElementChild = this.children[0];
    this.section = {
      firstElementChild: { textContent: month },
      parentElement: { getAttribute: () => month },
    };
  }
  closest() { return this.section; }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  setAttribute(name, value) { this.writes++; this.attributes.set(name, value); }
  removeAttribute(name) { this.writes++; this.attributes.delete(name); }
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
  const { extractKonturCalendarDayInfo, mountKonturWidget, countNightsBetweenIso, paintKonturCalendarSelection } = exportsObject;
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

  const days = [new Cell(2, "10000"), new Cell(3, "10000"), new Cell(4, "пн")];
  const calendar = { querySelectorAll: () => [{ querySelectorAll: () => [{ childElementCount: 28, children: days }] }] };
  paintKonturCalendarSelection(calendar, null, null, null);
  const writes = () => days.reduce((sum, day) => sum + day.writes, 0);
  assert.equal(days[0].getAttribute("data-hl-clickable"), "true");
  assert.equal(days[2].hasAttribute("data-hl-clickable"), false);
  const initialWrites = writes();
  paintKonturCalendarSelection(calendar, null, null, null);
  assert.equal(writes(), initialWrites, "Repainting the same state does not write DOM attributes again");
  paintKonturCalendarSelection(calendar, "2099-11-02", null, "2099-11-03");
  assert.equal(days[0].getAttribute("data-hl-selected"), "start");
  assert.equal(days[1].getAttribute("data-hl-selected"), "preview-end");
  assert.equal(days[2].getAttribute("data-hl-clickable"), "true", "Checkout on the unavailable boundary morning stays allowed");
  days[1].children[1].textContent = "пн";
  paintKonturCalendarSelection(calendar, null, null, null);
  assert.equal(days[1].hasAttribute("data-hl-clickable"), false, "Changed house availability removes stale clickable state");
  assert.ok(days.every(day => !day.hasAttribute("data-hl-selected")), "Reset removes previous range markers");

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
  console.log("PASS booking: availability changes, range reset, idempotent paint, exact dates, shared initialization, cancellation and cleanup");
}

run().catch(error => { console.error(error); process.exitCode = 1; });
