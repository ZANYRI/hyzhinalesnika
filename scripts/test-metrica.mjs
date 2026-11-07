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

const values = new Map();
const events = new EventTarget();
let blockedStorage = false;
const location = new URL("https://hyzhinalesnika.ru/?utm_source=test&phone=private#booking");
const win = {
  location,
  localStorage: {
    getItem: key => { if (blockedStorage) throw Error("blocked"); return values.get(key) || null; },
    setItem: (key, value) => { if (blockedStorage) throw Error("blocked"); values.set(key, value); },
  },
  addEventListener: (...args) => events.addEventListener(...args),
  removeEventListener: (...args) => events.removeEventListener(...args),
  dispatchEvent: event => events.dispatchEvent(event),
};
const consent = load("src/lib/analytics-consent.ts", { window: win });
const site = {
  url: "https://hyzhinalesnika.ru", phoneHref: "tel:+79280201001",
  whatsappHref: "https://wa.me/79280201001", telegramHref: "https://t.me/+79280201001",
  maxHref: "https://max.ru/u/official", instagramHref: "https://www.instagram.com/khizhina_lesnika/",
};
const document = { cookie: "_ym_uid=old; hyzhina_cookie_notice=seen", title: "Главная", referrer: "https://example.com/?email=private" };
const metrica = load("src/lib/metrica.ts", { window: win, document }, {
  "@/data/site": { SITE_CONFIG: site }, "@/lib/analytics-consent": consent,
});
const { trackMetricaPage, trackMetricaGoal, initializeMetrica, stopMetrica, contactGoal } = metrica;

assert.equal(consent.getAnalyticsChoice(), "unknown", "A dismissed legacy notice is not consent");
values.set("hyzhina_analytics_consent", "damaged");
assert.equal(consent.getAnalyticsChoice(), "unknown");
values.set("hyzhina_analytics_consent", JSON.stringify({ version: consent.ANALYTICS_CONSENT_VERSION, choice: "granted", expiresAt: 1 }));
assert.equal(consent.getAnalyticsChoice(), "unknown", "Expired permission is not reused");
trackMetricaPage(); trackMetricaGoal("kontur_booking");
assert.equal(win.ym, undefined, "No counter initialization without explicit consent");

let changes = 0;
const unsubscribe = consent.subscribeAnalyticsChoice(() => changes++);
consent.setAnalyticsChoice("granted");
assert.equal(changes, 1);
const record = JSON.parse(values.get("hyzhina_analytics_consent"));
assert.equal(record.version, consent.ANALYTICS_CONSENT_VERSION);
assert.ok(Date.parse(record.decidedAt) && record.expiresAt > Date.now());
trackMetricaPage(); trackMetricaPage();
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

consent.setAnalyticsChoice("denied");
trackMetricaGoal("kontur_booking");
stopMetrica();
assert.equal(win.ym.a.length, 0, "Revocation clears this counter's unsent queue before the library arrives");
consent.setAnalyticsChoice("granted");
const calls = [];
win.ym = (...args) => calls.push(args);
trackMetricaPage();
assert.equal(calls.filter(args => args[1] === "init").length, 1, "A fresh consent can initialize after revocation");
consent.setAnalyticsChoice("denied"); stopMetrica();
assert.ok(calls.some(args => args[1] === "destruct"), "A loaded counter is stopped on revocation");
consent.setAnalyticsChoice("granted");
location.href = "http://127.0.0.1:3107/";
assert.equal(initializeMetrica(), false, "Local previews never pollute production statistics");
blockedStorage = true;
consent.setAnalyticsChoice("denied");
assert.equal(consent.getAnalyticsChoice(), "denied", "A refusal works even with blocked storage");
unsubscribe();

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
console.log("METRICA PASS: consent, expiry, blocked storage, one initialization, SPA views, goals, revocation, contact filtering, parameter sanitization and both form success/error paths; no external requests.");
