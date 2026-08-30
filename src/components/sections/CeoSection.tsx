import { Award, Quote, ShieldCheck } from "lucide-react";
import ceoPhoto from "@/assets/ceo.png";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";

export function CeoSection() {
  return (
    <section className="border-b border-ink-950/8 py-20">
      <Container>
        <Reveal as="span" className="text-xs font-semibold uppercase tracking-widest text-orange-dark">
          Liderança ONNERGY
        </Reveal>
        <Reveal as="h2" delay={80} className="mt-3 max-w-xl text-3xl font-bold sm:text-4xl">
          Engenharia liderada com <span className="text-orange-dark">experiência e propósito.</span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="pop" className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-orange/10" aria-hidden="true" />
            <img
              src={ceoPhoto}
              alt="Edgar Castro, CEO da ONNERGY"
              className="aspect-[4/5] w-full rounded-2xl border border-ink-950/10 object-cover shadow-lg"
            />
            <span className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-xl border border-ink-950/10 bg-white px-4 py-2.5 shadow-md">
              <Award className="h-4 w-4 text-orange-dark" aria-hidden="true" />
              <span className="text-xs font-semibold text-ink-950">+10 anos de experiência</span>
            </span>
          </Reveal>

          <Reveal delay={120}>
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-dark">CEO</span>
            <h3 className="mt-2 text-2xl font-bold text-ink-950">Edgar Castro</h3>
            <p className="mt-1 text-sm text-ink-950/60">Engenheiro Eletricista</p>

            <p className="mt-5 text-sm leading-relaxed text-ink-950/70">
              Engenheiro eletricista com mais de 10 anos de experiência no setor elétrico, atuação em projetos de energia solar, elétrica em geral,
              automação, cursos, treinamentos, telecomunicação e construção de rede. Edgar fundou a ONNERGY para levar soluções técnicas de alto padrão a cada cliente —
              unindo conhecimento de campo, rigor normativo e um compromisso real com o resultado.
            </p>

            <div className="mt-6 flex gap-3 rounded-2xl border border-ink-950/10 bg-white/90 p-5">
              <Quote className="h-5 w-5 shrink-0 text-orange-dark" aria-hidden="true" />
              <p className="text-sm italic text-ink-950/70">
                "Nosso propósito é transformar a forma como as pessoas consomem energia, com segurança e
                excelência em cada projeto."
              </p>
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-ink-950/50">
              <ShieldCheck className="h-4 w-4 text-orange-dark" aria-hidden="true" />
              Projetos conduzidos com segurança, qualidade e conformidade técnica.
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
