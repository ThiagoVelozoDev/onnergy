import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/80">
        <Zap className="h-5 w-5 fill-gold text-gold" aria-hidden="true" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-wide">
          <span className="text-gold">ON</span>
          <span className="text-paper">NERGY</span>
        </span>
        {showTagline && (
          <span className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-white/50">
            Engenharia Elétrica
          </span>
        )}
      </span>
    </div>
  );
}
