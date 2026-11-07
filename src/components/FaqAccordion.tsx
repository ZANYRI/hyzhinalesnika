import { HOME_FAQ } from "@/data/home";

export function FaqAccordion() {
  return <div className="grid items-start gap-3 md:grid-cols-2">
    {HOME_FAQ.map(item => <details
      name="home-faq"
      id={item.question === "Можно ли приезжать с питомцами?" ? "faq-pets" : undefined}
      key={item.question}
      className="group scroll-mt-28 overflow-hidden rounded-2xl border border-white/10 bg-[#173024] transition hover:border-white/20 open:border-[#d49a5a]/45 open:bg-[#1d3b2b]"
    >
      <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
        <span className="font-moderustic text-base font-bold leading-snug text-[#f3f5f0] sm:text-lg">{item.question}</span>
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f3f5f0] group-open:border-[#d49a5a] group-open:bg-[#d49a5a] group-open:text-[#102219]"><span className="group-open:hidden">+</span><span className="hidden group-open:inline">−</span></span>
      </summary>
      <div className="whitespace-pre-line border-t border-white/10 px-6 pt-4 pb-6 text-sm leading-relaxed text-[#a8b9ae] sm:text-[15px]">{item.answer}
        {item.question === "Можно ли приезжать с питомцами?" && <a href="/otdyh-s-zhivotnymi" className="mt-4 block font-semibold text-[#e6c7a0] underline underline-offset-4">Выбрать дом для отдыха с животными ↗</a>}
      </div>
    </details>)}
  </div>;
}
