/**
 * Configuração técnica da aplicação (rotas, navegação estrutural).
 * Conteúdo comercial (textos, contatos, mídia) vem sempre do Supabase.
 */

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Treinamentos", href: "/treinamentos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Quem Somos", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "layout-dashboard" },
  { label: "Hero", href: "/admin/hero", icon: "panel-top" },
  { label: "Serviços", href: "/admin/servicos", icon: "wrench" },
  { label: "Cursos", href: "/admin/cursos", icon: "graduation-cap" },
  { label: "Treinamentos", href: "/admin/treinamentos", icon: "users" },
  { label: "Portfólio", href: "/admin/portfolio", icon: "camera" },
  { label: "Empresa", href: "/admin/empresa", icon: "building-2" },
  { label: "Estatísticas", href: "/admin/estatisticas", icon: "bar-chart-3" },
  { label: "Leads", href: "/admin/leads", icon: "inbox" },
  { label: "Mídia", href: "/admin/midia", icon: "image" },
  { label: "Menu", href: "/admin/menu", icon: "menu" },
  { label: "Footer", href: "/admin/footer", icon: "layout-panel-left" },
  { label: "SEO", href: "/admin/seo", icon: "search" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "settings" },
] as const;
