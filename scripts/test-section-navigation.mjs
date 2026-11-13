import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const effects = [], handlers = new Map(), pending = new Map(), pushes = [], scrolls = [];
const location = new URL("https://hyzhinalesnika.ru/split?source=test");
const router = { push: path => pushes.push(path) };
const targets = new Set(["help"]);
const document = {
  getElementById: id => targets.has(id) ? { scrollIntoView: options => scrolls.push({ id, options }) } : null,
  addEventListener: (name, handler) => handlers.set(name, handler),
  removeEventListener: name => handlers.delete(name),
};
const window = {
  location,
  addEventListener() {}, removeEventListener() {},
  history: { replaceState: (_state, _title, url) => { location.href = new URL(url, location).href; } },
};
const sessionStorage = {
  getItem: key => pending.get(key) ?? null,
  setItem: (key, value) => pending.set(key, value),
  removeItem: key => pending.delete(key),
};
const imports = {
  react: { useEffect: effect => effects.push(effect) },
  "next/navigation": { usePathname: () => location.pathname, useRouter: () => router },
  "@/lib/kontur-hotel": { activateKonturBookingSection() {} },
};
const exports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/components/CleanHashScroll.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
}).outputText, {
  exports, URL, document, window, sessionStorage,
  requestAnimationFrame: callback => { callback(); return 1; }, cancelAnimationFrame() {},
  require: name => { assert.ok(name in imports, name); return imports[name]; },
});
exports.CleanHashScroll();
const cleanups = effects.map(effect => effect());

function click(href, modifiers = {}) {
  const event = {
    defaultPrevented: false, button: 0,
    target: { closest: () => ({ getAttribute: name => name === "href" ? href : null }) },
    preventDefault() { this.defaultPrevented = true; },
    ...modifiers,
  };
  handlers.get("click")(event);
  return event;
}
function reset(path) {
  location.href = new URL(path, "https://hyzhinalesnika.ru").href;
  pushes.length = scrolls.length = 0;
  pending.clear();
  targets.clear(); targets.add("help");
}

for (const path of ["/split?source=test", "/dining", "/shale-s-vidom-na-gory"]) {
  reset(path);
  assert.equal(click("#help").defaultPrevented, true);
  assert.equal(scrolls[0]?.id, "help", `${path}: the local form is scrolled into view`);
  assert.equal(pushes.length, 0, `${path}: local assistance never navigates to the homepage`);
  assert.equal(pending.size, 0);
  assert.equal(location.pathname, new URL(path, location.origin).pathname);
}

reset("/dining#breakfast");
click("#help");
assert.equal(location.hash, "");
assert.equal(scrolls[0]?.id, "help");
assert.equal(pushes.length, 0);

for (const [href, path, id] of [["/#contacts", "/", "contacts"], ["/#help", "/", "help"], ["/spa#help", "/spa", "help"]]) {
  reset("/split");
  click(href);
  assert.equal(pushes[0], path, "Explicit cross-page links keep their destination");
  assert.equal(pending.get("hyzhina_scroll_target"), id);
  assert.equal(scrolls.length, 0);
}

reset("/");
targets.add("cabins"); targets.add("online-booking");
click("/#cabins");
assert.equal(scrolls[0]?.id, "online-booking", "House navigation still scrolls to the booking heading");

for (const [href, modifiers] of [["#help", { ctrlKey: true }], ["#help", { metaKey: true }], ["#help", { button: 1 }], ["https://example.com/#help", {}]]) {
  reset("/split");
  assert.equal(click(href, modifiers).defaultPrevented, false);
  assert.equal(pushes.length + scrolls.length + pending.size, 0);
}

reset("/split");
exports.navigateToSection("#help", router, "/split");
assert.equal(scrolls[0]?.id, "help");
assert.equal(pushes.length, 0);
for (const cleanup of cleanups) cleanup?.();
assert.equal(handlers.size, 0);
console.log("NAVIGATION PASS: local forms, existing hashes, cross-page contacts, house navigation and modified/external clicks; no browser or network requests.");
