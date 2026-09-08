import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Procesando..." }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4"
    >
      <Loader2 className="h-5 w-5 animate-spin text-blue-700" />
      <p className="text-sm font-medium text-blue-900">{label}</p>
    </div>
  );
}
