import { cn } from "@/lib/utils";
import logoDark from "@/assets/logo-onnergy-black.png";
import logoLight from "@/assets/logo-onnergy-white.png";

interface LogoProps {
  className?: string;
  surface?: "dark" | "light";
}

const LOGO_SOURCES: Record<"dark" | "light", string> = {
  dark: logoDark,
  light: logoLight,
};

export function Logo({ className, surface = "dark" }: LogoProps) {
  return (
    <img
      src={LOGO_SOURCES[surface]}
      alt="ONNERGY Engenharia Elétrica"
      className={cn("h-12 w-auto select-none", className)}
    />
  );
}
