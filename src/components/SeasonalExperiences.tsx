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
  return <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {activities.map((activity,index) => <Link key={activity.title} href={activity.href} className={`group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#d7c7af] bg-[#f4eee3] text-[#213d31] transition hover:-translate-y-1 hover:border-[#d49a5a] hover:shadow-xl ${index===0 ? "lg:col-span-2" : ""}`}>
      <div className="relative h-64 shrink-0 overflow-hidden bg-[#163122] sm:h-72 lg:h-80">
        <img src={activity.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute top-4 left-4 rounded-full bg-[#f4eee3] px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-[#213d31] shadow-sm">{activity.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#765331]">{activity.tag}</p>
        <h3 className="mt-3 font-moderustic text-2xl font-bold leading-tight sm:text-[26px]">{activity.title}</h3>
        <p className="mt-4 mb-6 max-w-xl text-[15px] leading-relaxed text-[#42594c]">{activity.text}</p>
        <span className="mt-auto flex items-center justify-between gap-4 border-t border-[#213d31]/20 pt-4 text-sm font-semibold"><span>{activity.href==="/spa" ? "Выбрать отдых в СПА" : "Узнать подробности"}</span><ArrowUpRight size={21} className="shrink-0" /></span>
      </div>
    </Link>)}
  </div>;
}
