-- Dados fictícios de exemplo, claramente identificados como seed.
-- Substitua os placeholders [INSERIR ...] pelos dados reais da empresa
-- através do painel administrativo assim que ele estiver disponível.

insert into site_settings (company_name, website, description, email, phone, whatsapp, address, business_hours)
values (
  'ONNERGY Engenharia Elétrica',
  'onnergy.com.br',
  'Soluções elétricas inteligentes, cursos e treinamentos que conectam você ao futuro.',
  '[INSERIR E-MAIL]',
  '[INSERIR TELEFONE]',
  '5569992076644',
  '[INSERIR ENDEREÇO]',
  'Segunda a Sexta, 08h às 18h'
);

insert into hero_content (badge, title, description, primary_cta_text, secondary_cta_text, active)
values (
  'ENERGIA SOLAR • ECONOMIA • SUSTENTABILIDADE',
  'Economize até 95% na sua conta de energia com energia solar.',
  'Soluções completas em energia solar fotovoltaica para residências, comércios, indústrias e produtores rurais. Invista em economia, valorize seu imóvel e contribua com um futuro mais sustentável.',
  'QUERO ECONOMIZAR AGORA',
  'SAIBA MAIS SOBRE ENERGIA SOLAR',
  true
);

insert into services (title, slug, short_description, description, icon, cta_text, sort_order, featured, active) values
('Serviços Elétricos', 'servicos-eletricos', 'Instalações, manutenções, laudos, adequações e muito mais para sua empresa ou lar.', 'Serviço fictício de exemplo (dado de seed) — descreva aqui o escopo completo do serviço.', 'zap', 'Saiba mais', 1, true, true),
('Projetos Elétricos', 'projetos-eletricos', 'Projetos elétricos industriais, comerciais e residenciais com responsabilidade técnica.', 'Serviço fictício de exemplo (dado de seed).', 'file-text', 'Saiba mais', 2, true, true),
('Manutenção Preventiva', 'manutencao-preventiva', 'Planos de manutenção para reduzir riscos e aumentar a vida útil das instalações.', 'Serviço fictício de exemplo (dado de seed).', 'wrench', 'Saiba mais', 3, false, true),
('Laudos e SPDA', 'laudos-e-spda', 'Laudos técnicos e sistemas de proteção contra descargas atmosféricas.', 'Serviço fictício de exemplo (dado de seed).', 'shield-check', 'Saiba mais', 4, false, true);

insert into courses (title, slug, short_description, description, category, workload, modality, location, cta_text, featured, active, sort_order) values
('Formação em NR-10', 'formacao-nr-10', 'Formação completa com conteúdo atualizado e foco na prática do mercado.', 'Curso fictício de exemplo (dado de seed).', 'Segurança do Trabalho', '40h', 'Presencial', '[INSERIR ENDEREÇO]', 'Saiba mais', true, true, 1),
('SEP — Sistema Elétrico de Potência', 'sep-sistema-eletrico-de-potencia', 'Capacitação para atuação segura em sistemas elétricos de potência.', 'Curso fictício de exemplo (dado de seed).', 'Segurança do Trabalho', '40h', 'Presencial', '[INSERIR ENDEREÇO]', 'Saiba mais', false, true, 2);

insert into trainings (title, slug, short_description, description, target_audience, workload, modality, cta_text, featured, active, sort_order) values
('Treinamento In Company NR-10', 'treinamento-in-company-nr-10', 'Treinamentos in company e abertos para equipes que buscam alta performance.', 'Treinamento fictício de exemplo (dado de seed).', 'Equipes técnicas e operacionais', '40h', 'In company', 'Saiba mais', true, true, 1),
('Reciclagem NR-10', 'reciclagem-nr-10', 'Atualização periódica obrigatória para profissionais já certificados.', 'Treinamento fictício de exemplo (dado de seed).', 'Profissionais certificados', '20h', 'Presencial', 'Saiba mais', false, true, 2);

insert into statistics (value, title, description, icon, sort_order, active) values
('+10', 'Anos de experiência', null, 'award', 1, true),
('+1.000', 'Clientes atendidos', null, 'users', 2, true),
('+2.500', 'Projetos e serviços', null, 'zap', 3, true),
('+500', 'Alunos formados', null, 'graduation-cap', 4, true);

insert into footer_settings (description, copyright, privacy_url, terms_url) values
(
  'Soluções elétricas inteligentes, cursos e treinamentos que conectam você ao futuro.',
  '© 2026 ONNERGY Engenharia Elétrica. Todos os direitos reservados.',
  '/politica-de-privacidade',
  '/termos-de-uso'
);

insert into social_links (platform, url, icon, sort_order, active) values
('instagram', '#', 'instagram', 1, true),
('linkedin', '#', 'linkedin', 2, true),
('youtube', '#', 'youtube', 3, true),
('whatsapp', '#', 'whatsapp', 4, true);

insert into seo_settings (page, title, description) values
('home', 'ONNERGY Engenharia Elétrica | Serviços, Cursos e Treinamentos', 'Soluções elétricas com segurança, qualidade e confiança. Serviços elétricos, cursos e treinamentos NR-10 e SEP.');
