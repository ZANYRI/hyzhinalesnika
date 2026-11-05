import Link from "next/link";

export function SecurityDepositNote({ className = "" }: { className?: string }) {
  return <aside aria-label="Возвратный залог" className={`rounded-2xl border border-current/15 p-5 text-sm leading-relaxed ${className}`}>
    <p className="font-semibold">Возвратный залог: 5 000 ₽</p>
    <p className="mt-2 opacity-80">Вносится отдельно от оплаты проживания до заселения. После осмотра дома возвращается полностью при отсутствии повреждений и задолженности.</p>
    <Link href="/oferta" className="mt-2 inline-block text-xs underline underline-offset-2">Сроки и условия возврата залога</Link>
  </aside>;
}
