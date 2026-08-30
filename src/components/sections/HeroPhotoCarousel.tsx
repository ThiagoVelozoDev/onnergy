import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const IMAGE_MODULES = import.meta.glob("../../assets/carrousel/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const IMAGES = Object.keys(IMAGE_MODULES)
  .sort()
  .map((key) => IMAGE_MODULES[key]);

const INTERVAL_MS = 5000;

interface HeroPhotoCarouselProps {
  alt: string;
  className?: string;
}

export function HeroPhotoCarousel({ alt, className }: HeroPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (IMAGES.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {IMAGES.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={index === activeIndex ? alt : ""}
          aria-hidden={index === activeIndex ? undefined : true}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none",
            index === activeIndex ? "opacity-100" : "opacity-0",
            className,
          )}
        />
      ))}
    </>
  );
}
