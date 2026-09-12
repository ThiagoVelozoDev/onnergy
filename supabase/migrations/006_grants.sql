-- Concede os privilégios de tabela que as roles anon/authenticated do
-- Postgres precisam para que as RLS policies (002_rls.sql) cheguem a ser
-- avaliadas. RLS restringe LINHAS; sem o GRANT de tabela, o Postgres nega
-- a query inteira antes de a RLS entrar em ação ("permission denied for
-- table ..."), mesmo com uma policy de leitura pública correta.

grant usage on schema public to anon, authenticated;

grant select on all tables in schema public to anon;
grant insert on public.leads to anon;

grant select, insert, update, delete on all tables in schema public to authenticated;

-- Aplica automaticamente às tabelas criadas por migrations futuras.
alter default privileges in schema public grant select on tables to anon;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
