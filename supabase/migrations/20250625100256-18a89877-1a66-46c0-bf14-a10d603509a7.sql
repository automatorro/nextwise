
-- Șterge testul Belbin existent care nu are întrebări
DELETE FROM test_results WHERE test_type_id = '7cc5a557-aff1-4539-86bf-2774c69cbfb2';
DELETE FROM test_questions WHERE test_type_id = '7cc5a557-aff1-4539-86bf-2774c69cbfb2';
DELETE FROM test_types WHERE id = '7cc5a557-aff1-4539-86bf-2774c69cbfb2';

-- Creează testul Belbin cu ID-ul nou și categoria corectă
INSERT INTO test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  'Roluri în Echipă Belbin',
  'Testul Rolurilor în Echipă Belbin identifică preferințele comportamentale ale unei persoane în contextul muncii în echipă. Dezvoltat de Dr. Meredith Belbin, acest test evaluează 9 roluri distinctive în echipă: Plant (Creativul), Resource Investigator (Investigatorul), Coordinator (Coordonatorul), Shaper (Modelatorul), Monitor Evaluator (Evaluatorul), Teamworker (Echipierul), Implementer (Implementatorul), Completer Finisher (Finalizatorul) și Specialist (Specialistul).',
  (SELECT id FROM test_categories WHERE name = 'Teste de Personalitate'),
  27,
  15,
  'professional'::subscription_type
);

