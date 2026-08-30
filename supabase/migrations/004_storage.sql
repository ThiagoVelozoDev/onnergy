-- Bucket público para mídia do site (logo, hero, services, courses, trainings,
-- gallery, seo). Upload/edição/exclusão restritos a staff autenticado;
-- validação de extensão/MIME/tamanho é feita na camada de aplicação (Media
-- Manager, Fase 2) antes do upload.

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "site_media_public_read" on storage.objects
  for select using (bucket_id = 'site-media');

create policy "site_media_staff_insert" on storage.objects
  for insert with check (bucket_id = 'site-media' and public.is_staff());

create policy "site_media_staff_update" on storage.objects
  for update using (bucket_id = 'site-media' and public.is_staff());

create policy "site_media_admin_delete" on storage.objects
  for delete using (bucket_id = 'site-media' and public.is_admin());
