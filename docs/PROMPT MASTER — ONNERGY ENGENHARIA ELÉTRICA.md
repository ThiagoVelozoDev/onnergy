# PROMPT MASTER — ONNERGY ENGENHARIA ELÉTRICA

Você é um engenheiro de software sênior especializado em:

- React
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- PostgreSQL
- UI/UX
- CRO
- SEO
- arquitetura frontend
- CMS
- segurança de aplicações web

Desenvolva um projeto profissional completo para a:

# ONNERGY ENGENHARIA ELÉTRICA

Website:

**onnergy.com.br**

A empresa atua com:

- Engenharia elétrica
- Serviços elétricos
- Projetos elétricos
- Instalações elétricas
- Manutenção
- Laudos
- SPDA
- Automação
- Cursos
- Treinamentos
- NR-10
- SEP
- Reciclagens
- Treinamentos in company

O objetivo principal do projeto é:

> **GERAR LEADS QUALIFICADOS E CONVERTÊ-LOS EM ATENDIMENTOS PELO WHATSAPP.**

Além do site público, criar um:

> **CMS ADMINISTRATIVO COMPLETO**

para que a empresa consiga gerenciar o conteúdo do site sem precisar alterar o código.

---

# 1. STACK OBRIGATÓRIA

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide React
- React Router
- @supabase/supabase-js

Backend/BaaS:

- Supabase
- PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Row Level Security
- Supabase REST API

Deploy:

- Vercel

O Supabase deve ser a camada de backend principal do projeto.

Não criar um backend Node.js separado nesta primeira versão.

A arquitetura deve, entretanto, permitir adicionar Edge Functions ou outro backend futuramente quando necessário.

---

# 2. ARQUITETURA

Criar duas experiências:

```text
SITE PÚBLICO

/
├── /servicos
├── /cursos
├── /treinamentos
├── /sobre
└── /contato


ADMIN

/admin
├── /login
├── /dashboard
├── /hero
├── /servicos
├── /cursos
├── /treinamentos
├── /empresa
├── /estatisticas
├── /leads
├── /midia
├── /menu
├── /footer
├── /seo
└── /configuracoes
```

Separar claramente:

```text
src/
├── components/
├── pages/
├── admin/
├── hooks/
├── services/
├── lib/
├── config/
├── types/
├── data/
├── assets/
└── integrations/
```

---

# 3. SUPABASE

Criar integração centralizada:

```text
src/lib/supabase.ts
```

Utilizar:

```ts
import { createClient } from "@supabase/supabase-js";
```

As credenciais devem vir das variáveis:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

NUNCA colocar:

- service_role key
- secrets
- senhas
- tokens privados

no frontend.

A chave `service_role` jamais deve ser exposta ao navegador.

---

# 4. BANCO DE DADOS

Utilizar PostgreSQL do Supabase.

Criar migrations SQL versionadas.

Não criar tabelas manualmente apenas pelo Dashboard sem gerar as migrations correspondentes.

Estruturar:

```text
supabase/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_rls.sql
│   ├── 003_seed.sql
│   └── ...
├── functions/
└── config.toml
```

---

# 5. TABELAS PRINCIPAIS

Criar as seguintes tabelas.

## site_settings

```text
id
company_name
website
description
email
phone
whatsapp
address
business_hours
logo_url
favicon_url
created_at
updated_at
```

---

## hero_content

```text
id
badge
title
description
primary_cta_text
secondary_cta_text
hero_image_url
active
created_at
updated_at
```

---

## services

```text
id
title
slug
short_description
description
icon
image_url
cta_text
sort_order
featured
active
created_at
updated_at
deleted_at
```

---

## courses

```text
id
title
slug
short_description
description
category
workload
modality
location
price
image_url
cta_text
featured
active
sort_order
created_at
updated_at
deleted_at
```

---

## trainings

```text
id
title
slug
short_description
description
target_audience
workload
modality
content
image_url
cta_text
featured
active
sort_order
created_at
updated_at
deleted_at
```

---

## statistics

```text
id
value
title
description
icon
sort_order
active
created_at
updated_at
```

---

## menu_items

```text
id
label
url
type
sort_order
active
created_at
updated_at
```

---

## footer_settings

```text
id
description
copyright
privacy_url
terms_url
updated_at
```

---

## social_links

```text
id
platform
url
icon
sort_order
active
created_at
updated_at
```

---

## seo_settings

