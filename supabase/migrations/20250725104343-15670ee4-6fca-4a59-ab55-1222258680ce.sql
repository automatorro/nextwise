
-- Verifică categoriile existente
SELECT id, name FROM test_categories ORDER BY name;

-- Adaugă testul Watson-Glaser Critical Thinking Appraisal
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required,
  created_at
) VALUES (
  'watson-glaser-critical-thinking-2024',
  'Watson-Glaser Critical Thinking Appraisal',
  'Testul Watson-Glaser evaluează abilitățile de gândire critică prin cinci dimensiuni: inferențe, asumpții, deducție, interpretare și evaluarea argumentelor. Este recunoscut ca standardul de aur pentru măsurarea gândirii critice în mediul profesional.',
  (SELECT id FROM test_categories WHERE name = 'Teste Cognitive' OR name ILIKE '%cognitiv%' LIMIT 1),
  40,
  35,
  'professional',
  NOW()
);

-- Verifică dacă testul a fost adăugat
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
