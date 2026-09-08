import { Waypoints } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-800 text-white">
            <Waypoints className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-base font-bold tracking-tight text-blue-900">Chaski</p>
            <p className="text-[11px] text-slate-500">Salud sin barreras</p>
          </div>
        </div>
        <p className="hidden text-right text-[11px] leading-tight text-slate-500 sm:block">
          Tecnología para una salud
          <br />
          más inclusiva
        </p>
      </div>
    </header>
  );
}
