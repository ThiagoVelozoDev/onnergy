import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="mb-1.5 block text-xs font-medium text-ink-950/80">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full appearance-none rounded-md border border-ink-950/10 bg-white px-4 py-3 pr-10 text-sm text-ink-950 focus:border-orange-dark focus:outline-none focus:ring-1 focus:ring-orange-dark",
              error && "border-red-600/60 focus:border-red-600 focus:ring-red-600",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-950/40" />
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
