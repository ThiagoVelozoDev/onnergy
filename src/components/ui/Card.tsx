import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-ink-900/60 backdrop-blur-sm transition-all duration-300 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}
