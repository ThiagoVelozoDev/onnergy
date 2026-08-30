# CLAUDE.md

Guia rápido para quem (humano ou IA) for mexer neste repositório. Para profundidade, use os links — este arquivo é propositalmente curto.

## O projeto

Site institucional + CMS da ONNERGY Engenharia Elétrica. Prioridades, nesta ordem: **conversão de leads (WhatsApp) → design premium → responsividade → segurança → CMS → performance**. Stack: React + TypeScript + Vite + Tailwind + Supabase (Postgres + Auth + Storage + RLS). Detalhes em [README.md](README.md).

## Regra arquitetural central

> O React apresenta. O Supabase persiste. O RLS protege.

Todo conteúdo comercial (textos, serviços, cursos, portfólio, configurações) vem do Supabase — nunca hardcoded em componentes. `src/data/seed.ts` **não é conteúdo real**: é apenas o fallback usado quando `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` não estão configurados ou a query falha (via `withFallback()` em `src/lib/utils.ts`). Não invente dados empresariais reais no seed — use placeholders como `[INSERIR TELEFONE]` quando não houver dado real disponível.

Toda entidade de conteúdo segue a mesma cadeia de camadas:

```text
types/index.ts → supabase/migrations/*.sql (schema + RLS + seed) → data/seed.ts (fallback)
  → services/xService.ts (query Supabase) → hooks/useX.ts → pages/sections (consome o hook)
```

Passo a passo completo, com o Portfólio como exemplo real já implementado, em [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## Convenções que importam

- **Sem `any`.** Tipar tudo em `src/types/index.ts`.
- **Ícones**: nunca importar `lucide-react` direto em código que renderiza um ícone vindo de dado (coluna `icon` do banco/seed). Registrar em `src/components/icon-map.ts` (site público) ou no `ICONS` local de `AdminSidebar.tsx` (admin) e referenciar pela chave string.
- **Cores**: só os tokens Tailwind `ink-{950,900,800}`, `paper`, `orange` (`DEFAULT`/`light`/`dark`). Não introduzir hex soltos. Paleta completa em [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — **a identidade visual é preto+branco+laranja, não dourado** (o brief original em `docs/PROMPT MASTER...md` está desatualizado nesse ponto).
- **Copy em pt-BR**, tom técnico/confiável (engenharia elétrica), CTAs em caixa alta.
- **Formulários**: Zod para validação (ver `LeadForm.tsx`).
- **Admin não implementado ainda**: rotas/menu já existem mas apontam para `ComingSoonPage` até o CRUD ser construído. Ao implementar um módulo nesse estado, também é o momento de escrever o CRUD real — não deixe outra camada pela metade.
- **RLS é a autorização real.** `ProtectedRoute` (frontend) é só UX; nunca confiar apenas nele. Convenções de policy em [docs/DATABASE.md](docs/DATABASE.md).

## Antes de considerar uma tarefa pronta

```bash
npx tsc --noEmit -p .
npm run build
```

Para mudanças visuais/UI, suba `npm run dev` e confira no navegador (o skill `run` deste ambiente já sabe fazer isso) — type-check não substitui olhar a tela.

## Mapa da documentação

| Arquivo | Quando usar |
| --- | --- |
| [README.md](README.md) | visão geral, como rodar, estrutura de pastas |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | camadas, rotas, autenticação, Storage |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | cores, tipografia, componentes de UI, ícones |
| [docs/DATABASE.md](docs/DATABASE.md) | tabelas, RLS, migrations |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | receita para adicionar uma nova entidade de conteúdo |
| [CHANGELOG.md](CHANGELOG.md) | o que mudou e quando |

Ao adicionar um `.md` novo, sempre linkar daqui e do README — documentação órfã não ajuda ninguém.
