import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={alt}>
      <div className="absolute inset-0 bg-ink-950/90" aria-hidden="true" />
      <div
        className="relative flex h-full w-full items-center justify-center p-4 sm:p-10"
        onClick={onClose}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar visualização"
          className="absolute right-4 top-4 rounded-full bg-ink-950/70 p-2 text-paper transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-dark sm:right-6 sm:top-6"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
        <img
          src={src}
          alt={alt}
          onClick={(event) => event.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>
    </div>
  );
}
