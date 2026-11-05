const assert = require("node:assert/strict");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { createHash } = require("node:crypto");
const Module = require("node:module");
const ts = require("typescript");
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
  const read = (kind, id) => JSON.parse(fs.readFileSync(path.join(journal, kind, `${id}.json`), "utf8"));
  global.fetch = async (url, options) => {
    // Never send test notifications to Telegram or any other network service.
    assert.equal(url, "https://api.telegram.org/bottest-token/sendMessage");
    const payload = JSON.parse(options.body);
    const id = payload.text.match(/Номер: ([\da-f-]+)/)[1];
    const request = read("requests", id);
    assert.equal(request.consents[0].granted, true, "Consent must exist before delivery");
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
    assert.equal((await send({ ...base, consents: { callback: { granted: true, version: "old" } } })).status, 409);
    assert.equal((await send({ ...base, consents: { ...base.consents, advertising: { granted: true, version: CALLBACK_CONSENT.version } } })).status, 400);
    assert.equal((await POST(new Request("http://localhost/api/contact", { method: "POST", body: "{" }))).status, 400);
    assert.equal((await send({ ...base, oversized: "x".repeat(9000) })).status, 413);
    assert.equal(deliveries.length, 0);
    assert.equal(fs.existsSync(journal), false);

    const response = await send(base);
    assert.equal(response.status, 200);
    const { requestId } = await response.json();
    const stored = read("requests", requestId);
    assert.equal(stored.consents.length, 1);
    assert.equal(stored.schemaVersion, 2);
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
    console.log("PASS contact: consent required, version checked, single callback consent and no advertising processing, evidence stored before delivery, private files, concurrency and failure paths");
  } finally {
    global.fetch = originalFetch;
    for (const [key, value] of Object.entries(originalEnv)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    await fsp.rm(directory, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
