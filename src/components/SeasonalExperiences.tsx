import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
const activities = [
  {title:"СПА-комплекс", text:"Подогреваемый бассейн, джакузи, сауна и хамам. Расслабьтесь после прогулок по горам.", image:"/images/home/season-banya.png", category:"СПА и релакс", tag:"50 метров от домиков", href:"/spa"},
  {title:"Прогулка по заповедному лесу", text:"Буковый лес, ручей «Лестничий» и водопад «Медвежий» — для неспешного знакомства с природой Архыза.", image:"/images/brand/forest-aerial.jpg", category:"Природа", tag:"Пешком навстречу природе", href:"/#help"},
  {title:"Квадроциклы и квадрогиганты", text:"Добавьте в поездку драйва: выберите тур и отправляйтесь исследовать окрестности Архыза.", image:"/images/home/season-quads.jpg", category:"Драйв", tag:"Для любителей приключений", href:"/#help"},
  {title:"Конные прогулки", text:"Посмотрите на горы с новой стороны. Поможем узнать о доступных прогулках и выбрать маршрут.", image:"/images/blog/top5-baritovy.png", category:"Прогулки", tag:"Знакомство с горами", href:"/#help"},
  {title:"Контактный зоопарк", text:"Деревня альпак и лемуров, ферма попугаев и долина тигров — идеи для семейного выезда.", image:"/images/home/season-alpaca.png", category:"Семейный отдых", tag:"Впечатления для всей семьи", href:"/#help"},
  {title:"Джиппинг и пешие гиды", text:"Горные дороги и пешеходные тропы: подберите свой формат знакомства с Архызом вместе с гидом.", image:"/images/blog/top5-cableway.png", category:"Приключения", tag:"Маршруты с проводником", href:"/#help"},
  {title:"Рафтинг", text:"Сплав по горной реке для тех, кто ищет яркие впечатления. Доступность зависит от сезона и погоды.", image:"/images/blog/top5-kazachy.png", category:"На воде", tag:"Сезонные приключения", href:"/#help"},
  {title:"Горнолыжные склоны", text:"Лыжи, сноуборд и панорамы гор. До склонов курорта Архыз — около 15 минут на автомобиле.", image:"/images/home/season-ski.jpg", category:"Горы", tag:"Зима в Архызе", href:"/#help"},
];
export function SeasonalExperiences() {
  return <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
    {activities.map(activity => <Link key={activity.title} href={activity.href} className="activity-wood-frame group flex h-full flex-col p-4 transition sm:p-5">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#163122]">
        <img src={activity.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#d8ae7f]">{activity.tag}</p>
        <h3 className="mt-2 font-moderustic text-xl font-semibold leading-snug text-[#f3f5f0]">{activity.title}</h3>
        <p className="mt-3 mb-5 text-sm leading-relaxed text-[#bdcfc3]">{activity.text}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-[#d8ae7f]">{activity.href==="/spa" ? "О СПА-комплексе" : "Подробнее"}<ArrowUpRight size={16}/></span>
      </div>
    </Link>)}
  </div>;
}
