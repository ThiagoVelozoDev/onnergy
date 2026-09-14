-- Empresas parceiras / clientes atendidos, exibidos como logos na Home.
-- Sem seed de linhas aqui: os logos reais devem ser enviados ao Storage
-- (bucket site-media, path sugerido site-media/partners/) e cadastrados
-- depois. Enquanto isso, a seção usa o fallback de src/data/seed.ts.

create table if not exists partner_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_partner_companies_active_sort on partner_companies (active, sort_order);

alter table partner_companies enable row level security;

create policy "partner_companies_public_read" on partner_companies for select using (active = true or public.is_staff());
create policy "partner_companies_staff_insert" on partner_companies for insert with check (public.is_staff());
create policy "partner_companies_staff_update" on partner_companies for update using (public.is_staff());
create policy "partner_companies_admin_delete" on partner_companies for delete using (public.is_admin());
