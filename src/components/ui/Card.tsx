import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-950/10 bg-white/90 backdrop-blur-sm transition-all duration-300 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}
