import { Clock, GraduationCap, MapPin, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCourses } from "@/hooks/useCourses";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo } from "@/hooks/useSeo";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

export default function Courses() {
  useSeo({
    title: "Cursos | ONNERGY Engenharia Elétrica",
    description: "Formação completa com conteúdo atualizado e foco na prática do mercado.",
  });

  const { courses, loading, error } = useCourses();
  const { siteSettings } = useSiteSettings();

  function handleTalk(courseName: string) {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site", serviceName: courseName }));
  }

  return (
    <>
      <PageHero
        eyebrow="Cursos"
        title="Formação técnica para profissionais de destaque"
        description="Cursos com conteúdo atualizado, carga horária completa e foco total na prática do mercado."
      />

      <section className="py-16">
        <Container>
          {loading && <LoadingState message="Carregando cursos..." />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && !error && courses.length === 0 && (
            <EmptyState title="Nenhum curso disponível no momento." />
          )}

          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <Reveal
                  key={course.id}
                  as="article"
                  delay={Math.min(index, 6) * 80}
                  className="flex flex-col overflow-hidden rounded-2xl border border-ink-950/10 bg-white/90 hover:-translate-y-1 hover:border-orange/40"
                >
                  {course.image_url ? (
                    <img src={course.image_url} alt={course.title} className="h-40 w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-ink-950/5">
                      <GraduationCap className="h-10 w-10 text-orange-dark" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {course.category && (
                      <Badge variant="orange" className="mb-3 w-fit">
                        {course.category}
                      </Badge>
                    )}
                    <h2 className="text-lg font-bold text-ink-950">{course.title}</h2>
                    <p className="mt-2 flex-1 text-sm text-ink-950/60">{course.short_description}</p>

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-950/60">
                      {course.workload && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-orange-dark" aria-hidden="true" />
                          {course.workload}
                        </span>
                      )}
                      {course.modality && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-orange-dark" aria-hidden="true" />
                          {course.modality}
                        </span>
                      )}
                    </div>

                    <Button variant="outline" size="sm" className="mt-5 w-full" onClick={() => handleTalk(course.title)}>
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {course.cta_text || "Saiba mais"}
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
