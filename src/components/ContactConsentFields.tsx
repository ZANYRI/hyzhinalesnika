import Link from "next/link";
import { CALLBACK_CONSENT, consentUrl } from "@/data/consents";

const linkStyle = "underline decoration-accent/60 underline-offset-2 hover:text-accent-hover";
const checkboxStyle = "mt-0.5 h-4 w-4 shrink-0 accent-action";

export function ContactConsentFields() {
  return <div className="space-y-3 text-xs leading-relaxed text-muted">
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" name="callbackConsent" required className={checkboxStyle}/>
      <span>Даю <Link href={consentUrl(CALLBACK_CONSENT)} target="_blank" rel="noopener noreferrer" className={linkStyle}>согласие на обработку персональных данных для заявки и обратного звонка</Link>.</span>
    </label>
    <p className="pl-7"><Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={linkStyle}>Политика обработки персональных данных</Link></p>
  </div>;
}
