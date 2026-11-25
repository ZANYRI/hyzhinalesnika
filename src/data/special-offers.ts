export const DISCOUNT_PERCENT = 5;
export const LONG_STAY_MIN_NIGHTS = 5;
export const BIRTHDAY_WINDOW_DAYS = 7;
export const BIRTHDAY_MIN_NIGHTS = 2;

export const GIFT_CERTIFICATE_MIN_AMOUNT = 10_000;
export const GIFT_CERTIFICATE_VALIDITY_YEARS = 1;
export const GIFT_CERTIFICATE_SOURCE = "Покупка подарочного сертификата";
export const GIFT_CERTIFICATE_AMOUNTS = [10_000, 15_000, 20_000, 30_000, 50_000] as const;
export const GIFT_CERTIFICATE_FORMATS = {
  electronic: "Электронный",
  printed: "Печатный",
} as const;

export const GIFT_CERTIFICATE_DESIGNS = {
  winter: { title: "Зимняя сказка", image: "/images/home/hero-winter.jpg" },
  forest: { title: "В сердце леса", image: "/images/home/hero-bg.jpg" },
  evening: { title: "Тёплый вечер", image: "/images/home/story-romance-chalet-night.webp" },
} as const;

export type GiftCertificateRequest = {
  amount: number;
  format: keyof typeof GIFT_CERTIFICATE_FORMATS;
  design?: keyof typeof GIFT_CERTIFICATE_DESIGNS;
  message?: string;
  recipient?: string;
};

export function parseGiftCertificate(value: unknown): GiftCertificateRequest | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { amount, format, design, message, recipient } = value as Record<string, unknown>;
  if (typeof amount !== "number" || !Number.isSafeInteger(amount) || amount < GIFT_CERTIFICATE_MIN_AMOUNT) return null;
  if (format !== "electronic" && format !== "printed") return null;
  if (design !== undefined && (typeof design !== "string" || !Object.hasOwn(GIFT_CERTIFICATE_DESIGNS, design))) return null;
  if (message !== undefined && (typeof message !== "string" || message.length > 600)) return null;
  if (recipient !== undefined && (typeof recipient !== "string" || recipient.length > 100)) return null;
  const cleanText = (text: string) => text.replace(/[\u0000-\u001f\u007f]/g, " ").trim();
  return { amount, format,
    ...(design === undefined ? {} : { design: design as keyof typeof GIFT_CERTIFICATE_DESIGNS }),
    ...(message === undefined ? {} : { message: cleanText(message as string) }),
    ...(recipient === undefined ? {} : { recipient: cleanText(recipient as string) }),
  };
}

export const OFFERS_FAQ = {
  question: "Какие скидки и специальные предложения действуют?",
  answer: `Скидка ${DISCOUNT_PERCENT}% ко дню рождения действует при бронировании от ${BIRTHDAY_MIN_NIGHTS} ночей, если праздник приходится на период за ${BIRTHDAY_WINDOW_DAYS} дней до или после вашего заезда. Скидка рассчитывается от стоимости проживания в доме именинника, без учёта дополнительных услуг. Подтверждение даты праздника уточните при бронировании.\n\nПри проживании от ${LONG_STAY_MIN_NIGHTS} ночей предоставляется скидка ${DISCOUNT_PERCENT}% на проживание. Скидки не суммируются: при наличии двух оснований применяется одна скидка ${DISCOUNT_PERCENT}%. Сообщите о выбранном предложении менеджеру при бронировании.\n\nМожно приобрести подарочный сертификат номиналом от 10 000 ₽. Срок действия — ${GIFT_CERTIFICATE_VALIDITY_YEARS} год. Доступны электронный и печатный форматы. Заявку на покупку можно оставить на странице «Специальные предложения».`,
};
