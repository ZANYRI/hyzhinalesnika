import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { jsx, jsxs } from "react/jsx-runtime";

function load(file, globals, imports = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, { exports, URL, Date, Event, console,
    require: name => {
      assert.ok(name in imports, `Unexpected dependency: ${name}`);
      return imports[name];
    }, ...globals });
  return exports;
}

const location = new URL("https://hyzhinalesnika.ru/?utm_source=test&phone=private#booking");
let storageReads = 0;
const win = {
  location,
  get localStorage() { storageReads++; throw Error("blocked storage"); },
};
const site = {
  url: "https://hyzhinalesnika.ru", phoneHref: "tel:+79280201001",
  whatsappHref: "https://wa.me/79280201001", telegramHref: "https://t.me/+79280201001",
  maxHref: "https://max.ru/u/official", instagramHref: "https://www.instagram.com/khizhina_lesnika/",
};
const document = { cookie: "", title: "Главная", referrer: "https://example.com/?email=private" };
const imports = { "@/data/site": { SITE_CONFIG: site } };
const metrica = load("src/lib/metrica.ts", { window: win, document }, imports);
const { trackMetricaPage, trackMetricaGoal, initializeMetrica, contactGoal } = metrica;

trackMetricaPage(); trackMetricaPage();
assert.equal(storageReads, 0, "The first visit is tracked even when browser storage is blocked");
assert.equal(win.ym.a.filter(args => args[1] === "init").length, 1);
assert.equal(win.ym.a.filter(args => args[1] === "hit").length, 1, "Repeated effects do not duplicate a page view");
assert.equal(win.ym.a[0][2].defer, true);
assert.equal(win.ym.a[0][2].webvisor, false);
assert.equal(win.ym.a[1][2], "https://hyzhinalesnika.ru/?utm_source=test");
assert.equal(win.ym.a[1][3].referer, "https://example.com/", "Referrers omit arbitrary query data");

location.href = "https://hyzhinalesnika.ru/booking?name=private";
document.title = "Бронирование";
trackMetricaPage(); trackMetricaPage();
assert.equal(win.ym.a.filter(args => args[1] === "hit").length, 2, "SPA navigation creates a page view");
assert.equal(win.ym.a.filter(args => args[2] === "booking_page").length, 1);
trackMetricaGoal("callback_sent", { form: "callback", name: "private", phone: "private" });
assert.equal(JSON.stringify(win.ym.a.at(-1)), JSON.stringify([98987390, "reachGoal", "callback_sent", { form: "callback" }]));
assert.ok(!JSON.stringify(win.ym.a).includes("private"), "Contact and booking details never enter event parameters");
assert.equal(contactGoal(site.phoneHref).goal, "phone_click");
assert.equal(contactGoal("tel:+70000000000"), null, "Partner and unrelated phone numbers are excluded");
assert.equal(contactGoal(site.maxHref).parameters.channel, "max");
assert.equal(contactGoal(site.instagramHref).parameters.channel, "instagram");
assert.equal(contactGoal("https://t.me/unrelated"), null);
assert.equal(contactGoal("/booking"), null, "A booking link click is not a confirmed booking");

for (const legacy of [null, "damaged", JSON.stringify({version:"2026-11-09-1",choice:"denied",expiresAt:Date.now()+86400000})]) {
  const freshWindow = { location, localStorage: { getItem: () => legacy } };
  const fresh = load("src/lib/metrica.ts", { window: freshWindow, document }, imports);
  fresh.trackMetricaPage();
  assert.equal(freshWindow.ym.a.filter(args => args[1] === "hit").length, 1, "Legacy analytics choices do not suppress the counter");
}

// Mount the real integration: loading and initialization need no banner interaction.
const effects = [], listeners = new Map();
document.addEventListener = (name, handler) => listeners.set(name, handler);
document.removeEventListener = name => listeners.delete(name);
const integration = load("src/components/YandexMetrica.tsx", { document }, {
  react: { useEffect: effect => effects.push(effect) },
  "react/jsx-runtime": { jsx, jsxs },
  "next/script": { default: "script" },
  "next/navigation": { usePathname: () => location.pathname },
  "@/lib/metrica": metrica,
});
const script = integration.YandexMetrica();
assert.equal(script.props.src, metrica.METRICA_SCRIPT_URL);
assert.equal(script.props.strategy, "afterInteractive");
const cleanups = effects.map(effect => effect());
const beforeReady = win.ym.a.length;
script.props.onReady();
assert.equal(win.ym.a.length, beforeReady, "Script readiness does not duplicate the current page view");
assert.ok(listeners.has("click") && listeners.has("auxclick"));
for (const cleanup of cleanups) cleanup?.();
assert.equal(listeners.size, 0, "Contact listeners are released on unmount");
for (const url of ["http://127.0.0.1:3000/", "http://localhost:3000/", "https://preview.example.com/"]) {
  location.href = url;
  assert.equal(initializeMetrica(), false, "Local previews never pollute production statistics");
  assert.equal(integration.YandexMetrica(), null, "Local previews never load the counter library");
}
assert.equal(load("src/lib/metrica.ts", {}, imports).initializeMetrica(), false, "Server rendering never initializes the counter");

