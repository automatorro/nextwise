
-- Verificăm și ștergem testul DISC gol (fără întrebări)
-- Mai întâi verificăm care test DISC nu are întrebări
DELETE FROM test_types 
WHERE name = 'Test DISC' 
AND id NOT IN (
  SELECT DISTINCT test_type_id 
  FROM test_questions 
  WHERE test_type_id IN (
    SELECT id FROM test_types WHERE name = 'Test DISC'
  )
);

-- Verificăm că avem un singur test DISC cu întrebări
SELECT tt.id, tt.name, COUNT(tq.id) as question_count
FROM test_types tt
LEFT JOIN test_questions tq ON tt.id = tq.test_type_id
WHERE tt.name IN ('Test DISC', 'Test Belbin')
GROUP BY tt.id, tt.name
ORDER BY tt.name;
