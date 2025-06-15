
-- Remove all mockup tests and keep only functional ones
-- First, delete test results for mockup tests
DELETE FROM public.test_results 
WHERE test_type_id IN (
  SELECT id FROM public.test_types 
  WHERE description LIKE '%mockup%' 
  OR description LIKE '%Mock%'
  OR (name = 'Test de Anxietate (GAD-7)' AND questions_count != 7)
  OR (name = 'Inteligență Emoțională' AND questions_count != 10)
  OR (name = 'Big Five Personality Test' AND questions_count != 50)
);

-- Delete test questions for mockup tests
DELETE FROM public.test_questions 
WHERE test_type_id IN (
  SELECT id FROM public.test_types 
  WHERE description LIKE '%mockup%' 
  OR description LIKE '%Mock%'
  OR (name = 'Test de Anxietate (GAD-7)' AND questions_count != 7)
  OR (name = 'Inteligența Emoțională' AND questions_count != 10)
  OR (name = 'Big Five Personality Test' AND questions_count != 50)
);

-- Delete the mockup test types
DELETE FROM public.test_types 
WHERE description LIKE '%mockup%' 
OR description LIKE '%Mock%'
OR (name = 'Test de Anxietate (GAD-7)' AND questions_count != 7)
OR (name = 'Inteligența Emoțională' AND questions_count != 10)
OR (name = 'Big Five Personality Test' AND questions_count != 50);
