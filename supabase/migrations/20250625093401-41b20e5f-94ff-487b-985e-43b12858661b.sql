
-- First, let's see what categories exist
SELECT id, name FROM test_categories ORDER BY name;

-- Create the "Sănătate Mentală" category if it doesn't exist
INSERT INTO test_categories (
  id,
  name,
  description,
  icon
) VALUES (
  'b1b2c3d4-e5f6-7890-abcd-ef1234567891',
  'Sănătate Mentală',
  'Teste care evaluează aspecte ale sănătății mentale și stării psihologice',
  'heart'
) ON CONFLICT (name) DO NOTHING;

-- Now create the Beck Depression Inventory test
INSERT INTO test_types (
  id,
  name, 
  description,
  category_id,
  questions_count,
  estimated_duration,
  subscription_required
) VALUES (
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  'Beck Depression Inventory (BDI-II)',
  'Instrumentul Beck Depression Inventory este un chestionar de auto-evaluare care măsoară severitatea simptomelor depresive. Conține 21 de întrebări care evaluează diferite aspecte ale depresiei, inclusiv dispoziția, pesimismul, sentimentele de eșec, satisfacția, vinovăția, și alte simptome fizice și cognitive ale depresiei.',
  'b1b2c3d4-e5f6-7890-abcd-ef1234567891',
  21,
  10,
  'basic'::subscription_type
);

