import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "outline-white" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gold text-ink-950 hover:bg-gold-light",
  secondary: "bg-ink-800 text-paper hover:bg-ink-800/70 border border-white/10",
  outline: "border border-gold text-gold hover:bg-gold/10",
  "outline-white": "border border-white/40 text-paper hover:bg-white/10",
  ghost: "text-paper hover:bg-white/5",
};

export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-4 text-base",
};

const baseButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(baseButtonClasses, buttonVariantStyles[variant], buttonSizeStyles[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function ButtonLink({ className, variant = "primary", size = "md", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(baseButtonClasses, buttonVariantStyles[variant], buttonSizeStyles[size], className)}
      {...props}
    />
  );
}
