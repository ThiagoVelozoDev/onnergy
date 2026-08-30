# Changelog

Formato livre, em português, focado no "porquê" de cada mudança relevante. Não é gerado automaticamente — atualizar manualmente ao fazer mudanças que afetem arquitetura, schema ou identidade visual.

## 2026-08-30

- **Nossas Soluções (Home)**: cards atualizados para refletir as áreas de atuação reais da empresa — Energia Solar, Instalação e manutenção de QGBT, Construção de rede, Subestações, Automação, Telecomunicações, Cursos e Treinamentos (`src/components/sections/SolutionsGrid.tsx`).
- **Portfólio (novo)**: nova rota pública `/portfolio` com seletor de categorias e grade de fotos/vídeos abaixo (`src/pages/Portfolio.tsx`). Inclui:
  - Tabelas `portfolio_categories`/`portfolio_items` + RLS (`supabase/migrations/005_portfolio.sql`).
  - Service (`src/services/portfolioService.ts`) e hooks (`usePortfolioCategories`, `usePortfolioItems`).
  - Seed de fallback com fotos reais de Energia Solar já presentes no repositório (as demais categorias ficam vazias até mídia real ser enviada — fotos/vídeos serão salvos no Supabase Storage).
  - Item de menu "Portfólio" no Header, no Footer e (como placeholder `ComingSoonPage`) na sidebar do admin.
- **Documentação**: criado o conjunto `README.md`, `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`, `docs/DATABASE.md`, `docs/CONTRIBUTING.md`, este `CHANGELOG.md`. Motivo: o único `.md` existente era o brief original do projeto (`docs/PROMPT MASTER...md`), que já estava desatualizado — a paleta de cores, por exemplo, mudou de preto+branco+dourado para preto+branco+**laranja**.
- **Achado durante a documentação**: o projeto Supabase configurado em `.env` ainda não tem nenhuma migration aplicada (schema inexistente no projeto remoto). Isso significa que o formulário de lead está falhando silenciosamente ao gravar no banco (o visitante ainda é redirecionado ao WhatsApp normalmente, mas o lead não fica salvo). Detalhes e como aplicar as migrations em [docs/DATABASE.md](docs/DATABASE.md#️-status-de-aplicação-no-projeto-supabase-real).
