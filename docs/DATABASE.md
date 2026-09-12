# Banco de dados

PostgreSQL via Supabase. Schema, RLS e dados de seed são versionados em `supabase/migrations/*.sql` — nunca criar/alterar tabela só pelo Dashboard sem gerar a migration correspondente.

## Migrations

| Arquivo | Conteúdo |
| --- | --- |
| `001_initial_schema.sql` | tabelas principais + índices + trigger `handle_new_user` (cria `profiles` para todo novo usuário do Auth) |
| `002_rls.sql` | habilita RLS em todas as tabelas + funções `current_user_role()`/`is_admin()`/`is_staff()` + policies |
| `003_seed.sql` | dados fictícios de exemplo (claramente identificados), placeholders `[INSERIR ...]` onde não há dado real |
| `004_storage.sql` | bucket `site-media` + policies de Storage |
| `005_portfolio.sql` | tabelas `portfolio_categories` / `portfolio_items`, RLS e seed das 8 categorias (sem itens de mídia — ver abaixo) |
| `006_grants.sql` | `GRANT` de tabela para `anon`/`authenticated` no schema `public` — sem isso toda query falha com "permission denied" mesmo com RLS correta (RLS filtra linhas, não substitui o GRANT) |

## ⚠️ Status de aplicação no projeto Supabase real

Verificado em 2026-08-30 via REST API (`GET /rest/v1/services` contra o projeto do `.env`): **retornou 404**, ou seja, na época nenhuma migration parecia ter sido aplicada no projeto Supabase remoto (`isodbguuvrntcxbplvnp`).

**Atualização em 2026-09-12**: descobrimos que o projeto estava **pausado** (plano free do Supabase pausa após ~7 dias sem nenhuma requisição — dados e Storage continuam intactos, não é perda). Depois de retomado pelo usuário, reverificação confirmou que as migrations 001–005 realmente nunca tinham sido aplicadas (404 em todas as tabelas). O usuário aplicou o SQL combinado via SQL Editor e criou o primeiro usuário `admin` — mas todas as queries passaram a falhar com `permission denied for table ...` (código Postgres `42501`): as tabelas foram criadas sem `GRANT` de `SELECT`/`INSERT`/etc. para as roles `anon`/`authenticated`, então a RLS nunca chegava a ser avaliada. Corrigido com a migration `006_grants.sql`. Depois de aplicá-la, reverificar com o mesmo `curl` desta seção.

Enquanto isso, para evitar que o projeto pause de novo, foi adicionado `.github/workflows/supabase-keepalive.yml` (roda às segundas e quintas, faz um `GET` leve na REST API) — requer os secrets `SUPABASE_URL`/`SUPABASE_ANON_KEY` cadastrados no repositório GitHub (Settings → Secrets and variables → Actions).

O `.env` já tem credenciais reais configuradas, então o site já tenta consultar esse projeto — e cai no fallback de `seed.ts` silenciosamente (só um `console.warn`) em todas as páginas públicas enquanto o projeto estiver inacessível. Mais grave: **o formulário de lead (`/contato`) insere na tabela `leads`, e se ela não existir (ou o projeto estiver pausado) o erro é engolido** (`catch` só faz `console.warn`) e o visitante vê a mensagem de sucesso normalmente e é redirecionado ao WhatsApp, mas **nenhum lead fica salvo no banco** — reverificar isso também depois de retomar o projeto.

### Como aplicar as migrations

Opção A — Supabase CLI (recomendado, mantém tudo versionado):

```bash
npx supabase login
npx supabase link --project-ref isodbguuvrntcxbplvnp
npx supabase db push
```

Opção B — colar manualmente no SQL Editor do Supabase Studio, na ordem: `001_initial_schema.sql` → `002_rls.sql` → `003_seed.sql` → `004_storage.sql` → `005_portfolio.sql`.

Depois de aplicar, promover o primeiro usuário admin manualmente (o trigger cria todo novo usuário como `editor`):

```sql
update public.profiles set role = 'admin' where email = 'voce@onnergy.com.br';
```

## Tabelas

| Tabela | Descrição | Exclusão |
| --- | --- | --- |
| `site_settings` | dados institucionais (nome, contato, WhatsApp, horário) | — |
| `hero_content` | headline/CTAs da Home | — |
| `services` | serviços elétricos exibidos em `/servicos` e na Home | soft delete (`deleted_at`) |
| `courses` | cursos exibidos em `/cursos` | soft delete |
| `trainings` | treinamentos exibidos em `/treinamentos` | soft delete |
| `statistics` | números da seção de estatísticas da Home | — |
| `menu_items` | reservado para menu administrável (ainda não consumido pelo frontend — hoje o menu vem de `NAV_LINKS`) | — |
| `footer_settings` | descrição/copyright/links legais do rodapé | — |
| `social_links` | ícones sociais do rodapé | — |
| `seo_settings` | title/description/OG por página | — |
| `leads` | leads capturados pelo `LeadForm` | — |
| `media` | registro de arquivos enviados ao Storage (Media Manager, ainda não implementado) | — |
| `profiles` | 1:1 com `auth.users`, guarda `role` (`admin`/`editor`) | — |
| `audit_logs` | trilha de ações administrativas (ainda não escrito por nenhuma tela) | — |
| `portfolio_categories` | categorias do `/portfolio` (Energia Solar, QGBT, Subestações, ...) | — |
| `portfolio_items` | fotos/vídeos de cada categoria (`media_type`: `photo`\|`video`) | soft delete |

## RLS — convenção de policies

Todas as tabelas têm RLS habilitado. Padrão aplicado consistentemente:

- **Leitura pública**: liberada para linhas `active = true` (e `deleted_at is null` quando a tabela tem soft delete), OU se o usuário for staff (`is_staff()`) — assim o admin sempre vê tudo, inclusive rascunhos/inativos.
- **Insert/Update**: exigem `is_staff()` (papel `admin` ou `editor`).
- **Delete**: exige `is_admin()` — `editor` nunca pode excluir.
- **Exceção `leads`**: sem SELECT público (dados pessoais). Insert público liberado (é o próprio formulário do site quem grava); SELECT/UPDATE exigem staff; DELETE exige admin.
- **Exceção `media`**: SELECT também restrito a staff (não é conteúdo público, é o banco de mídia interno).
- **`site_settings`/`footer_settings`/`seo_settings`**: SELECT público sempre `true` (não têm coluna `active` — são configuração única, não lista de conteúdo).

Ao criar uma tabela nova, seguir esse mesmo padrão (ver `005_portfolio.sql` como exemplo) e nomear as policies como `<tabela>_<regra>` (`portfolio_items_staff_insert`, etc.) para bater com o estilo já usado.

## Storage

Bucket público `site-media` (`004_storage.sql`), organizado por área:

```text
site-media/
├── logo/
├── hero/
├── services/
├── courses/
├── trainings/
├── gallery/   ← fotos/vídeos do Portfólio
└── seo/
```

Leitura pública liberada para todo o bucket; upload/update exigem staff; delete exige admin. Validação de extensão/MIME/tamanho é responsabilidade da aplicação (Media Manager, ainda não implementado) — o Storage por si só não valida isso.
