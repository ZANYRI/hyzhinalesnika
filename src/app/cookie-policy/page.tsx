import { PageStructuredData } from "@/components/StructuredData";
import { withSocialMetadata } from "@/lib/social-metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/ContentPage";

export const metadata: Metadata = withSocialMetadata({
  title: "Использование cookie | Хижина лесника",
  description: "Cookie на сайте базы отдыха «Хижина лесника»: уведомление, Яндекс Метрика, сервис бронирования и управление cookie в браузере.",
  alternates: { canonical: "/cookie-policy" },
});

export default function CookiePolicyPage() {
  return <><PageStructuredData metadata={metadata} />{<ContentPage title="Использование cookie" eyebrow="Информация для гостей" description="Cookie помогают сохранять настройки и обеспечивать работу отдельных функций сайта.">
    <article className="max-w-3xl space-y-8 rounded-3xl border border-line bg-surface p-6 leading-relaxed text-muted sm:p-10">
      <p className="text-sm">Редакция от 13 ноября 2026 года.</p>
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-ink">Уведомление о cookie</h2><p>Сайт показывает информационное уведомление об использовании cookie. При его закрытии сохраняется техническая отметка hyzhina_cookie_notice на срок до одного года. В ней хранится отметка о просмотре уведомления. Закрытие уведомления не управляет подключением аналитики.</p></section>
      <section className="space-y-4">
        <h2 className="mb-3 font-moderustic text-xl font-bold text-ink">Яндекс Метрика</h2>
        <p>При открытии сайта автоматически подключается сервис Яндекс Метрика, счётчик № 98987390, для анализа посещаемости и удобства сайта. Сервис обрабатывает технические сведения о посещении, устройстве и браузере, источнике перехода, просмотренных страницах и выбранных действиях на сайте. Для работы аналитики могут сохраняться аналитические cookie.</p>
        <p>На сайте отслеживаются просмотр страницы бронирования, нажатие на контактный телефон, переход в контактный профиль базы, успешная отправка заявки и событие бронирования из Контур.Отеля. Нажатие на контакт само по себе не подтверждает состоявшийся разговор или отправку сообщения. Вебвизор в подключении сайта выключен. Код целей сайта не передаёт в их параметрах имя, телефон, email и содержимое заявки или бронирования.</p>
      </section>
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-ink">Сервисы бронирования</h2><p>При загрузке и использовании модуля Контур.Отель сторонний сервис может использовать собственные cookie для поиска дат и оформления бронирования. Обработка данных сервисом описана в его документах, доступных в форме бронирования.</p></section>
      <section><h2 className="mb-3 font-moderustic text-xl font-bold text-ink">Управление cookie</h2><p>Удалить cookie или ограничить их сохранение можно в настройках браузера. При удалении отметки hyzhina_cookie_notice уведомление появится снова. Ограничения cookie могут влиять на работу бронирования.</p></section>
      <Link href="/privacy-policy" className="inline-block text-accent underline">Политика обработки персональных данных</Link>
    </article>
  </ContentPage>}</>;
}
