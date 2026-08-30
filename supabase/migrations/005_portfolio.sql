-- Portfólio: categorias de atuação (Energia Solar, QGBT, Subestações, ...)
-- e itens de mídia (fotos/vídeos) exibidos publicamente por categoria.
-- Sem seed de portfolio_items aqui: mídia real deve ser enviada via
-- Storage (bucket site-media/gallery) e cadastrada pelo Media Manager
-- assim que estiver disponível. Não inventar mídia de exemplo no banco.

create table if not exists portfolio_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  icon text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references portfolio_categories (id) on delete cascade,
  title text not null,
  media_type text not null check (media_type in ('photo', 'video')),
  media_url text not null,
  thumbnail_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists idx_portfolio_categories_active_sort on portfolio_categories (active, sort_order);
create index if not exists idx_portfolio_items_category_active_sort on portfolio_items (category_id, active, sort_order) where deleted_at is null;

alter table portfolio_categories enable row level security;
alter table portfolio_items enable row level security;

create policy "portfolio_categories_public_read" on portfolio_categories for select using (active = true or public.is_staff());
create policy "portfolio_categories_staff_insert" on portfolio_categories for insert with check (public.is_staff());
create policy "portfolio_categories_staff_update" on portfolio_categories for update using (public.is_staff());
create policy "portfolio_categories_admin_delete" on portfolio_categories for delete using (public.is_admin());

create policy "portfolio_items_public_read" on portfolio_items for select using ((active = true and deleted_at is null) or public.is_staff());
create policy "portfolio_items_staff_insert" on portfolio_items for insert with check (public.is_staff());
create policy "portfolio_items_staff_update" on portfolio_items for update using (public.is_staff());
create policy "portfolio_items_admin_delete" on portfolio_items for delete using (public.is_admin());

insert into portfolio_categories (title, slug, icon, sort_order, active) values
('Energia Solar', 'energia-solar', 'sun', 1, true),
('Instalação e manutenção de QGBT', 'qgbt', 'box', 2, true),
('Construção de rede', 'construcao-de-rede', 'network', 3, true),
('Subestações', 'subestacoes', 'tower-control', 4, true),
('Automação', 'automacao', 'cog', 5, true),
('Telecomunicações', 'telecomunicacoes', 'radio', 6, true),
('Cursos', 'cursos', 'graduation-cap', 7, true),
('Treinamentos', 'treinamentos', 'presentation', 8, true)
on conflict (slug) do nothing;
