import { Hero } from "@/components/sections/Hero";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { CeoSection } from "@/components/sections/CeoSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useSeo } from "@/hooks/useSeo";
import { useSeoSettings } from "@/hooks/useSeoSettings";
import { SITE_URL } from "@/lib/structuredData";

export default function Home() {
  const { data: seo } = useSeoSettings("home");

  useSeo({
    title: seo?.title ?? "ONNERGY Engenharia Elétrica | Serviços, Cursos e Treinamentos",
    description:
      seo?.description ??
      "Soluções elétricas com segurança, qualidade e confiança. Serviços elétricos, projetos, cursos e treinamentos NR-10 e SEP para profissionais e empresas.",
    canonical: seo?.canonical_url ?? `${SITE_URL}/`,
    ogTitle: seo?.og_title ?? undefined,
    ogDescription: seo?.og_description ?? undefined,
  });

  return (
    <>
      <Hero />
      <SolutionsGrid />
      <CeoSection />
      <PartnersSection />
      <StatsSection />
      <CtaBanner />
    </>
  );
}
