import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Heart, TreeEvergreen } from "@phosphor-icons/react/dist/ssr";
import { ContentPage } from "@/components/ContentPage";
import { SplitMark } from "@/components/HomeSections";
import { HOME_FAQ } from "@/data/home";
export const metadata: Metadata = {title:'Специальные предложения | Хижина лесника',description:'Бонусы ко дню рождения и годовщине свадьбы, программа лояльности для постоянных гостей и оплата через Яндекс Сплит.',alternates:{canonical:"/special-offers"}};
export default function OffersPage() {
  return <ContentPage title="Специальные предложения" eyebrow="Поводов вернуться больше" description="Бонусы к особенным датам, привилегии постоянных гостей и удобная оплата отдыха в Архызе.">
    <div className="grid gap-5 lg:grid-cols-3">{[
      {title:"День рождения",icon:Gift,note:"5% на депозит",text:"Праздник в период за 7 дней до или после заезда. Бронирование от 2 ночей, бонус от стоимости дома именинника."},
      {title:"Годовщина свадьбы",icon:Heart,note:"5% на депозит",text:"Приезжайте вдвоём отмечать вашу дату. После бронирования отправьте документ, подтверждающий дату праздника."},
      {title:"Для постоянных гостей",icon:TreeEvergreen,note:"До 10% на депозит",text:"Каждое завершённое проживание добавляет 1% к уровню лояльности. Учитываем поездки с момента открытия базы."},
    ].map(o => <article key={o.title} className="rounded-3xl border border-white/10 bg-[#102419] p-7"><o.icon size={42} weight="thin" className="text-[#d49a5a]" /><p className="mt-8 text-sm font-semibold text-[#d49a5a]">{o.note}</p><h2 className="mt-2 font-moderustic text-2xl font-bold">{o.title}</h2><p className="mt-4 text-sm leading-relaxed text-[#a8b9ae]">{o.text}</p></article>)}</div>
    <section className="mt-10 rounded-3xl border border-white/10 p-6 sm:p-10"><h2 className="font-moderustic text-2xl font-bold">Как начисляются и используются бонусы</h2><p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#a8b9ae]">{HOME_FAQ[8].answer}</p></section>
    <section id="split" className="mt-10 scroll-mt-28 rounded-3xl bg-[#eee8dc] p-6 text-[#213d31] sm:p-10"><SplitMark /><h2 className="mt-5 font-moderustic text-3xl font-bold">Отдых сейчас — удобная оплата частями</h2><p className="mt-4 max-w-3xl leading-relaxed">Доступна оплата через «Яндекс Сплит» — до 6 месяцев без переплат. Доступный срок, график платежей и условия уточняйте при бронировании.</p><Link href="/booking" className="mt-7 inline-flex rounded-full bg-[#213d31] px-6 py-4 text-sm font-semibold text-white">Проверить даты и забронировать</Link></section>
  </ContentPage>;
}
