import { JsonLd, PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { CABIN_LIST } from "@/data/cabins";
import { SITE_CONFIG } from "@/data/site";
import { SPA_FAQ } from "@/data/spa";
import { Waves, Sun, Clock } from "@phosphor-icons/react/dist/ssr";
import { ContentPage } from "@/components/ContentPage";
import { CabinGallerySlider } from "@/components/CabinGallerySlider";
import { BookingAssistance } from "@/components/BookingAssistance";
export const metadata: Metadata = withSocialMetadata({title:'СПА и бассейн с подогревом в Архызе | Хижина лесника',description:'Подогреваемый бассейн, сауна и хамам в СПА партнёра «Адреналин», в 100 метрах от домиков «Хижина лесника» в Архызе. Посещение оплачивается отдельно.',alternates:{canonical:"/spa"}});
export default function SpaPage() {
  return <><PageStructuredData metadata={metadata} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${SITE_CONFIG.url}/spa#faq`, mainEntity: SPA_FAQ.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />{<ContentPage title="СПА и бассейн с подогревом в Архызе" eyebrow="Время замедлиться" description="СПА-комплекс партнёрского парк-отеля «Адреналин» находится в 100 метрах от базы отдыха «Хижина лесника» в Архызе. Бассейн, джакузи, сауна и хамам доступны за отдельную плату.">
    <section className="mb-12 sm:mb-16"><h2 className="font-moderustic text-3xl font-bold">Бассейн в партнёрском СПА-комплексе «Адреналин»</h2><p className="mt-4 mb-7 max-w-3xl leading-relaxed text-[#a8b9ae]">Бассейн с выходом под открытое небо, сауна с видом на лес и джакузи для отдыха после прогулок. Наш партнёр – парк-отель «Адреналин», в 100 метрах от домиков. Посещение оплачивается отдельно.</p><CabinGallerySlider images={[
      {src:"/images/partners/spa/spa-01.webp",alt:"Подогреваемый бассейн СПА-комплекса «Адреналин»"},
      {src:"/images/partners/spa/spa-02.webp",alt:"Крытая часть бассейна и зона отдыха"},
      {src:"/images/partners/spa/spa-03.webp",alt:"Сауна с окном в лес"},
      {src:"/images/partners/spa/spa-04.webp",alt:"Турецкий хамам"},
      {src:"/images/partners/spa/spa-05.webp",alt:"Джакузи в панорамном павильоне"},
      {src:"/images/partners/spa/spa-06.webp",alt:"Терраса с шезлонгами и видом на горы"},
      {src:"/images/partners/spa/spa-07.webp",alt:"Кофе у бассейна"},
    ]}/></section>
    <section className="rounded-3xl bg-[#eee8dc] p-6 text-[#213d31] sm:p-10">
      <div className="grid gap-6 border-b border-[#c6b49b] pb-8 sm:grid-cols-2"><div><p>Взрослый · 2 часа</p><p className="mt-2 font-moderustic text-4xl font-bold">2 000 ₽</p><p className="mt-2 text-sm opacity-80">За человека</p></div><div className="sm:border-l sm:border-[#c6b49b] sm:pl-8"><p>Детский · 2 часа</p><p className="mt-2 font-moderustic text-4xl font-bold">1 000 ₽</p><p className="mt-2 text-sm opacity-80">До 14 лет включительно</p></div></div>
      <h2 className="mt-8 font-moderustic text-3xl font-bold">Бассейн, сауна и хамам</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-[#c6b49b] bg-[#faf7f0] p-6"><Waves size={36} weight="thin" /><h3 className="mt-4 font-moderustic text-2xl font-bold">Подогреваемый бассейн</h3><ul className="mt-4 space-y-3 leading-relaxed"><li>Подогреваемый бассейн 15 × 6 м</li><li>70% внутри, 30% под открытым небом</li><li>Джакузи и терраса с шезлонгами</li></ul></div><div className="rounded-2xl border border-[#c6b49b] bg-[#faf7f0] p-6"><Sun size={36} weight="thin" /><h3 className="mt-4 font-moderustic text-2xl font-bold">Сауна и турецкий хамам</h3><ul className="mt-4 space-y-3 leading-relaxed"><li>Сауна и турецкий хамам</li><li>Халаты, полотенца и тапочки</li><li>Чайная комната: чёрный и зелёный чай</li></ul></div></div>
      <div className="mt-5 rounded-2xl border border-[#c6b49b] p-6"><h3 className="font-moderustic text-2xl font-bold">Массаж и СПА-процедуры</h3><p className="mt-2 text-sm opacity-80">Оплачиваются отдельно</p><div className="mt-4 flex flex-wrap justify-between gap-3 font-semibold"><span>Марина Вячеславовна</span><a href="tel:+79064122812" className="underline">+7 (906) 412-28-12</a></div></div>
      <div className="mt-6 grid gap-6 rounded-2xl border border-[#c6b49b] p-6 sm:grid-cols-2"><div><Clock size={28} weight="thin" /><h3 className="mt-3 font-moderustic text-xl font-bold">Время работы СПА</h3><p className="mt-2 text-2xl font-semibold">10:00–23:00</p></div><div><h3 className="font-moderustic text-xl font-bold">Технические перерывы</h3><p className="mt-2 text-xl font-semibold">13:00–15:00 · 18:30–19:30</p></div><p className="text-sm leading-relaxed opacity-75 sm:col-span-2">Дети до 14 лет посещают СПА со взрослыми. Алкоголь в СПА запрещён.</p></div>
    </section>
    <section aria-labelledby="spa-questions" className="mt-14 sm:mt-20">
      <h2 id="spa-questions" className="font-moderustic text-3xl font-bold">Вопросы о бассейне и СПА</h2>
      <div className="mt-8 grid items-start gap-3 md:grid-cols-2">
        {SPA_FAQ.map(item => <details key={item.question} name="spa-faq" className="group rounded-2xl border border-white/10 bg-[#173024] p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-moderustic font-semibold [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="shrink-0 text-xl leading-none text-[#d49a5a] group-open:rotate-45">+</span></summary>
          <p className="mt-4 text-sm leading-relaxed text-[#bdcfc3]">{item.answer}</p>
        </details>)}
      </div>
    </section>
    <section aria-labelledby="cabins-near-spa" className="mt-14 sm:mt-20">
      <h2 id="cabins-near-spa" className="font-moderustic text-3xl font-bold">Где остановиться рядом со СПА</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-[#a8b9ae]">Выберите дом в «Хижине лесника» для поездки вдвоём, с детьми или компанией. До партнёрского СПА – 100 метров. Проживание в доме и посещение комплекса оплачиваются отдельно.</p>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {CABIN_LIST.map(cabin => <Link key={cabin.id} href={cabin.slug} className="rounded-2xl border border-white/10 bg-[#173024] p-6 transition hover:border-[#d49a5a]/50">
          <h3 className="font-moderustic text-xl font-bold">{cabin.cardTitle}</h3>
          <p className="mt-3 text-sm text-[#e6c7a0]">{cabin.cardGuests} · {cabin.cardArea}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#bdcfc3]">{cabin.cardSubtitle}</p>
          <span className="mt-5 inline-block text-sm font-semibold text-[#e6c7a0]">Посмотреть дом ↗</span>
        </Link>)}
      </div>
      <a href={SITE_CONFIG.phoneHref} className="mt-7 inline-flex rounded-full border border-[#d49a5a]/50 px-6 py-3 text-sm font-semibold text-[#e6c7a0]">Задать вопрос о поездке: {SITE_CONFIG.phoneDisplay}</a>
    </section>
    <BookingAssistance />
  </ContentPage>}</>;
}