-- Insert all 21 Beck Depression Inventory questions
INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text,
  question_type,
  options,
  scoring_weights
) VALUES
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  1,
  'Tristețe',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu mă simt trist(ă)"},
    {"value": 1, "label": "Mă simt trist(ă) mare parte din timp"},
    {"value": 2, "label": "Sunt trist(ă) tot timpul"},
    {"value": 3, "label": "Sunt atât de trist(ă) sau nefericit(ă) încât nu pot suporta"}
  ]'::jsonb,
  '{
    "0": {"sadness": 0},
    "1": {"sadness": 1},
    "2": {"sadness": 2},
    "3": {"sadness": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  2,
  'Pesimism',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu sunt descurajat(ă) în privința viitorului meu"},
    {"value": 1, "label": "Mă simt mai descurajat(ă) în privința viitorului decât obișnuiam"},
    {"value": 2, "label": "Nu mă aștept ca lucrurile să meargă bine pentru mine"},
    {"value": 3, "label": "Simt că viitorul este fără speranță și că lucrurile nu se pot îmbunătăți"}
  ]'::jsonb,
  '{
    "0": {"pessimism": 0},
    "1": {"pessimism": 1},
    "2": {"pessimism": 2},
    "3": {"pessimism": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  3,
  'Eșecuri din trecut',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu mă simt ca un eșec"},
    {"value": 1, "label": "Am eșuat mai mult decât ar trebui"},
    {"value": 2, "label": "Când mă uit în urmă văd multe eșecuri"},
    {"value": 3, "label": "Simt că sunt un eșec complet ca persoană"}
  ]'::jsonb,
  '{
    "0": {"self_worth": 0},
    "1": {"self_worth": 1},
    "2": {"self_worth": 2},
    "3": {"self_worth": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  4,
  'Pierderea plăcerii',
  'multiple_choice',
  '[
    {"value": 0, "label": "Obțin la fel de multă plăcere din lucrurile de care mă bucuram"},
    {"value": 1, "label": "Nu mă bucur de lucruri la fel de mult ca înainte"},
    {"value": 2, "label": "Obțin foarte puțină plăcere din lucrurile de care mă bucuram înainte"},
    {"value": 3, "label": "Nu pot obține nicio plăcere din lucrurile de care mă bucuram înainte"}
  ]'::jsonb,
  '{
    "0": {"anhedonia": 0},
    "1": {"anhedonia": 1},
    "2": {"anhedonia": 2},
    "3": {"anhedonia": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  5,
  'Sentimente de vinovăție',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu mă simt în mod deosebit vinovat(ă)"},
    {"value": 1, "label": "Mă simt vinovat(ă) pentru multe lucruri pe care le-am făcut sau ar fi trebuit să le fac"},
    {"value": 2, "label": "Mă simt destul de vinovat(ă) mare parte din timp"},
    {"value": 3, "label": "Mă simt vinovat(ă) tot timpul"}
  ]'::jsonb,
  '{
    "0": {"guilt": 0},
    "1": {"guilt": 1},
    "2": {"guilt": 2},
    "3": {"guilt": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  6,
  'Sentimente de pedeapsă',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu simt că sunt pedepsit(ă)"},
    {"value": 1, "label": "Simt că s-ar putea să fiu pedepsit(ă)"},
    {"value": 2, "label": "Mă aștept să fiu pedepsit(ă)"},
    {"value": 3, "label": "Simt că sunt pedepsit(ă)"}
  ]'::jsonb,
  '{
    "0": {"punishment": 0},
    "1": {"punishment": 1},
    "2": {"punishment": 2},
    "3": {"punishment": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  7,
  'Nemulțumirea de sine',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă simt la fel cu mine însumi ca înainte"},
    {"value": 1, "label": "Am pierdut încrederea în mine"},
    {"value": 2, "label": "Sunt dezamăgit(ă) de mine"},
    {"value": 3, "label": "Nu îmi place de mine"}
  ]'::jsonb,
  '{
    "0": {"self_dislike": 0},
    "1": {"self_dislike": 1},
    "2": {"self_dislike": 2},
    "3": {"self_dislike": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  8,
  'Autocritică',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu mă critic sau învinovățesc mai mult decât obișnuiam"},
    {"value": 1, "label": "Sunt mai critic(ă) cu mine decât obișnuiam să fiu"},
    {"value": 2, "label": "Mă critic pentru toate greșelile mele"},
    {"value": 3, "label": "Mă învinovățesc pentru tot ce rău se întâmplă"}
  ]'::jsonb,
  '{
    "0": {"self_criticism": 0},
    "1": {"self_criticism": 1},
    "2": {"self_criticism": 2},
    "3": {"self_criticism": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  9,
  'Gânduri suicidale',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu am niciun gând să mă rănesc"},
    {"value": 1, "label": "Am gânduri să mă rănesc, dar nu le-aș pune în practică"},
    {"value": 2, "label": "Aș vrea să mor"},
    {"value": 3, "label": "M-aș ucide dacă aș avea ocazia"}
  ]'::jsonb,
  '{
    "0": {"suicidal_ideation": 0},
    "1": {"suicidal_ideation": 1},
    "2": {"suicidal_ideation": 2},
    "3": {"suicidal_ideation": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  10,
  'Plâns',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu plâng mai mult decât obișnuiam"},
    {"value": 1, "label": "Plâng mai mult decât obișnuiam"},
    {"value": 2, "label": "Plâng pentru orice lucru mic"},
    {"value": 3, "label": "Simt că vreau să plâng, dar nu pot"}
  ]'::jsonb,
  '{
    "0": {"emotional_expression": 0},
    "1": {"emotional_expression": 1},
    "2": {"emotional_expression": 2},
    "3": {"emotional_expression": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  11,
  'Agitație',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu sunt mai agitat(ă) sau tensionat(ă) decât obișnuiam"},
    {"value": 1, "label": "Mă simt mai agitat(ă) sau tensionat(ă) decât obișnuiam"},
    {"value": 2, "label": "Sunt atât de agitat(ă) sau tensionat(ă) încât îmi este greu să stau locului"},
    {"value": 3, "label": "Sunt atât de agitat(ă) încât trebuie să mă tot mișc sau să fac ceva"}
  ]'::jsonb,
  '{
    "0": {"agitation": 0},
    "1": {"agitation": 1},
    "2": {"agitation": 2},
    "3": {"agitation": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  12,
  'Pierderea interesului',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu am pierdut interesul pentru alte persoane sau activități"},
    {"value": 1, "label": "Sunt mai puțin interesat(ă) de alte persoane sau activități decât obișnuiam"},
    {"value": 2, "label": "Am pierdut marea parte din interesul pentru alte persoane sau activități"},
    {"value": 3, "label": "Îmi este greu să mă interesez de orice"}
  ]'::jsonb,
  '{
    "0": {"interest_loss": 0},
    "1": {"interest_loss": 1},
    "2": {"interest_loss": 2},
    "3": {"interest_loss": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  13,
  'Indeciziv',
  'multiple_choice',
  '[
    {"value": 0, "label": "Iau decizii la fel de bine ca înainte"},
    {"value": 1, "label": "Îmi este mai greu să iau decizii decât obișnuiam"},
    {"value": 2, "label": "Am mult mai multă dificultate în a lua decizii decât obișnuiam"},
    {"value": 3, "label": "Am probleme să iau orice decizie"}
  ]'::jsonb,
  '{
    "0": {"decision_making": 0},
    "1": {"decision_making": 1},
    "2": {"decision_making": 2},
    "3": {"decision_making": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  14,
  'Lipsa de valoare',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu simt că sunt lipsit(ă) de valoare"},
    {"value": 1, "label": "Nu mă consider la fel de valoros(oasă) și de util(ă) ca înainte"},
    {"value": 2, "label": "Mă simt mai puțin valoros(oasă) comparativ cu alte persoane"},
    {"value": 3, "label": "Mă simt complet lipsit(ă) de valoare"}
  ]'::jsonb,
  '{
    "0": {"worthlessness": 0},
    "1": {"worthlessness": 1},
    "2": {"worthlessness": 2},
    "3": {"worthlessness": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  15,
  'Pierderea energiei',
  'multiple_choice',
  '[
    {"value": 0, "label": "Am la fel de multă energie ca înainte"},
    {"value": 1, "label": "Am mai puțină energie decât obișnuiam să am"},
    {"value": 2, "label": "Nu am destulă energie să fac prea multe"},
    {"value": 3, "label": "Nu am destulă energie să fac nimic"}
  ]'::jsonb,
  '{
    "0": {"energy_loss": 0},
    "1": {"energy_loss": 1},
    "2": {"energy_loss": 2},
    "3": {"energy_loss": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  16,
  'Schimbări în tiparul de somn',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu am experimentat nicio schimbare în tiparul meu de somn"},
    {"value": 1, "label": "Dorm ceva mai mult/mai puțin decât obișnuiam"},
    {"value": 2, "label": "Dorm cu mult mai mult/mai puțin decât obișnuiam"},
    {"value": 3, "label": "Dorm marea parte din zi sau mă trezesc cu 1-2 ore mai devreme și nu pot adormi la loc"}
  ]'::jsonb,
  '{
    "0": {"sleep_disturbance": 0},
    "1": {"sleep_disturbance": 1},
    "2": {"sleep_disturbance": 2},
    "3": {"sleep_disturbance": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  17,
  'Iritabilitate',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu sunt mai iritabil(ă) decât obișnuiam"},
    {"value": 1, "label": "Sunt mai iritabil(ă) decât obișnuiam"},
    {"value": 2, "label": "Sunt mult mai iritabil(ă) decât obișnuiam"},
    {"value": 3, "label": "Sunt iritabil(ă) tot timpul"}
  ]'::jsonb,
  '{
    "0": {"irritability": 0},
    "1": {"irritability": 1},
    "2": {"irritability": 2},
    "3": {"irritability": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  18,
  'Schimbări în apetit',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu am experimentat nicio schimbare în apetitul meu"},
    {"value": 1, "label": "Apetitul meu este ceva mai mic/mai mare decât obișnuiam"},
    {"value": 2, "label": "Apetitul meu este cu mult mai mic/mai mare decât obișnuiam"},
    {"value": 3, "label": "Nu am deloc apetit sau vreau să mănânc tot timpul"}
  ]'::jsonb,
  '{
    "0": {"appetite_change": 0},
    "1": {"appetite_change": 1},
    "2": {"appetite_change": 2},
    "3": {"appetite_change": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  19,
  'Dificultate de concentrare',
  'multiple_choice',
  '[
    {"value": 0, "label": "Mă pot concentra la fel de bine ca înainte"},
    {"value": 1, "label": "Nu mă pot concentra la fel de bine ca obișnuiam"},
    {"value": 2, "label": "Îmi este greu să mă concentrez pentru mult timp la orice"},
    {"value": 3, "label": "Găsesc că nu mă pot concentra deloc"}
  ]'::jsonb,
  '{
    "0": {"concentration": 0},
    "1": {"concentration": 1},
    "2": {"concentration": 2},
    "3": {"concentration": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  20,
  'Oboseală sau epuizare',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu sunt mai obosit(ă) sau epuizat(ă) decât obișnuiam"},
    {"value": 1, "label": "Mă obosesc sau epuizez mai ușor decât obișnuiam"},
    {"value": 2, "label": "Sunt prea obosit(ă) sau epuizat(ă) să fac multe din lucrurile pe care le făceam înainte"},
    {"value": 3, "label": "Sunt prea obosit(ă) sau epuizat(ă) să fac majoritatea lucrurilor pe care le făceam înainte"}
  ]'::jsonb,
  '{
    "0": {"fatigue": 0},
    "1": {"fatigue": 1},
    "2": {"fatigue": 2},
    "3": {"fatigue": 3}
  }'::jsonb
),
(
  'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  21,
  'Pierderea interesului pentru sex',
  'multiple_choice',
  '[
    {"value": 0, "label": "Nu am observat nicio schimbare recentă în interesul meu pentru sex"},
    {"value": 1, "label": "Sunt mai puțin interesat(ă) de sex decât obișnuiam"},
    {"value": 2, "label": "Sunt mult mai puțin interesat(ă) de sex acum"},
    {"value": 3, "label": "Am pierdut complet interesul pentru sex"}
  ]'::jsonb,
  '{
    "0": {"sexual_interest": 0},
    "1": {"sexual_interest": 1},
    "2": {"sexual_interest": 2},
    "3": {"sexual_interest": 3}
  }'::jsonb
);
