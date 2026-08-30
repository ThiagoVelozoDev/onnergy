import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-white/70">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full rounded-md border border-white/10 bg-ink-900 px-4 py-3 text-sm text-paper placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold",
            error && "border-red-500/60 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
