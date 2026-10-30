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
  },
  {
    slug: "top-5-mest-v-arhyze",
    href: "/stati-i-sovety/post/top-5-mest-v-arhyze",
    title: "ТОП-5 мест Архыза",
    date: "24.06.2025",
    views: 327,
    thumbnail: "/images/brand/forest-aerial.jpg",
    excerpt:
      "Откройте для себя 5 красивейших мест недалеко от базы отдыха Хижина Лесника. Леса, водопады, горы и тропы — всё в шаговой доступности.",
    category: {
      title: "Путеводители / маршруты",
      href: "/putevoditeli-marshruty",
    },
  },
];

export const TOP_5_PLACES = [
  {
    num: 1,
    emoji: "📍",
    title: "Баритовый водопад",
    image: "/images/blog/top5-baritovy.png",
    distance: "4 км от домиков",
    travelTime: "13 минут на машине",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.587038,41.278958&rtt=auto",
    description:
      "Баритовый водопад — это небольшой, но красивый водопад, расположенный в горах Архыза. Чтобы добраться до него, нужно подняться по крутой тропе, которая проходит через хвойный лес. На вершине водопада есть смотровая площадка, откуда открывается вид на поселок Архыз и окружающие горы.",
  },
  {
    num: 2,
    emoji: "🌲",
    title: "Ферма Альпак",
    image: "/images/blog/top5-alpaca.png",
    distance: "4 км",
    travelTime: "10 минут на машине",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.555020,41.265687&rtt=auto",
    description:
      "Отдых на ферме «Ферма Альпак» — это возможность провести время в компании дружелюбных животных, таких как альпаки, кролики, пони, бараны и олени. Вы сможете погладить и покормить животных, а также сделать красивые фотографии.",
  },
  {
    num: 3,
    emoji: "💧",
    title: "Казачий водопад",
    image: "/images/blog/top5-kazachy.png",
    distance: "1.1 км",
    travelTime: "5 минут на авто",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.553691,41.300384&rtt=auto",
    description:
      "Водопад «Казачий» — это водопад, расположенный в Тебердинском заповеднике. Он представляет собой несколько тонких струй, падающих с высоты. Дорога к водопаду проходит через сосновый лес, где можно насладиться свежим воздухом и красивыми видами.",
  },
  {
    num: 4,
    emoji: "🌅",
    title: "Канатная дорога",
    image: "/images/blog/top5-cableway.png",
    distance: "12 км",
    bestTime: "утро",
    travelTime: "15 минут",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.543067,41.181210&rtt=auto",
    description:
      "Горнолыжный комплекс «Архыз» — это современный курорт, расположенный в живописной горной местности.",
  },
  {
    num: 5,
    emoji: "🗻",
    title: "Обсерватория",
    image: "/images/blog/top5-observatory.png",
    distance: "40 км",
    routeUrl:
      "https://yandex.ru/maps?rtext=43.569035,41.306079~43.646650,41.440794&rtt=auto",
    description:
      "Обсерватория расположена в очень живописном месте высоко в горах. Добравшись сюда открываются шикарные завораживающие виды гор. Но и сама дорога, которая изобилует множеством поворотов, подъёмов и спусков, на пути к обсерватории позволит насладиться красивейшими пейзажами. В обсерватории проводят экскурсии — очень интересно и познавательно, цена очень доступна. На территории есть парковка для авто и возможность купить памятный сувенир.",
  },
];
