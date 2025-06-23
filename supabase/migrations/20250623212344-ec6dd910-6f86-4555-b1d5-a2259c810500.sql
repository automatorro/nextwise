
-- Delete the duplicate GAD-7 test and its questions
DELETE FROM test_results WHERE test_type_id IN (
  SELECT id FROM test_types WHERE name = 'Test GAD-7 pentru Anxietate' AND created_at > '2023-06-23 00:00:00'
);

DELETE FROM test_questions WHERE test_type_id IN (
  SELECT id FROM test_types WHERE name = 'Test GAD-7 pentru Anxietate' AND created_at > '2023-06-23 00:00:00'
);

DELETE FROM test_types WHERE name = 'Test GAD-7 pentru Anxietate' AND created_at > '2023-06-23 00:00:00';

-- Fix the options format for the original GAD-7 test questions to ensure proper parsing
UPDATE test_questions 
SET options = '[
  {"value": 0, "label": "Deloc"},
  {"value": 1, "label": "Câteva zile"},
  {"value": 2, "label": "Mai mult de jumătate din zile"},
  {"value": 3, "label": "Aproape în fiecare zi"}
]'::jsonb
WHERE test_type_id IN (
  SELECT id FROM test_types WHERE name = 'Test GAD-7 pentru Anxietate'
);
