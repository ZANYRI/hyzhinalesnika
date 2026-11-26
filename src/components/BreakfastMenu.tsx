import Image from "next/image";
import { BREAKFAST_CLASSICS, BREAKFAST_DRINKS, BREAKFAST_PHOTO_DISHES, BREAKFAST_SETS } from "@/data/breakfast-menu";

const photoDirectory = "/images/partners/dining/breakfast";
const itemPrice = "shrink-0 whitespace-nowrap font-semibold tabular-nums text-accent";

function PhotoDishes({ dishes, columns, sizes }: {
  dishes: typeof BREAKFAST_SETS;
  columns: string;
  sizes: string;
}) {
  return <ul className={`grid gap-4 sm:grid-cols-2 sm:gap-5 ${columns}`}>
    {dishes.map(dish => <li key={dish.name} className="overflow-hidden rounded-2xl border border-line bg-white">
      <Image width={620} height={620} sizes={sizes} src={`${photoDirectory}/${dish.photo}.webp`} alt="" className="aspect-[3/2] w-full object-cover sm:aspect-[5/4]" />
      <div className="px-4 pt-4 pb-5 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-moderustic text-lg font-semibold leading-snug">{dish.name}</h4>
          <p className={itemPrice}>{dish.price} ₽</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{dish.description}</p>
        <p className="mt-3 text-xs tabular-nums text-muted">{dish.grams} г</p>
      </div>
    </li>)}
  </ul>;
}

export function BreakfastMenu() {
  return <section id="breakfast-menu" aria-labelledby="breakfast-menu-title" className="mt-10 scroll-mt-28 rounded-3xl border border-line bg-surface p-4 sm:mt-14 sm:p-8 lg:p-10">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 id="breakfast-menu-title" className="font-moderustic text-3xl font-bold sm:text-4xl">Меню завтраков</h2>
      <a href="#breakfast-drinks" className="min-h-11 inline-flex items-center text-sm font-semibold text-accent underline underline-offset-4">К напиткам ↓</a>
    </div>
    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">Наличие блюд, цены и возможность доставки на нужную дату уточняйте при заказе.</p>

    <div className="mt-8">
      <h3 className="mb-4 font-moderustic text-2xl font-semibold">Комплексные завтраки</h3>
      <PhotoDishes dishes={BREAKFAST_SETS} columns="xl:grid-cols-4" sizes="(min-width: 1400px) 302px, (min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" />
    </div>

    <div className="mt-9">
      <h3 className="mb-4 font-moderustic text-2xl font-semibold">Блюда на завтрак</h3>
      <PhotoDishes dishes={BREAKFAST_PHOTO_DISHES} columns="lg:grid-cols-3" sizes="(min-width: 1400px) 410px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
      <ul className="mt-5 grid gap-x-7 rounded-2xl border border-line bg-white px-4 sm:grid-cols-2 sm:px-6">
        {BREAKFAST_CLASSICS.map(dish => <li key={dish.name} className="flex items-start justify-between gap-3 border-b border-line py-4 last:border-0 sm:nth-last-2:border-0">
          <div>
            <p className="font-semibold">{dish.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{dish.description}</p>
          </div>
          <div className="text-right">
            <p className={itemPrice}>{dish.price} ₽</p>
            <p className="mt-1 whitespace-nowrap text-xs tabular-nums text-muted">{dish.grams} г</p>
          </div>
        </li>)}
      </ul>
    </div>

    <div id="breakfast-drinks" className="mt-10 scroll-mt-28">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-canvas">
        <h3 className="px-5 pt-4 font-moderustic text-2xl font-semibold sm:px-7 sm:py-5">Напитки</h3>
        <Image width={1080} height={720} sizes="(min-width: 640px) 42vw, 100vw" src={`${photoDirectory}/drinks.webp`} alt="" className="h-36 w-full object-cover sm:w-1/2 lg:w-2/5" />
      </div>
      <div className="grid items-start gap-4 sm:grid-cols-2 sm:gap-5">
        {BREAKFAST_DRINKS.map(group => <div key={group.title} className="rounded-2xl border border-line bg-white px-4 py-4 sm:px-6">
          <h4 className="font-moderustic text-xl font-semibold">{group.title}</h4>
          <ul className="mt-2 divide-y divide-line">
            {group.items.map(([name, volume, price]) => <li key={name} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-baseline gap-2 py-2.5 text-sm sm:gap-4">
              <span className="leading-snug">{name}</span>
              <span className="whitespace-nowrap text-xs tabular-nums text-muted">{volume} мл</span>
              <span className={itemPrice}>{price} ₽</span>
            </li>)}
          </ul>
        </div>)}
      </div>
    </div>
    <p className="mt-6 text-sm leading-relaxed text-muted">Если у вас есть аллергия или пищевые ограничения, сообщите об этом при заказе. Подача блюд может отличаться от фото.</p>
  </section>;
}
