"use client";

import { useState } from "react";
import { RotateCcw, Clock, Gauge, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SignResult, TranslationResult } from "@/lib/translate-service";

interface ResultCardProps {
  result: TranslationResult | SignResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const [understood, setUnderstood] = useState<boolean | null>(null);
  const isSign = result.kind === "sena";

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base text-slate-900">
          {isSign ? "Seña reconocida" : "Resultado de la traducción"}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {isSign ? (
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Español</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{result.sign.es}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-700">Quechua</p>
              <p className="mt-1 text-2xl font-semibold text-blue-900">{result.sign.qu}</p>
            </div>
            <p className="text-xs text-slate-500">Categoría: {result.sign.categoria}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {result.direction === "es-qu" ? "Español" : "Quechua"}
              </p>
              <p className="mt-1 text-lg text-slate-800">{result.source}</p>
            </div>
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-700">
                {result.direction === "es-qu" ? "Quechua" : "Español"}
              </p>
              <p className="mt-1 text-xl font-semibold text-blue-900">{result.output}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {result.elapsedMs} ms
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge className="h-3.5 w-3.5" />
            {isSign ? `Confianza ${result.confidence}%` : `Cobertura léxica ${result.coverage}%`}
          </span>
          {isSign && <span>{result.landmarks} landmarks procesados</span>}
        </div>

        {!isSign && result.unmatched.length > 0 && (
          <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            Sin equivalencia en el léxico actual: {result.unmatched.join(", ")}. Estas palabras se
            muestran sin traducir y son insumo para ampliar el vocabulario clínico.
          </p>
        )}

        <Separator />

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-900">
            ¿El paciente confirmó que comprendió?
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant={understood === true ? "default" : "outline"}
              onClick={() => setUnderstood(true)}
              className={understood === true ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              <Check className="h-4 w-4" />
              Sí
            </Button>
            <Button
              type="button"
              size="sm"
              variant={understood === false ? "destructive" : "outline"}
              onClick={() => setUnderstood(false)}
            >
              <X className="h-4 w-4" />
              No
            </Button>
          </div>
          {understood === false && (
            <p className="text-xs text-slate-600">
              Reformula la frase con otras palabras o usa una modalidad distinta.
            </p>
          )}
        </div>

        <Button type="button" variant="outline" onClick={onReset} className="w-full sm:w-auto">
          <RotateCcw className="h-4 w-4" />
          Repetir o reformular
        </Button>
      </CardContent>
    </Card>
  );
}
