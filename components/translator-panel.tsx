"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, Mic, Square, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Direction, InputMode } from "@/lib/translate-service";

const EXAMPLES = ["dolor de cabeza", "tomar medicina", "mucha fiebre", "no puedo dormir"];

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

interface TranslatorPanelProps {
  mode: Exclude<InputMode, "sena">;
  direction: Direction;
  onDirectionChange: (direction: Direction) => void;
  onTranslate: (text: string) => void;
  processing: boolean;
}

export function TranslatorPanel({
  mode,
  direction,
  onDirectionChange,
  onTranslate,
  processing,
}: TranslatorPanelProps) {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    return () => recognitionRef.current?.stop();
  }, []);

  function toggleListening() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const globalWindow = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtor;
      webkitSpeechRecognition?: SpeechRecognitionCtor;
    };
    const Ctor = globalWindow.SpeechRecognition ?? globalWindow.webkitSpeechRecognition;

    if (!Ctor) {
      setVoiceError("Tu navegador no soporta dictado por voz. Puedes escribir la frase.");
      return;
    }

    const recognition = new Ctor();
    recognition.lang = direction === "es-qu" ? "es-PE" : "es-PE";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };
    recognition.onerror = () => setVoiceError("No se pudo capturar el audio. Intenta nuevamente.");
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setVoiceError(null);
    recognition.start();
    setListening(true);
  }

  const sourceLabel = direction === "es-qu" ? "Español" : "Quechua";
  const targetLabel = direction === "es-qu" ? "Quechua" : "Español";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
          {sourceLabel}
        </span>
        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Invertir dirección de traducción"
          onClick={() => onDirectionChange(direction === "es-qu" ? "qu-es" : "es-qu")}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800">
          {targetLabel}
        </span>
      </div>

      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder={
          mode === "voz"
            ? "Presiona el micrófono y habla; el texto aparecerá aquí"
            : "Escribe la frase que necesitas traducir"
        }
        rows={4}
        className="resize-none text-base"
      />

      {mode === "voz" && (
        <div className="space-y-2">
          <Button
            type="button"
            variant={listening ? "destructive" : "outline"}
            onClick={toggleListening}
          >
            {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {listening ? "Detener dictado" : "Dictar por micrófono"}
          </Button>
          {voiceError && <p className="text-xs text-amber-700">{voiceError}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setText(example)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-blue-400 hover:bg-blue-50"
          >
            {example}
          </button>
        ))}
      </div>

      <Button
        type="button"
        onClick={() => onTranslate(text)}
        disabled={!text.trim() || processing}
        className="w-full bg-blue-800 hover:bg-blue-900 sm:w-auto"
      >
        <Languages className="h-4 w-4" />
        Traducir
      </Button>
    </div>
  );
}
