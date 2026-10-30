export const SITE_CONFIG = {
  name: 'База отдыха "Хижина лесника"',
  shortName: "Хижина лесника",
  url: "https://hyzhinalesnika.ru",
  phoneDisplay: "+7 (928) 020-10-01",
  phoneHref: "tel:+79280201001",
  whatsappHref: "https://wa.me/79280201001",
  telegramHref: "https://t.me/+79280201001",
  email: "hyzhinalesnika@mail.ru",
  address: "с. Архыз, ул. Лесная, 40",
  addressShort: "с. Архыз, ул. Лесная 40",
  legalOwner: "ИП Писаренко К.С.",
  inn: "ИНН 263211964934",
  registryNumber: "С092025005567",
  registryUrl:
    "https://tourism.fsa.gov.ru/ru/resorts/hotels/6fec0749-6c53-11f0-b7fa-ed681964b2cf/about-resort",
  yandexOrgId: "169409984212",
  yandexReviewsUrl:
    "https://yandex.ru/maps/org/khizhina_lesnika/169409984212/reviews/?ll=41.305983%2C43.568904&z=17",
  yandexMapsOrgUrl: "https://yandex.ru/maps/org/khizhina_lesnika/169409984212/",
  konturHotelId:
    process.env.NEXT_PUBLIC_KONTUR_HOTEL_ID ||
    "a8ca9db5-0cc4-4728-a9d1-0ecbd7092a07",
  konturBookingPortalUrl:
    "https://a8ca9db5-0cc4-4728-a9d1-0ecbd7092a07.bookonline24.ru/",
  bnovoUid: "b2d5b3ec-eb43-4d9b-b958-9e1591373fc4",
  coords: {
    lat: 43.568904,
    lng: 41.305983,
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  row: 1 | 2;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Дом "Ива" для семьи',
    href: "/dom-dlya-semi",
    row: 1,
  },
  {
    label: 'Двухэтажный дом "Береза" для компании',
    href: "/dvuhetazhnyj-barnhouse",
    row: 1,
  },
  {
    label: 'Шале "Бук" с панорамными окнами',
    href: "/shale-s-vidom-na-gory",
    row: 2,
  },
  {
    label: "Отзывы",
    href: SITE_CONFIG.yandexReviewsUrl,
    external: true,
    row: 2,
  },
  {
    label: "Блог",
    href: "/blog",
    row: 2,
  },
];
