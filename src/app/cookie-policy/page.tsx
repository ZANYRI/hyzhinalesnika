import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = withSocialMetadata({
  title: "Использование cookie | Хижина лесника",
  description: "Информация о cookie на сайте базы отдыха «Хижина лесника».",
  alternates: { canonical: "/cookie-policy" },
});

export default function CookiePolicyPage() {
  return <ContentPage title="Использование cookie" eyebrow="Информация для гостей" description="Cookie помогают сохранять настройки и обеспечивать работу отдельных функций сайта.">
    <article className="max-w-3xl space-y-8 rounded-3xl border border-white/10 bg-[#173024] p-6 leading-relaxed text-[#c3d0c7] sm:p-10">
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-[#f3f5f0]">Уведомление о cookie</h2><p>После закрытия плашки сайт сохраняет cookie hyzhina_cookie_notice на срок до одного года. В нём хранится отметка о том, что уведомление просмотрено. Закрытие плашки сохраняет этот выбор.</p></section>
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-[#f3f5f0]">Сервисы бронирования</h2><p>При загрузке и использовании модуля Контур.Отель сторонний сервис может использовать собственные cookie для поиска дат и оформления бронирования. Обработка данных сервисом описана в его документах, доступных в форме бронирования.</p></section>
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-[#f3f5f0]">Управление cookie</h2><p>Удалить cookie или ограничить их сохранение можно в настройках браузера. После удаления отметки уведомление появится снова; ограничения cookie могут влиять на работу бронирования.</p></section>
      <Link href="/privacy-policy" className="inline-block text-[#d49a5a] underline">Политика обработки персональных данных</Link>
    </article>
  </ContentPage>;
}
