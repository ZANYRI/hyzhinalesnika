import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  return <div className="grid items-start gap-3 md:grid-cols-2">
    {HOME_FAQ.map(item => <details
      name="home-faq"
      id={item.question === "Можно ли приезжать с питомцами?" ? "faq-pets" : undefined}
      key={item.question}
      className="content-card group scroll-mt-28 overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-accent/60 open:border-accent/70 open:bg-surface"
    >
      <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
        <span className="faq-question font-moderustic text-base font-bold leading-snug text-ink sm:text-lg">{item.question}</span>
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-soft text-accent group-open:border-accent group-open:bg-action group-open:text-on-action"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span>
      </summary>
      <div className="whitespace-pre-line border-t border-line px-6 pt-4 pb-6 text-sm leading-relaxed text-muted sm:text-[15px]">{item.answer}
        {item.question === "Можно ли приезжать с питомцами?" && <a href="/otdyh-s-zhivotnymi" className="mt-4 block font-semibold text-accent underline underline-offset-4">Выбрать дом для отдыха с животными ↗</a>}
      </div>
    </details>)}
  </div>;
}
