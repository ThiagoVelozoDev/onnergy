# Design System

> **Atualizado em 2026-08-30.** A identidade visual mudou desde o brief original (`docs/PROMPT MASTER...md`, seção 14): a paleta deixou de ser preto + branco + **dourado** e passou a ser preto + branco + **laranja**. Este arquivo é a referência atual — em caso de conflito com o prompt master, vale este documento.

## Cores

Definidas em `tailwind.config.js`, consumidas só por token (nunca hex solto no código):

| Token Tailwind | Hex | Uso |
| --- | --- | --- |
| `ink-950` | `#080808` | fundo do Header/Footer/admin, texto principal sobre `paper` |
| `ink-900` | `#111111` | superfícies escuras secundárias |
| `ink-800` | `#181818` | superfícies escuras terciárias |
| `paper` | `#F5F5F5` | fundo do site público |
| `orange` (DEFAULT) | `#F97316` | cor de marca — CTAs primários, destaques, estado ativo |
| `orange-light` | `#FB923C` | hover de elementos `orange` |
| `orange-dark` | `#C2410C` | texto/ícone sobre fundo claro (contraste melhor que o DEFAULT) |

Sombra de destaque: `shadow-orange` → `0 0 40px -10px rgba(249, 115, 22, 0.35)`.

Regra prática: texto/ícone de destaque sobre fundo **claro** usa `text-orange-dark`; sobre fundo **escuro** (header, footer, admin) usa `text-orange`/`bg-orange`.

## Tipografia

Fonte: **Inter** (`fontFamily.sans` no Tailwind config, com fallback `ui-sans-serif`/`system-ui`). Títulos em `font-bold`/`font-extrabold`; rótulos e CTAs em `uppercase tracking-wide`/`tracking-widest`.

## Logo

`src/components/Logo.tsx` — duas variantes de arquivo (`logo-onnergy-black.png` / `logo-onnergy-white.png`), selecionadas pela prop `surface="dark" | "light"` conforme o fundo em que a logo aparece.

## Componentes de UI (`src/components/ui/`)

| Componente | Notas |
| --- | --- |
| `Button` / `ButtonLink` | variantes `primary`, `secondary`, `outline`, `outline-white`, `ghost`; tamanhos `sm`/`md`/`lg` |
| `Badge` | variantes `orange`, `neutral`, `success`, `warning`, `danger` (usada para status de lead) |
| `Card`, `Input`, `Select`, `Textarea` | primitivas de formulário/layout |
| `Toast` | `ToastProvider` global (ver `App.tsx`) |
| `LoadingState` / `ErrorState` / `EmptyState` | estados padrão para toda tela que busca dados assíncronos — usar sempre os três juntos (loading → error → empty → conteúdo) |
| `Reveal` | animação de entrada (ver abaixo) |

## Animação: `Reveal`

`src/components/ui/Reveal.tsx` anima qualquer elemento (`as` define a tag/componente, ex. `Link`) ao entrar na viewport via `IntersectionObserver` (`threshold: 0.1`). Variantes: `up` (padrão, sobe + fade), `fade`, `pop` (escala + fade). Prop `delay` (ms) cria stagger entre itens de uma grade — convenção usada no projeto: `delay={index * 80}` (ou `Math.min(index, 6) * 80` em listas longas, para não atrasar demais o final).

Efeito colateral a lembrar: como a revelação depende de scroll para dentro da viewport, capturas de tela automatizadas (Playwright etc.) tiradas logo após `page.goto()` sem aguardar a transição mostram os itens ainda com `opacity-0`. Role a seção para a viewport e aguarde a duração da transição (~500ms + maior `delay` da lista) antes de tirar o screenshot.

## Ícones (`lucide-react`)

Nunca importar `lucide-react` diretamente em código que renderiza um ícone vindo de **dado** (coluna `icon` de uma tabela/seed). Em vez disso:

- **Site público:** registrar o ícone em `src/components/icon-map.ts` (`ICONS: Record<string, LucideIcon>`) e usar `getIcon(nomeDoDado)`. Fallback: `Zap`.
- **Admin (sidebar):** registrar no `ICONS` local de `src/admin/components/AdminSidebar.tsx`. Fallback: `LayoutDashboard`.

Isso mantém o bundle e o mapeamento de ícones centralizados — ao adicionar uma categoria/serviço com um ícone novo, primeiro registrar a chave no mapa, depois referenciá-la pela string no seed/banco.
