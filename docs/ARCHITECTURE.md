# Arquitetura

## Camadas e fluxo de dados

Toda entidade de conteúdo (serviços, cursos, treinamentos, portfólio, estatísticas, ...) atravessa a mesma cadeia:

```text
┌─────────────────────┐
│ supabase/migrations  │  schema (create table), RLS (policies), seed SQL
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ src/types/index.ts    │  interface TypeScript da entidade
└──────────┬───────────┘
           │
┌──────────▼───────────┐        sem credenciais Supabase, ou query falhou
│ src/services/xServ.ts │───────────────────┐
│  supabase.from(...)   │                    │
└──────────┬───────────┘                    ▼
           │                        ┌──────────────────┐
           │  withFallback()        │ src/data/seed.ts  │
           │◄───────────────────────┤  dados fictícios  │
           │                        └──────────────────┘
┌──────────▼───────────┐
│ src/hooks/useX.ts      │  useState + useEffect, expõe {data, loading, error}
└──────────┬───────────┘
           │
┌──────────▼───────────┐
│ pages/ ou components/ │  consome o hook, nunca chama o Supabase direto
│ sections/              │
└───────────────────────┘
```

`withFallback` (em `src/lib/utils.ts`) decide entre Supabase real e seed com base em `isSupabaseConfigured()` (`src/lib/supabase.ts`), que checa se `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` foram preenchidas. Isso permite desenvolver e revisar a UI sem depender de um projeto Supabase configurado.

Ver [docs/CONTRIBUTING.md](CONTRIBUTING.md) para o passo a passo de como implementar essa cadeia para uma entidade nova, com o Portfólio como exemplo real.

## Estrutura de pastas

```text
src/
├── admin/
│   ├── components/   AdminLayout, AdminSidebar, AdminHeader, AdminPageHeader, ProtectedRoute
│   ├── pages/         DashboardPage, LoginPage, ComingSoonPage (placeholder por módulo)
│   └── leadStatus.ts  labels/variants de Badge para o status do lead
├── assets/            imagens estáticas importadas via ES modules (logo, fotos, ícones)
├── components/
│   ├── layout/         Header, Footer, PublicLayout, PageHero, Container, WhatsAppFloatingButton
│   ├── sections/       blocos da Home (Hero, SolutionsGrid, CeoSection, StatsSection, ...)
│   ├── ui/              design system (Button, Badge, Card, Input, Select, Textarea, Toast,
│   │                    LoadingState, ErrorState, EmptyState, Reveal)
│   └── icon-map.ts      registro central de ícones lucide-react usados via string (site público)
├── config/site.ts       NAV_LINKS (header/footer) e ADMIN_NAV_ITEMS (sidebar) — só rota/label/ícone
├── data/seed.ts          dados de fallback (nunca dado comercial real)
├── hooks/                um useX() por entidade, sempre {data, loading, error}
├── lib/                  supabase.ts (cliente + isSupabaseConfigured), utils.ts (cn, withFallback, datas)
├── pages/                uma página por rota pública
├── services/             uma xService.ts por entidade — única camada que fala com o Supabase
└── types/index.ts        todas as interfaces (sem `any` em nenhum lugar do projeto)
```

## Rotas públicas

Registradas em `src/App.tsx`, dentro de `<Route element={<PublicLayout />}>` (Header + Footer + WhatsAppFloatingButton fixos):

| Rota | Página | Conteúdo vem de |
| --- | --- | --- |
| `/` | `Home` | Hero, SolutionsGrid (estático), CeoSection (estático), StatsSection (`statistics`), CtaBanner |
| `/servicos` | `Services` | tabela `services` |
| `/cursos` | `Courses` | tabela `courses` |
| `/treinamentos` | `Trainings` | tabela `trainings` |
| `/portfolio` | `Portfolio` | tabelas `portfolio_categories` + `portfolio_items` |
| `/sobre` | `About` | estático |
| `/contato` | `Contact` | `LeadForm` → tabela `leads` |

`NAV_LINKS` em `src/config/site.ts` alimenta o menu do `Header` (desktop + drawer mobile). O `Footer` mantém sua própria coluna "Navegação" (mesma lista, duplicada intencionalmente para permitir textos diferentes nas outras colunas do rodapé) — ao adicionar uma rota pública nova, atualizar os dois.

## Admin (CMS)

`/admin/login` (`LoginPage`, sem proteção) → `/admin/*` dentro de `<Route path="/admin" element={<ProtectedRoute />}>` → `AdminLayout` (sidebar + header). `ADMIN_NAV_ITEMS` em `src/config/site.ts` alimenta a `AdminSidebar`.

Estado atual: apenas **Dashboard** tem UI real (métricas de serviços/cursos/treinamentos ativos + leads via `leadsService`). Todos os outros módulos (`Hero`, `Serviços`, `Cursos`, `Treinamentos`, `Portfólio`, `Empresa`, `Estatísticas`, `Leads`, `Mídia`, `Menu`, `Footer`, `SEO`, `Configurações`) já têm rota + item de menu, mas renderizam `ComingSoonPage` — o CRUD ainda precisa ser implementado por módulo.

## Autenticação e autorização

- `useAuth()` (`src/hooks/useAuth.tsx`) expõe `session`/`user` via contexto, sincronizado com `supabase.auth.onAuthStateChange`.
- `ProtectedRoute` (`src/admin/components/ProtectedRoute.tsx`) redireciona para `/admin/login` se não houver sessão. **Isso é só UX** — a autorização de verdade é a Row Level Security do Postgres (ver [docs/DATABASE.md](DATABASE.md)), que também distingue papéis `admin`/`editor` via `profiles.role`.

## Storage

Bucket público `site-media`, criado em `supabase/migrations/004_storage.sql`, organizado por área (`logo/`, `hero/`, `services/`, `courses/`, `trainings/`, `gallery/`, `seo/`). Upload/edição restritos a staff autenticado (policy `is_staff()`), exclusão restrita a admin (`is_admin()`). O Media Manager (`/admin/midia`) que fará upload/validação de arquivo ainda não foi implementado (fase 2).
