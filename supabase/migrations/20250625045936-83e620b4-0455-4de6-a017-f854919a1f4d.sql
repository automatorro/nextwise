
-- Actualizează întrebarea 5 din testul de aptitudini cognitive pentru a corecta traducerile greșite
UPDATE test_questions 
SET 
  question_text = 'Completați propoziția: Dacă toți trandafirii sunt flori și unele flori sunt parfumate, atunci...',
  options = '[{"value": 0, "label": "Toți trandafirii sunt parfumați"}, {"value": 1, "label": "Unii trandafiri pot fi parfumați"}, {"value": 2, "label": "Niciun trandafir nu este parfumat"}, {"value": 3, "label": "Toate florile sunt trandafiri"}, {"value": 4, "label": "Nu se poate determina"}]'
WHERE test_type_id = '5b732740-f04b-49dd-903c-c84253ec61df' 
  AND question_order = 5;
