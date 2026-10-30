export const HOME_GALLERY = [
  {
    src: "/images/home/gal-1.jpg",
    alt: "Домик Barnhouse с панорамными окнами и видом на горы",
    aspect: "portrait" as const,
  },
  {
    src: "/images/home/gal-2.jpg",
    alt: "Хижина в вечернем лесу с тёплыми гирляндами",
    aspect: "landscape" as const,
  },
  {
    src: "/images/home/gal-3.jpg",
    alt: "Домик в хвойном и буковом лесу рядом с горами",
    aspect: "portrait" as const,
  },
  {
    src: "/images/home/gal-4.jpg",
    alt: "Приватная зона отдыха у костра среди леса",
    aspect: "landscape" as const,
  },
  {
    src: "/images/home/gal-5.jpg",
    alt: "Гостиная с мягким диваном и кухней в домике Ива",
    aspect: "portrait" as const,
  },
  {
    src: "/images/home/gal-6.jpg",
    alt: "Обеденная зона у панорамных окон",
    aspect: "landscape" as const,
  },
  {
    src: "/images/home/gal-7.jpg",
    alt: "Двухэтажный интерьер дома Берёза",
    aspect: "portrait" as const,
  },
  {
    src: "/images/home/gal-8.jpg",
    alt: "Уютная спальня с панорамным видом на лес Архыза",
    aspect: "landscape" as const,
  },
];

export const HOME_ADVANTAGES = [
  {
    id: "wifi",
    title: "Быстрый Wi-Fi с VPN по всей базе",
    description:
      "Стабильный интернет для удалённой работы, видеозвонков, YouTube и любимых сервисов прямо в лесу.",
  },
  {
    id: "checkin",
    title: "Бесконтактное заселение 24/7",
    description:
      "Заезжайте в любое удобное время суток без ожидания на ресепшене и лишних формальностей.",
  },
  {
    id: "forest",
    title: "Приватный двор у каждого дома",
    description:
      "Огороженная территория в буковом лесу, личная парковка, терраса с мебелью, мангал и костровая зона.",
  },
] as const;

export const HOME_FAQ = [
  {
    question: "Можно ли приехать с домашними животными?",
    answer:
      'Да, мы рады воспитанным кошкам и собакам без ограничений по размеру и весу. Совместно с магазином «Четыре лапы» бесплатно предоставляем welcome-набор для питомца: миску, лакомство, салфетки для лап, пакеты для уборки, пелёнку и игрушку. Доплата за проживание питомца рассчитывается по его размеру, выгул собак осуществляется за территорией базы.',
  },
  {
    question: "Где высушить горнолыжную экипировку и обувь?",
    answer:
      "При входе в каждый дом установлена электрическая сушилка для горнолыжных ботинок, обуви и верхней одежды с настройкой режима сушки.",
  },
  {
    question: "Входят ли полотенца, бельё и гигиенические наборы?",
    answer:
      "Да, для каждого гостя подготовлены свежее постельное бельё, комплект полотенец, махровые тапочки, гель для душа, шампунь и зубной набор. Смена белья проводится раз в 3 дня.",
  },
  {
    question: "Как далеко кафе, магазины и горнолыжные склоны?",
    answer:
      "До центра посёлка Архыз со всей инфраструктурой (кафе, рестораны, магазины, аптеки, прокат) всего 5 минут по прямой асфальтированной дороге. До канатных дорог курорта около 15 минут на автомобиле.",
  },
];

export type SeasonTabId = "all" | "winter" | "drive" | "relax";

export interface SeasonalExperience {
  id: string;
  title: string;
  subtitle: string;
  distance: string;
  category: Exclude<SeasonTabId, "all">;
  src: string;
  alt: string;
  href: string;
  external: boolean;
}

export const SEASON_TABS: { id: SeasonTabId; label: string }[] = [
  { id: "all", label: "Все впечатления" },
  { id: "winter", label: "Зима и склоны" },
  { id: "drive", label: "Драйв и маршруты" },
  { id: "relax", label: "Релакс и семья" },
];

export const SEASONAL_EXPERIENCES: SeasonalExperience[] = [
  {
    id: "ski",
    title: "Горнолыжные трассы и канатные дороги",
    subtitle:
      "Подготовленные склоны Романтик и Лунная Поляна, вечернее катание и панорамные подъёмники на высоту 2500+ м.",
    distance: "15 мин на авто",
    category: "winter",
    src: "/images/home/season-ski.jpg",
    alt: "Горнолыжный отдых и сноуборд в Архызе",
    href: "https://yandex.ru/maps/org/khizhina_lesnika/169409984212/",
    external: true,
  },
  {
    id: "snowmobiles",
    title: "Экспедиции на снегоходах по перевалам",
    subtitle:
      "Зимние маршруты с гидами к заснеженным хребтам, смотровым площадкам и диким долинам Архыза.",
    distance: "Старт рядом с базой",
    category: "winter",
    src: "/images/home/season-snowmobiles.jpg",
    alt: "Туры на снегоходах в Архызе",
    href: "https://yandex.ru/maps/org/khizhina_lesnika/169409984212/",
    external: true,
  },
  {
    id: "quads",
    title: "Квадроциклы и джип-туры к водопадам",
    subtitle:
      "Драйвовые выезды к Софийским и Казачьему водопадам, горным рекам и альпийским лугам с весны до поздней осени.",
    distance: "Маршруты от 2 часов",
    category: "drive",
    src: "/images/home/season-quads.jpg",
    alt: "Экскурсии на квадроциклах в Архызе",
    href: "https://yandex.ru/maps/org/khizhina_lesnika/169409984212/",
    external: true,
  },
  {
    id: "top5",
    title: "Водопады и крупнейший телескоп САО РАН",
    subtitle:
      "Авторский маршрут от нашей базы: Баритовый водопад, канатная дорога «Млечный путь» и обсерватория в Нижнем Архызе.",
    distance: "Гид по 5 локациям",
    category: "drive",
    src: "/images/blog/top5-observatory.png",
    alt: "Специальная астрофизическая обсерватория РАН в Архызе",
    href: "/stati-i-sovety/post/top-5-mest-v-arhyze",
    external: false,
  },
  {
    id: "banya",
    title: "Горная баня на дровах",
    subtitle:
      "Ароматный пар с пихтовыми вениками и травяным чаем для глубокого восстановления после прогулок и катания.",
    distance: "7 мин от домиков",
    category: "relax",
    src: "/images/home/season-banya.png",
    alt: "Баня на дровах в Архызе",
    href: "https://yandex.ru/maps/-/CDxIj2i7",
    external: true,
  },
  {
    id: "alpaca",
    title: "Парк альпак среди соснового леса",
    subtitle:
      "Контактная ферма с пушистыми альпаками, ламами и кроликами на склоне курорта, любимая локация семей с детьми.",
    distance: "15 мин от базы",
    category: "relax",
    src: "/images/home/season-alpaca.png",
    alt: "Парк альпак в Архызе",
    href: "https://yandex.ru/maps/-/CDxIjTZl",
    external: true,
  },
];

export const SEASONAL_ACTIVITIES = SEASONAL_EXPERIENCES;
