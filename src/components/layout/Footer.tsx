import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/layout/Container";
import { getIcon } from "@/components/icon-map";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useEffect, useState } from "react";
import { getActiveSocialLinks, getFooterSettings } from "@/services/siteService";
import { seedFooterSettings, seedSocialLinks } from "@/data/seed";
import type { FooterSettings, SocialLink } from "@/types";

const FOOTER_COLUMNS = [
  {
    title: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Serviços", href: "/servicos" },
      { label: "Cursos", href: "/cursos" },
      { label: "Treinamentos", href: "/treinamentos" },
      { label: "Quem Somos", href: "/sobre" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { label: "Instalações Elétricas", href: "/servicos" },
      { label: "Manutenção Preventiva", href: "/servicos" },
      { label: "Laudos e SPDA", href: "/servicos" },
      { label: "Projetos Elétricos", href: "/servicos" },
    ],
  },
  {
    title: "Cursos e Treinamentos",
    links: [
      { label: "Cursos", href: "/cursos" },
      { label: "Treinamentos In Company", href: "/treinamentos" },
      { label: "NR-10", href: "/treinamentos" },
      { label: "SEP e Reciclagens", href: "/treinamentos" },
    ],
  },
];

export function Footer() {
  const { siteSettings } = useSiteSettings();
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(seedFooterSettings);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(seedSocialLinks);

  useEffect(() => {
    getFooterSettings().then(setFooterSettings);
    getActiveSocialLinks().then(setSocialLinks);
  }, []);

  return (
    <footer className="border-t border-white/5 bg-ink-950">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/50">{footerSettings.description}</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <a
                  key={social.id}
                  href={social.url}
                  aria-label={social.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-orange hover:text-orange"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">{column.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/60 hover:text-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-white/40">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              {siteSettings.whatsapp}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              {siteSettings.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              {siteSettings.address}
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
              {siteSettings.business_hours}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/5 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
          <p>{footerSettings.copyright}</p>
          <div className="flex gap-6">
            <Link to={footerSettings.privacy_url ?? "#"} className="hover:text-orange">
              Política de Privacidade
            </Link>
            <Link to={footerSettings.terms_url ?? "#"} className="hover:text-orange">
              Termos de Uso
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
