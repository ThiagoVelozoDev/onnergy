import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "@/components/icon-map";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useServices } from "@/hooks/useServices";

export function SolutionsGrid() {
  const { services } = useServices();
  const featured = services.slice(0, 4);

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
          {featured.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal
                key={service.id}
                as={Link}
                to="/servicos"
                delay={index * 80}
                className="group flex flex-col rounded-2xl border border-ink-950/10 bg-white/90 p-6 hover:-translate-y-1 hover:border-orange/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/30 bg-orange/5">
                  <Icon className="h-5 w-5 text-orange-dark" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink-950">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-950/60">{service.short_description}</p>
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