```text
id
page
title
description
og_title
og_description
og_image_url
canonical_url
updated_at
```

---

## leads

```text
id
name
whatsapp
email
service_id
message
source
status
created_at
updated_at
```

Status:

```text
new
contacted
qualified
converted
lost
```

---

## media

```text
id
file_name
file_path
public_url
mime_type
file_size
alt_text
created_by
created_at
```

---

## profiles

Associar com `auth.users`.

```text
id
full_name
email
role
active
created_at
updated_at
```

Roles:

```text
admin
editor
```

---

## audit_logs

```text
id
user_id
action
entity
entity_id
old_data
new_data
created_at
```

---

# 6. RELACIONAMENTOS

Criar foreign keys apropriadas.

Exemplo:

```text
leads.service_id
        ↓
services.id
```

Não duplicar dados desnecessariamente.

Utilizar PostgreSQL de forma relacional.

---

# 7. RLS — ROW LEVEL SECURITY

Ativar RLS em todas as tabelas.

O RLS é obrigatório para proteger o CMS e os leads.

O Supabase integra Auth com PostgreSQL RLS para permitir autorização por linha/regra.

Criar políticas adequadas.

## Conteúdo público

Visitantes não autenticados podem somente:

```text
SELECT
```

em conteúdo publicado/ativo.

Exemplo:

```text
services.active = true
courses.active = true
trainings.active = true
```

---

# 8. ADMIN

Usuários autenticados podem acessar o painel.

Admin:

```text
SELECT
INSERT
UPDATE
DELETE
```

Editor:

```text
SELECT
INSERT
UPDATE
```

Não permitir que Editor:

- gerencie usuários
- altere permissões
- visualize configurações críticas
- exclua registros críticos
- visualize dados sensíveis além do necessário

---

# 9. LEADS — SEGURANÇA

Os leads são informações pessoais.

NÃO permitir:

```text
SELECT público
```

Visitantes podem criar lead através de fluxo controlado.

Somente usuários administrativos autorizados podem consultar leads.

Não expor:

- telefone
- e-mail
- nome

em APIs públicas.

---

# 10. SUPABASE AUTH

Utilizar Supabase Auth.

Login:

```text
/admin/login
```

Campos:

- e-mail
- senha

Utilizar:

```ts
supabase.auth.signInWithPassword()
```

Logout:

```ts
supabase.auth.signOut()
```

Monitorar sessão.

Utilizar:

```ts
supabase.auth.onAuthStateChange()
```

Criar:

```text
useAuth()
```

---

# 11. PROTEÇÃO DAS ROTAS

Criar:

```text
ProtectedRoute
```

Comportamento:

```text
/admin
   ↓
usuário autenticado?
   ↓
SIM → dashboard

NÃO
   ↓
/admin/login
```

Nunca depender somente de proteção visual.

A autorização real deverá estar no Supabase através de RLS.

---

# 12. STORAGE

Utilizar Supabase Storage para imagens.

Criar bucket:

```text
site-media
```

Organização:

```text
site-media/
├── logo/
├── hero/
├── services/
├── courses/
├── trainings/
├── gallery/
└── seo/
```

Permitir:

- upload
- preview
- substituição
- exclusão
- alteração de alt text

---

# 13. SEGURANÇA DO STORAGE

Validar:

- extensão
- MIME type
- tamanho

Permitir:

```text
image/jpeg
image/png
image/webp
image/svg+xml
```

Definir limite de tamanho.

Não permitir upload de arquivos executáveis.

Criar policies de Storage.

---

# 14. SITE PÚBLICO

Criar Home extremamente profissional.

Design:

**PRETO + BRANCO + DOURADO**

Cores:

```text
#080808
#111111
#181818
#F5F5F5
#F5B800
#FFC928
```

Visual:

- premium
- tecnológico
- engenharia
- energia
- segurança
- confiança

---

# 15. HERO

Headline:

**Soluções elétricas com segurança, qualidade e confiança.**

Descrição:

**Prestamos serviços elétricos especializados, cursos e treinamentos de alto nível para profissionais e empresas que buscam excelência e resultados.**

CTAs:

**FALAR COM ESPECIALISTA**

**CONHECER NOSSOS SERVIÇOS**

Criar formulário de lead ao lado.

---

# 16. FORMULÁRIO DE LEAD

Campos:

```text
Nome
WhatsApp
E-mail
Serviço
Mensagem
```

Serviços devem ser carregados dinamicamente do Supabase.

Não hardcodar a lista.

