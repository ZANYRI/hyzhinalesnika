import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import { Waves, Sun, Clock } from "@phosphor-icons/react/dist/ssr";
import { ContentPage } from "@/components/ContentPage";
import { CabinGallerySlider } from "@/components/CabinGallerySlider";
import { BookingAssistance } from "@/components/BookingAssistance";
export const metadata: Metadata = withSocialMetadata({title:'СПА и бассейн рядом с домиками в Архызе | Хижина лесника',description:'СПА-комплекс партнёра в 100 метрах от домиков «Хижина лесника» в Архызе: бассейн 15 × 6 м, джакузи, сауна и хамам. Стоимость посещения и время работы.',alternates:{canonical:"/spa"}});
export default function SpaPage() {
  return <><PageStructuredData metadata={metadata} />{<ContentPage title="СПА и бассейн рядом с домиками" eyebrow="Время замедлиться" description="СПА-комплекс партнёрского парк-отеля «Адреналин» находится в 100 метрах от базы отдыха «Хижина лесника» в Архызе. Бассейн, джакузи, сауна и хамам доступны за отдельную плату.">
    <section className="mb-12 sm:mb-16"><h2 className="font-moderustic text-3xl font-bold">Загляните в СПА</h2><p className="mt-4 mb-7 max-w-3xl leading-relaxed text-[#a8b9ae]">Бассейн с выходом под открытое небо, сауна с видом на лес и джакузи для отдыха после прогулок. Наш партнёр – парк-отель «Адреналин», в 100 метрах от домиков. Посещение оплачивается отдельно.</p><CabinGallerySlider images={[
      {src:"/images/partners/spa/spa-01.webp",alt:"Подогреваемый бассейн СПА-комплекса «Адреналин»"},
      {src:"/images/partners/spa/spa-02.webp",alt:"Крытая часть бассейна и зона отдыха"},
      {src:"/images/partners/spa/spa-03.webp",alt:"Сауна с окном в лес"},
      {src:"/images/partners/spa/spa-04.webp",alt:"Турецкий хамам"},
      {src:"/images/partners/spa/spa-05.webp",alt:"Джакузи в панорамном павильоне"},
      {src:"/images/partners/spa/spa-06.webp",alt:"Терраса с шезлонгами и видом на горы"},
      {src:"/images/partners/spa/spa-07.webp",alt:"Кофе у бассейна"},
    ]}/></section>
    <section className="rounded-3xl bg-[#eee8dc] p-6 text-[#213d31] sm:p-10">
      <div className="grid gap-6 border-b border-[#c6b49b] pb-8 sm:grid-cols-2"><div><p>Взрослый · 2 часа</p><p className="mt-2 font-moderustic text-4xl font-bold">2 000 ₽</p><p className="mt-2 text-sm opacity-70">За человека</p></div><div className="sm:border-l sm:border-[#c6b49b] sm:pl-8"><p>Детский · 2 часа</p><p className="mt-2 font-moderustic text-4xl font-bold">1 000 ₽</p><p className="mt-2 text-sm opacity-70">До 14 лет включительно</p></div></div>
      <h2 className="mt-8 font-moderustic text-3xl font-bold">СПА-комплекс</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-[#c6b49b] bg-[#faf7f0] p-6"><Waves size={36} weight="thin" /><h3 className="mt-4 font-moderustic text-2xl font-bold">Бассейн и отдых</h3><ul className="mt-4 space-y-3 leading-relaxed"><li>Подогреваемый бассейн 15 × 6 м</li><li>70% внутри, 30% под открытым небом</li><li>Джакузи и терраса с шезлонгами</li></ul></div><div className="rounded-2xl border border-[#c6b49b] bg-[#faf7f0] p-6"><Sun size={36} weight="thin" /><h3 className="mt-4 font-moderustic text-2xl font-bold">Парные и отдых</h3><ul className="mt-4 space-y-3 leading-relaxed"><li>Сауна и турецкий хамам</li><li>Халаты, полотенца и тапочки</li><li>Чайная комната: чёрный и зелёный чай</li></ul></div></div>
      <div className="mt-5 rounded-2xl border border-[#c6b49b] p-6"><h3 className="font-moderustic text-2xl font-bold">Массаж и СПА-процедуры</h3><p className="mt-2 text-sm opacity-70">Оплачиваются отдельно</p><div className="mt-4 flex flex-wrap justify-between gap-3 font-semibold"><span>Марина Вячеславовна</span><a href="tel:+79064122812" className="underline">+7 (906) 412-28-12</a></div></div>
      <div className="mt-6 grid gap-6 rounded-2xl border border-[#c6b49b] p-6 sm:grid-cols-2"><div><Clock size={28} weight="thin" /><h3 className="mt-3 font-moderustic text-xl font-bold">Время работы СПА</h3><p className="mt-2 text-2xl font-semibold">10:00–23:00</p></div><div><h3 className="font-moderustic text-xl font-bold">Технические перерывы</h3><p className="mt-2 text-xl font-semibold">13:00–15:00 · 18:30–19:30</p></div><p className="text-sm leading-relaxed opacity-75 sm:col-span-2">Дети до 14 лет посещают СПА со взрослыми. Алкоголь в СПА запрещён.</p></div>
    </section>
    <BookingAssistance />
  </ContentPage>}</>;
}
