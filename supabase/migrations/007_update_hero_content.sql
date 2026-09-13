-- Atualiza o texto do Hero para o posicionamento real da ONNERGY em
-- Telecomunicações / Automações / Serviços elétricos, substituindo o copy
-- anterior focado em energia solar.
update hero_content
set
  badge = 'TECNOLOGIA • CONECTIVIDADE • AUTOMAÇÃO • ENERGIA',
  title = 'Soluções em Telecomunicações, Automações e Serviços elétricos.',
  description = 'Projetos, instalações e manutenção para empresas, indústrias e residências, com foco em eficiência, segurança e tecnologia para um futuro mais conectado.',
  primary_cta_text = 'SOLICITAR UM PROJETO',
  secondary_cta_text = 'CONHEÇA NOSSAS SOLUÇÕES',
  updated_at = now()
where active = true;
