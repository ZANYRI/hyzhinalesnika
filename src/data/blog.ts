export interface BlogPostSummary {
  slug: string;
  href: string;
  title: string;
  date: string;
  views: number;
  thumbnail: string;
  excerpt?: string;
  category?: {
    title: string;
    href: string;
  };
}

export const BLOG_POSTS: BlogPostSummary[] = [
  {
    slug: "kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety",
    href: "/kak-dobratsya-do-arhyza-v-2026-godu-vse-sposoby-marshruty-sovety",
    title: "Как добраться до Архыза в 2026 году: все способы, маршруты, советы",
    date: "17.01.2026",
    views: 757,
    thumbnail: "/images/blog/how-to-get-cover.jpg",
    excerpt:
      "Актуальный гид по дороге в Архыз на автомобиле, самолёте, автобусе и трансфере, а также точный подъезд от посёлка до базы отдыха «Хижина лесника».",
  },
  {
    slug: "top-5-mest-v-arhyze",
    href: "/stati-i-sovety/post/top-5-mest-v-arhyze",
    title: "ТОП-5 мест Архыза",
    date: "24.06.2025",
    views: 327,
    thumbnail: "/images/brand/forest-aerial.jpg",
    excerpt:
      "Откройте для себя 5 красивейших локаций недалеко от базы отдыха «Хижина лесника»: водопады, ферма альпак, канатные дороги и горная обсерватория.",
    category: {
      title: "Путеводители / маршруты",
      href: "/putevoditeli-marshruty",
    },
  },
];

export const TOP_5_PLACES = [
  {
    num: 1,
    title: "Баритовый водопад",
    image: "/images/blog/top5-baritovy.png",
    distance: "4 км от домиков",
    travelTime: "13 минут на машине",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.587038,41.278958&rtt=auto",
    description:
      "Живописный горный водопад с панорамной смотровой площадкой над посёлком Архыз. Тропа к вершине проходит через ароматный хвойный лес и открывает вид на соседние хребты.",
  },
  {
    num: 2,
    title: "Ферма Альпак",
    image: "/images/blog/top5-alpaca.png",
    distance: "4 км",
    travelTime: "10 минут на машине",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.555020,41.265687&rtt=auto",
    description:
      "Уютный парк в лесу, где живут дружелюбные альпаки, кролики, пони, бараны и олени. Животных можно погладить, покормить с рук и сделать тёплые семейные фотографии.",
  },
  {
    num: 3,
    title: "Казачий водопад",
    image: "/images/blog/top5-kazachy.png",
    distance: "1.1 км",
    travelTime: "5 минут на авто",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.553691,41.300384&rtt=auto",
    description:
      "Камерный водопад на территории Тебердинского национального парка. Несложная лесная тропа среди высоких сосен идеально подходит даже для утренней прогулки с детьми.",
  },
  {
    num: 4,
    title: "Канатная дорога курорта «Архыз»",
    image: "/images/blog/top5-cableway.png",
    distance: "12 км",
    bestTime: "утро",
    travelTime: "15 минут",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.543067,41.181210&rtt=auto",
    description:
      "Современные гондольные и кресельные подъёмники на Южном и Северном склонах поднимают на высоту более 2500 метров к обзорным площадкам и горнолыжным трассам.",
  },
  {
    num: 5,
    title: "Специальная астрофизическая обсерватория РАН",
    image: "/images/blog/top5-observatory.png",
    distance: "40 км",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.646650,41.440794&rtt=auto",
    description:
      "Крупнейший оптический телескоп Евразии расположен высоко в горах над Нижним Архызом. Серпантин к куполу открывает захватывающие панорамы долины, а внутри проводят познавательные дневные и вечерние экскурсии.",
  },
];
