
-- Eliminarea testului duplicat "Test Inteligență Emoțională EQ" (cel gol cu 25 întrebări)
-- Găsim și ștergem testul duplicat care nu are întrebări
DELETE FROM public.test_results 
WHERE test_type_id IN (
  SELECT tt.id 
  FROM public.test_types tt
  LEFT JOIN public.test_questions tq ON tt.id = tq.test_type_id
  WHERE tt.name LIKE '%Inteligență Emoțională%' 
  AND tt.questions_count = 25
  GROUP BY tt.id
  HAVING COUNT(tq.id) = 0
);

DELETE FROM public.test_questions 
WHERE test_type_id IN (
  SELECT tt.id 
  FROM public.test_types tt
  LEFT JOIN public.test_questions tq ON tt.id = tq.test_type_id
  WHERE tt.name LIKE '%Inteligență Emoțională%' 
  AND tt.questions_count = 25
  GROUP BY tt.id
  HAVING COUNT(tq.id) = 0
);

DELETE FROM public.test_types 
WHERE id IN (
  SELECT tt.id 
  FROM public.test_types tt
  LEFT JOIN public.test_questions tq ON tt.id = tq.test_type_id
  WHERE tt.name LIKE '%Inteligență Emoțională%' 
  AND tt.questions_count = 25
  GROUP BY tt.id
  HAVING COUNT(tq.id) = 0
);