-- Adaugă toate cele 27 de întrebări pentru testul Belbin
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text,
  question_type,
  options,
  scoring_weights
) VALUES
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  1,
  'Când lucrez într-o echipă, contribuția mea tinde să fie:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Vin cu idei noi și creative pentru problemele echipei"},
    {"value": 1, "label": "Caut resurse și oportunități în exterior"},
    {"value": 2, "label": "Coordonez eforturile membrilor echipei"},
    {"value": 3, "label": "Încerc să dau direcție și să motivez echipa"},
    {"value": 4, "label": "Analizez critic opțiunile și evaluez obiectiv"}
  ]'::jsonb,
  '{
    "0": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  2,
  'În ședințele de echipă, de obicei:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă asigur că toată lumea se simte confortabil să contribuie"},
    {"value": 1, "label": "Transform ideile în planuri practice și realizabile"},
    {"value": 2, "label": "Verific detaliile și mă asigur că totul este corect"},
    {"value": 3, "label": "Ofer cunoștințe specializate în domeniul meu"},
    {"value": 4, "label": "Propun soluții creative și neconvenționale"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  3,
  'Când echipa se confruntă cu o problemă dificilă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Caut informații și contacte externe care ar putea ajuta"},
    {"value": 1, "label": "Facilit discuția și ajut la găsirea unui consens"},
    {"value": 2, "label": "Pressez pentru acțiune și rezultate rapide"},
    {"value": 3, "label": "Evaluez obiectiv opțiunile și riscurile"},
    {"value": 4, "label": "Încerc să mențin armonia în echipă"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  4,
  'În implementarea unui proiect, punctul meu forte este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Să transform planurile în acțiuni concrete și sistematice"},
    {"value": 1, "label": "Să verific că totul este complet și fără erori"},
    {"value": 2, "label": "Să aduc expertiza tehnică necesară"},
    {"value": 3, "label": "Să găsesc soluții inovatoare la blocaje"},
    {"value": 4, "label": "Să explor noi posibilități și resurse"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "3": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  5,
  'Când există tensiuni în echipă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Încerc să mediez și să restabilesc colaborarea"},
    {"value": 1, "label": "Rămân concentrat pe obiective și mă îndepărtez de conflict"},
    {"value": 2, "label": "Analizez situația și propun soluții raționale"},
    {"value": 3, "label": "Confrunt direct problemele și caut rezolvări rapide"},
    {"value": 4, "label": "Facilitez dialogul între părțile implicate"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  6,
  'Stilul meu de comunicare în echipă este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Direct și orientat spre rezultate"},
    {"value": 1, "label": "Analitic și plin de întrebări"},
    {"value": 2, "label": "Suportiv și încurajator"},
    {"value": 3, "label": "Practic și orientat spre soluții"},
    {"value": 4, "label": "Atent la detalii și precis"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  7,
  'În brainstorming-uri, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Vin cu idei originale și neașteptate"},
    {"value": 1, "label": "Construiesc pe ideile altora și aduc informații noi"},
    {"value": 2, "label": "Mă asigur că toată lumea participă"},
    {"value": 3, "label": "Evaluez fezabilitatea ideilor propuse"},
    {"value": 4, "label": "Propun moduri practice de implementare"}
  ]'::jsonb,
  '{
    "0": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  8,
  'Când termenele sunt strânse, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă concentrez pe finalizarea perfectă a sarcinilor"},
    {"value": 1, "label": "Aduc cunoștințele mele specializate pentru a accelera procesul"},
    {"value": 2, "label": "Găsesc soluții creative pentru a câștiga timp"},
    {"value": 3, "label": "Mobilizez echipa și pressez pentru livrare"},
    {"value": 4, "label": "Caut resurse externe care ar putea ajuta"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "2": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  9,
  'Punctul meu forte în echipă este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Să mențin echipa unită și motivată"},
    {"value": 1, "label": "Să execut planurile eficient și sistematic"},
    {"value": 2, "label": "Să îmbunătățesc calitatea și să elimin erorile"},
    {"value": 3, "label": "Să aduc perspectiva specializată în domeniul meu"},
    {"value": 4, "label": "Să deleghez și să coordonez activitățile"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  10,
  'Când apar idei noi în echipă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Le evaluez critic și identific potențialele probleme"},
    {"value": 1, "label": "Mă gândesc cum să le implementez practic"},
    {"value": 2, "label": "Verific dacă sunt compatibile cu standardele noastre"},
    {"value": 3, "label": "Le dezvolt și le îmbogățesc cu perspective noi"},
    {"value": 4, "label": "Caut modalități de a le promova și susține"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  11,
  'În procesul de luare a deciziilor, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă asigur că toate vocile sunt auzite"},
    {"value": 1, "label": "Pressez pentru decizia rapidă și implementare"},
    {"value": 2, "label": "Aduc date și analize pentru a susține decizia"},
    {"value": 3, "label": "Propun alternative creative pe care alții nu le-au considerat"},
    {"value": 4, "label": "Caut input extern pentru a îmbogăți perspectiva"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "3": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  12,
  'Abordarea mea față de riscuri în proiecte este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Le analizez atent și ofer recomandări bazate pe evidențe"},
    {"value": 1, "label": "Mă concentrez pe minimizarea lor prin planificare detaliată"},
    {"value": 2, "label": "Verific toate detaliile pentru a evita problemele"},
    {"value": 3, "label": "Iau riscuri calculate pentru a obține rezultate mai bune"},
    {"value": 4, "label": "Explor alternative creative pentru a le evita"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  13,
  'Când echipa întâmpină obstacole, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Ofer suport emoțional și încurajez echipa"},
    {"value": 1, "label": "Găsesc soluții practice pentru a depăși problemele"},
    {"value": 2, "label": "Mă asigur că nu repetăm aceleași greșeli"},
    {"value": 3, "label": "Aduc expertiza mea pentru a rezolva problemele tehnice"},
    {"value": 4, "label": "Redefinez problema și propun abordări noi"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  14,
  'În delegarea sarcinilor, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă asigur că fiecare primește sarcini potrivite abilităților"},
    {"value": 1, "label": "Mă concentrez pe obținerea rapidă a rezultatelor"},
    {"value": 2, "label": "Verific progresul și calitatea în mod regulat"},
    {"value": 3, "label": "Preiau sarcinile care necesită expertiza mea"},
    {"value": 4, "label": "Încerc să găsesc modalități noi de organizare"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  15,
  'Motivația mea principală în echipă este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Să creez și să inovez"},
    {"value": 1, "label": "Să fac networking și să aduc oportunități noi"},
    {"value": 2, "label": "Să facilitez colaborarea și succesul echipei"},
    {"value": 3, "label": "Să realizez obiective ambițioase"},
    {"value": 4, "label": "Să mențin standarde înalte de calitate"}
  ]'::jsonb,
  '{
    "0": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  16,
  'În evaluarea performanței echipei, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă concentrez pe aspectele tehnice și specializate"},
    {"value": 1, "label": "Evaluez inovația și creativitatea soluțiilor"},
    {"value": 2, "label": "Verific dacă procesele au fost urmate corect"},
    {"value": 3, "label": "Mă uit la rezultatele finale și impactul"},
    {"value": 4, "label": "Analizez obiectiv ce a funcționat și ce nu"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "1": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  17,
  'Când echipa trebuie să învețe ceva nou, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Îi ajut să se simtă confortabili cu schimbarea"},
    {"value": 1, "label": "Organizez procesul de învățare și training"},
    {"value": 2, "label": "Mă asigur că toată lumea înțelege complet"},
    {"value": 3, "label": "Împărtășesc din cunoștințele mele specializate"},
    {"value": 4, "label": "Propun metode creative de învățare"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  18,
  'În gestionarea presiunii în echipă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Rămân calm și analizez situația obiectiv"},
    {"value": 1, "label": "Caut resurse externe pentru a ușura presiunea"},
    {"value": 2, "label": "Facilitez comunicarea și sprijin echipa"},
    {"value": 3, "label": "Mobilizez echipa să depășească provocările"},
    {"value": 4, "label": "Mă concentrez pe soluții practice și rapide"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  19,
  'Atunci când echipa celebrează succesele, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă asigur că toată lumea se simte apreciată"},
    {"value": 1, "label": "Analizez ce anume a dus la succes"},
    {"value": 2, "label": "Planific sistematic următorii pași"},
    {"value": 3, "label": "Documentez lecțiile învățate pentru viitor"},
    {"value": 4, "label": "Contribui cu perspective și idei noi pentru viitor"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  20,
  'În stabilirea priorităților pentru echipă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Îmi folosesc experiența specializată pentru a ghida alegerile"},
    {"value": 1, "label": "Propun abordări neconvenționale pentru organizare"},
    {"value": 2, "label": "Caut informații externe pentru a îmbogăți perspectiva"},
    {"value": 3, "label": "Facilitez discuțiile și ajut la găsirea consensului"},
    {"value": 4, "label": "Mă concentrez pe ceea ce va aduce rezultate rapide"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "1": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  21,
  'Când echipa întâlnește critici externe, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Evaluez obiectiv validitatea criticilor"},
    {"value": 1, "label": "Implementez sistematic îmbunătățirile necesare"},
    {"value": 2, "label": "Verific toate aspectele pentru a preveni problemele viitoare"},
    {"value": 3, "label": "Aduc expertiza mea pentru a răspunde la critici"},
    {"value": 4, "label": "Găsesc modalități creative de a transforma criticile în oportunități"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  22,
  'În construirea relațiilor în echipă, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Încerc să conectez oamenii și să facilitez colaborarea"},
    {"value": 1, "label": "Mă concentrez pe construirea respect pe baza competenței"},
    {"value": 2, "label": "Creez conexiuni prin networking și socializing"},
    {"value": 3, "label": "Construiesc încredere prin calitatea muncii mele"},
    {"value": 4, "label": "Dezvolt relații bazate pe obiective comune"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "2": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  23,
  'Când apar schimbări majore în proiect, eu:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Ajut echipa să se adapteze și să rămână unită"},
    {"value": 1, "label": "Planific sistematic tranziția către noua abordare"},
    {"value": 2, "label": "Verific că toate detaliile noului plan sunt corecte"},
    {"value": 3, "label": "Aduc perspectiva specializată asupra schimbărilor"},
    {"value": 4, "label": "Văd schimbarea ca o oportunitate pentru inovație"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  24,
  'În momentele de incertitudine, echipa se bazează pe mine pentru a:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Aduce claritate prin analiză obiectivă"},
    {"value": 1, "label": "Găsi soluții practice și immediate"},
    {"value": 2, "label": "Explora toate opțiunile și să nu ratez nimic"},
    {"value": 3, "label": "Aduce cunoștințe specializate pentru a ghida calea înainte"},
    {"value": 4, "label": "Propune direcții noi și neașteptate"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  25,
  'La finalul unui proiect de succes, contribuția mea cea mai valoroasă a fost:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Să mențin spiritul de echipă și motivația"},
    {"value": 1, "label": "Să transform ideile în rezultate concrete"},
    {"value": 2, "label": "Să mă asigur că totul a fost făcut la standardele cele mai înalte"},
    {"value": 3, "label": "Să aduc expertiza tehnică necesară pentru succes"},
    {"value": 4, "label": "Să facilitez comunicarea și să coordonez eforturile"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  26,
  'Când evaluez eficiența echipei, mă concentrez pe:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Inovația și originalitatea soluțiilor"},
    {"value": 1, "label": "Capacitatea de a găsi și utiliza resurse noi"},
    {"value": 2, "label": "Calitatea delegării și a coordonării"},
    {"value": 3, "label": "Viteza și determinarea în atingerea obiectivelor"},
    {"value": 4, "label": "Acuratețea și completitudinea analizelor"}
  ]'::jsonb,
  '{
    "0": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 3, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 3, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 3, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "4": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 3, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
),
(
  'd2e3f4a5-b6c7-8901-def2-345678901bcd',
  27,
  'Contribuția mea distinctă într-o echipă este:',
  'multiple_choice',
  '[
    {"value": 0, "label": "Să mențin echilibrul și să sprijin pe toată lumea"},
    {"value": 1, "label": "Să implement planurile cu disciplină și metodă"},
    {"value": 2, "label": "Să perfecționez și să finalizez cu atenție la detalii"},
    {"value": 3, "label": "Să aduc cunoștințe specializate și expertiză tehnică"},
    {"value": 4, "label": "Să inspir echipa și să propun viziuni creative"}
  ]'::jsonb,
  '{
    "0": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 3, "implementer": 0, "completer_finisher": 0, "specialist": 0},
    "1": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 3, "completer_finisher": 0, "specialist": 0},
    "2": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 3, "specialist": 0},
    "3": {"plant": 0, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 3},
    "4": {"plant": 3, "resource_investigator": 0, "coordinator": 0, "shaper": 0, "monitor_evaluator": 0, "teamworker": 0, "implementer": 0, "completer_finisher": 0, "specialist": 0}
  }'::jsonb
);
