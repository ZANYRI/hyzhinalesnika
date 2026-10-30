import React from "react";
import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import { SITE_CONFIG } from "@/data/site";

interface GuestReviewItem {
  id: string;
  author: string;
  initials: string;
  date: string;
  cabinTag: string;
  text: string;
}

const YANDEX_REVIEWS: GuestReviewItem[] = [
  {
    id: "kris",
    author: "Крис",
    initials: "К",
    date: "12 сентября",
    cabinTag: "Яндекс Карты · 5,0",
    text: "Проживание в «Хижине лесника» оставило самые положительные впечатления! Расположение оказалось очень удобным: в глубине букового леса и вдали от дороги. В доме идеально чисто, удобная мебель, посуда и всё необходимое для спокойного отдыха.",
  },
  {
    id: "alla",
    author: "Alla Kaptur",
    initials: "AK",
    date: "4 августа",
    cabinTag: "Яндекс Карты · 5,0",
    text: "Случайно нашли «Хижину лесника» и влюбились с первой минуты. Закрытый двор у каждого домика, тишина, по утрам поют птицы и видны горы прямо из панорамных окон. Заселение бесконтактное, хозяева всегда на связи и очень внимательны к мелочам.",
  },
  {
    id: "dmitry",
    author: "Дмитрий В.",
    initials: "ДВ",
    date: "19 февраля",
    cabinTag: 'Барнхаус «Берёза»',
    text: "Отдыхали компанией в двухэтажном барнхаусе. Дом очень тёплый, после катания особенно выручила электрическая сушилка для горнолыжных ботинок и посудомойка. Вечером разжигали костровую чашу во дворе, интернет с VPN летает.",
  },
  {
    id: "elena",
    author: "Елена М.",
    initials: "ЕМ",
    date: "28 января",
    cabinTag: 'Дом «Ива»',
    text: "Приезжали семьёй с двумя детьми и корги. Огромное спасибо за тёплый приём и подарочный набор для питомца! Своя огороженная территория позволила спокойно отпускать детей играть на свежем воздухе, до посёлка 5 минут на машине.",
  },
  {
    id: "artem",
    author: "Артём и Марина",
    initials: "АМ",
    date: "14 ноября",
    cabinTag: 'Шале «Бук»',
    text: "Шале с тёплым полом и панорамным окном на горный хребет превзошло ожидания. Внутри продуман каждый метр: белоснежное бельё, тапочки, Яндекс Станция, Smart-TV с Кинопоиском и полная кухня. Обязательно вернёмся зимой!",
  },
];

function FiveStars({ size = 14 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#d49a5a]">
      <Star size={size} weight="fill" />
      <Star size={size} weight="fill" />
      <Star size={size} weight="fill" />
      <Star size={size} weight="fill" />
      <Star size={size} weight="fill" />
    </span>
  );
}

export function GuestReviews() {
  return (
    <div className="flex h-full w-full flex-col justify-between rounded-3xl border border-white/10 bg-[#102419] p-5 sm:p-7">
      {/* Top Rating Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-4">
          <span className="font-moderustic text-4xl font-bold leading-none text-[#f3f5f0] sm:text-[42px]">
            5,0
          </span>
          <div>
            <FiveStars size={16} />
            <p className="mt-1 text-xs text-[#a8b9ae]">
              65+ отзывов · 97 оценок на Яндекс Картах
            </p>
          </div>
        </div>

        <a
          href={SITE_CONFIG.yandexReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[#d49a5a] px-4 text-xs font-semibold text-[#0a1911] transition hover:bg-[#e0ab6e] active:scale-[0.98]"
        >
          Оставить отзыв
        </a>
      </div>

      {/* Scrollable Dark-Forest Reviews Feed */}
      <div className="forest-scroll my-5 max-h-[405px] space-y-3.5 overflow-y-auto pr-1.5">
        {YANDEX_REVIEWS.map((review) => (
          <article
            key={review.id}
            className="rounded-2xl border border-white/8 bg-[#163122]/65 p-4 transition hover:border-white/15"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d49a5a]/35 bg-[#0a1911] font-moderustic text-xs font-bold text-[#d49a5a]">
                  {review.initials}
                </span>
                <div>
                  <p className="font-moderustic text-sm font-bold text-[#f3f5f0]">
                    {review.author}
                  </p>
                  <p className="text-[11px] text-[#a8b9ae]">
                    {review.date} · {review.cabinTag}
                  </p>
                </div>
              </div>

              <FiveStars size={13} />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#d6e0d9]">
              {review.text}
            </p>
          </article>
        ))}
      </div>

      {/* Footer Link to Full Yandex Maps Feed */}
      <div className="border-t border-white/10 pt-4">
        <a
          href={SITE_CONFIG.yandexReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-[#163122]/60 px-5 text-xs font-semibold text-[#f3f5f0] transition hover:border-[#d49a5a]/60 hover:text-[#d49a5a]"
        >
          <span>Больше отзывов на Яндекс Картах</span>
          <ArrowUpRight
            size={14}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </div>
  );
}
