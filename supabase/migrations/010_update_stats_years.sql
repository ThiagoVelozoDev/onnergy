-- Corrige o número de anos de experiência exibido no StatsSection (era +10, correto é +25).
update statistics
set
  value = '+25',
  updated_at = now()
where title = 'Anos de experiência';
