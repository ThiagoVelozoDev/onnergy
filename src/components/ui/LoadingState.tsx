import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-white/60">
      <Loader2 className="h-6 w-6 animate-spin text-gold" aria-hidden="true" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
