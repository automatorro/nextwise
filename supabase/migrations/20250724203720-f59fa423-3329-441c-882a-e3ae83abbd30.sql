
-- First, let's create the HEXACO test type
INSERT INTO test_types (name, description, category_id, questions_count, estimated_duration, subscription_required)
VALUES (
  'Test de Personalitate HEXACO',
  'Testul HEXACO evaluează 6 dimensiuni ale personalității: Onestitate-Umilință, Emotivitate, Extraversiune, Agreabilitate, Conștiinciozitate și Deschidere către Experiență.',
  (SELECT id FROM test_categories WHERE name = 'Personalitate' LIMIT 1),
  60,
  30,
  'professional'
);

-- Now let's add the HEXACO test questions
-- We'll create 10 questions for each of the 6 dimensions (60 total)
-- Questions for Honesty-Humility dimension (1-10)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 1, 'Sunt modest/modestă în privința realizărilor mele.', 'I am modest about my achievements.', 'likert_scale', 
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 2, 'Evit să profit de alții.', 'I avoid taking advantage of others.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 3, 'Sunt sincer/sincră în relațiile cu alții.', 'I am sincere in my relationships with others.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 4, 'Nu îmi place să mă laud cu realizările mele.', 'I do not like to boast about my achievements.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 5, 'Sunt echitabil/echitabilă în tratarea celorlalți.', 'I am fair in treating others.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 6, 'Nu caut să obțin privilegii speciale.', 'I do not seek special privileges.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 7, 'Îmi recunosc greșelile și limitările.', 'I acknowledge my mistakes and limitations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 8, 'Nu manipulez pe alții pentru propriul beneficiu.', 'I do not manipulate others for my own benefit.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 9, 'Sunt mulțumit/mulțumită cu ceea ce am.', 'I am satisfied with what I have.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 10, 'Tratez pe toți oamenii cu respect.', 'I treat all people with respect.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"honesty_humility": [1, 2, 3, 4, 5]}');

-- Questions for Emotionality dimension (11-20)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 11, 'Mă îngrijorez adesea pentru diverse lucruri.', 'I often worry about various things.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 12, 'Sunt sensibil/sensibilă la emoțiile altora.', 'I am sensitive to others emotions.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 13, 'Mă simt vulnerabil/vulnerabilă în situații stresante.', 'I feel vulnerable in stressful situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 14, 'Îmi pare rău pentru persoanele care suferă.', 'I feel sorry for people who are suffering.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 15, 'Mă atașez emoțional de persoanele apropiate.', 'I become emotionally attached to close people.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 16, 'Mă sperii ușor în situații neprevăzute.', 'I get scared easily in unexpected situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 17, 'Încerc să ajut persoanele în nevoie.', 'I try to help people in need.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 18, 'Mă simt anxios/anxioasă în situații noi.', 'I feel anxious in new situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 19, 'Îmi exprim deschis emoțiile.', 'I express my emotions openly.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 20, 'Sunt afectat/afectată de suferința altora.', 'I am affected by others suffering.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"emotionality": [1, 2, 3, 4, 5]}');

-- Questions for Extraversion dimension (21-30)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 21, 'Îmi place să fiu în centrul atenției.', 'I like to be the center of attention.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 22, 'Sunt energic/energică în grupuri mari.', 'I am energetic in large groups.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 23, 'Mă simt confortabil/confortabilă în situații sociale.', 'I feel comfortable in social situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 24, 'Sunt optimist/optimistă în majoritatea situațiilor.', 'I am optimistic in most situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 25, 'Îmi place să cunosc oameni noi.', 'I enjoy meeting new people.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 26, 'Vorbesc cu încredere în public.', 'I speak confidently in public.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 27, 'Mă simt plin/plină de energie în preajma altora.', 'I feel full of energy around others.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 28, 'Sunt sociabil/sociabilă în majoritatea situațiilor.', 'I am sociable in most situations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 29, 'Îmi place să particip la petreceri și evenimente.', 'I like to participate in parties and events.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 30, 'Am o atitudine pozitivă față de viață.', 'I have a positive attitude towards life.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"extraversion": [1, 2, 3, 4, 5]}');

