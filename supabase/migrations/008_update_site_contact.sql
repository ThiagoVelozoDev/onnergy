-- Atualiza e-mail e endereço reais da empresa em site_settings.
update site_settings
set
  email = 'edgard.castro@onnergy.com.br',
  address = 'Rua Ieda Coelho de Freitas, nº 5627, Bairro Igarapé, CEP 76824-232',
  updated_at = now();
