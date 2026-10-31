import { WhatsappLogo, TelegramLogo, InstagramLogo, ChatCircle } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/data/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { label: "WhatsApp", href: SITE_CONFIG.whatsappHref, icon: WhatsappLogo },
    { label: "Telegram", href: SITE_CONFIG.telegramHref, icon: TelegramLogo },
    ...(SITE_CONFIG.maxHref ? [{ label: "MAX", href: SITE_CONFIG.maxHref, icon: ChatCircle }] : []),
    { label: "Instagram", href: SITE_CONFIG.instagramHref, icon: InstagramLogo },
  ];
  return <div className={className}>{links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-[#102419] px-4 py-2 text-sm text-[#f3f5f0] transition hover:border-[#d49a5a] hover:text-[#d49a5a]"><link.icon aria-hidden="true" size={20} />{link.label}</a>)}</div>;
}