-- Questions for Agreeableness dimension (31-40)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 31, 'Sunt tolerant/tolerantă cu greșelile altora.', 'I am tolerant of others mistakes.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 32, 'Evit conflictele când este posibil.', 'I avoid conflicts when possible.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 33, 'Sunt răbdător/răbdătoare cu ceilalți.', 'I am patient with others.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 34, 'Cooperez bine în echipă.', 'I cooperate well in teams.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 35, 'Sunt îngăduitor/îngăduitoare cu comportamentul altora.', 'I am forgiving of others behavior.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 36, 'Încerc să văd lucrurile din perspectiva altora.', 'I try to see things from others perspective.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 37, 'Sunt blând/blândă în abordarea conflictelor.', 'I am gentle in approaching conflicts.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 38, 'Prefer compromisul în loc de confruntare.', 'I prefer compromise over confrontation.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 39, 'Sunt diplomat/diplomată în conversații.', 'I am diplomatic in conversations.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 40, 'Încerc să mențin armonia în grup.', 'I try to maintain harmony in groups.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"agreeableness": [1, 2, 3, 4, 5]}');

-- Questions for Conscientiousness dimension (41-50)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 41, 'Sunt organizat/organizată în tot ceea ce fac.', 'I am organized in everything I do.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 42, 'Urmez procedurile și regulile cu atenție.', 'I follow procedures and rules carefully.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 43, 'Sunt perseverent/perseverentă în atingerea obiectivelor.', 'I am persistent in achieving goals.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 44, 'Am standarde înalte pentru munca mea.', 'I have high standards for my work.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 45, 'Planific cu atenție activitățile mele.', 'I plan my activities carefully.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 46, 'Sunt disciplinat/disciplinată în rutina zilnică.', 'I am disciplined in my daily routine.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 47, 'Îmi termin întotdeauna sarcinile la timp.', 'I always finish tasks on time.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 48, 'Sunt atent/atentă la detalii.', 'I am attentive to details.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 49, 'Mă străduiesc să fiu punctual/punctuală.', 'I strive to be punctual.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 50, 'Sunt responsabil/responsabilă în toate activitățile.', 'I am responsible in all activities.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"conscientiousness": [1, 2, 3, 4, 5]}');

-- Questions for Openness dimension (51-60)
INSERT INTO test_questions (test_type_id, question_order, question_text_ro, question_text_en, question_type, options, options_en, scoring_weights)
VALUES 
((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 51, 'Sunt curios/curioasă despre idei noi.', 'I am curious about new ideas.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 52, 'Apreciez arta și frumusețea.', 'I appreciate art and beauty.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 53, 'Îmi place să explorez concepte abstracte.', 'I like to explore abstract concepts.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 54, 'Sunt creativ/creativă în abordarea problemelor.', 'I am creative in approaching problems.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 55, 'Îmi place să încerc experiențe noi.', 'I like to try new experiences.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 56, 'Sunt deschis/deschisă la schimbări.', 'I am open to changes.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 57, 'Am o imaginație bogată.', 'I have a rich imagination.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 58, 'Îmi place să gândesc despre posibilități viitoare.', 'I like to think about future possibilities.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 59, 'Sunt interesat/interesată de cultură și literatură.', 'I am interested in culture and literature.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}'),

((SELECT id FROM test_types WHERE name = 'Test de Personalitate HEXACO'), 60, 'Prefer să încerc metode neconvenționale.', 'I prefer to try unconventional methods.', 'likert_scale',
'["Complet dezacord", "Dezacord", "Nici acord, nici dezacord", "De acord", "Complet de acord"]',
'["Strongly disagree", "Disagree", "Neither agree nor disagree", "Agree", "Strongly agree"]',
'{"openness": [1, 2, 3, 4, 5]}');
