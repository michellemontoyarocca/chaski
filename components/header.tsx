import { Waypoints } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#18484a] bg-[#092d31]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4b567] text-[#092d31]">
            <Waypoints className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight">Chaski</p>
            <p className="text-[11px] text-[#a9c9c4]">Salud sin barreras</p>
          </div>
        </div>
        <a href="#traductor" className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">Abrir traductor ↓</a>
      </div>
    </header>
  );
}
