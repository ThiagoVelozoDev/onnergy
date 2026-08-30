import { useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/config/site";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { openWhatsApp, generateWhatsAppMessage } from "@/services/whatsappService";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { siteSettings } = useSiteSettings();

  function handleTalkToUs() {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site" }));
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950">
      <Container className="flex h-20 items-center justify-between">
        <NavLink to="/" aria-label="ONNERGY — página inicial">
          <Logo />
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "text-xs font-semibold uppercase tracking-wide text-white/70 transition-colors hover:text-orange",
                  isActive && "text-orange",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button size="sm" onClick={handleTalkToUs}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Fale Conosco
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="rounded-md p-2 text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/5 bg-ink-950 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-3 text-sm font-medium text-white/80 hover:bg-white/5",
                    isActive && "text-orange",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button className="mt-2 w-full" onClick={handleTalkToUs}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Fale Conosco
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
