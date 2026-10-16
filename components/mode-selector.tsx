"use client";

import { Keyboard, Mic, Hand } from "lucide-react";
import type { InputMode } from "@/lib/translate-service";
import { cn } from "@/lib/utils";

const MODES: { id: InputMode; label: string; hint: string; icon: typeof Keyboard }[] = [
  { id: "texto", label: "Texto", hint: "Escribir la frase", icon: Keyboard },
  { id: "voz", label: "Voz", hint: "Dictar por micrófono", icon: Mic },
  { id: "sena", label: "Seña LSP", hint: "Capturar con cámara", icon: Hand },
];

interface ModeSelectorProps {
  value: InputMode;
  onChange: (mode: InputMode) => void;
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-[#092d31]">1. Seleccionar modalidad</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {MODES.map((mode) => {
          const active = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              aria-pressed={active}
              className={cn(
                "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                active
                  ? "border-[#16776e] bg-[#e8f4ee] ring-2 ring-[#b7d8cc]"
                  : "border-[#e3d9c9] bg-white hover:border-[#16776e] hover:bg-[#f8faf5]",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  active ? "bg-[#0e655f] text-white" : "bg-[#f5efe4] text-[#365954]",
                )}
              >
                <mode.icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">{mode.label}</span>
                <span className="block text-xs text-slate-500">{mode.hint}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
