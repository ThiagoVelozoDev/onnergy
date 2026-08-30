import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 4, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-ink-950/80">
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full resize-none rounded-md border border-ink-950/10 bg-white px-4 py-3 text-sm text-ink-950 placeholder:text-ink-950/40 focus:border-orange-dark focus:outline-none focus:ring-1 focus:ring-orange-dark",
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
Textarea.displayName = "Textarea";
