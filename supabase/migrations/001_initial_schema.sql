-- ONNERGY — schema inicial
-- Dados fictícios de exemplo estão em 003_seed.sql

create extension if not exists "pgcrypto";

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  company_name text not null default 'ONNERGY Engenharia Elétrica',
  website text not null default 'onnergy.com.br',
  description text,
  email text,
  phone text,
  whatsapp text,
  address text,
  business_hours text,
  logo_url text,
  favicon_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists hero_content (
  id uuid primary key default gen_random_uuid(),
  badge text,
  title text not null,
  description text,
  primary_cta_text text,
  secondary_cta_text text,
  hero_image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  icon text,
  image_url text,
  cta_text text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  category text,
  workload text,
  modality text,
  location text,
  price numeric(10, 2),
  image_url text,
  cta_text text,
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists trainings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  short_description text,
  description text,
  target_audience text,
  workload text,
  modality text,
  content text,
  image_url text,
  cta_text text,
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists statistics (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  title text not null,
  description text,
  icon text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  url text not null,
  type text not null default 'link',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists footer_settings (
  id uuid primary key default gen_random_uuid(),
  description text,
  copyright text,
  privacy_url text,
  terms_url text,
  updated_at timestamptz not null default now()
);

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  icon text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists seo_settings (
  id uuid primary key default gen_random_uuid(),
  page text not null unique,
  title text,
  description text,
  og_title text,
  og_description text,
  og_image_url text,
  canonical_url text,
  updated_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  whatsapp text not null,
  email text,
  service_id uuid references services (id) on delete set null,
  message text,
  source text default 'site',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  file_path text not null,
  public_url text not null,
  mime_type text,
  file_size integer,
  alt_text text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_services_active_sort on services (active, sort_order) where deleted_at is null;
create index if not exists idx_courses_active_sort on courses (active, sort_order) where deleted_at is null;
create index if not exists idx_trainings_active_sort on trainings (active, sort_order) where deleted_at is null;
create index if not exists idx_leads_status on leads (status);
create index if not exists idx_leads_service on leads (service_id);
create index if not exists idx_leads_created_at on leads (created_at desc);

-- Cria automaticamente um profile (role padrão: editor) para cada novo usuário
-- do Supabase Auth. A promoção para 'admin' é feita manualmente via SQL:
--   update public.profiles set role = 'admin' where email = 'voce@onnergy.com.br';
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
