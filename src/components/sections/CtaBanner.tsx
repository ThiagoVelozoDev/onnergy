import { MessageCircle, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

export function CtaBanner() {
  const { siteSettings } = useSiteSettings();

  function handleClick() {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site" }));
  }

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink-900/40 py-16">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <Reveal className="flex items-center gap-5">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
            <Zap className="h-8 w-8 text-gold" aria-hidden="true" />
          </span>
          <div>
            <h2 className="max-w-md text-2xl font-bold sm:text-3xl">
              Pronto para levar sua energia para o <span className="text-gold">próximo nível?</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/50">
              Fale agora com um de nossos especialistas pelo WhatsApp e receba atendimento imediato!
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="shrink-0">
          <Button size="lg" onClick={handleClick} className="shrink-0">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Falar Agora Pelo WhatsApp
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
