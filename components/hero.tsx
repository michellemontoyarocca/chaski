import { HeartPulse, Stethoscope, Hand } from "lucide-react";
import { LEXICON_SIZE, SIGN_COUNT } from "@/lib/translate-service";

const SEGMENTS = [
  {
    icon: Stethoscope,
    title: "Personal de salud rural",
    text: "Necesita una herramienta rápida de apoyo comunicacional durante la consulta.",
  },
  {
    icon: HeartPulse,
    title: "Pacientes quechuahablantes",
    text: "Con limitado dominio del español al recibir diagnóstico e indicaciones.",
  },
  {
    icon: Hand,
    title: "Personas sordas usuarias de LSP",
    text: "Que acuden a la consulta sin intérprete de Lengua de Señas Peruana.",
  },
];

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-700">
          MVP · Atención de salud rural
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          Traducción español–quechua y reconocimiento de LSP
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          Plataforma web de apoyo comunicacional para reducir barreras entre el personal de salud y
          pacientes quechuahablantes o usuarios de Lengua de Señas Peruana. Funciona desde el
          navegador, sin instalación.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            {LEXICON_SIZE.toLocaleString("es-PE")} pares léxicos
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            {SIGN_COUNT} señas LSP
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
            Sin almacenar imágenes
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <segment.icon className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">{segment.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{segment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