Ao enviar:

1. validar
2. inserir lead no Supabase
3. criar mensagem
4. abrir WhatsApp

Exemplo:

```text
Olá! Meu nome é João.

Tenho interesse em:
Serviços Elétricos

Gostaria de receber mais informações.
```

---

# 17. WHATSAPP

Criar:

```text
src/services/whatsappService.ts
```

Funções:

```ts
openWhatsApp()
generateWhatsAppMessage()
```

O número deve vir de:

```text
site_settings.whatsapp
```

Nunca hardcodar o número nos componentes.

---

# 18. SERVIÇOS

Buscar do Supabase:

```ts
supabase
  .from("services")
  .select("*")
  .eq("active", true)
  .order("sort_order");
```

Mostrar:

- título
- descrição
- imagem
- ícone
- CTA

---

# 19. CURSOS

Buscar dinamicamente do Supabase.

Mostrar:

- título
- descrição
- modalidade
- carga horária
- imagem
- CTA

---

# 20. TREINAMENTOS

Buscar dinamicamente.

Mostrar:

- treinamento
- público
- carga horária
- modalidade
- CTA

---

# 21. ESTATÍSTICAS

Buscar do banco.

Exemplo:

```text
+10
Anos de experiência

+1.000
Clientes atendidos

+2.500
Projetos e serviços

+500
Alunos formados
```

Esses números devem ser administráveis.

---

# 22. PAINEL ADMINISTRATIVO

Criar:

```text
/admin/dashboard
```

Layout:

```text
┌──────────────────────────────────────────────┐
│ ONNERGY ADMIN                  Usuário       │
├──────────────┬───────────────────────────────┤
│ Dashboard    │                               │
│ Hero         │                               │
│ Serviços     │          CONTEÚDO             │
│ Cursos       │                               │
│ Treinamentos │                               │
│ Empresa      │                               │
│ Estatísticas │                               │
│ Leads        │                               │
│ Mídia        │                               │
│ SEO          │                               │
│ Configurações│                               │
└──────────────┴───────────────────────────────┘
```

---

# 23. DASHBOARD

Mostrar:

```text
Serviços ativos
Cursos ativos
Treinamentos ativos
Leads novos
Leads este mês
```

Últimos leads:

```text
Nome
Serviço
Data
Status
```

Não inventar dados.

---

# 24. CRUD DE SERVIÇOS

Criar:

```text
/admin/servicos
```

Funcionalidades:

- listar
- pesquisar
- criar
- editar
- excluir
- ativar/desativar
- ordenar
- destacar

---

# 25. CRUD DE CURSOS

Criar:

```text
/admin/cursos
```

Funcionalidades:

- criar
- editar
- excluir
- ativar
- desativar
- destacar
- ordenar

---

# 26. CRUD DE TREINAMENTOS

Criar:

```text
/admin/treinamentos
```

Mesmo padrão.

---

# 27. EDITOR DO HERO

Criar:

```text
/admin/hero
```

Permitir editar:

- badge
- headline
- descrição
- CTAs
- imagem
- status

Mostrar preview.

---

# 28. CONFIGURAÇÕES DA EMPRESA

Criar:

```text
/admin/configuracoes
```

Permitir editar:

- nome
- WhatsApp
- telefone
- e-mail
- endereço
- horário
- redes sociais
- logo
- favicon

---

# 29. SEO

Criar:

```text
/admin/seo
```

Permitir editar:

- title
- description
- OG title
- OG description
- OG image

---

# 30. MEDIA MANAGER

Criar:

```text
/admin/midia
```

Interface visual.

Permitir:

- upload
- preview
- copiar URL
- excluir
- substituir
- editar alt text

---

# 31. LEADS

Criar:

```text
/admin/leads
```

Tabela profissional.

Filtros:

- status
- serviço
- período
- pesquisa

Status:

```text
Novo
Em contato
Qualificado
Convertido
Perdido
```

Permitir alterar status.

---

# 32. AUDITORIA

Registrar ações administrativas.

Exemplo:

```text
Usuário:
Administrador

Ação:
UPDATE

Entidade:
services

Registro:
123

Data:
29/08/2026 14:30
```

---

# 33. RESPONSIVIDADE

Tudo deve funcionar perfeitamente em:

```text
1920px
1440px
1366px
1280px
1024px
768px
430px
414px
390px
375px
360px
```

Isso vale para:

- site público
- dashboard
- tabelas
- formulários
- sidebar
- modal
- upload
- CRUD

