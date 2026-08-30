import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getIcon } from "@/components/icon-map";
import { useStatistics } from "@/hooks/useStatistics";

export function StatsSection() {
  const { statistics } = useStatistics();

  return (
    <section className="border-b border-ink-950/8 py-20">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <Reveal as="div" className="lg:col-span-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-dark">Por que escolher</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A ONNERGY?</h2>
          <p className="mt-4 text-sm text-ink-950/60">
            Unimos conhecimento técnico, experiência e comprometimento para entregar soluções que geram
            segurança, economia e eficiência.
          </p>
          <ButtonLink to="/sobre" variant="outline" size="md" className="mt-6">
            Conheça Nossa História
          </ButtonLink>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 lg:col-span-2 lg:grid-cols-4">
          {statistics.map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <Reveal
                key={stat.id}
                delay={index * 80}
                className="flex flex-col items-center gap-3 rounded-2xl border border-ink-950/10 bg-white/90 p-6 text-center hover:-translate-y-1 hover:border-orange/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/30 bg-orange/5">
                  <Icon className="h-5 w-5 text-orange-dark" aria-hidden="true" />
                </span>
                <span className="text-3xl font-extrabold text-ink-950">{stat.value}</span>
                <span className="text-xs text-ink-950/60">{stat.title}</span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
