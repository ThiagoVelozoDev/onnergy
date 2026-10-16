-- Completa o endereço real com cidade/UF por extenso (confirmado pelo cliente:
-- CEP 76824-232 é de Porto Velho - RO). Não altera nenhum outro dado.
update site_settings
set
  address = 'Rua Ieda Coelho de Freitas, nº 5627, Bairro Igarapé, CEP 76824-232, Porto Velho - RO',
  updated_at = now();