No mobile, transformar sidebar em drawer.

---

# 34. UX MOBILE

Garantir:

- botões grandes
- campos fáceis de tocar
- tabelas adaptáveis
- menus acessíveis
- ausência de overflow
- textos legíveis

---

# 35. PERFORMANCE

Implementar:

- lazy loading
- imagens WebP quando possível
- carregamento otimizado
- cache apropriado
- consultas limitadas
- paginação no admin
- não buscar registros desnecessários

---

# 36. PAGINAÇÃO

Para leads e conteúdo administrativo:

Não carregar milhares de registros de uma vez.

Utilizar:

```text
range()
```

ou paginação equivalente.

---

# 37. HOOKS

Criar hooks específicos:

```text
useAuth()
useSiteSettings()
useHero()
useServices()
useCourses()
useTrainings()
useStatistics()
useLeads()
useMedia()
```

Evitar chamadas Supabase espalhadas pelos componentes.

---

# 38. SERVICES

Criar:

```text
src/services/
├── authService.ts
├── siteService.ts
├── heroService.ts
├── servicesService.ts
├── coursesService.ts
├── trainingsService.ts
├── statisticsService.ts
├── leadsService.ts
├── mediaService.ts
└── settingsService.ts
```

Responsabilidade dos services:

- comunicação com Supabase
- queries
- mutations
- tratamento de erros

---

# 39. TIPOS TYPESCRIPT

Não utilizar `any`.

Criar tipos:

```text
Service
Course
Training
Lead
Statistic
SiteSettings
HeroContent
Media
Profile
SeoSettings
SocialLink
MenuItem
```

Gerar tipos do banco Supabase quando possível.

---

# 40. VALIDAÇÃO

Utilizar Zod para validação dos formulários.

Validar:

- nome
- WhatsApp
- e-mail
- serviço
- campos obrigatórios
- uploads

---

# 41. FORMULÁRIO DE LEADS

Implementar:

```text
LeadForm
```

Com:

- validação
- loading
- erro
- sucesso
- reset
- integração Supabase
- WhatsApp

Mensagem de sucesso:

**Recebemos sua solicitação! Você será direcionado para o WhatsApp.**

---

# 42. CTA FLUTUANTE

Criar botão WhatsApp fixo.

Desktop:

bottom/right.

Mobile:

bottom/right.

Não cobrir elementos importantes.

---

# 43. SEO

Implementar:

- title
- meta description
- Open Graph
- favicon
- canonical
- sitemap quando aplicável
- robots.txt

Idioma:

```html
<html lang="pt-BR">
```

---

# 44. ACESSIBILIDADE

Implementar:

- labels
- aria-label
- alt
- keyboard navigation
- foco
- contraste
- semantic HTML

---

# 45. DESIGN SYSTEM

Criar componentes reutilizáveis:

```text
Button
Input
Textarea
Select
Card
Modal
Dialog
Badge
Table
Pagination
Toast
EmptyState
LoadingState
ErrorState
```

---

# 46. ADMIN — COMPONENTES

Criar:

```text
AdminLayout
AdminSidebar
AdminHeader
AdminBreadcrumb
AdminPageHeader
AdminTable
AdminForm
ConfirmDialog
ImageUploader
StatusBadge
```

---

# 47. DELETE

Preferir soft delete para:

- serviços
- cursos
- treinamentos
- mídia

Utilizar:

```text
deleted_at
```

quando aplicável.

Não apagar dados importantes imediatamente sem confirmação.

---

# 48. PREVIEW

No admin, disponibilizar:

**Visualizar no site**

quando fizer sentido.

---

# 49. PUBLICAÇÃO

Preparar estrutura para:

```text
draft
published
```

quando o conteúdo exigir workflow.

---

# 50. CONFIGURAÇÃO CENTRAL

Criar:

```text
src/config/site.ts
```

Somente para configurações técnicas.

Conteúdo comercial deve vir do Supabase.

Não duplicar conteúdo do banco dentro dessa configuração.

---

# 51. VARIÁVEIS DE AMBIENTE

Criar:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Criar:

```text
.env.example
```

Nunca commitar `.env`.

Adicionar ao `.gitignore`.

---

# 52. SUPABASE CLI

Preparar projeto para migrations.

Comandos esperados:

```bash
supabase init
supabase migration new initial_schema
supabase db push
```

Se o Supabase CLI estiver disponível no ambiente, utilizar.

