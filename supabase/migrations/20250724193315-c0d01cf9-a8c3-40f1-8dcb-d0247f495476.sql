
-- Șterg testul duplicat Big Five nefuncțional
DELETE FROM test_types WHERE id = 'd950a40e-99b1-4893-b6d9-7fca86d8ea67';

-- Șterg testul duplicat Beck Depression nefuncțional  
DELETE FROM test_types WHERE id = 'd9b2569f-9808-4e9a-bbbc-f9c021ed04b3';

-- Verific dacă există rezultate de test pentru aceste ID-uri (nu ar trebui să existe)
-- Dacă există, le voi actualiza să pointeze către testele corecte
UPDATE test_results 
SET test_type_id = 'f47ac10b-58cc-4372-a567-0e02b2c3d480' 
WHERE test_type_id = 'd950a40e-99b1-4893-b6d9-7fca86d8ea67';

UPDATE test_results 
SET test_type_id = 'c1d2e3f4-a5b6-7890-cdef-123456789abc' 
WHERE test_type_id = 'd9b2569f-9808-4e9a-bbbc-f9c021ed04b3';
