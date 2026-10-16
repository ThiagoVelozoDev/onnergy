import { useMemo } from "react";
import { Award, ShieldCheck, Target } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { StatsSection } from "@/components/sections/StatsSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useSeo, type StructuredDataItem } from "@/hooks/useSeo";
import { useSeoSettings } from "@/hooks/useSeoSettings";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/structuredData";

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
  const { siteSettings } = useSiteSettings();
  const { data: seo } = useSeoSettings("sobre");

  const structuredData = useMemo<StructuredDataItem[]>(
    () => [
      {
        id: "breadcrumb",
        data: buildBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Quem Somos", path: "/sobre" },
        ]),
      },
    ],
    [],
  );

  useSeo({
    title: seo?.title ?? "Quem Somos | ONNERGY Engenharia Elétrica",
    description: seo?.description ?? "Conheça a história e os valores da ONNERGY Engenharia Elétrica.",
    canonical: seo?.canonical_url ?? `${SITE_URL}/sobre`,
    ogTitle: seo?.og_title ?? undefined,
    ogDescription: seo?.og_description ?? undefined,
    structuredData,
  });

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
                className="rounded-2xl border border-ink-950/10 bg-white/90 p-6 hover:-translate-y-1 hover:border-orange/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/30 bg-orange/5">
                  <value.icon className="h-5 w-5 text-orange-dark" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-base font-bold text-ink-950">{value.title}</h2>
                <p className="mt-2 text-sm text-ink-950/60">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <StatsSection />
    </>
  );
}
