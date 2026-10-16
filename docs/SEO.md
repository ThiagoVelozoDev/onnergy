# SEO

Guia rápido de como o SEO deste site foi implementado e do que ainda falta fazer — inclusive fora do código. Para o mapa geral da documentação, ver [README.md](../README.md#documentação).

## Arquitetura implementada

- **Meta tags por página**: `seo_settings` (Supabase, RLS já configurado desde `002_rls.sql`) → fallback `seedSeoSettings` (`src/data/seed.ts`) → `src/services/seoService.ts` → `src/hooks/useSeoSettings.ts` → cada página pública chama `useSeo({ title, description, canonical, structuredData, ... })` (`src/hooks/useSeo.ts`). Mesmo padrão `withFallback` usado no resto do projeto — ver [CONTRIBUTING.md](CONTRIBUTING.md).
- **Dados estruturados (JSON-LD)**: `src/lib/structuredData.ts` gera os blocos; `useStructuredData` (dentro de `useSeo.ts`) injeta/remove `<script type="application/ld+json">` no `<head>` via `useEffect`.
  - `Electrician` (sitewide, injetado em `PublicLayout.tsx`): nome, telefone (a partir do WhatsApp real), e-mail, endereço estruturado (Porto Velho/RO/BR), área de atendimento, horário de funcionamento.
  - `BreadcrumbList`: em todas as páginas públicas exceto Home.
  - `ItemList`/`Service`: página Serviços (`/servicos`).
  - `Course` (`@graph`): página Cursos (`/cursos`).
  - **`sameAs` foi omitido de propósito** — os links de redes sociais (`social_links`/`seedSocialLinks`) ainda são todos `"#"` (não configurados). Assim que os perfis reais existirem, adicionar `sameAs: [...]` em `buildLocalBusinessJsonLd`.
- **Meta tags estáticas** (`index.html`): title/description/OG/Twitter Card/canonical fixos, vistos por crawlers e por redes sociais (WhatsApp, Facebook) antes do JS rodar — o site é uma SPA sem SSR/prerender, então as tags dinâmicas via `useSeo` só existem depois da hidratação; o `index.html` é a "primeira impressão" para quem não executa JS.
- **Analytics condicional**: `src/lib/analytics.ts` só injeta o script do GA4 se `VITE_GA_MEASUREMENT_ID` estiver definida no `.env`. `google-site-verification` no `index.html` lê `VITE_GOOGLE_SITE_VERIFICATION` via substituição nativa do Vite (`%VITE_*%` no HTML, sem plugin) — fica vazio (inofensivo) até o usuário preencher.

## Limitações conhecidas / próximos passos técnicos

- `og:image` atual (984×329, o logo) não está no formato ideal para redes sociais (1200×630) — o WhatsApp/Facebook cortam a imagem de forma estranha. Requer um novo arquivo de imagem, fora do escopo desta mudança.
- Sem `manifest.json`/`apple-touch-icon`: não há um ícone quadrado adequado no repositório hoje. Não afeta ranqueamento de busca (é relevante para "adicionar à tela inicial"), mas pode ser feito quando houver um ícone 180×180 aprovado.
- Páginas de detalhe por slug (`/servicos/:slug`, `/cursos/:slug`, etc.) não existem ainda — decisão de escopo confirmada com o cliente, fica para uma fase futura. `getServiceBySlug` já existe em `src/services/servicesService.ts` mas não é usado por nenhuma rota.
- `lastmod` do `public/sitemap.xml` é escrito à mão — atualizar manualmente ao publicar mudanças relevantes de conteúdo.
- `openingHoursSpecification`/endereço estruturado no JSON-LD são extraídos por regex de campos de texto livre (`site_settings.business_hours`/`address`, ver `src/lib/structuredData.ts`). Se o formato desses textos mudar significativamente no futuro CRUD `/admin/empresa`, revisar os parsers.
- `/admin/seo` continua `ComingSoonPage` — os dados de `seo_settings` hoje só são editáveis via SQL/Supabase Studio, não pelo painel administrativo.

## Checklist fora do código (só o dono da empresa pode fazer)

Nenhuma mudança de código garante a 1ª posição no Google — o ranqueamento local depende, na mesma proporção, dos itens abaixo:

- [ ] **Google Perfil da Empresa** ([business.google.com](https://business.google.com)): criar/reivindicar o perfil com nome, endereço e telefone **idênticos** ao site (`Rua Ieda Coelho de Freitas, nº 5627, Bairro Igarapé, CEP 76824-232, Porto Velho - RO`). Categoria principal "Engenharia elétrica" ou "Eletricista", categorias secundárias "Serviço de instalação de energia solar", "Centro de treinamento" (conforme disponibilidade no Google).
- [ ] **Avaliações de clientes** no Perfil da Empresa — peça avaliações após cada serviço concluído; é um dos fatores de maior peso em busca local.
- [ ] **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)): verificar a propriedade `onnergy.com.br` (o `google-site-verification` já está preparado no `index.html` — só falta gerar o código real e colar em `VITE_GOOGLE_SITE_VERIFICATION` no `.env` de produção) e submeter `https://onnergy.com.br/sitemap.xml`.
- [ ] **Google Analytics 4**: criar a propriedade em [analytics.google.com](https://analytics.google.com), copiar o ID `G-XXXXXXXXXX` e colar em `VITE_GA_MEASUREMENT_ID` no `.env` de produção (Vercel → Settings → Environment Variables).
- [ ] **Citações locais/diretórios**: cadastrar a empresa em diretórios de Rondônia/Porto Velho (ex. Guia Mais, listas de empresas locais, sindicatos/associações do setor elétrico) com NAP (nome/endereço/telefone) idêntico ao site.
- [ ] **Backlinks locais**: parcerias, fornecedores (EDP, Energisa, EnerMais — já citados no site) e associações de classe linkando para `onnergy.com.br` ajudam a autoridade de domínio local.
- [ ] **Conteúdo atualizado**: publicar novidades reais de projetos/cursos com alguma regularidade — sites "vivos" tendem a ranquear melhor que sites estáticos há meses.

Nenhum desses itens pode ser feito por código — todos exigem acesso às contas Google/diretórios do próprio usuário.

## Verificação manual

- Abrir cada uma das 7 rotas públicas e conferir no DevTools (`<head>`) que `<title>`, `meta[name=description]`, `meta[property^=og:]`, `link[rel=canonical]` e os `<script type="application/ld+json">` mudam corretamente por rota, sem acumular entre navegações.
- `npm run build && npm run preview` + `view-source:` para confirmar que o `index.html` estático já reflete o negócio real, sem depender do JS.
- Colar cada bloco JSON-LD no [Rich Results Test](https://search.google.com/test/rich-results) do Google (`Electrician`, `BreadcrumbList`, `ItemList`/`Service`, `Course`).
