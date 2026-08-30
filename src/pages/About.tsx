import { Award, ShieldCheck, Target } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StatsSection } from "@/components/sections/StatsSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo } from "@/hooks/useSeo";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Segurança",
    description: "Cada projeto e serviço segue rigorosamente as normas técnicas e de segurança do trabalho.",
  },
  {
    icon: Target,
    title: "Excelência técnica",
    description: "Profissionais especializados e atualizados para entregar soluções de alto nível.",
  },
  {
    icon: Award,
    title: "Compromisso",
    description: "Relacionamento transparente e comprometido com o resultado do cliente.",
  },
];

export default function About() {
  useSeo({
    title: "Quem Somos | ONNERGY Engenharia Elétrica",
    description: "Conheça a história e os valores da ONNERGY Engenharia Elétrica.",
  });

  const { siteSettings } = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Quem Somos"
        title={siteSettings.company_name}
        description={siteSettings.description ?? undefined}
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 100}
                className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 hover:-translate-y-1 hover:border-gold/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                  <value.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-base font-bold text-paper">{value.title}</h2>
                <p className="mt-2 text-sm text-white/50">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsSection />
    </>
  );
}
