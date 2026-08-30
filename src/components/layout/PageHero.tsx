import { Container } from "@/components/layout/Container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-ink-950/8 bg-ink-950/5 py-16">
      <Container>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-orange-dark">{eyebrow}</span>
        )}
        <h1 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-xl text-sm text-ink-950/60">{description}</p>}
      </Container>
    </section>
  );
}
