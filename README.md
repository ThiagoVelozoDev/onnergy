# ONNERGY Engenharia Elétrica

Site institucional + CMS administrativo da ONNERGY Engenharia Elétrica. Objetivo principal: gerar leads qualificados e convertê-los em atendimentos pelo WhatsApp.

## Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router, lucide-react
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Row Level Security)
- **Deploy:** Vercel

## Identidade visual

Preto + branco + **laranja** (não dourado — a paleta mudou desde o brief original). Paleta completa, tipografia e componentes em [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md).

## Como rodar

```bash
npm install
cp .env.example .env   # preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm run dev
```

Sem credenciais do Supabase configuradas (ou com a query falhando), o site funciona normalmente usando os dados de exemplo em [src/data/seed.ts](src/data/seed.ts) — útil para desenvolver a UI sem depender do banco.

```bash
npm run build     # build de produção (tsc -b && vite build)
npm run preview   # servir o build localmente
```

## Estrutura do projeto

```text
src/
├── admin/          # CMS administrativo (layout, sidebar, páginas /admin/*)
├── assets/         # imagens estáticas (logo, fotos, ícones locais)
├── components/     # layout, sections (home), ui (design system), icon-map
├── config/         # config técnica (rotas de navegação) — nunca conteúdo comercial
├── data/           # seed.ts — dados de fallback quando o Supabase não responde
├── hooks/          # useX() — um hook por entidade de conteúdo
├── lib/            # cliente Supabase, utilitários (cn, withFallback, formatação)
├── pages/          # páginas públicas (Home, Serviços, Cursos, Portfólio, ...)
├── services/       # xService.ts — toda comunicação com o Supabase
└── types/          # tipos TypeScript compartilhados (sem `any`)

supabase/
├── migrations/      # schema, RLS e seed versionados em SQL
└── functions/       # reservado para Edge Functions futuras
```

Ver [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para o fluxo completo de dados (página → hook → service → Supabase, com fallback para seed).

## Rotas públicas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/servicos` | Serviços |
| `/cursos` | Cursos |
| `/treinamentos` | Treinamentos |
| `/portfolio` | Portfólio (categorias + fotos/vídeos) |
| `/sobre` | Quem Somos |
| `/contato` | Contato |

## Admin (CMS)

`/admin/login` → `/admin/dashboard`, protegido por `ProtectedRoute` (Supabase Auth) + RLS no banco. Módulos implementados: **Dashboard**. Os demais (`Hero`, `Serviços`, `Cursos`, `Treinamentos`, `Portfólio`, `Empresa`, `Estatísticas`, `Leads`, `Mídia`, `Menu`, `Footer`, `SEO`, `Configurações`) existem como rota + item de menu com uma tela "em construção" (`ComingSoonPage`), aguardando implementação do CRUD.

## Banco de dados

Schema, políticas de RLS e bucket de Storage documentados em [docs/DATABASE.md](docs/DATABASE.md). Migrations versionadas em `supabase/migrations/`.

## Documentação

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — camadas, fluxo de dados, rotas, autenticação
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — cores, tipografia, componentes, ícones
- [docs/DATABASE.md](docs/DATABASE.md) — tabelas, RLS, Storage
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) — como adicionar uma nova entidade de conteúdo ponta a ponta
- [CLAUDE.md](CLAUDE.md) — guia rápido para assistentes de IA trabalhando neste repositório
- [CHANGELOG.md](CHANGELOG.md) — histórico de mudanças relevantes
- [docs/PROMPT MASTER — ONNERGY ENGENHARIA ELÉTRICA.md](<docs/PROMPT MASTER — ONNERGY ENGENHARIA ELÉTRICA.md>) — brief original do projeto (histórico; algumas decisões, como a paleta de cores, foram substituídas — ver nota no topo do arquivo)
