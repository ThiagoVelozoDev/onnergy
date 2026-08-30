import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

export function WhatsAppFloatingButton() {
  const { siteSettings } = useSiteSettings();

  function handleClick() {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site" }));
  }

  return (
    <Reveal
      as="button"
      variant="pop"
      delay={400}
      type="button"
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-orange text-ink-950 shadow-orange hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </Reveal>
  );
}
