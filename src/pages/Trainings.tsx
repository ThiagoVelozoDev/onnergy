import { Clock, MapPin, MessageCircle, Users2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useTrainings } from "@/hooks/useTrainings";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo } from "@/hooks/useSeo";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

export default function Trainings() {
  useSeo({
    title: "Treinamentos | ONNERGY Engenharia Elétrica",
    description: "Treinamentos in company e abertos para equipes que buscam alta performance.",
  });

  const { trainings, loading, error } = useTrainings();
  const { siteSettings } = useSiteSettings();

  function handleTalk(trainingName: string) {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site", serviceName: trainingName }));
  }

  return (
    <>
      <PageHero
        eyebrow="Treinamentos"
        title="Treinamentos in company e abertos"
        description="Capacitação prática para equipes técnicas e operacionais, com foco em segurança e performance."
      />

      <section className="py-16">
        <Container>
          {loading && <LoadingState message="Carregando treinamentos..." />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && trainings.length === 0 && (
            <EmptyState title="Nenhum treinamento disponível no momento." />
          )}

          {!loading && !error && trainings.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((training, index) => (
                <Reveal
                  key={training.id}
                  as="article"
                  delay={Math.min(index, 6) * 80}
                  className="flex flex-col overflow-hidden rounded-2xl border border-ink-950/10 bg-white/90 hover:-translate-y-1 hover:border-orange/40"
                >
                  {training.image_url ? (
                    <img
                      src={training.image_url}
                      alt={training.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-ink-950/5">
                      <Users2 className="h-10 w-10 text-orange-dark" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {training.target_audience && (
                      <Badge variant="orange" className="mb-3 w-fit">
                        {training.target_audience}
                      </Badge>
                    )}
                    <h2 className="text-lg font-bold text-ink-950">{training.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink-950/60">{training.short_description}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-950/60">
                      {training.workload && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-orange-dark" aria-hidden="true" />
                          {training.workload}
                        </span>
                      )}
                      {training.modality && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-orange-dark" aria-hidden="true" />
                          {training.modality}
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-5 w-full"
                      onClick={() => handleTalk(training.title)}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {training.cta_text || "Saiba mais"}
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
