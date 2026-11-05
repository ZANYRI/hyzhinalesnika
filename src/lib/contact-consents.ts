import { createHash } from "node:crypto";
import { CALLBACK_CONSENT, consentUrl } from "@/data/consents";

export class ConsentValidationError extends Error {
  constructor(message: string, public readonly status: 400 | 409) { super(message); }
}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function validateContactConsents(value: unknown) {
  if (!object(value)) throw new ConsentValidationError("Отметьте согласие на обработку заявки и обратный звонок", 400);
  if (Object.keys(value).some(key => key !== "callback")) {
    throw new ConsentValidationError("Форма обновлена. Обновите страницу и отправьте заявку заново", 400);
  }
  const choice = value.callback;
  if (!object(choice) || choice.granted !== true) {
    throw new ConsentValidationError("Отметьте согласие на обработку заявки и обратный звонок", 400);
  }
  if (choice.version !== CALLBACK_CONSENT.version) {
    throw new ConsentValidationError("Текст согласия обновлён. Обновите страницу и ознакомьтесь с актуальной редакцией", 409);
  }
  return { callback: { document: CALLBACK_CONSENT, granted: true } };
}

export function consentEvidence(selection: ReturnType<typeof validateContactConsents>, recordedAt: string) {
  return Object.values(selection).map(({ document, granted }) => {
    const text = [document.title, ...document.paragraphs].join("\n\n");
    return { kind: document.kind, version: document.version, url: consentUrl(document), granted, recordedAt,
      method: "separate-checkbox-and-form-submit", text,
      sha256: createHash("sha256").update(text, "utf8").digest("hex") };
  });
}
