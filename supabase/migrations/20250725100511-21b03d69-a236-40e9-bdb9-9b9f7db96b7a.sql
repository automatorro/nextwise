
-- Verifică dacă testul Watson-Glaser există în baza de date
SELECT 
  tt.id,
  tt.name,
  tt.description,
  tt.category_id,
  tt.questions_count,
  tt.estimated_duration,
  tt.subscription_required,
  tc.name as category_name
FROM test_types tt
LEFT JOIN test_categories tc ON tt.category_id = tc.id
WHERE tt.name ILIKE '%watson%' OR tt.name ILIKE '%glaser%'
ORDER BY tt.created_at DESC;
