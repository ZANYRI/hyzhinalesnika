import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Clock, DoorOpen, PawPrint, Ruler, TreeEvergreen, Users } from "@phosphor-icons/react/dist/ssr";
import { BOOKING_RULES, CABIN_LIST, CabinData } from "@/data/cabins";
import { SITE_CONFIG } from "@/data/site";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CabinGallerySlider } from "./CabinGallerySlider";
import { BookingAssistance } from "./BookingAssistance";

export function CabinDetailView({cabin}:{cabin:CabinData}) {
  const photos=cabin.gallery.filter((photo,index,all)=>all.findIndex(item=>item.src===photo.src)===index);
  return <div className="min-h-screen bg-[#0a1911] text-[#f3f5f0]">
    <Header variant="inner" />
    <main className="pt-10 pb-10 sm:pt-16">
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <Link href="/#cabins" className="inline-flex items-center gap-2 text-xs text-[#a8b9ae] hover:text-[#d49a5a]"><ArrowLeft size={14}/>Все дома</Link>
        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Архыз · Хижина лесника</p><h1 className="mt-4 font-moderustic text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">{cabin.cardTitle}</h1><p className="mt-4 max-w-2xl leading-relaxed text-[#a8b9ae]">{cabin.cardSubtitle}</p></div>
        </div>
        <div className="mt-7 mb-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#d6e0d9] sm:text-sm"><span className="inline-flex items-center gap-2"><Users size={19} className="text-[#d49a5a]"/>{cabin.cardGuests}</span><span className="inline-flex items-center gap-2"><Ruler size={19} className="text-[#d49a5a]"/>{cabin.cardArea}</span><span className="inline-flex items-center gap-2"><DoorOpen size={19} className="text-[#d49a5a]"/>{cabin.cardBedrooms}</span><span className="inline-flex items-center gap-2"><PawPrint size={19} className="text-[#d49a5a]"/>Можно с питомцами</span></div>
        <CabinGallerySlider images={photos}/>
        <nav aria-label="Разделы о доме" className="mt-5 flex flex-wrap gap-2 border-b border-white/10 pb-6">{[{href:'#description',label:'О доме'},{href:'#equipment',label:'Комплектация'},{href:'/booking',label:'Бронирование'},{href:'#stay-rules',label:'Условия отдыха'}].map(item=><a key={item.href} href={item.href} className="rounded-full border border-white/15 px-4 py-2 text-xs text-[#d6e0d9] transition hover:border-[#d49a5a] hover:text-[#d49a5a]">{item.label}</a>)}</nav>
      </section>
      <section className="mx-auto mt-14 grid max-w-[1400px] items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div id="description" className="scroll-mt-28"><p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">Место для вашей истории</p><h2 className="mt-4 font-moderustic text-3xl font-bold sm:text-4xl">Пространство, в котором хорошо</h2><p className="mt-6 leading-relaxed text-[#b7c6bd] sm:text-lg">{cabin.introText}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">{cabin.highlights.map(item=><li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#102419] p-5 text-sm leading-relaxed"><Check size={19} className="mt-0.5 shrink-0 text-[#d49a5a]"/>{item}</li>)}</ul>
          </div>
          <div id="equipment" className="mt-14 scroll-mt-28"><h2 className="font-moderustic text-3xl font-bold">Всё для комфортного отдыха</h2><p className="mt-4 mb-7 text-sm leading-relaxed text-[#a8b9ae]">Планировка, техника и вещи, которые уже ждут вас в доме.</p>
            <div className="divide-y divide-white/10 border-y border-white/10">{cabin.specs.map(spec=><details key={spec.label} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-moderustic text-lg font-semibold [&::-webkit-details-marker]:hidden">{spec.label}<span className="text-2xl font-light text-[#d49a5a] group-open:rotate-45">+</span></summary><ul className="mt-5 space-y-3 pr-5 text-sm leading-relaxed text-[#a8b9ae]">{Array.from(new Set(spec.lines.filter(Boolean))).map(line=><li key={line} className="flex gap-3"><span className="text-[#d49a5a]">•</span>{line}</li>)}</ul></details>)}</div>
          </div>
        </div>
        <aside aria-label="Стоимость и бронирование" className="rounded-[1.75rem] bg-[#eee8dc] p-7 text-[#213d31] lg:sticky lg:top-28 lg:col-span-4">
          <TreeEvergreen size={40} weight="thin"/><p className="mt-6 text-xs uppercase tracking-widest opacity-60">Ваш отдых в Архызе</p><h2 className="mt-2 font-moderustic text-2xl font-bold">{cabin.cardTitle}</h2><p className="mt-5 font-moderustic text-xl font-bold">{cabin.cardPrice}</p><p className="mt-3 text-xs leading-relaxed opacity-70">Точная стоимость и доступность зависят от выбранных дат и количества гостей. Актуальные условия — в календаре бронирования.</p>
          <dl className="my-6 space-y-3 border-y border-[#213d31]/15 py-5 text-sm"><div className="flex justify-between gap-3"><dt>Вместимость</dt><dd className="font-semibold">{cabin.cardGuests}</dd></div><div className="flex justify-between"><dt>Заезд</dt><dd className="font-semibold">с 15:00</dd></div><div className="flex justify-between"><dt>Выезд</dt><dd className="font-semibold">до 11:00</dd></div></dl>
          <Link href="/booking" className="block rounded-full bg-[#213d31] px-4 py-4 text-center text-sm font-semibold text-white">Проверить даты и забронировать</Link><a href={SITE_CONFIG.phoneHref} className="mt-4 block text-center text-sm font-semibold">{SITE_CONFIG.phoneDisplay}</a><p className="mt-2 text-center text-xs opacity-60">Поможем с выбором и бронированием</p>
        </aside>
      </section>
      <section id="stay-rules" className="mt-20 scroll-mt-28 bg-[#eee8dc] py-14 text-[#213d31] sm:py-20"><div className="mx-auto max-w-[1400px] px-4 sm:px-6"><p className="text-xs uppercase tracking-[0.2em] text-[#9a714c]">Перед поездкой</p><h2 className="mt-3 font-moderustic text-3xl font-bold">Условия спокойного отдыха</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{BOOKING_RULES.map(rule=><article key={rule.title} className="rounded-2xl border border-[#c9bda9] p-6"><img src={rule.icon} alt="" className="mb-5 h-10 w-10"/><h3 className="font-moderustic text-lg font-bold">{rule.title}</h3><p className="mt-3 text-sm leading-relaxed opacity-75">{rule.text}</p></article>)}</div><p className="mt-6 flex items-center gap-2 text-sm"><Clock size={18}/>Заезд с 15:00 · выезд до 11:00</p><Link href="/oferta" className="mt-4 inline-block text-xs underline">Полные условия бронирования</Link></div></section>
      <BookingAssistance/>
      <section className="mx-auto mt-20 max-w-[1400px] px-4 sm:px-6"><div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-moderustic text-3xl font-bold">Ещё два повода приехать</h2><Link href="/#cabins" className="text-sm text-[#d49a5a]">Все дома ↗</Link></div><div className="mt-8 grid gap-5 md:grid-cols-2">{CABIN_LIST.filter(other=>other.id!==cabin.id).map(other=><Link key={other.id} href={other.slug} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#102419]"><div className="aspect-[16/9] overflow-hidden"><img src={other.cardImage} alt={other.cardImageAlt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/></div><div className="p-6"><p className="text-xs text-[#a8b9ae]">{other.cardArea} · {other.cardGuests}</p><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><h3 className="font-moderustic text-2xl font-bold">{other.cardTitle}</h3><ArrowUpRight size={22} className="text-[#d49a5a]"/></div><p className="mt-3 text-sm text-[#d49a5a]">{other.cardPrice}</p></div></Link>)}</div></section>
    </main><Footer/>
  </div>;
}
