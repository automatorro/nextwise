
-- Găsim testul Enneagram existent
-- UPDATE: Adăugăm întrebările pentru Testul Enneagram
-- Test Enneagram - 36 de întrebări pentru identificarea celor 9 tipuri de personalitate

INSERT INTO test_questions (
  test_type_id,
  question_order,
  question_text_ro,
  question_text_en,
  question_type,
  options,
  options_en,
  scoring_weights
) VALUES
-- Întrebări pentru Tipul 1 - Perfectionist
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  1,
  'Îmi petrec mult timp asigurându-mă că totul este făcut corect.',
  'I spend a lot of time making sure everything is done correctly.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 1, 2, 3, 4], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  2,
  'Mă irită când oamenii nu respectă regulile sau standardele.',
  'It irritates me when people don''t follow rules or standards.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 1, 2, 3, 4], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  3,
  'Simt că am o responsabilitate de a îmbunătăți lucrurile din jurul meu.',
  'I feel I have a responsibility to improve things around me.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 1, 2, 3, 4], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  4,
  'Criticul interior din mine este foarte activ și critic.',
  'The inner critic in me is very active and critical.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 1, 2, 3, 4], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 2 - Ajutător
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  5,
  'Îmi place să ajut oamenii și să fiu util pentru ei.',
  'I like to help people and be useful to them.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 1, 2, 3, 4], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  6,
  'Sunt foarte atent la nevoile și sentimentele altora.',
  'I am very attentive to others'' needs and feelings.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 1, 2, 3, 4], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  7,
  'Am dificultăți să spun "nu" când cineva îmi cere ajutorul.',
  'I have difficulty saying "no" when someone asks for my help.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 1, 2, 3, 4], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  8,
  'Îmi doresc să fiu apreciat și iubit de ceilalți.',
  'I want to be appreciated and loved by others.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 1, 2, 3, 4], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 3 - Realizator
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  9,
  'Sunt motivat de dorința de a reuși și de a fi admirat.',
  'I am motivated by the desire to succeed and be admired.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 1, 2, 3, 4], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  10,
  'Îmi adaptez personalitatea în funcție de situație pentru a face o impresie bună.',
  'I adapt my personality depending on the situation to make a good impression.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 1, 2, 3, 4], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  11,
  'Sunt foarte orientat spre obiective și îmi place să bifez realizările.',
  'I am very goal-oriented and like to check off achievements.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 1, 2, 3, 4], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  12,
  'Mă tem de eșec și de a fi văzut ca un neispravit.',
  'I fear failure and being seen as a failure.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 1, 2, 3, 4], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 4 - Individualist
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  13,
  'Simt că sunt diferit de alții și că nimeni nu mă înțelege cu adevărat.',
  'I feel I am different from others and that no one truly understands me.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 1, 2, 3, 4], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  14,
  'Am o relație intensă cu emoțiile mele și sunt foarte expresiv.',
  'I have an intense relationship with my emotions and am very expressive.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 1, 2, 3, 4], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  15,
  'Sunt atras de frumusețe, artă și experiențe autentice.',
  'I am drawn to beauty, art, and authentic experiences.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 1, 2, 3, 4], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  16,
  'Îmi lipsește ceva important și învidii ceea ce au alții.',
  'I feel something important is missing and envy what others have.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 1, 2, 3, 4], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 5 - Investigator
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  17,
  'Prefer să observ și să analizez decât să particip activ.',
  'I prefer to observe and analyze rather than actively participate.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 1, 2, 3, 4], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  18,
  'Am nevoie de mult timp singur pentru a mă reîncărca.',
  'I need a lot of time alone to recharge.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 1, 2, 3, 4], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  19,
  'Sunt foarte curios și îmi place să înțeleg cum funcționează lucrurile.',
  'I am very curious and like to understand how things work.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 1, 2, 3, 4], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  20,
  'Mă simt inconfortabil când sunt pus pe loc să împărtășesc emoții.',
  'I feel uncomfortable when put on the spot to share emotions.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 1, 2, 3, 4], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 6 - Loialist
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  21,
  'Îmi fac griji în legătură cu ce s-ar putea întâmpla rău.',
  'I worry about what could go wrong.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 1, 2, 3, 4], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  22,
  'Caut securitate și siguranță în relații și situații.',
  'I seek security and safety in relationships and situations.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 1, 2, 3, 4], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  23,
  'Sunt loial prietenilor și grupurilor din care fac parte.',
  'I am loyal to friends and groups I belong to.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 1, 2, 3, 4], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  24,
  'Îmi pun la îndoială propriile decizii și caut validarea altora.',
  'I doubt my own decisions and seek validation from others.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 1, 2, 3, 4], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 7 - Entuziast
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  25,
  'Îmi place să am opțiuni și să explorez posibilități noi.',
  'I like to have options and explore new possibilities.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 1, 2, 3, 4], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  26,
  'Evit să mă concentrez pe aspectele negative sau dureroase.',
  'I avoid focusing on negative or painful aspects.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 1, 2, 3, 4], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  27,
  'Sunt optimist și încerc să văd partea bună a lucrurilor.',
  'I am optimistic and try to see the good side of things.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 1, 2, 3, 4], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  28,
  'Am dificultăți să rămân concentrat pe o singură activitate pentru mult timp.',
  'I have difficulty staying focused on one activity for a long time.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 1, 2, 3, 4], "type8": [0, 0, 0, 0, 0], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 8 - Contestatar
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  29,
  'Îmi place să am controlul și să fiu responsabil.',
  'I like to be in control and be responsible.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 1, 2, 3, 4], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  30,
  'Sunt direct și nu îmi place să bat în jurul parapetului.',
  'I am direct and don''t like to beat around the bush.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 1, 2, 3, 4], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  31,
  'Mă simt confortabil să iau decizii dificile și să asum riscuri.',
  'I feel comfortable making difficult decisions and taking risks.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 1, 2, 3, 4], "type9": [0, 0, 0, 0, 0]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  32,
  'Mă irită nedreptatea și îmi place să apăr pe cei vulnerabili.',
  'Injustice irritates me and I like to defend the vulnerable.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 1, 2, 3, 4], "type9": [0, 0, 0, 0, 0]}'::jsonb
),

