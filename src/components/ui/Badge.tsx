import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "orange" | "neutral" | "success" | "warning" | "danger";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  orange: "bg-orange/10 text-orange-dark border-orange/30",
  neutral: "bg-ink-950/5 text-ink-950/70 border-ink-950/10",
  success: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  danger: "bg-red-500/10 text-red-700 border-red-500/30",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
