
-- Insert Watson-Glaser Critical Thinking Appraisal test
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'watson-glaser-critical-thinking-2024',
  'Watson-Glaser Critical Thinking Appraisal',
  'Evaluează abilitățile de gândire critică prin inferențe, recunoașterea asumpțiilor, deducție, interpretarea și evaluarea argumentelor.',
  '13f9d37c-2a3b-4e55-8707-e0372b3b2581',
  40,
  35,
  'professional'
);
