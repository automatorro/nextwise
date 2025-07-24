
-- PASUL 1: Crearea tipului de test SJT
INSERT INTO test_types (
  id,
  name, 
  description,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'sjt-career-orientation-test-uuid',
  'Test SJT - Orientare în Carieră',
  'Testul de Judecată Situațională (SJT) evaluează preferințele tale pentru diferite stiluri de lucru prin scenarii realiste. Descoperă-ți profilul de carieră dominant: Leader, Specialist Analitic, Creativ, Suport/Servicii, Antreprenor sau Vânzări.',
  10,
  15,
  'basic'::subscription_type
);

-- PASUL 2: Inserarea întrebărilor SJT
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text,
  question_type,
  options,
  scoring_weights
) VALUES
-- Scenariul 1
(
  'sjt-career-orientation-test-uuid',
  1,
  'Ești într-o echipă care lucrează la un proiect important. Termenul-limită se apropie, iar sarcinile nu sunt clar împărțite. Ce faci?',
  'multiple_choice',
  '["Preiei inițiativa, împarți sarcinile și motivezi echipa să finalizeze", "Îți alegi partea ta, o rezolvi bine și la timp, fără să te implici în coordonare", "Propui o soluție creativă de organizare care să facă munca mai ușoară", "Îi ajuți pe ceilalți să-și facă treaba, dar nu iei decizii"]'::jsonb,
  '{
    "Leader": [2, 0, 0, 0],
    "Specialist_Analitic": [0, 1, 0, 0],
    "Creativ": [0, 0, 1, 0],
    "Suport_Servicii": [0, 0, 0, 1],
    "Antreprenor": [0, 0, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 2
(
  'sjt-career-orientation-test-uuid',
  2,
  'Primești o idee nouă de produs/serviciu de la cineva din echipă. Cum reacționezi?',
  'multiple_choice',
  '["O analizezi pe cifre: costuri, cerere, profitabilitate", "Găsești un mod creativ de a o transforma într-un produs atractiv", "Cauți rapid clienți interesați să o testeze", "Convingi echipa să o implementeze și o lansezi"]'::jsonb,
  '{
    "Leader": [0, 0, 0, 0],
    "Specialist_Analitic": [2, 0, 0, 0],
    "Creativ": [0, 2, 0, 0],
    "Suport_Servicii": [0, 0, 0, 0],
    "Antreprenor": [0, 0, 0, 2],
    "Vanzari": [0, 0, 2, 0]
  }'::jsonb
),
-- Scenariul 3
(
  'sjt-career-orientation-test-uuid',
  3,
  'Un coleg îți cere ajutorul într-o problemă de lucru, dar ai și tu multe sarcini. Cum procedezi?',
  'multiple_choice',
  '["Îl asculți și îl ajuți să găsească singur soluția", "Îi explici logic ce ar trebui să facă și revii la treaba ta", "Îi propui o metodă creativă de rezolvare", "Îi pasezi sarcina altcuiva, ca să nu întârzie"]'::jsonb,
  '{
    "Leader": [0, 0, 0, 1],
    "Specialist_Analitic": [0, 1, 0, 0],
    "Creativ": [0, 0, 1, 0],
    "Suport_Servicii": [2, 0, 0, 0],
    "Antreprenor": [0, 0, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 4
(
  'sjt-career-orientation-test-uuid',
  4,
  'Ai de luat o decizie importantă într-un timp foarte scurt, cu informații incomplete. Ce faci?',
  'multiple_choice',
  '["Îți asumi decizia rapid și îți asumi riscul", "Îți bazezi decizia pe experiența ta și pe instinct", "Cauți datele esențiale și iei o decizie calculată", "Cauți sprijin la cineva cu mai multă experiență"]'::jsonb,
  '{
    "Leader": [0, 1, 0, 0],
    "Specialist_Analitic": [0, 0, 1, 0],
    "Creativ": [0, 0, 0, 0],
    "Suport_Servicii": [0, 0, 0, 1],
    "Antreprenor": [2, 0, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 5
(
  'sjt-career-orientation-test-uuid',
  5,
  'Lucrezi într-o companie unde lucrurile se fac „ca pe vremuri", fără inovație. Cum reacționezi?',
  'multiple_choice',
  '["Propui metode noi, chiar dacă trebuie să lupți pentru ele", "Cauți o funcție de coordonare ca să schimbi lucrurile din interior", "Începi propria afacere unde poți implementa ideile", "Te adaptezi și îți vezi de treabă, fără conflicte"]'::jsonb,
  '{
    "Leader": [0, 1, 0, 0],
    "Specialist_Analitic": [0, 0, 0, 0],
    "Creativ": [2, 0, 0, 0],
    "Suport_Servicii": [0, 0, 0, 0],
    "Antreprenor": [0, 0, 2, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 6
(
  'sjt-career-orientation-test-uuid',
  6,
  'Trebuie să vinzi un produs nou unui client dificil. Cum abordezi situația?',
  'multiple_choice',
  '["Te concentrezi pe a înțelege nevoile clientului și construiești o relație", "Îți folosești abilitățile de negociere și persuasiune", "Cauți să arăți cum produsul rezolvă o problemă concretă", "Creezi o prezentare unică, inovatoare, ca să-i captezi atenția"]'::jsonb,
  '{
    "Leader": [0, 0, 0, 0],
    "Specialist_Analitic": [0, 0, 1, 0],
    "Creativ": [0, 0, 0, 1],
    "Suport_Servicii": [0, 0, 0, 0],
    "Antreprenor": [0, 0, 0, 0],
    "Vanzari": [2, 1, 0, 0]
  }'::jsonb
),
-- Scenariul 7
(
  'sjt-career-orientation-test-uuid',
  7,
  'Ești repartizat într-o echipă nouă unde nimeni nu se cunoaște. Cum te integrezi?',
  'multiple_choice',
  '["Începi să îi aduni pe toți și să creezi coeziune", "Îți vezi de treabă și aștepți să te cunoască prin rezultate", "Găsești metode de a sparge gheața într-un mod creativ", "Ajuți pe oricine are nevoie, ca să câștigi încrederea lor"]'::jsonb,
  '{
    "Leader": [2, 0, 0, 0],
    "Specialist_Analitic": [0, 1, 0, 0],
    "Creativ": [0, 0, 1, 0],
    "Suport_Servicii": [0, 0, 0, 2],
    "Antreprenor": [0, 0, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 8
(
  'sjt-career-orientation-test-uuid',
  8,
  'Ai un buget limitat pentru un proiect, dar obiective mari. Cum procedezi?',
  'multiple_choice',
  '["Negociezi mai multe resurse cu managerii", "Cauți soluții creative, cu costuri mici", "Căutați sponsori/parteneri și împărțiți profitul", "Simplifici proiectul pentru a se încadra în buget"]'::jsonb,
  '{
    "Leader": [1, 0, 0, 0],
    "Specialist_Analitic": [0, 0, 0, 1],
    "Creativ": [0, 2, 0, 0],
    "Suport_Servicii": [0, 0, 0, 0],
    "Antreprenor": [0, 0, 2, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 9
(
  'sjt-career-orientation-test-uuid',
  9,
  'Un coleg din echipa ta are performanțe slabe și afectează rezultatele. Cum reacționezi?',
  'multiple_choice',
  '["Îi oferi feedback și plan de dezvoltare", "Îl ajuți direct, preluând parte din sarcinile lui", "Cauți o soluție creativă de a-l implica mai mult", "Discuți cu superiorii pentru a-l muta sau înlocui"]'::jsonb,
  '{
    "Leader": [2, 0, 0, 0],
    "Specialist_Analitic": [0, 0, 0, 1],
    "Creativ": [0, 0, 1, 0],
    "Suport_Servicii": [0, 1, 0, 0],
    "Antreprenor": [0, 0, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
),
-- Scenariul 10
(
  'sjt-career-orientation-test-uuid',
  10,
  'Ai de ales între două joburi: unul sigur, bine plătit, dar monoton, și altul riscant, dar cu potențial mare de câștig. Ce alegi?',
  'multiple_choice',
  '["Jobul sigur, stabil", "Jobul riscant, dar cu șanse mari de câștig", "Alegi cel riscant, dar construiești un plan de rezervă", "Alegi jobul sigur, dar cauți să aduci elemente noi și provocări"]'::jsonb,
  '{
    "Leader": [0, 0, 0, 0],
    "Specialist_Analitic": [0, 0, 1, 0],
    "Creativ": [0, 0, 0, 1],
    "Suport_Servicii": [2, 0, 0, 0],
    "Antreprenor": [0, 2, 0, 0],
    "Vanzari": [0, 0, 0, 0]
  }'::jsonb
);
