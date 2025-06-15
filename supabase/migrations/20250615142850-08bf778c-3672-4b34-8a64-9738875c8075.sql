
-- Add unique constraints to prevent duplicates
ALTER TABLE public.test_categories ADD UNIQUE (name);
ALTER TABLE public.test_types ADD UNIQUE (name);
ALTER TABLE public.test_questions ADD UNIQUE (test_type_id, question_order);

-- Add a new test category for Personal Development if it doesn't exist
INSERT INTO public.test_categories (name, description, icon) 
VALUES ('Dezvoltare Personală', 'Teste pentru dezvoltarea abilităților personale și profesionale', 'star') 
ON CONFLICT (name) DO NOTHING;

-- Add the new Emotional Intelligence test type
INSERT INTO public.test_types (name, description, category_id, questions_count, estimated_duration, subscription_required)
SELECT
  'Inteligență Emoțională', 
  'Acest test evaluează diverse aspecte ale inteligenței emoționale, inclusiv conștientizarea de sine, autoreglarea, motivația, empatia și abilitățile sociale.',
  id,
  10,
  10,
  'basic'
FROM public.test_categories
WHERE name = 'Dezvoltare Personală'
ON CONFLICT (name) DO NOTHING;

-- Insert questions for the Emotional Intelligence test
INSERT INTO public.test_questions (test_type_id, question_text, question_order, options, question_type, scoring_weights)
SELECT
  tt.id,
  q.question_text,
  q.question_order,
  '["Niciodată", "Rareori", "Uneori", "Deseori", "Întotdeauna"]'::jsonb,
  'likert_scale',
  '[1, 2, 3, 4, 5]'::jsonb
FROM 
  (SELECT id FROM public.test_types WHERE name = 'Inteligență Emoțională') AS tt,
  (VALUES
    (1, 'Sunt conștient(ă) de emoțiile mele pe măsură ce le simt.'),
    (2, 'Înțeleg cum emoțiile mele îmi afectează acțiunile și deciziile.'),
    (3, 'Pot să-mi gestionez reacțiile impulsive în situații stresante.'),
    (4, 'Rămân calm(ă) și concentrat(ă) sub presiune.'),
    (5, 'Sunt motivat(ă) să-mi ating obiectivele, chiar și atunci când întâmpin dificultăți.'),
    (6, 'Găsesc satisfacție în a duce la bun sfârșit sarcinile pe care le încep.'),
    (7, 'Pot să recunosc cu ușurință emoțiile celor din jurul meu.'),
    (8, 'Sunt sensibil(ă) la sentimentele altora și le ofer sprijin când au nevoie.'),
    (9, 'Reușesc să gestionez conflictele interpersonale în mod constructiv.'),
    (10, 'Construiesc și mențin cu ușurință relații pozitive cu ceilalți.')
  ) AS q(question_order, question_text)
ON CONFLICT (test_type_id, question_order) DO NOTHING;