// The cookie notice is informational; its dismissal never grants or revokes analytics.
function cookieNotice(cookie, blocked = false) {
  let dismissed = false, storedCookie = cookie;
  const noticeDocument = {
    get cookie() { return storedCookie; },
    set cookie(value) { if (blocked) throw Error("blocked cookies"); storedCookie = value; },
  };
  const notice = load("src/components/CookieNotice.tsx", { document: noticeDocument, location }, {
    react: {
      useState: () => [dismissed, value => { dismissed = value; }],
      useSyncExternalStore: (_subscribe, snapshot) => snapshot(),
    },
    "react/jsx-runtime": { jsx, jsxs },
    "next/link": { default: "a" },
    "@phosphor-icons/react": { X: "icon" },
  });
  return { render: notice.CookieNotice, cookie: () => storedCookie };
}
location.href = "https://hyzhinalesnika.ru/";
for (const blocked of [false, true]) {
  const notice = cookieNotice("", blocked);
  const banner = notice.render();
  assert.equal(banner.props["aria-label"], "Уведомление об использовании cookie");
  assert.ok(!JSON.stringify(banner).includes("Разрешить"));
  assert.ok(!JSON.stringify(banner).includes("Отклонить"));
  const hits = win.ym.a.filter(args => args[1] === "hit").length;
  banner.props.children.props.children[1].props.onClick();
  assert.equal(notice.render(), null, "Notice stays closed even when cookies are blocked");
  if (!blocked) assert.ok(notice.cookie().includes("hyzhina_cookie_notice=seen"));
  assert.equal(win.ym.a.filter(args => args[1] === "hit").length, hits, "Closing the notice does not send or stop analytics");
}
assert.equal(cookieNotice("_ym_uid=123; hyzhina_cookie_notice=seen").render(), null, "A dismissed notice does not reappear");

// Execute the real form handlers with isolated React hooks and mocked HTTP only.
// No request is sent to the contact API, Telegram or Yandex.
function formElement(element) {
  if (!element) return null;
  if (element.type === "form") return element;
  for (const child of [element.props?.children].flat(Infinity)) {
    if (typeof child !== "object") continue;
    const found = formElement(child);
    if (found) return found;
  }
  return null;
}
for (const [component, source] of [["CallbackModal", "callback"], ["BookingAssistance", "booking_assistance"]]) {
  for (const scenario of ["success", "rejected", "network", "unchecked"]) {
    const goals = [], requests = [];
    let hook = 0;
    const fields = { name: "Test", phone: "+70000000000", callbackConsent: scenario === "unchecked" ? null : "on" };
    const react = { useState: initial => {
      const index = hook++;
      const value = component === "CallbackModal" && index < 2 ? [fields.name, fields.phone][index] : initial;
      return [value, () => {}];
    } };
    const componentExports = load(`src/components/${component}.tsx`, {
      FormData: class { get(name) { return fields[name]; } },
      fetch: async (...args) => {
        requests.push(args);
        if (scenario === "network") throw Error("offline");
        return { ok: scenario === "success", json: async () => ({ error: "failed" }) };
      },
    }, {
      react, "react/jsx-runtime": { jsx, jsxs },
      "@phosphor-icons/react": { X: "icon", CheckCircle: "icon", PhoneCall: "icon", TreeEvergreen: "icon" },
      "./ContactConsentFields": { ContactConsentFields: "consent-fields" },
      "@/data/consents": { contactConsentSelection: () => ({}) },
      "@/data/site": { SITE_CONFIG: site },
      "@/lib/metrica": { trackMetricaGoal: (...args) => goals.push(args) },
    });
    const form = formElement(componentExports[component]({ open: true, onClose() {} }));
    assert.ok(form, `${component} contains a form`);
    await form.props.onSubmit({ preventDefault() {}, currentTarget: { reset() {} } });
    assert.equal(goals.length, scenario === "success" ? 1 : 0, `${component}: ${scenario}`);
    assert.equal(requests.length, scenario === "unchecked" ? 0 : 1);
    if (goals.length) assert.equal(JSON.stringify(goals[0]), JSON.stringify(["callback_sent", { form: source }]));
  }
}
console.log("METRICA PASS: automatic first visit, blocked storage, legacy choices, script readiness, SPA views, goals, cookie notice, preview exclusion, contact filtering, parameter sanitization and both form success/error paths; no external requests.");
