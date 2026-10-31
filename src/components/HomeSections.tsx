import Link from "next/link";
import { PawPrint, TreeEvergreen, Waves, ForkKnife, Gift, Star } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/data/site";

export function SplitMark() {
  return <span className="inline-flex items-center gap-2 font-moderustic text-lg font-bold"><span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-base text-white">Я</span><svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7"><defs><linearGradient id="split-green"><stop stopColor="#30ed7b"/><stop offset="1" stopColor="#008b43"/></linearGradient></defs><path d="M27 5A15 15 0 1 0 27 27L15 16Z" fill="url(#split-green)"/><path d="m19 16 10-9a14 14 0 0 1 0 18Z" fill="#ed6654"/></svg>Сплит</span>;
}
export function HeroBadges() {
  return <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
    <a href={SITE_CONFIG.yandexReviewsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl border border-white/25 bg-[#f1ebdf] px-3 py-2 text-[#163122] shadow-lg sm:px-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fc3f1d] text-xl font-bold text-white">Я</span><span className="text-xs leading-snug"><strong className="block">Хорошее место</strong><span className="flex items-center gap-1"><Star size={12} weight="fill" />5,0 · Яндекс</span></span></a>
    <Link href="/special-offers#split" aria-label="Оплата через Яндекс Сплит" className="flex items-center rounded-2xl border border-white/25 bg-[#f1ebdf] px-3 py-2 text-[#163122] shadow-lg sm:px-4"><SplitMark /></Link>
  </div>;
}
const benefits = [
  {title:"Яндекс Сплит", text:"Забронируйте отдых сейчас и разделите оплату на удобные платежи.", icon:Gift, href:"/special-offers#split", note:"Путешествовать проще"},
  {title:"Pet friendly", text:"Приезжайте с питомцем. Для него приготовим подарочный набор от «Четыре лапы».",icon:PawPrint,href:"/#faq",note:"Вместе со всей семьёй"},
  {title:"Уединение в буковом лесу",text:"Заповедный лес Архыза и своя зона отдыха — в пяти минутах от центра посёлка.",icon:TreeEvergreen,href:"/#about",note:"Природа вокруг вас"},
  {title:"СПА-комплекс",text:"Подогреваемый бассейн, джакузи, сауна и хамам — в 50 метрах от домиков.",icon:Waves,href:"/spa",note:"Время для себя"},
  {title:"Ресторан и доставка",text:"Меню a la carte с 12:00 до 22:30. Завтрак в домик можно заказать с вечера.",icon:ForkKnife,href:"/spa#restaurant",note:"Отдых без бытовых забот"},
];
export function HomeBenefits() {
  return <section id="benefits" className="mt-8 bg-[#eee8dc] py-16 text-[#213d31] sm:py-20">
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6842]">Хижина лесника</p>
      <h2 className="mt-3 max-w-3xl font-moderustic text-3xl font-bold sm:text-4xl">Заботимся о вашем комфорте</h2>
      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b,i) => <Link key={b.title} href={b.href} className={`group flex min-h-64 flex-col justify-between rounded-2xl border border-[#d6c7b1] bg-[#faf7f0] p-6 transition hover:-translate-y-1 hover:shadow-lg ${i===2 ? "lg:row-span-2 lg:min-h-full lg:bg-[#213d31] lg:text-[#f3eee3]" : ""}`}>
          <div className="flex items-start justify-between gap-4"><span className="text-xs uppercase tracking-widest opacity-65">{b.note}</span><b.icon size={48} weight="thin" className="shrink-0 opacity-75" /></div>
          <div className="mt-7"><h3 className="font-moderustic text-2xl font-bold">{b.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">{b.text}</p><span className="mt-5 inline-block text-xs font-semibold">Подробнее ↗</span></div>
        </Link>)}
      </div>
    </div>
  </section>;
}
const stories = [
 {title:"Семейный отдых",text:"Совместные завтраки, прогулки по буковому лесу и новые открытия для детей. Здесь есть время побыть рядом и услышать друг друга.",image:"/images/home/about-dining.jpg",alt:"Обеденная зона для семейных завтраков",position:"lg:pt-36"},
 {title:"Романтика для двоих",text:"Медленное утро с кофе, горы за окном и тихий вечер на террасе. Оставьте повседневные дела за пределами вашей поездки.",image:"/images/home/faq-terrace.jpg",alt:"Терраса для спокойного отдыха вдвоём",position:"lg:pt-64"},
 {title:"В кругу друзей",text:"Долгие разговоры у костра, ужин на свежем воздухе и общие приключения. Собирайте воспоминания, к которым захочется возвращаться.",image:"/images/home/gal-4.jpg",alt:"Зона отдыха у костра в лесу",position:"lg:pt-36"},
];
export function AudienceStories() {
  return <section id="about" className="mx-auto max-w-[1400px] scroll-mt-28 px-4 pt-24 sm:px-6 sm:pt-32">
    <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#d49a5a]">О нас · Хижина лесника</p>
    <div className="relative overflow-hidden rounded-[2rem] bg-[#eee8dc]">
      <div className="relative z-10 mx-auto max-w-2xl px-6 py-10 text-center text-[#213d31] lg:absolute lg:top-0 lg:left-1/2 lg:w-[48%] lg:-translate-x-1/2 lg:rounded-b-[2rem] lg:bg-[#eee8dc] lg:px-10 lg:py-9">
        <TreeEvergreen size={30} weight="thin" className="mx-auto mb-4" />
        <h2 className="font-moderustic text-2xl font-medium leading-snug sm:text-3xl">Отдых, который хочется <span className="font-semibold italic text-[#9a714c]">повторить</span></h2>
        <p className="mt-3 text-sm leading-relaxed opacity-75">Вдвоём, с семьёй или в кругу друзей. Ближе к природе и друг к другу.</p>
      </div>
      <div className="grid lg:grid-cols-3">{stories.map(story => <article key={story.title} className={`group relative flex min-h-[420px] items-end overflow-hidden p-7 sm:p-9 lg:min-h-[660px] ${story.position}`}>
        <img src={story.image} alt={story.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#06130d]/95 via-[#06130d]/45 to-[#06130d]/15" />
        <div className="relative"><h3 className="font-moderustic text-2xl font-bold">{story.title}</h3><p className="mt-4 text-sm leading-relaxed text-[#e2e8df]">{story.text}</p></div>
      </article>)}</div>
    </div>
  </section>;
}
