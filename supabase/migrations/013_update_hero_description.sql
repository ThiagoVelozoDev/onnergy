-- Insere sinal geográfico (Porto Velho/Rondônia) na descrição do Hero da Home,
-- sem alterar badge/title/CTAs já definidos em 007_update_hero_content.sql.
update hero_content
set
  description = 'Projetos, instalações e manutenção para empresas, indústrias e residências de Porto Velho e Rondônia, com foco em eficiência, segurança e tecnologia para um futuro mais conectado.',
  updated_at = now()
where active = true;
