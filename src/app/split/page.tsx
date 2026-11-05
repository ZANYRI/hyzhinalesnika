import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";
import { SplitMark } from "@/components/HomeSections";
import { BookingAssistance } from "@/components/BookingAssistance";

export const metadata: Metadata = withSocialMetadata({ title: "Отдых с Яндекс Сплит | Хижина лесника", description: "Оплата отдыха в «Хижине лесника» в Архызе частями через Яндекс Сплит: как получить расчёт, ознакомиться с графиком платежей и подтвердить бронирование.", alternates: { canonical: "/split" } });

const steps = [
  {title:"Выберите свой отдых",text:"Определитесь с домом, датами и количеством гостей. Оставьте заявку или позвоните нам."},
  {title:"Получите расчёт",text:"Менеджер проверит свободные даты и рассчитает стоимость проживания."},
  {title:"Выберите оплату частями",text:"Сообщите, что хотите оплатить через Яндекс Сплит. Мы направим ссылку для оформления."},
  {title:"Ознакомьтесь с графиком",text:"Яндекс покажет доступный срок, суммы и даты платежей. Подтвердите оплату после ознакомления с условиями."},
];

export default function SplitPage() {
  return <><PageStructuredData metadata={metadata} />{<ContentPage title="Отдых сейчас, оплата частями" eyebrow="Яндекс Сплит" description="Планируйте поездку в Архыз и распределяйте оплату отдыха на несколько платежей. Поможем подобрать дом и оформить бронирование.">
    <section className="grid gap-8 rounded-3xl bg-[#eee8dc] p-7 text-[#213d31] sm:p-12 lg:grid-cols-2"><div><SplitMark/><h2 className="mt-7 font-moderustic text-3xl font-bold sm:text-4xl">Больше времени для отдыха</h2><p className="mt-5 leading-relaxed">Можно оформить оплату проживания частями через Яндекс Сплит на срок до 6 месяцев. Условия вашего бронирования уточнит менеджер; доступный вариант оплаты и точный график отобразятся при оформлении.</p><Link href="/#help" className="mt-7 inline-block rounded-full bg-[#213d31] px-6 py-4 text-sm font-semibold text-white">Связаться с менеджером</Link></div><div className="flex flex-col justify-center rounded-2xl border border-[#c9bda9] p-6"><p className="font-moderustic text-2xl font-bold">Все условия до подтверждения</p><p className="mt-4 leading-relaxed">Доступность сервиса и лимит Яндекс определяет индивидуально. До оплаты вы увидите итоговую сумму, размер первого платежа и даты следующих списаний.</p><a href="https://yandex.ru/support/split/ru/conditions" target="_blank" rel="noopener noreferrer" className="mt-5 text-sm underline underline-offset-4">Условия сервиса Яндекс Сплит ↗</a></div></section>
    <section className="mt-16"><h2 className="font-moderustic text-3xl font-bold">Четыре шага до вашей поездки</h2><ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step,i)=><li key={step.title} className="rounded-2xl border border-white/10 bg-[#173024] p-6"><span className="text-sm text-[#d49a5a]">0{i+1}</span><h3 className="mt-6 font-moderustic text-xl font-bold">{step.title}</h3><p className="mt-4 text-sm leading-relaxed text-[#bdcfc3]">{step.text}</p></li>)}</ol></section>
    <section className="mt-16 max-w-3xl"><h2 className="mb-6 font-moderustic text-3xl font-bold">Частые вопросы о Сплите</h2>{[
      {q:"Каким будет первый платёж?",a:"Сумма первого платежа и полный график отобразятся на странице оформления. Ознакомьтесь с ними перед подтверждением."},
      {q:"Как списываются следующие платежи?",a:"По графику, указанному при оформлении. Отслеживать суммы и даты можно в сервисах Яндекса."},
      {q:"Есть ли переплата?",a:"Итоговая сумма и возможные комиссии зависят от предложенного варианта оплаты. Менеджер уточнит условия для вашего бронирования; окончательные условия вы увидите до подтверждения платежа."},
      {q:"Что делать, если Сплит недоступен?",a:"Свяжитесь с нами: предложим другой доступный способ оплаты. Решение о доступности и лимите принимает Яндекс."},
    ].map(item=><details key={item.q} className="border-b border-white/15 py-5"><summary className="cursor-pointer font-semibold">{item.q}</summary><p className="mt-4 text-sm leading-relaxed text-[#bdcfc3]">{item.a}</p></details>)}</section>
    <BookingAssistance />
  </ContentPage>}</>;
}
