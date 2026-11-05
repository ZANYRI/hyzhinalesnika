import { mkdir, chmod, open, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

// Never use public/: this directory contains personal data and consent evidence.
export function contactDataDirectory() {
  const directory = path.resolve(process.env.CONTACT_DATA_DIR || path.join(process.cwd(), ".data", "contact"));
  const publicDirectory = path.join(process.cwd(), "public");
  if (directory === publicDirectory || directory.startsWith(publicDirectory + path.sep)) throw new Error("Contact journal must remain private");
  return directory;
}

export async function recordContactEvent(kind: "requests" | "delivery", id: string, event: unknown) {
  const root = contactDataDirectory();
  await mkdir(root, { recursive: true, mode: 0o700 });
  await chmod(root, 0o700);
  const directory = path.join(root, kind);
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await chmod(directory, 0o700);
  const temporary = path.join(directory, `.${randomUUID()}.tmp`);
  const destination = path.join(directory, `${id}.json`);
  const file = await open(temporary, "wx", 0o600);
  try {
    await file.writeFile(JSON.stringify(event, null, 2), "utf8");
    await file.sync();
    await file.close();
    await rename(temporary, destination);
  } catch (error) {
    await file.close().catch(() => {});
    await unlink(temporary).catch(() => {});
    throw error;
  }
}
