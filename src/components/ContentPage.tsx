import { Header } from "./Header";
import { Footer } from "./Footer";
export function ContentPage({title,eyebrow,description,children}:{title:string;eyebrow:string;description:string;children:React.ReactNode}) {
  return <div className="min-h-screen bg-[#102219] text-[#f3f5f0]"><Header variant="inner" /><main className="mx-auto max-w-[1400px] px-4 pt-12 pb-16 sm:px-6 sm:pt-20"><p className="text-xs uppercase tracking-[0.2em] text-[#d49a5a]">{eyebrow}</p><h1 className="mt-4 max-w-4xl font-moderustic text-4xl font-bold sm:text-5xl">{title}</h1><p className="mt-5 mb-12 max-w-3xl leading-relaxed text-[#a8b9ae] sm:text-lg">{description}</p>{children}</main><Footer /></div>;
}
