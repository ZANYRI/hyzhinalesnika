const assert = require("node:assert/strict");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createHash } = require("node:crypto");
const Module = require("node:module");
const ts = require("typescript");
const sharp = require("sharp");
const root = path.resolve(__dirname, "..");
const resolve = Module._resolveFilename;
Module._resolveFilename = function (name, parent, ...rest) {
  return resolve.call(this, name.startsWith("@/") ? path.join(root, "src", name.slice(2)) : name, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);

const { POST } = require(path.join(root, "src/app/api/contact/route.ts"));
const { CALLBACK_CONSENT } = require(path.join(root, "src/data/consents.ts"));
const { GIFT_CERTIFICATE_SOURCE, GIFT_COVER_UPLOAD_LIMIT } = require(path.join(root, "src/data/special-offers.ts"));

async function main() {
  const directory = await fsp.mkdtemp(path.join(os.tmpdir(), "hyzhina-contact-test-"));
  const envKeys = ["CONTACT_DATA_DIR", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"];
  const originalEnv = Object.fromEntries(envKeys.map(key => [key, process.env[key]]));
  const originalFetch = global.fetch;
  const journal = path.join(directory, "journal");
  const deliveries = [];
  process.env.CONTACT_DATA_DIR = journal;
  process.env.TELEGRAM_BOT_TOKEN = "test-token";
  process.env.TELEGRAM_CHAT_ID = "test-chat";
  const consent = (document, granted) => ({ version: document.version, granted });
  const base = { name: "Тест заявки", phone: "+7 (900) 000-00-00", source: "Automated test", consents: {
    callback: consent(CALLBACK_CONSENT, true),
  } };
  const send = body => POST(new Request("http://localhost/api/contact", { method: "POST", body: JSON.stringify(body) }));
  const sendCover = (body, image, contentType = "image/jpeg") => {
    const form = new FormData();
    form.set("payload", JSON.stringify(body));
    form.set("cover", new Blob([image], { type: contentType }), "uploaded.jpg");
    return POST(new Request("http://localhost/api/contact", { method: "POST", body: form }));
  };
  const read = (kind, id) => JSON.parse(fs.readFileSync(path.join(journal, kind, `${id}.json`), "utf8"));
  global.fetch = async (url, options) => {
    // Never send test notifications to Telegram or any other network service.
    const document = url === "https://api.telegram.org/bottest-token/sendDocument";
    if (!document) assert.equal(url, "https://api.telegram.org/bottest-token/sendMessage");
    const payload = document ? { text: options.body.get("caption") } : JSON.parse(options.body);
    const id = payload.text.match(/Номер: ([\da-f-]+)/)[1];
    const request = read("requests", id);
    assert.equal(request.consents[0].granted, true, "Consent must exist before delivery");
    if (document) {
      const attachment = options.body.get("document");
      assert.equal(attachment.name, "cover.jpg");
      assert.equal(attachment.type, "image/jpeg");
      assert.equal(request.giftCertificate.design, "custom");
      assert.deepEqual(Buffer.from(await attachment.arrayBuffer()), Buffer.from(request.giftCover.base64, "base64"));
      assert.ok(payload.text.length <= 1024);
    }
    deliveries.push(payload);
    return Response.json({ ok: true });
  };
  try {
    for (const body of [
      { ...base, consents: undefined },
      { ...base, consents: { callback: consent(CALLBACK_CONSENT, false) } },
      { ...base, consents: { callback: consent(CALLBACK_CONSENT, "true") } },
      { ...base, phone: "invalid" },
    ]) assert.equal((await send(body)).status, 400);
    for (const giftCertificate of [
      null, [], "10000", {}, { amount: 9999, format: "electronic" },
      { amount: 10000.5, format: "printed" }, { amount: "10000", format: "electronic" },
      { amount: 10000, format: "pdf" }, { amount: 10000 },
      { amount: Number.MAX_SAFE_INTEGER + 1, format: "electronic" },
      { amount: 10000, format: "printed", design: "__proto__" },
      { amount: 10000, format: "printed", design: "unknown" },
      { amount: 10000, format: "printed", message: "x".repeat(601) },
      { amount: 10000, format: "printed", message: [] },
      { amount: 10000, format: "printed", recipient: "x".repeat(101) },
      { amount: 10000, format: "printed", recipient: {} },
    ]) assert.equal((await send({ ...base, source: GIFT_CERTIFICATE_SOURCE, giftCertificate })).status, 400);
    assert.equal((await send({ ...base, source: GIFT_CERTIFICATE_SOURCE })).status, 400);
    assert.equal((await send({ ...base, consents: undefined, giftCertificate: { amount: 10000, format: "printed" } })).status, 400);
    assert.equal((await send({ ...base, consents: { callback: { granted: true, version: "old" } } })).status, 409);
    assert.equal((await send({ ...base, consents: { ...base.consents, advertising: { granted: true, version: CALLBACK_CONSENT.version } } })).status, 400);
    assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", body: "{" }))).status, 400);
    assert.equal((await send({ ...base, oversized: "x".repeat(9000) })).status, 413);

    const cover = await sharp({ create: { width: 64, height: 32, channels: 3, background: "#245442" } }).jpeg().toBuffer();
    const giftWithCover = { ...base, name: "А".repeat(100), phone: "+7" + " ".repeat(15) + "9001234567",
      giftCertificate: { amount: Number.MAX_SAFE_INTEGER, format: "electronic", design: "custom", recipient: "Б".repeat(100), message: "🎉".repeat(300) },
    };
    assert.equal((await send(giftWithCover)).status, 400);
    assert.equal((await sendCover(base, cover)).status, 400);
    assert.equal((await sendCover(giftWithCover, cover, "image/png")).status, 400);
    assert.equal((await sendCover(giftWithCover, Buffer.from("not a photo"))).status, 400);
    assert.equal((await sendCover(giftWithCover, Buffer.alloc(GIFT_COVER_UPLOAD_LIMIT + 1))).status, 413);

    assert.equal(deliveries.length, 0);
    assert.equal(fs.existsSync(journal), false);

    const response = await send(base);
    assert.equal(response.status, 200);
    const { requestId } = await response.json();
    const stored = read("requests", requestId);
    assert.equal(stored.consents.length, 1);
    assert.equal(stored.schemaVersion, 2);
    assert.equal("giftCertificate" in stored, false, "Regular callback requests retain their original schema");
    assert.equal("advertising" in stored, false);
    assert(Date.parse(stored.recordedAt) >= Date.now() - 60_000);
    for (const evidence of stored.consents) {
      assert.equal(evidence.version, CALLBACK_CONSENT.version);
      assert.equal(evidence.sha256, createHash("sha256").update(evidence.text).digest("hex"));
      assert(evidence.text.length > 100);
      assert.equal(evidence.recordedAt, stored.recordedAt);
    }
    assert.equal(read("delivery", requestId).status, "delivered");
    assert.equal(fs.statSync(path.join(journal, "requests", `${requestId}.json`)).mode & 0o777, 0o600);
    assert.equal(fs.statSync(journal).mode & 0o777, 0o700);

    for (const giftCertificate of [
      { amount: 10000, format: "electronic" },
      { amount: 20000, format: "printed" },
      { amount: 12345, format: "electronic" },
      { amount: 12500, format: "printed", design: "evening", recipient: "Анна", message: "С днём рождения!\nТёплых воспоминаний." },
    ]) {
      const result = await send({ ...base, giftCertificate });
      assert.equal(result.status, 200);
      const { requestId: giftId } = await result.json();
      const gift = read("requests", giftId);
      assert.equal(gift.source, GIFT_CERTIFICATE_SOURCE);
      assert.deepEqual(gift.giftCertificate, { ...giftCertificate, validityYears: 1 });
      assert.equal(gift.consents[0].granted, true);
      const notification = deliveries.at(-1).text;
      assert.ok(notification.includes(`Номинал сертификата: ${giftCertificate.amount.toLocaleString("ru-RU")} ₽`));
      assert.ok(notification.includes(`Формат сертификата: ${giftCertificate.format === "printed" ? "Печатный" : "Электронный"}`));
      assert.ok(notification.includes("Срок действия сертификата: 1 год"));
      if (giftCertificate.design) assert.ok(notification.includes("Дизайн сертификата: Тёплый вечер"));
      if (giftCertificate.recipient) assert.ok(notification.includes(`Получатель подарка: ${giftCertificate.recipient}`));
      if (giftCertificate.message) assert.ok(notification.includes(`Поздравление: ${giftCertificate.message}`));
    }

    const coverResponse = await sendCover(giftWithCover, cover);
    assert.equal(coverResponse.status, 200);
    const { requestId: coverId } = await coverResponse.json();
    assert.deepEqual(read("requests", coverId).giftCertificate, { ...giftWithCover.giftCertificate, validityYears: 1 });
    assert.equal(read("delivery", coverId).status, "delivered");
    assert.ok(deliveries.at(-1).text.includes(giftWithCover.giftCertificate.message), "The longest note from the builder fits in the document caption");

    const parallel = await Promise.all(Array.from({ length: 6 }, () => send(base)));
    assert(parallel.every(result => result.status === 200));
    const ids = await Promise.all(parallel.map(async result => (await result.json()).requestId));
    assert.equal(new Set(ids).size, 6);
    for (const id of ids) assert.equal(read("requests", id).id, id);

    const deliveredBeforeFailure = deliveries.length;
    const blocker = path.join(directory, "file-instead-of-directory");
    fs.writeFileSync(blocker, "test");
    process.env.CONTACT_DATA_DIR = blocker;
    assert.equal((await send(base)).status, 503);
    process.env.CONTACT_DATA_DIR = path.join(root, "public", "forbidden-journal");
    assert.equal((await send(base)).status, 503);
    assert.equal(deliveries.length, deliveredBeforeFailure, "Storage failure must prevent forwarding");
    process.env.CONTACT_DATA_DIR = journal;

    global.fetch = async () => Response.json({ ok: false });
    assert.equal((await send(base)).status, 502, "Telegram can fail with HTTP 200 and ok:false");
    const receipts = fs.readdirSync(path.join(journal, "delivery")).map(file => JSON.parse(fs.readFileSync(path.join(journal, "delivery", file))));
    const failure = receipts.find(receipt => receipt.status === "failed");
    assert(failure);
    assert.equal(read("requests", failure.id).consents[0].granted, true);
    delete process.env.TELEGRAM_BOT_TOKEN;
    assert.equal((await send(base)).status, 503);
    console.log("PASS contact: consent, version, certificate amount/format validation, private certificate details saved and delivered, regular callbacks, concurrency and failure paths; no external requests");
  } finally {
    global.fetch = originalFetch;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    await fsp.rm(directory, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
