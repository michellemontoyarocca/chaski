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
      <p className="text-sm font-semibold text-slate-900">1. Seleccionar modalidad</p>
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
                "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                active
                  ? "border-blue-700 bg-blue-50 ring-2 ring-blue-200"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  active ? "bg-blue-800 text-white" : "bg-slate-100 text-slate-600",
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
