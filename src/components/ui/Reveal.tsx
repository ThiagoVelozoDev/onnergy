import { useEffect, useRef, useState, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  delay?: number;
  variant?: "up" | "fade" | "pop";
  to?: string;
  type?: "button" | "submit" | "reset";
}

const VARIANT_HIDDEN_CLASSES: Record<NonNullable<RevealProps["variant"]>, string> = {
  up: "opacity-0 translate-y-6",
  fade: "opacity-0",
  pop: "opacity-0 scale-90",
};

const VARIANT_VISIBLE_CLASSES: Record<NonNullable<RevealProps["variant"]>, string> = {
  up: "opacity-100 translate-y-0",
  fade: "opacity-100",
  pop: "opacity-100 scale-100",
};

export function Reveal({ as, delay = 0, variant = "up", className, style, ...props }: RevealProps) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100",
        visible ? VARIANT_VISIBLE_CLASSES[variant] : VARIANT_HIDDEN_CLASSES[variant],
        className,
      )}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    />
  );
}
