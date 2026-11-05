import Image from "next/image";
import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { Coffee, ForkKnife, Clock } from "@phosphor-icons/react/dist/ssr";
import { ContentPage } from "@/components/ContentPage";
import { CabinGallerySlider } from "@/components/CabinGallerySlider";
import { BookingAssistance } from "@/components/BookingAssistance";

export const metadata: Metadata = withSocialMetadata({
  title: "Ресторан и завтрак в домик | Хижина лесника, Архыз",
  description: "Ресторан à la carte в 100 метрах от домов, меню и фотографии. Отдельная доставка завтрака в домик по предварительному заказу.",
  alternates: { canonical: "/dining" },
});

const photos = [
  { src: "/images/partners/dining/bar-mural.webp", alt: "Столики ресторана «Адреналин» и панно с горами" },
  { src: "/images/partners/dining/bar-counter-wide.webp", alt: "Барная стойка ресторана «Адреналин»" },
  { src: "/images/partners/dining/bar-lounge-mural.webp", alt: "Мягкие кресла и деревянные столы в зале" },
  { src: "/images/partners/dining/bar-counter-night.webp", alt: "Вечерняя подсветка барной стойки" },
  { src: "/images/partners/dining/bar-counter-dim.webp", alt: "Интерьер бара партнёрского парк-отеля" },
  { src: "/images/partners/dining/bar-lounge-tv.webp", alt: "Гостиная зона ресторана с креслами" },
  { src: "/images/partners/dining/bar-shelves.webp", alt: "Бар и выбор напитков" },
];

export default function DiningPage() {
  return <><PageStructuredData metadata={metadata} />{<ContentPage title="Ресторан и завтрак в домик" eyebrow="Вкус вашего отдыха" description="Ужин после горной прогулки, обед всей семьёй или неспешное утро дома. Выберите удобный для вас формат.">
    <section className="mb-10 grid gap-7 rounded-3xl border border-white/10 bg-[#173024] p-6 sm:p-10 lg:grid-cols-2">
      <div><ForkKnife size={38} weight="thin" className="text-[#d49a5a]" /><h2 className="mt-5 font-moderustic text-3xl font-bold">Ресторан à la carte рядом</h2><p className="mt-4 leading-relaxed text-[#bdcfc3]">В 100 метрах от наших домиков находится ресторан-бар партнёрского парк-отеля «Адреналин». Приходите на обед, ужин или чашку кофе. Каждое блюдо выбираете по меню, питание оплачивается отдельно.</p></div>
      <div className="flex flex-col justify-center"><p className="flex items-center gap-2 text-[#e6c7a0]"><Clock size={22} />Кухня: 12:00–22:30</p><p className="mt-5 leading-relaxed text-[#bdcfc3]">В меню есть салаты, супы, мясные и рыбные блюда, паста, пицца, гарниры и десерты. В баре можно заказать кофе, чай, лимонады и молочные коктейли. Зал с мягкими креслами и деревянными столами располагает к спокойному вечеру после активного дня.</p><a href="#menu" className="mt-5 text-sm font-semibold text-[#d49a5a]">Посмотреть меню ↓</a></div>
    </section>
    <CabinGallerySlider images={photos} />
    <section id="menu" className="mt-16 scroll-mt-28">
      <h2 className="font-moderustic text-3xl font-bold">Меню ресторана</h2>
      <p className="mt-4 mb-7 text-sm leading-relaxed text-[#a8b9ae]">Откройте изображение, чтобы прочитать меню целиком. Наличие блюд и действующие цены уточняйте при заказе.</p>
      <a href="/images/partners/dining/a-la-carte.webp" target="_blank" rel="noopener noreferrer" className="block max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#eee8dc]">
        <Image width={1527} height={1080} sizes="(min-width: 1024px) 1024px, 100vw" src="/images/partners/dining/a-la-carte.webp" alt="Меню ресторана à la carte" loading="lazy" className="h-auto w-full"/>
        <span className="block px-5 py-4 text-sm font-semibold text-[#213d31]">Меню à la carte ↗</span>
      </a>
    </section>
    <section id="breakfast" className="mt-16 grid scroll-mt-28 overflow-hidden rounded-3xl bg-[#eee8dc] text-[#213d31] lg:grid-cols-2"><Image width={1500} height={889} sizes="(min-width: 1024px) 50vw, 100vw" src="/images/home/about-dining.jpg" alt="Обеденная зона домика для завтрака" loading="lazy" className="h-full min-h-72 w-full object-cover"/><div className="p-7 sm:p-10"><Coffee size={38} weight="thin"/><p className="mt-5 text-xs uppercase tracking-widest opacity-65">Утро без спешки</p><h2 className="mt-3 font-moderustic text-3xl font-bold">Завтрак в ваш домик</h2><p className="mt-5 leading-relaxed">Для завтраков с доставкой мы сотрудничаем с другим рестораном. Закажите завтрак с вечера, чтобы утром остаться в уюте своего дома.</p><ol className="mt-6 list-inside list-decimal space-y-3 text-sm leading-relaxed"><li>Свяжитесь с нами накануне вечером.</li><li>Уточните меню, количество порций, стоимость и время доставки.</li><li>Подтвердите заказ и встречайте завтрак в домике.</li></ol><p className="mt-5 text-sm leading-relaxed opacity-75">Сообщите о пищевых ограничениях при заказе. Меню и возможность доставки уточняем для выбранной даты.</p><Link href="/#help" prefetch={false} className="mt-7 inline-block rounded-full bg-[#213d31] px-6 py-3 text-sm font-semibold text-white">Узнать о завтраке</Link></div></section>
    <BookingAssistance />
  </ContentPage>}</>;
}
