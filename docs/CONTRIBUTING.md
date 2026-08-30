# Como contribuir

## Convenções gerais

- **TypeScript estrito, sem `any`.** Toda entidade tem uma interface em `src/types/index.ts`.
- **Conteúdo comercial nunca hardcoded** em componente — sempre via `hooks/useX()` → `services/xService.ts` → Supabase (com fallback para `data/seed.ts`).
- **Cores**: só tokens Tailwind (`ink-*`, `paper`, `orange*`) — ver [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).
- **Ícones vindos de dado**: sempre via `src/components/icon-map.ts` (nunca `lucide-react` direto nesse caso).
- **Copy em pt-BR**, CTAs em caixa alta, tom técnico/confiável.
- **Formulários**: validar com Zod.
- **Commits**: mensagens curtas, em português, minúsculas, no imperativo (ex.: `ajuste layout`, `ajustes interface`) — sem seguir Conventional Commits.

## Receita: adicionar uma nova entidade de conteúdo

Exemplo real já implementado no projeto: o **Portfólio** (categorias + itens de mídia). Use os arquivos abaixo como referência ao criar a próxima entidade.

1. **Tipos** — `src/types/index.ts`: adicionar a(s) interface(s) (e um union type para enums, ex. `PortfolioMediaType`).
2. **Migration** — `supabase/migrations/00N_nome.sql`: `create table`, índices, `alter table ... enable row level security`, policies (seguir o padrão em [DATABASE.md](DATABASE.md)), e seed apenas do que for configuração/categoria (nunca conteúdo fictício que pareça dado real de cliente).
3. **Seed de fallback** — `src/data/seed.ts`: array `seedX` com o mesmo formato da tabela. Se a entidade tiver mídia, prefira reaproveitar assets reais já existentes em `src/assets/` a inventar URLs quebradas.
4. **Service** — `src/services/xService.ts`: uma função por query, sempre envolvida em `withFallback(() => supabase.from(...)..., seedX)`.
5. **Hook** — `src/hooks/useX.ts`: `useState` + `useEffect` chamando o service, expondo `{ data, loading, error }`. Se a busca depender de um parâmetro (ex. categoria selecionada), incluir esse parâmetro no array de dependências do `useEffect` e tratar o caso `null`/ainda-não-selecionado.
6. **Página/seção** — consome o hook; sempre trata os três estados na ordem `loading → error → empty → conteúdo` usando `LoadingState`/`ErrorState`/`EmptyState`.
7. **Rota** — registrar em `src/App.tsx` (dentro de `<PublicLayout>` se for pública).
8. **Navegação** — adicionar em `src/config/site.ts` (`NAV_LINKS` e/ou `ADMIN_NAV_ITEMS`); se for um link do menu principal, replicar também na coluna "Navegação" do `Footer.tsx`; se precisar de um item novo na sidebar do admin, registrar o ícone em `AdminSidebar.tsx` e a rota em `App.tsx` (pode apontar para `ComingSoonPage` até o CRUD existir).
9. **Verificar**:
   ```bash
   npx tsc --noEmit -p .
   npm run build
   ```
   e conferir no navegador (`npm run dev`) — inclusive os estados vazio/erro, não só o caminho feliz.

## Antes de abrir PR / considerar a tarefa pronta

- [ ] `npx tsc --noEmit -p .` sem erros
- [ ] `npm run build` sem erros
- [ ] Testado no navegador (não só type-check)
- [ ] Tabela nova? RLS habilitado + policies seguindo a convenção do projeto
- [ ] Nenhum dado comercial real inventado no seed/migration (usar `[INSERIR ...]` quando faltar)
- [ ] Responsivo (a lista de breakpoints alvo está na seção 33 do `docs/PROMPT MASTER...md`)
- [ ] Documentação atualizada se a mudança afeta arquitetura, schema ou identidade visual (ver [README.md](../README.md#documentação) para o mapa de onde cada assunto mora)
