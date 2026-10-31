"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { createPortal } from "react-dom";
import { X, TelegramLogo, WhatsappLogo, ChatCircle, Phone } from "@phosphor-icons/react";
import { popupDismissalKey, rememberPopupDismissal, startBookingPopupTimer } from "@/lib/booking-popup-timer";
import { SITE_CONFIG } from "@/data/site";

const channels = [
  {id:"phone",label:"Звонок",icon:Phone},
  {id:"telegram",label:"Telegram",icon:TelegramLogo},
  {id:"whatsapp",label:"WhatsApp",icon:WhatsappLogo},
  {id:"max",label:"MAX",icon:ChatCircle},
] as const;

function PagePopup({pathname}:{pathname:string}) {
  const [open,setOpen]=useState(false);
  const [channel,setChannel]=useState<string>("phone");
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const panel=useRef<HTMLDivElement>(null);
  const dismissedKey = popupDismissalKey(pathname);
  const dismissed = useRef(false);
  const dismiss = useCallback(() => {
    dismissed.current = true;
    rememberPopupDismissal(dismissedKey);
    setOpen(false);
  }, [dismissedKey]);
  useEffect(() => {
    if (dismissed.current) return;
    return startBookingPopupTimer(dismissedKey, () => {
      if (!dismissed.current) setOpen(true);
    });
  }, [dismissedKey]);
  useEffect(()=>{
    if(!open)return;
    const previous=document.activeElement as HTMLElement|null;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const keydown=(event:KeyboardEvent)=>{
      if(event.key==="Escape")dismiss();
      if(event.key!=="Tab")return;
      const elements=Array.from(panel.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')??[]);
      const first=elements[0],last=elements[elements.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
    };
    document.addEventListener('keydown',keydown);
    return ()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',keydown);previous?.focus({preventScroll:true});};
  },[open,dismiss]);
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();const form=event.currentTarget;const data=new FormData(form);setStatus("sending");
    try{
      const result=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:data.get('name'),phone:data.get('phone'),source:`Поп-ап: ${pathname}`,contactMethod:channel,contactHandle:data.get('contactHandle')??""})});
      if(!result.ok)throw new Error('Delivery failed');setStatus('sent');rememberPopupDismissal(dismissedKey);form.reset();
    }catch{setStatus('error');}
  }
  if(!open)return null;
  return createPortal(<div className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#07150f]/70 p-4 backdrop-blur-sm" onClick={dismiss}>
    <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="booking-popup-heading" className="relative my-auto max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-[#f6f2e9] p-6 text-[#213d31] shadow-2xl sm:p-10" onClick={event=>event.stopPropagation()}>
      <button type="button" onClick={dismiss} aria-label="Закрыть предложение бронирования" className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#213d31]/15 hover:bg-[#e8e1d3]"><X size={20}/></button>
      <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[#9a714c]">Ваш отдых начинается здесь</p>
      <h2 id="booking-popup-heading" className="mt-3 pr-2 font-moderustic text-2xl font-bold uppercase leading-tight sm:text-3xl">Забронируйте отдых прямо сейчас</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#607268]">Оставьте заявку — поможем выбрать дом и даты, ответим на ваши вопросы.</p>
      {status==='sent' ? <p role="status" className="mt-6 rounded-2xl bg-[#e1ebdf] p-6">Спасибо! Заявка отправлена. Мы свяжемся с вами.</p> : <form onSubmit={submit} className="mt-6 space-y-4">
        <label className="block text-sm">Ваше имя<input name="name" required autoComplete="given-name" maxLength={100} placeholder="Как к вам обращаться" className="mt-2 h-12 w-full rounded-xl border border-[#ccd4ca] bg-white px-4 outline-none focus:border-[#9a714c]" /></label>
        <label className="block text-sm">Телефон<input name="phone" required type="tel" minLength={10} maxLength={30} autoComplete="tel" placeholder="+7 (___) ___-__-__" className="mt-2 h-12 w-full rounded-xl border border-[#ccd4ca] bg-white px-4 outline-none focus:border-[#9a714c]" /></label>
        <fieldset><legend className="mb-2 text-sm">Как с вами связаться?</legend><div className="flex flex-wrap gap-2">{channels.map(c=><label key={c.id} className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs transition focus-within:ring-2 focus-within:ring-[#9a714c] ${channel===c.id ? 'border-[#213d31] bg-[#213d31] text-white':'border-[#ccd4ca] bg-white'}`}><input type="radio" name="contactMethod" value={c.id} checked={channel===c.id} onChange={()=>setChannel(c.id)} className="sr-only"/><c.icon size={18}/>{c.label}</label>)}</div></fieldset>
        {channel!=="phone" && <label className="block text-sm">Имя пользователя или телефон в мессенджере<input name="contactHandle" required maxLength={150} placeholder="Например, @username или номер телефона" className="mt-2 h-12 w-full rounded-xl border border-[#ccd4ca] bg-white px-4 outline-none focus:border-[#9a714c]" /></label>}
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[#607268]"><input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#213d31]"/><span>Согласен(на) на обработку персональных данных в соответствии с <Link href="/privacy-policy" className="underline">политикой обработки персональных данных</Link>.</span></label>
        {status==='error' && <p role="alert" className="text-sm text-red-800">Не удалось отправить заявку. Позвоните нам: <a href={SITE_CONFIG.phoneHref} className="underline">{SITE_CONFIG.phoneDisplay}</a>.</p>}
        <button type="submit" disabled={status==='sending'} className="min-h-12 w-full cursor-pointer rounded-full bg-[#d49a5a] px-5 py-3 text-sm font-bold uppercase text-[#0a1911] transition hover:bg-[#e0ab6e] disabled:opacity-60">{status==='sending'?'Отправляем…':'Отправить заявку'}</button>
      </form>}
    </div>
  </div>,document.body);
}

export function TimedBookingPopup(){const pathname=usePathname();return <PagePopup key={pathname} pathname={pathname}/>;}
