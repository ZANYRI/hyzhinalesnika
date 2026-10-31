"use client";
interface PhotoDotsProps { total: number; current: number; onSelect: (index: number) => void; }
export function PhotoDots({total,current,onSelect}:PhotoDotsProps) {
  return <div role="group" aria-label="Навигация по фотографиям" className="flex flex-wrap items-center justify-center gap-1 pt-1">
    {Array.from({length:total},(_,index) => <button key={index} type="button" aria-label={`Показать фото ${index+1} из ${total}`} aria-current={index===current ? "true" : undefined} onClick={()=>onSelect(index)} className="flex h-6 w-5 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#d49a5a]"><span className={`block h-1.5 rounded-full transition-all ${index===current ? "w-5 bg-[#d49a5a]" : "w-1.5 bg-[#a8b9ae]/40 hover:bg-[#d49a5a]"}`} /></button>)}
  </div>;
}
