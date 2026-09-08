"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, ShieldCheck, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SIGNS } from "@/lib/translate-service";

interface CameraLspProps {
  onCapture: (hint?: string) => void;
  processing: boolean;
}

export function CameraLsp({ onCapture, processing }: CameraLspProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  async function startCamera() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError("No se pudo acceder a la cámara. Revisa los permisos del navegador.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setActive(false);
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-900">
        <video
          ref={videoRef}
          muted
          playsInline
          className="h-full w-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-300">
            <Hand className="h-8 w-8" />
            <p className="text-sm">Cámara desactivada</p>
          </div>
        )}
        {active && (
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white">
            Procesando landmarks corporales
          </span>
        )}
      </div>

      <p className="flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-900">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
        El sistema procesa únicamente landmarks corporales. No se almacenan imágenes ni videos del
        paciente.
      </p>

      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {active ? (
          <Button type="button" variant="outline" onClick={stopCamera}>
            <CameraOff className="h-4 w-4" />
            Detener cámara
          </Button>
        ) : (
          <Button type="button" variant="outline" onClick={startCamera}>
            <Camera className="h-4 w-4" />
            Activar cámara
          </Button>
        )}
        <Button
          type="button"
          onClick={() => onCapture()}
          disabled={processing}
          className="bg-blue-800 hover:bg-blue-900"
        >
          <Hand className="h-4 w-4" />
          Capturar seña
        </Button>
        <Button type="button" variant="ghost" onClick={() => setShowCatalog((prev) => !prev)}>
          {showCatalog ? "Ocultar catálogo" : `Ver catálogo (${SIGNS.length})`}
        </Button>
      </div>

      {showCatalog && (
        <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200 p-2">
          <div className="flex flex-wrap gap-1.5">
            {SIGNS.map((sign) => (
              <button
                key={sign.id}
                type="button"
                onClick={() => onCapture(sign.es)}
                disabled={processing}
                className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700 transition hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50"
              >
                {sign.es}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
