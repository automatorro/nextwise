
-- Add GAD-7 Anxiety test type with auto-generated UUID
INSERT INTO test_types (name, description, estimated_duration, questions_count, subscription_required, category_id)
VALUES (
  'Test GAD-7 pentru Anxietate',
  'Testul GAD-7 este un instrument standardizat pentru evaluarea anxietății generalizate. Măsoară frecvența simptomelor de anxietate în ultimele două săptămâni și oferă o evaluare clinică a nivelului de anxietate.',
  5,
  7,
  'basic',
  (SELECT id FROM test_categories WHERE name = 'Teste de Personalitate')
);

-- Store the test type ID for use in questions
DO $$
DECLARE
    gad7_test_id uuid;
BEGIN
    -- Get the ID of the test we just created
    SELECT id INTO gad7_test_id FROM test_types WHERE name = 'Test GAD-7 pentru Anxietate';
    
    -- Add GAD-7 test questions
    INSERT INTO test_questions (test_type_id, question_order, question_text, question_type, options) VALUES
    (gad7_test_id, 1, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de nervozitate, anxietate sau tensiune?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 2, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de incapacitatea de a controla sau opri îngrijorarea?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 3, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de îngrijorarea excesivă despre diferite lucruri?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 4, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de dificultatea de a te relaxa?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 5, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de agitație, astfel încât îți este greu să stai nemișcat(ă)?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 6, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de iritabilitate sau supărare ușoară?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]'),

    (gad7_test_id, 7, 'În ultimele două săptămâni, cât de des ai fost deranjat(ă) de senzația că ceva îngrozitor s-ar putea întâmpla?', 'multiple_choice', '[
      {"value": 0, "label": "Deloc"},
      {"value": 1, "label": "Câteva zile"},
      {"value": 2, "label": "Mai mult de jumătate din zile"},
      {"value": 3, "label": "Aproape în fiecare zi"}
    ]');
END $$;
