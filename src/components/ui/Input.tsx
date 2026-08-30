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
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-ink-950/80">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full rounded-md border border-ink-950/10 bg-white px-4 py-3 text-sm text-ink-950 placeholder:text-ink-950/40 focus:border-orange-dark focus:outline-none focus:ring-1 focus:ring-orange-dark",
            error && "border-red-600/60 focus:border-red-600 focus:ring-red-600",
            className,
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
