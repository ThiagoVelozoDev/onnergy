-- Habilita RLS em todas as tabelas e cria as políticas de acesso.
-- Regra geral: leitura pública apenas de conteúdo ativo; escrita restrita
-- a usuários autenticados com profiles.role IN ('admin','editor');
-- exclusão restrita a 'admin'. Leads nunca têm SELECT público.

alter table site_settings enable row level security;
alter table hero_content enable row level security;
alter table services enable row level security;
alter table courses enable row level security;
alter table trainings enable row level security;
alter table statistics enable row level security;
alter table menu_items enable row level security;
alter table footer_settings enable row level security;
alter table social_links enable row level security;
alter table seo_settings enable row level security;
alter table leads enable row level security;
alter table media enable row level security;
alter table profiles enable row level security;
alter table audit_logs enable row level security;

-- Funções auxiliares (security definer para não recursar nas policies de profiles)
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() = 'admin';
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_user_role() in ('admin', 'editor');
$$;

-- site_settings
create policy "site_settings_public_read" on site_settings for select using (true);
create policy "site_settings_staff_insert" on site_settings for insert with check (public.is_staff());
create policy "site_settings_staff_update" on site_settings for update using (public.is_staff());
create policy "site_settings_admin_delete" on site_settings for delete using (public.is_admin());

-- hero_content
create policy "hero_public_read" on hero_content for select using (active = true or public.is_staff());
create policy "hero_staff_insert" on hero_content for insert with check (public.is_staff());
create policy "hero_staff_update" on hero_content for update using (public.is_staff());
create policy "hero_admin_delete" on hero_content for delete using (public.is_admin());

-- services
create policy "services_public_read" on services for select using ((active = true and deleted_at is null) or public.is_staff());
create policy "services_staff_insert" on services for insert with check (public.is_staff());
create policy "services_staff_update" on services for update using (public.is_staff());
create policy "services_admin_delete" on services for delete using (public.is_admin());

-- courses
create policy "courses_public_read" on courses for select using ((active = true and deleted_at is null) or public.is_staff());
create policy "courses_staff_insert" on courses for insert with check (public.is_staff());
create policy "courses_staff_update" on courses for update using (public.is_staff());
create policy "courses_admin_delete" on courses for delete using (public.is_admin());

-- trainings
create policy "trainings_public_read" on trainings for select using ((active = true and deleted_at is null) or public.is_staff());
create policy "trainings_staff_insert" on trainings for insert with check (public.is_staff());
create policy "trainings_staff_update" on trainings for update using (public.is_staff());
create policy "trainings_admin_delete" on trainings for delete using (public.is_admin());

-- statistics
create policy "statistics_public_read" on statistics for select using (active = true or public.is_staff());
create policy "statistics_staff_insert" on statistics for insert with check (public.is_staff());
create policy "statistics_staff_update" on statistics for update using (public.is_staff());
create policy "statistics_admin_delete" on statistics for delete using (public.is_admin());

-- menu_items
create policy "menu_items_public_read" on menu_items for select using (active = true or public.is_staff());
create policy "menu_items_staff_insert" on menu_items for insert with check (public.is_staff());
create policy "menu_items_staff_update" on menu_items for update using (public.is_staff());
create policy "menu_items_admin_delete" on menu_items for delete using (public.is_admin());

-- footer_settings
create policy "footer_public_read" on footer_settings for select using (true);
create policy "footer_staff_insert" on footer_settings for insert with check (public.is_staff());
create policy "footer_staff_update" on footer_settings for update using (public.is_staff());
create policy "footer_admin_delete" on footer_settings for delete using (public.is_admin());

-- social_links
create policy "social_links_public_read" on social_links for select using (active = true or public.is_staff());
create policy "social_links_staff_insert" on social_links for insert with check (public.is_staff());
create policy "social_links_staff_update" on social_links for update using (public.is_staff());
create policy "social_links_admin_delete" on social_links for delete using (public.is_admin());

-- seo_settings
create policy "seo_public_read" on seo_settings for select using (true);
create policy "seo_staff_insert" on seo_settings for insert with check (public.is_staff());
create policy "seo_staff_update" on seo_settings for update using (public.is_staff());
create policy "seo_admin_delete" on seo_settings for delete using (public.is_admin());

-- leads: sem leitura pública. Inserção pública liberada (formulário do site).
create policy "leads_public_insert" on leads for insert with check (true);
create policy "leads_staff_read" on leads for select using (public.is_staff());
create policy "leads_staff_update" on leads for update using (public.is_staff());
create policy "leads_admin_delete" on leads for delete using (public.is_admin());

-- media: restrito a staff autenticado
create policy "media_staff_read" on media for select using (public.is_staff());
create policy "media_staff_insert" on media for insert with check (public.is_staff());
create policy "media_staff_update" on media for update using (public.is_staff());
create policy "media_admin_delete" on media for delete using (public.is_admin());

-- profiles: cada usuário vê/edita o próprio perfil; admin vê e gerencia todos
create policy "profiles_self_read" on profiles for select using (id = auth.uid() or public.is_admin());
create policy "profiles_self_update" on profiles for update using (id = auth.uid() or public.is_admin());
create policy "profiles_admin_insert" on profiles for insert with check (public.is_admin());
create policy "profiles_admin_delete" on profiles for delete using (public.is_admin());

-- audit_logs: leitura restrita a admin; qualquer staff pode registrar ações
create policy "audit_logs_admin_read" on audit_logs for select using (public.is_admin());
create policy "audit_logs_staff_insert" on audit_logs for insert with check (public.is_staff());
