import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
const activities = [
  {title:"СПА-комплекс", text:"Подогреваемый бассейн, джакузи, сауна и хамам. Расслабьтесь после прогулок по горам.", image:"/images/activities/spa-pool.webp", category:"СПА и релакс", tag:"100 метров от домиков", href:"/spa"},
  {title:"Прогулка по заповедному лесу", text:"Буковый лес, ручей «Лестничий» и водопад «Медвежий» – для неспешного знакомства с природой Архыза.", image:"/images/activities/forest-river-clean.webp", imagePosition:"center bottom", imageScale:1.4, imageAlt:"Река в заповедном лесу Архыза", category:"Природа", tag:"Пешком навстречу природе", href:"https://yandex.ru/maps/-/CXf3ASmA"},
  {title:"Квадроциклы и квадрогиганты", text:"Добавьте в поездку драйва: выберите тур и отправляйтесь исследовать окрестности Архыза.", image:"/images/activities/quad-adventure.webp", category:"Драйв", tag:"Для любителей приключений", href:"/#help"},
  {title:"Конные прогулки", text:"Посмотрите на горы с новой стороны. Поможем узнать о доступных прогулках и выбрать маршрут.", image:"/images/activities/horseback-tour.webp", category:"Прогулки", tag:"Знакомство с горами", href:"/#help"},
  {title:"Контактный зоопарк", text:"Деревня альпак и лемуров, ферма попугаев и долина тигров – идеи для семейного выезда.", image:"/images/activities/animal-park.webp", category:"Семейный отдых", tag:"Впечатления для всей семьи", href:"https://yandex.ru/maps/-/CXf3EZyC"},
  {title:"Джиппинг и пешие гиды", text:"Горные дороги и пешеходные тропы: подберите свой формат знакомства с Архызом вместе с гидом.", image:"/images/activities/jeep-adventure.webp", category:"Приключения", tag:"Маршруты с проводником", href:"/#help"},
  {title:"Рафтинг", text:"Сплав по горной реке для тех, кто ищет яркие впечатления. Доступность зависит от сезона и погоды.", image:"/images/activities/river-rafting.webp", category:"На воде", tag:"Сезонные приключения", href:"/#help"},
  {title:"Горнолыжные склоны", text:"Лыжи, сноуборд и панорамы гор. До склонов курорта Архыз – около 15 минут на автомобиле.", image:"/images/activities/ski-slopes.webp", category:"Горы", tag:"Зима в Архызе", href:"https://yandex.ru/maps/-/CXf3E0z3"},
  {title:"Поездки по Архызу на своей машине", text:"От базы удобно отправиться к достопримечательностям окрестностей: Баритовый водопад, телескоп БТА, Нижне-Архызское городище, Лик Христа, смотровая площадка по дороге на Пхиа и другие места. Поможем выбрать маршрут.", image:"/images/activities/arkhyz-road-trip.webp", imageAlt:"Панорама гор Архыза", category:"Окрестности", tag:"Ваш маршрут по Архызу", href:"/#help"},
];
export function SeasonalExperiences() {
  return <>
    <section aria-label="Скидки для наших гостей" className="mb-8 grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-[#b88c59]/30 bg-[#173024]/70 p-5 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#bdcfc3]">Для наших гостей</p>
        <div className="mt-3 flex flex-col items-start gap-3 lg:flex-row lg:gap-5">
          <p className="shrink-0 font-moderustic text-4xl font-semibold text-[#e6c7a0]">5%</p>
          <div className="text-sm leading-relaxed text-[#bdcfc3]">
            <h3 className="mb-1 font-semibold text-[#f3f5f0]">Активный отдых и прокат</h3>
            <p>Джиппинг, конные прогулки, рафтинг, квадроциклы и квадрогиганты, а также прокат горнолыжного снаряжения.</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-[#b88c59]/30 bg-[#173024]/70 p-5 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#bdcfc3]">Знакомство с животными</p>
        <div className="mt-3 flex flex-col items-start gap-3 lg:flex-row lg:gap-5">
          <p className="shrink-0 font-moderustic text-4xl font-semibold text-[#e6c7a0]">10–20%</p>
          <div className="text-sm leading-relaxed text-[#bdcfc3]">
            <h3 className="mb-1 font-semibold text-[#f3f5f0]">Скидки для наших гостей</h3>
            <p>10% в «Долине тигров».</p>
            <p>20% в деревне альпак и лемуров и на ферме попугаев.</p>
          </div>
        </div>
      </div>
    </section>
    <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {activities.map(activity => <Link key={activity.title} href={activity.href} target={activity.href.startsWith("https://") ? "_blank" : undefined} rel={activity.href.startsWith("https://") ? "noopener noreferrer" : undefined} className="activity-wood-frame group flex h-full flex-col p-4 transition sm:p-5">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#1d3b2b]">
        <Image fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" src={activity.image} alt={activity.imageAlt ?? activity.title} style={{objectPosition: activity.imagePosition, transform: activity.imageScale ? `scale(${activity.imageScale})` : undefined}} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#d8ae7f]">{activity.tag}</p>
        <h3 className="mt-2 font-moderustic text-xl font-semibold leading-snug text-[#f3f5f0]">{activity.title}</h3>
        <p className="mt-3 mb-5 text-sm leading-relaxed text-[#bdcfc3]">{activity.text}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-[#d8ae7f]">{activity.href==="/spa" ? "О СПА-комплексе" : activity.href.startsWith("https://yandex.ru/maps/") ? "Открыть на карте" : "Подробнее"}<ArrowUpRight size={16}/></span>
      </div>
    </Link>)}
    </div>
  </>;
}
