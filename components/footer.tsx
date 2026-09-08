import { LEXICON_SIZE, REFERENCE_ACCURACY, SIGN_COUNT } from "@/lib/translate-service";

const PHASES = [
  { id: "F1", label: "Comprender y definir el problema" },
  { id: "F2", label: "Construir el MVP" },
  { id: "F3", label: "Medir y testear con usuarios" },
  { id: "F4", label: "Aprender e iterar" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-blue-900">ComexTech</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              MVP académico de apoyo comunicacional para atención de salud rural. Lógica del MVP:
              construir para medir y aprender.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              {LEXICON_SIZE.toLocaleString("es-PE")} pares léxicos · {SIGN_COUNT} señas LSP ·
              exactitud de referencia {REFERENCE_ACCURACY}% (por validar)
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Fases del proyecto</p>
            <ul className="mt-2 space-y-1">
              {PHASES.map((phase) => (
                <li key={phase.id} className="flex gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-blue-700">{phase.id}</span>
                  {phase.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          comextech.es — Salud sin barreras, comunidades más fuertes
        </p>
      </div>
    </footer>
  );
}
