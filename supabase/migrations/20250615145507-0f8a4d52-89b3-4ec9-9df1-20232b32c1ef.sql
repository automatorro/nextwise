
-- Remove the old mockup Emotional Intelligence test
-- First, delete any test results for the old test
DELETE FROM public.test_results 
WHERE test_type_id IN (
  SELECT id FROM public.test_types 
  WHERE name = 'Inteligență Emoțională' 
  AND questions_count = 25
);

-- Delete the old test questions
DELETE FROM public.test_questions 
WHERE test_type_id IN (
  SELECT id FROM public.test_types 
  WHERE name = 'Inteligență Emoțională' 
  AND questions_count = 25
);

-- Delete the old test type
DELETE FROM public.test_types 
WHERE name = 'Inteligență Emoțională' 
AND questions_count = 25;
