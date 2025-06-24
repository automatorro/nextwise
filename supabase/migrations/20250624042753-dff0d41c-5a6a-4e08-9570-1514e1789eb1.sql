
-- Step 1: Clean up the database - remove duplicate and broken tests
-- Delete any existing Cattell 16PF test data that might be incomplete
DELETE FROM public.test_results WHERE test_type_id IN (
  SELECT id FROM public.test_types WHERE name LIKE '%Cattell%' OR name LIKE '%16PF%'
);

DELETE FROM public.test_questions WHERE test_type_id IN (
  SELECT id FROM public.test_types WHERE name LIKE '%Cattell%' OR name LIKE '%16PF%'
);

DELETE FROM public.test_types WHERE name LIKE '%Cattell%' OR name LIKE '%16PF%';

-- Step 2: Create the Cattell 16PF test with proper structure
-- Insert the test type first
INSERT INTO public.test_types (
  id,
  name,
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d481',
  'Cattell 16PF',
  'Testul Cattell 16PF evaluează 16 factori primari de personalitate, oferind o imagine completă și detaliată a profilului tău psihologic.',
  (SELECT id FROM public.test_categories WHERE name = 'Personalitate' LIMIT 1),
  48,
  25,
  'professional'
);

-- Step 3: Insert all 48 questions (3 per factor for all 16 factors)
-- Factor A: Warmth
INSERT INTO public.test_questions (test_type_id, question_text, question_order, question_type, options, scoring_weights) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să petrec timp cu oamenii și să fiu sociabil.', 1, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"A": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer să lucrez singur decât în echipă.', 2, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"A": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă simt confortabil în grupuri mari de oameni.', 3, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"A": 1}'),

-- Factor B: Reasoning
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să rezolv probleme complexe și abstracte.', 4, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"B": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer soluții simple și practice la probleme.', 5, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"B": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să analizez situațiile din multiple perspective.', 6, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"B": 1}'),

-- Factor C: Emotional Stability
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Rămân calm în situații stresante.', 7, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"C": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă supăr ușor când lucrurile nu merg cum trebuie.', 8, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"C": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Pot controla bine emoțiile mele.', 9, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"C": 1}'),

-- Factor E: Dominance
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să fiu liderul unui grup.', 10, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"E": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer să urmez decât să conduc.', 11, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"E": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi impun punctul de vedere în discuții.', 12, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"E": 1}'),

-- Factor F: Liveliness
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană veselă și energică.', 13, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"F": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană serioasă și rezervată.', 14, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"F": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să fac glume și să râd.', 15, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"F": 1}'),

-- Factor G: Rule-Consciousness
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Respect întotdeauna regulile și legile.', 16, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"G": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Cred că regulile sunt făcute să fie încălcate.', 17, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"G": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană disciplinată și responsabilă.', 18, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"G": 1}'),

-- Factor H: Social Boldness
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă simt confortabil să vorbesc cu străinii.', 19, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"H": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Evit să atrag atenția asupra mea.', 20, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"H": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să fiu în centrul atenției.', 21, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"H": 1}'),

-- Factor I: Sensitivity
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană sensibilă și emotivă.', 22, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"I": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană practică și obiectivă.', 23, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"I": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă emoționez ușor la filme sau cărți.', 24, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"I": 1}'),

-- Factor L: Vigilance
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt precaut cu oamenii necunoscuți.', 25, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"L": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Am încredere în majoritatea oamenilor.', 26, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"L": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Verific de două ori informațiile primite.', 27, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"L": 1}'),

-- Factor M: Abstractedness
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să mă gândesc la lucruri abstracte.', 28, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"M": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă concentrez pe lucrurile practice.', 29, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"M": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi pierd adesea timpul cu vise cu ochii deschiși.', 30, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"M": 1}'),

-- Factor N: Privateness
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană deschisă și directă.', 31, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"N": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer să îmi păstrez gândurile pentru mine.', 32, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"N": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Vorbesc deschis despre problemele mele.', 33, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"N": -1}'),

-- Factor O: Apprehension
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă îngrijorez des pentru viitor.', 34, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"O": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană optimistă și încrezătoare.', 35, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"O": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă gândesc adesea la ce ar putea merge prost.', 36, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"O": 1}'),

-- Factor Q1: Openness to Change
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să experimentez lucruri noi.', 37, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q1": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer metodele tradiționale și dovedite.', 38, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q1": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt deschis la idei neconvenționale.', 39, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q1": 1}'),

-- Factor Q2: Self-Reliance
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Prefer să lucrez independent.', 40, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q2": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Îmi place să fac parte dintr-o echipă.', 41, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q2": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Iau decizii fără să mă consult cu alții.', 42, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q2": 1}'),

-- Factor Q3: Perfectionism
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt foarte organizat și metodic.', 43, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q3": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Nu mă deranjează dezordinea.', 44, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q3": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Verific totul de mai multe ori pentru a fi perfect.', 45, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q3": 1}'),

-- Factor Q4: Tension
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Mă simt adesea tensionat sau stresat.', 46, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q4": 1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Sunt o persoană relaxată și calmă.', 47, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q4": -1}'),
('f47ac10b-58cc-4372-a567-0e02b2c3d481', 'Am energie în exces și sunt foarte activ.', 48, 'likert_scale', '[{"text": "Complet dezacord", "value": 1}, {"text": "Dezacord", "value": 2}, {"text": "Neutru", "value": 3}, {"text": "De acord", "value": 4}, {"text": "Complet de acord", "value": 5}]', '{"Q4": 1}');
