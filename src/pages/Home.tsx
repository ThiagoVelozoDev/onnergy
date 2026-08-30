import { Hero } from "@/components/sections/Hero";
import { SolutionsGrid } from "@/components/sections/SolutionsGrid";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { useSeo } from "@/hooks/useSeo";

export default function Home() {
  useSeo({
    title: "ONNERGY Engenharia Elétrica | Serviços, Cursos e Treinamentos",
    description:
      "Soluções elétricas com segurança, qualidade e confiança. Serviços elétricos, projetos, cursos e treinamentos NR-10 e SEP para profissionais e empresas.",
  });

  return (
    <>
      <Hero />
      <SolutionsGrid />
      <StatsSection />
      <CtaBanner />
    </>
  );
}