-- Întrebări pentru Tipul 9 - Mediator
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  33,
  'Îmi place să mențin pacea și să evit conflictele.',
  'I like to maintain peace and avoid conflicts.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 1, 2, 3, 4]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  34,
  'Am tendința să amân lucrurile importante.',
  'I tend to procrastinate on important things.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 1, 2, 3, 4]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  35,
  'Pot vedea toate părțile unei situații și sunt bun mediator.',
  'I can see all sides of a situation and am a good mediator.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 1, 2, 3, 4]}'::jsonb
),
(
  (SELECT id FROM test_types WHERE name ILIKE '%enneagram%' LIMIT 1),
  36,
  'Îmi este greu să îmi identific propriile dorințe și nevoi.',
  'I find it difficult to identify my own wants and needs.',
  'likert_scale',
  '["Deloc adevărat", "Puțin adevărat", "Moderat adevărat", "În mare parte adevărat", "Complet adevărat"]'::jsonb,
  '["Not at all true", "Slightly true", "Moderately true", "Mostly true", "Completely true"]'::jsonb,
  '{"type1": [0, 0, 0, 0, 0], "type2": [0, 0, 0, 0, 0], "type3": [0, 0, 0, 0, 0], "type4": [0, 0, 0, 0, 0], "type5": [0, 0, 0, 0, 0], "type6": [0, 0, 0, 0, 0], "type7": [0, 0, 0, 0, 0], "type8": [0, 0, 0, 0, 0], "type9": [0, 1, 2, 3, 4]}'::jsonb
);

-- Actualizăm questions_count pentru testul Enneagram
UPDATE test_types 
SET questions_count = 36 
WHERE name ILIKE '%enneagram%';
