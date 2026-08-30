import { AlertTriangle } from "lucide-react";

export function ErrorState({ message = "Não foi possível carregar o conteúdo." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-600/20 bg-red-600/5 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-red-600" aria-hidden="true" />
      <p className="text-sm font-medium text-red-700">{message}</p>
    </div>
  );
}
