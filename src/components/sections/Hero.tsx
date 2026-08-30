import type { ReactNode } from "react";
import { DollarSign, Home, Leaf, Lock, MessageCircle, ShieldCheck, Sun } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { useHero } from "@/hooks/useHero";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";
import heroPhoto from "@/assets/placa-solar00.jpeg";

const FEATURES = [
  { icon: DollarSign, title: "Economia", description: "Reduza sua conta de luz em até 95%" },
  { icon: Leaf, title: "Sustentável", description: "Energia limpa e renovável" },
  { icon: Home, title: "Valorização", description: "Seu imóvel valorizado" },
  { icon: ShieldCheck, title: "Garantia", description: "Equipamentos de alta qualidade e longa vida útil" },
];

const HIGHLIGHT_PATTERNS = [/até\s*\d+%/i, /energia solar/i];

function highlightKeywords(text: string): ReactNode {
  let match: RegExpMatchArray | null = null;
  for (const pattern of HIGHLIGHT_PATTERNS) {
    match = text.match(pattern);
    if (match && match.index !== undefined) break;
  }
  if (!match || match.index === undefined) return text;

  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);
  return (
    <>
      {before}
      <span className="text-gold">{match[0]}</span>
      {highlightKeywords(after)}
    </>
  );
}

// Fade confinado à coluna da imagem: começa em preto sólido idêntico ao
// fundo da seção (sem costura na borda da coluna) e dissolve gradualmente
// até revelar a foto por completo antes da borda direita.
const IMAGE_FADE_GRADIENT =
  "linear-gradient(to right, #080808 0%, #080808 8%, rgba(8,8,8,0.85) 18%, rgba(8,8,8,0.6) 28%, rgba(8,8,8,0.35) 38%, rgba(8,8,8,0.15) 50%, rgba(8,8,8,0.04) 62%, rgba(8,8,8,0) 72%)";

export function Hero() {
  const { hero } = useHero();
  const { siteSettings } = useSiteSettings();

  function handlePrimaryCta() {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site" }));
  }

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink-950">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24 xl:px-16">
          {hero.badge && (
            <Reveal
              as="span"
              className="inline-flex w-fit rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-gold"
            >
              {hero.badge}
            </Reveal>
          )}

          <Reveal as="h1" delay={80} className="mt-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {highlightKeywords(hero.title)}
          </Reveal>

          {hero.description && (
            <Reveal as="p" delay={160} className="mt-6 max-w-lg text-base text-white/60">
              {hero.description}
            </Reveal>
          )}

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={240 + index * 80} className="flex items-start gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
                  <feature.icon className="h-4 w-4 text-gold" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-paper">{feature.title}</p>
                  <p className="text-xs text-white/50">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={560} className="mt-9 flex flex-wrap items-center gap-4">
            {hero.primary_cta_text && (
              <Button size="lg" onClick={handlePrimaryCta}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {hero.primary_cta_text}
              </Button>
            )}
            {hero.secondary_cta_text && (
              <ButtonLink to="/servicos" variant="outline-white" size="lg">
                {hero.secondary_cta_text}
              </ButtonLink>
            )}
          </Reveal>

          <Reveal as="p" delay={640} className="mt-5 flex items-center gap-1.5 text-xs text-white/40">
            <Lock className="h-3 w-3" aria-hidden="true" />
            Sem compromisso. Fale com um especialista e receba uma análise gratuita.
          </Reveal>
        </div>

        <Reveal as="div" variant="fade" delay={200} className="relative min-h-[360px] lg:min-h-0">
          <img
            src={heroPhoto}
            alt="Equipe ONNERGY instalando painéis solares"
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] sm:object-[70%_center] lg:object-[55%_center]"
          />

          {/* Mobile/tablet: funde o topo da foto com o preto do conteúdo acima dela. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/10 to-transparent lg:hidden"
            aria-hidden="true"
          />

          {/* Desktop: dissolve cinematográfico contido nesta coluna, sem costura
              na borda com o texto (começa em preto sólido idêntico ao fundo). */}
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ background: IMAGE_FADE_GRADIENT }}
            aria-hidden="true"
          />

          {/* Deslocado para cima no desktop para nunca colidir com o botão
              flutuante do WhatsApp, que fica fixo no canto do viewport. */}
          <Reveal
            delay={500}
            className="absolute inset-x-4 bottom-4 flex items-start gap-3 rounded-xl border border-white/10 bg-ink-950/90 p-4 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xs lg:bottom-24"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
              <Sun className="h-5 w-5 text-gold" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-paper">Projetos personalizados para sua realidade</p>
              <p className="text-xs text-white/50">Mais de 500 sistemas instalados</p>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
