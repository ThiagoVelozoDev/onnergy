import type { ReactNode } from "react";
import { BarChart3, Lock, MessageCircle, Settings, Wifi, Zap } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroPhotoCarousel } from "@/components/sections/HeroPhotoCarousel";
import technicianPhoto from "@/assets/carrousel/Tecnico.png";
import { useHero } from "@/hooks/useHero";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { generateWhatsAppMessage, openWhatsApp } from "@/services/whatsappService";

const FEATURES = [
  { icon: Wifi, title: "Telecomunicações", description: "Redes, cabeamento e conectividade de alta performance" },
  { icon: Settings, title: "Automações", description: "Processos mais inteligentes e eficientes" },
  { icon: Zap, title: "Serviços elétricos", description: "Instalações, manutenções e soluções elétricas seguras" },
  { icon: BarChart3, title: "Resultados", description: "Tecnologia que gera produtividade e reduz custos" },
];

const IMAGE_BADGES = [
  { icon: Wifi, title: "CONECTIVIDADE", subtitle: "QUE APROXIMA" },
  { icon: Settings, title: "AUTOMAÇÃO", subtitle: "QUE TRANSFORMA" },
  { icon: Zap, title: "ENERGIA", subtitle: "QUE MOVE" },
];

const HIGHLIGHT_PATTERNS = [/Telecomunicações,\s*Automações\s+e/i];

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
      <span className="text-orange">{match[0]}</span>
      {highlightKeywords(after)}
    </>
  );
}

// Fade confinado à coluna da imagem: começa em preto sólido idêntico ao
// fundo da seção (sem costura na borda da coluna) e dissolve rapidamente,
// puxado para a esquerda, para revelar a foto o quanto antes.
const IMAGE_FADE_GRADIENT =
  "linear-gradient(to right, #080808 0%, #080808 5%, rgba(8,8,8,0.85) 11%, rgba(8,8,8,0.6) 18%, rgba(8,8,8,0.35) 25%, rgba(8,8,8,0.15) 33%, rgba(8,8,8,0.04) 40%, rgba(8,8,8,0) 48%)";

// Mobile/tablet: véu horizontal sobre a foto — sólido junto ao texto (esquerda),
// dissolve para revelar o técnico e a torre ao fundo (direita).
const MOBILE_SCRIM_X =
  "linear-gradient(90deg, #080808 0%, #080808 8%, rgba(8,8,8,0.92) 32%, rgba(8,8,8,0.62) 55%, rgba(8,8,8,0.32) 75%, rgba(8,8,8,0.1) 100%)";

export function Hero() {
  const { hero } = useHero();
  const { siteSettings } = useSiteSettings();

  function handlePrimaryCta() {
    if (!siteSettings.whatsapp) return;
    openWhatsApp(siteSettings.whatsapp, generateWhatsAppMessage({ name: "visitante do site" }));
  }

  return (
    <section className="relative overflow-hidden border-b border-white/5 bg-ink-950">
      <div className="relative grid grid-cols-1 lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-10 lg:py-24 xl:px-16">
          {hero.badge && (
            <Reveal
              as="span"
              className="inline-flex w-fit rounded-full border border-orange/30 bg-orange/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-orange"
            >
              {hero.badge}
            </Reveal>
          )}

          <Reveal
            as="h1"
            delay={80}
            className="mt-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-paper sm:text-5xl"
          >
            {highlightKeywords(hero.title)}
          </Reveal>

          {hero.description && (
            <Reveal as="p" delay={160} className="mt-6 max-w-lg text-base text-white/60">
              {hero.description}
            </Reveal>
          )}

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-0 sm:gap-y-0 sm:divide-x sm:divide-white/10 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6 lg:divide-x-0 min-[1800px]:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <Reveal
                key={feature.title}
                delay={240 + index * 80}
                className="flex min-w-0 flex-col items-center gap-1.5 px-2 text-center lg:flex-row lg:items-start lg:gap-2.5 lg:px-0 lg:text-left"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-orange/30 bg-orange/5">
                  <feature.icon className="h-4 w-4 text-orange" aria-hidden="true" />
                </span>
                <div className="w-full min-w-0 lg:w-auto">
                  <p className="break-words text-sm font-bold text-paper">{feature.title}</p>
                  <p className="break-words text-xs text-white/50">{feature.description}</p>
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
            Sem compromisso. Fale com nossa equipe e encontre a solução ideal para seu projeto.
          </Reveal>
        </div>

        <Reveal as="div" variant="fade" delay={200} className="absolute inset-0 z-0 lg:relative lg:inset-auto">
          <img
            src={technicianPhoto}
            alt="Técnico da ONNERGY em instalação de telecomunicações e automação"
            className="absolute inset-0 h-full w-full object-cover object-[65%_center] sm:object-[70%_center] lg:hidden"
          />
          <HeroPhotoCarousel
            alt="Técnico da ONNERGY em instalação de telecomunicações e automação"
            className="object-[65%_center] sm:object-[70%_center] lg:object-[55%_center]"
          />

          {/* Mobile/tablet: véu horizontal — texto (esquerda) legível, técnico (direita) visível. */}
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{ background: MOBILE_SCRIM_X }}
            aria-hidden="true"
          />

          {/* Mobile/tablet: véu inferior — mantém os cards de features e a linha de confiança legíveis. */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent lg:hidden"
            aria-hidden="true"
          />

          {/* Desktop: dissolve cinematográfico contido nesta coluna, sem costura
              na borda com o texto (começa em preto sólido idêntico ao fundo). */}
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ background: IMAGE_FADE_GRADIENT }}
            aria-hidden="true"
          />

          {/* Selos verticais sobre a foto, só no desktop (no mobile a foto é
              mais baixa e não sobra espaço para eles). */}
          <div className="pointer-events-none absolute inset-y-0 right-6 hidden flex-col justify-center gap-6 lg:flex">
            {IMAGE_BADGES.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3">
                <badge.icon className="h-5 w-5 shrink-0 text-white/80" aria-hidden="true" />
                <span className="h-8 w-px bg-white/20" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase leading-tight text-paper">
                  {badge.title}
                  <br />
                  {badge.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Deslocado para cima no desktop para nunca colidir com o botão
              flutuante do WhatsApp, que fica fixo no canto do viewport. */}
          <Reveal
            delay={500}
            className="absolute inset-x-4 bottom-4 hidden items-start gap-3 rounded-xl border border-white/10 bg-ink-950/90 p-4 backdrop-blur sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xs lg:flex lg:bottom-24"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange/10">
              <Settings className="h-5 w-5 text-orange" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-paper">Projetos personalizados para sua realidade</p>
              <p className="text-xs text-white/50">Da análise à implementação</p>
            </div>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