---

# 53. SEED

Criar seed inicial com dados fictícios claramente identificados.

Exemplo:

```text
Serviços Elétricos
Projetos Elétricos
Manutenção
Cursos
Treinamentos
```

Não inventar dados empresariais reais.

Utilizar:

```text
[INSERIR WHATSAPP]
[INSERIR E-MAIL]
[INSERIR ENDEREÇO]
```

quando necessário.

---

# 54. SEGURANÇA

Nunca:

- expor service_role
- colocar senha no frontend
- confiar somente no frontend
- desativar RLS
- deixar tabela de leads pública
- permitir upload irrestrito

Toda operação administrativa deve ser protegida por Auth + RLS.

---

# 55. VERCEL

Preparar para deploy na Vercel.

Configurar variáveis:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

O projeto deve funcionar com:

```bash
npm run dev
npm run build
npm run preview
```

---

# 56. TESTES OBRIGATÓRIOS

Depois de implementar:

```bash
npm run build
```

Corrigir todos os erros.

Testar:

### Público

- Home
- Serviços
- Cursos
- Treinamentos
- Contato
- WhatsApp
- Formulário

### Admin

- Login
- Logout
- Dashboard
- CRUD serviços
- CRUD cursos
- CRUD treinamentos
- Hero
- Estatísticas
- Configurações
- Mídia
- Leads
- SEO

### Supabase

- Auth
- RLS
- Storage
- INSERT lead
- SELECT admin
- UPDATE admin
- DELETE/soft delete

---

# 57. TESTE CRÍTICO DO CMS

Executar obrigatoriamente:

### TESTE 1

Login no `/admin`.

### TESTE 2

Alterar o título do Hero.

### TESTE 3

Salvar.

### TESTE 4

Abrir Home.

### TESTE 5

Confirmar alteração.

### TESTE 6

Adicionar serviço.

### TESTE 7

Confirmar que aparece na Home.

### TESTE 8

Desativar serviço.

### TESTE 9

Confirmar que desaparece da Home.

### TESTE 10

Alterar WhatsApp.

### TESTE 11

Clicar no CTA.

### TESTE 12

Confirmar novo WhatsApp.

### TESTE 13

Enviar formulário.

### TESTE 14

Confirmar lead no Supabase.

### TESTE 15

Entrar no admin.

### TESTE 16

Visualizar lead.

### TESTE 17

Alterar status para "Em contato".

### TESTE 18

Trocar imagem.

### TESTE 19

Confirmar alteração no site.

---

# 58. CRITÉRIO FINAL

Não considere o projeto concluído se:

- alguma informação importante estiver hardcoded
- o admin não conseguir editar conteúdo
- o WhatsApp não for configurável
- o formulário não registrar lead
- o RLS estiver ausente
- o Storage estiver sem proteção
- o admin estiver acessível sem autenticação
- existir overflow mobile
- houver erros TypeScript
- o build falhar

---

# 59. PRINCÍPIO ARQUITETURAL

Siga esta regra:

> **O React apresenta. O Supabase persiste. O RLS protege. O Auth autentica. O Storage gerencia arquivos.**

O site público deve ser rápido e orientado a conversão.

O painel deve ser simples para uma pessoa não técnica administrar.

O banco deve ser relacional e organizado.

A arquitetura deve permitir crescimento futuro.

---

# 60. RESULTADO FINAL

Entregar:

```text
ONNERGY
│
├── Site institucional
│
├── Landing page de conversão
│
├── WhatsApp
│
├── Formulário de leads
│
├── CMS
│
├── Dashboard
│
├── Autenticação
│
├── PostgreSQL
│
├── RLS
│
├── Storage
│
├── Gerenciamento de mídia
│
├── Gerenciamento de serviços
│
├── Gerenciamento de cursos
│
├── Gerenciamento de treinamentos
│
├── Gerenciamento de leads
│
├── SEO
│
└── Configurações
```

O resultado deve parecer um **produto digital profissional de uma empresa de engenharia**, e não apenas um site institucional.

Prioridades:

**1. Conversão**

**2. Design premium**

**3. Responsividade**

**4. Segurança**

**5. CMS**

**6. Performance**

**7. Código limpo**

**8. Facilidade de manutenção**

**9. Escalabilidade**

Não apenas descreva a implementação.

**Implemente efetivamente o projeto no código existente, criando os arquivos, componentes, migrations SQL, integração Supabase e páginas necessárias.**