import { MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { getIcon } from "@/components/icon-map";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useServices } from "@/hooks/useServices";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo } from "@/hooks/useSeo";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

export default function Services() {
  useSeo({
    title: "Serviços Elétricos | ONNERGY Engenharia Elétrica",
    description: "Instalações, manutenções, laudos, adequações e projetos elétricos completos.",
  });

  const { services, loading, error } = useServices();
  const { siteSettings } = useSiteSettings();

  function handleTalk(serviceName: string) {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(
      siteSettings.whatsapp,
      generateWhatsAppMessage({ name: "visitante do site", serviceName }),
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Serviços elétricos para empresas e residências"
        description="Instalações, manutenções, laudos técnicos, adequações normativas e muito mais — com responsabilidade técnica em cada etapa."
      />

      <section className="py-16">
        <Container>
          {loading && <LoadingState message="Carregando serviços..." />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && services.length === 0 && (
            <EmptyState title="Nenhum serviço disponível no momento." />
          )}

          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = getIcon(service.icon);
                return (
                  <Reveal
                    key={service.id}
                    as="article"
                    delay={Math.min(index, 6) * 80}
                    className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 hover:-translate-y-1 hover:border-gold/40"
                  >
                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="h-40 w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-ink-800">
                        <Icon className="h-10 w-10 text-gold" aria-hidden="true" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-lg font-bold text-paper">{service.title}</h2>
                      <p className="mt-2 flex-1 text-sm text-white/50">{service.short_description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-5 w-full"
                        onClick={() => handleTalk(service.title)}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        {service.cta_text || "Saiba mais"}
                      </Button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
