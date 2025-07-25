
-- Inserăm testul Watson-Glaser Critical Thinking Appraisal în baza de date
INSERT INTO test_types (
  id,
  name,
  description,
  questions_count,
  estimated_duration,
  subscription_required,
  category_id,
  created_at
) VALUES (
  'watson-glaser-2024-001',
  'Test Watson-Glaser Critical Thinking Appraisal',
  'Evaluează raționamentul critic și gândirea structurată prin 5 componente: inferențe, recunoașterea asumpțiilor, deducție, interpretarea și evaluarea argumentelor.',
  40,
  35,
  'professional',
  '13f9d37c-2a3b-4e55-8707-e0372b3b2581', -- categoria pentru teste cognitive
  NOW()
);
