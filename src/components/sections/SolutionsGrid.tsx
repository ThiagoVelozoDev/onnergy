import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "@/components/icon-map";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

const SOLUTIONS = [
  {
    title: "Energia Solar",
    description: "Projetos fotovoltaicos completos para economizar na conta de energia.",
    icon: "sun",
    to: "/servicos",
  },
  {
    title: "Instalação e manutenção de QGBT",
    description: "Quadros gerais de baixa tensão com segurança e conformidade normativa.",
    icon: "box",
    to: "/servicos",
  },
  {
    title: "Construção de rede",
    description: "Implantação e expansão de redes elétricas de média e baixa tensão.",
    icon: "network",
    to: "/servicos",
  },
  {
    title: "Subestações",
    description: "Projetos, montagem e manutenção de subestações de energia.",
    icon: "tower-control",
    to: "/servicos",
  },
  {
    title: "Automação",
    description: "Soluções de automação industrial e residencial para mais eficiência.",
    icon: "cog",
    to: "/servicos",
  },
  {
    title: "Telecomunicações",
    description: "Infraestrutura e instalações para redes de telecomunicações.",
    icon: "radio",
    to: "/servicos",
  },
  {
    title: "Cursos",
    description: "Formações técnicas como NR-10 e SEP com foco no mercado de trabalho.",
    icon: "graduation-cap",
    to: "/cursos",
  },
  {
    title: "Treinamentos",
    description: "Treinamentos in company e abertos para equipes de alta performance.",
    icon: "presentation",
    to: "/treinamentos",
  },
] as const;

export function SolutionsGrid() {
  return (
    <section className="border-b border-ink-950/8 py-20">
      <Container>
        <Reveal as="span" className="text-xs font-semibold uppercase tracking-widest text-orange-dark">
          Nossas Soluções
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-3 max-w-lg text-3xl font-bold sm:text-4xl">
          Tudo o que você precisa, <span className="text-orange-dark">em um só lugar.</span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOLUTIONS.map((solution, index) => {
            const Icon = getIcon(solution.icon);
            return (
              <Reveal
                key={solution.title}
                as={Link}
                to={solution.to}
                delay={index * 80}
                className="group flex flex-col rounded-2xl border border-ink-950/10 bg-white/90 p-6 hover:-translate-y-1 hover:border-orange/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/30 bg-orange/5">
                  <Icon className="h-5 w-5 text-orange-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink-950">{solution.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-950/60">{solution.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-orange-dark">
                  Saiba mais
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
