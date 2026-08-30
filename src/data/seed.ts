/**
 * Dados fictícios de fallback, usados apenas quando o Supabase não está
 * configurado (ou uma consulta falha). Servem só para o site funcionar
 * durante o desenvolvimento — nunca são "dados empresariais reais".
 */
import type {
  Course,
  FooterSettings,
  HeroContent,
  Service,
  SiteSettings,
  SocialLink,
  Statistic,
  Training,
} from "@/types";

const now = new Date().toISOString();

export const seedSiteSettings: SiteSettings = {
  id: "seed-site-settings",
  company_name: "ONNERGY Engenharia Elétrica",
  website: "onnergy.com.br",
  description:
    "Soluções elétricas inteligentes, cursos e treinamentos que conectam você ao futuro.",
  email: "[INSERIR E-MAIL]",
  phone: "[INSERIR TELEFONE]",
  whatsapp: "5569992076644",
  address: "[INSERIR ENDEREÇO]",
  business_hours: "Segunda a Sexta, 08h às 18h",
  logo_url: null,
  favicon_url: null,
  created_at: now,
  updated_at: now,
};

export const seedHeroContent: HeroContent = {
  id: "seed-hero",
  badge: "ENERGIA SOLAR • ECONOMIA • SUSTENTABILIDADE",
  title: "Economize até 95% na sua conta de energia com energia solar.",
  description:
    "Soluções completas em energia solar fotovoltaica para residências, comércios, indústrias e produtores rurais. Invista em economia, valorize seu imóvel e contribua com um futuro mais sustentável.",
  primary_cta_text: "QUERO ECONOMIZAR AGORA",
  secondary_cta_text: "SAIBA MAIS SOBRE ENERGIA SOLAR",
  hero_image_url: null,
  active: true,
  created_at: now,
  updated_at: now,
};

export const seedServices: Service[] = [
  {
    id: "seed-service-1",
    title: "Serviços Elétricos",
    slug: "servicos-eletricos",
    short_description:
      "Instalações, manutenções, laudos, adequações e muito mais para sua empresa ou lar.",
    description: "Serviço fictício de exemplo (dado de seed).",
    icon: "zap",
    image_url: null,
    cta_text: "Saiba mais",
    sort_order: 1,
    featured: true,
    active: true,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
  {
    id: "seed-service-2",
    title: "Projetos Elétricos",
    slug: "projetos-eletricos",
    short_description:
      "Projetos elétricos industriais, comerciais e residenciais com responsabilidade técnica.",
    description: "Serviço fictício de exemplo (dado de seed).",
    icon: "file-text",
    image_url: null,
    cta_text: "Saiba mais",
    sort_order: 2,
    featured: true,
    active: true,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
  {
    id: "seed-service-3",
    title: "Manutenção Preventiva",
    slug: "manutencao-preventiva",
    short_description:
      "Planos de manutenção para reduzir riscos e aumentar a vida útil das instalações.",
    description: "Serviço fictício de exemplo (dado de seed).",
    icon: "wrench",
    image_url: null,
    cta_text: "Saiba mais",
    sort_order: 3,
    featured: false,
    active: true,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
  {
    id: "seed-service-4",
    title: "Laudos e SPDA",
    slug: "laudos-e-spda",
    short_description:
      "Laudos técnicos e sistemas de proteção contra descargas atmosféricas.",
    description: "Serviço fictício de exemplo (dado de seed).",
    icon: "shield-check",
    image_url: null,
    cta_text: "Saiba mais",
    sort_order: 4,
    featured: false,
    active: true,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
];

export const seedCourses: Course[] = [
  {
    id: "seed-course-1",
    title: "Formação em NR-10",
    slug: "formacao-nr-10",
    short_description:
      "Formação completa com conteúdo atualizado e foco na prática do mercado.",
    description: "Curso fictício de exemplo (dado de seed).",
    category: "Segurança do Trabalho",
    workload: "40h",
    modality: "Presencial",
    location: "[INSERIR ENDEREÇO]",
    price: null,
    image_url: null,
    cta_text: "Saiba mais",
    featured: true,
    active: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
  {
    id: "seed-course-2",
    title: "SEP — Sistema Elétrico de Potência",
    slug: "sep-sistema-eletrico-de-potencia",
    short_description:
      "Capacitação para atuação segura em sistemas elétricos de potência.",
    description: "Curso fictício de exemplo (dado de seed).",
    category: "Segurança do Trabalho",
    workload: "40h",
    modality: "Presencial",
    location: "[INSERIR ENDEREÇO]",
    price: null,
    image_url: null,
    cta_text: "Saiba mais",
    featured: false,
    active: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
];

export const seedTrainings: Training[] = [
  {
    id: "seed-training-1",
    title: "Treinamento In Company NR-10",
    slug: "treinamento-in-company-nr-10",
    short_description:
      "Treinamentos in company e abertos para equipes que buscam alta performance.",
    description: "Treinamento fictício de exemplo (dado de seed).",
    target_audience: "Equipes técnicas e operacionais",
    workload: "40h",
    modality: "In company",
    content: null,
    image_url: null,
    cta_text: "Saiba mais",
    featured: true,
    active: true,
    sort_order: 1,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
  {
    id: "seed-training-2",
    title: "Reciclagem NR-10",
    slug: "reciclagem-nr-10",
    short_description:
      "Atualização periódica obrigatória para profissionais já certificados.",
    description: "Treinamento fictício de exemplo (dado de seed).",
    target_audience: "Profissionais certificados",
    workload: "20h",
    modality: "Presencial",
    content: null,
    image_url: null,
    cta_text: "Saiba mais",
    featured: false,
    active: true,
    sort_order: 2,
    created_at: now,
    updated_at: now,
    deleted_at: null,
  },
];

export const seedStatistics: Statistic[] = [
  {
    id: "seed-stat-1",
    value: "+10",
    title: "Anos de experiência",
    description: null,
    icon: "award",
    sort_order: 1,
    active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "seed-stat-2",
    value: "+1.000",
    title: "Clientes atendidos",
    description: null,
    icon: "users",
    sort_order: 2,
    active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "seed-stat-3",
    value: "+2.500",
    title: "Projetos e serviços",
    description: null,
    icon: "zap",
    sort_order: 3,
    active: true,
    created_at: now,
    updated_at: now,
  },
  {
    id: "seed-stat-4",
    value: "+500",
    title: "Alunos formados",
    description: null,
    icon: "graduation-cap",
    sort_order: 4,
    active: true,
    created_at: now,
    updated_at: now,
  },
];

export const seedFooterSettings: FooterSettings = {
  id: "seed-footer",
  description:
    "Soluções elétricas inteligentes, cursos e treinamentos que conectam você ao futuro.",
  copyright: `© ${new Date().getFullYear()} ONNERGY Engenharia Elétrica. Todos os direitos reservados.`,
  privacy_url: "/politica-de-privacidade",
  terms_url: "/termos-de-uso",
  updated_at: now,
};

export const seedSocialLinks: SocialLink[] = [
  { id: "seed-social-1", platform: "instagram", url: "#", icon: "instagram", sort_order: 1, active: true, created_at: now, updated_at: now },
  { id: "seed-social-2", platform: "linkedin", url: "#", icon: "linkedin", sort_order: 2, active: true, created_at: now, updated_at: now },
  { id: "seed-social-3", platform: "youtube", url: "#", icon: "youtube", sort_order: 3, active: true, created_at: now, updated_at: now },
  { id: "seed-social-4", platform: "whatsapp", url: "#", icon: "whatsapp", sort_order: 4, active: true, created_at: now, updated_at: now },
];
