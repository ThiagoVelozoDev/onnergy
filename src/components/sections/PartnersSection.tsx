import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { usePartners } from "@/hooks/usePartners";

export function PartnersSection() {
  const { partners } = usePartners();

  if (partners.length === 0) return null;

  return (
    <section className="border-b border-ink-950/8 py-20">
      <Container>
        <Reveal as="span" className="text-xs font-semibold uppercase tracking-widest text-orange-dark">
          Parceiros
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
          Empresas que já <span className="text-orange-dark">confiaram na ONNERGY.</span>
        </Reveal>

        <div className="mt-12 flex items-center justify-center gap-4 overflow-x-auto sm:gap-6">
          {partners.map((partner, index) => (
            <Reveal
              key={partner.id}
              delay={index * 80}
              className="flex h-20 shrink-0 items-center justify-center rounded-2xl border border-ink-950/10 bg-white/90 p-1 shadow-sm transition hover:-translate-y-1 hover:border-orange/40 sm:h-24 sm:p-1.5"
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                className="h-full w-auto rounded-lg object-contain"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
