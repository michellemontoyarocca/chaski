"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ModeSelector } from "@/components/mode-selector";
import { TranslatorPanel } from "@/components/translator-panel";
import { CameraLsp } from "@/components/camera-lsp";
import { LoadingState } from "@/components/loading-state";
import { ResultCard } from "@/components/result-card";
import {
  recognizeSign,
  translateText,
  type Direction,
  type InputMode,
  type SignResult,
  type TranslationResult,
} from "@/lib/translate-service";

export default function Home() {
  const [mode, setMode] = useState<InputMode>("texto");
  const [direction, setDirection] = useState<Direction>("es-qu");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<TranslationResult | SignResult | null>(null);

  function changeMode(next: InputMode) {
    setMode(next);
    setResult(null);
  }

  async function handleTranslate(text: string) {
    setProcessing(true);
    setResult(null);
    setResult(await translateText(text, direction, mode));
    setProcessing(false);
  }

  async function handleCapture(hint?: string) {
    setProcessing(true);
    setResult(null);
    setResult(await recognizeSign(hint));
    setProcessing(false);
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />

        <section id="traductor" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#a65b31]">Herramienta interactiva</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#092d31] sm:text-5xl">Un puente, paso a paso.</h2>
            <p className="mt-4 leading-7 text-slate-600">Elige cómo comunicarte. La traducción utiliza un léxico limitado; la cámara muestra una simulación de inferencia LSP para probar el flujo, no un diagnóstico ni un intérprete validado.</p>
          </div>
          <div className="space-y-8">
            <ModeSelector value={mode} onChange={changeMode} />

            <div className="rounded-3xl border border-[#e3d9c9] bg-white p-5 shadow-sm sm:p-7">
              <p className="mb-4 text-sm font-semibold text-slate-900">
                2. {mode === "sena" ? "Realizar la seña" : "Ingresar el contenido"}
              </p>

              {mode === "sena" ? (
                <CameraLsp onCapture={handleCapture} processing={processing} />
              ) : (
                <TranslatorPanel
                  mode={mode}
                  direction={direction}
                  onDirectionChange={setDirection}
                  onTranslate={handleTranslate}
                  processing={processing}
                />
              )}
            </div>

            {(processing || result) && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">3. Resultado</p>
                {processing && (
                  <LoadingState
                    label={mode === "sena" ? "Reconociendo seña..." : "Traduciendo..."}
                  />
                )}
                {!processing && result && (
                  <ResultCard result={result} onReset={() => setResult(null)} />
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
