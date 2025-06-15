
-- Create table for test questions
CREATE TABLE public.test_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  test_type_id UUID NOT NULL REFERENCES public.test_types(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_order INTEGER NOT NULL,
  options JSONB NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'likert_scale',
  scoring_weights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read questions
CREATE POLICY "Authenticated users can view test questions" ON public.test_questions
  FOR SELECT TO authenticated USING (true);

-- Insert GAD-7 test questions
INSERT INTO public.test_questions (test_type_id, question_text, question_order, options, question_type, scoring_weights) 
SELECT 
  id as test_type_id,
  question_text,
  question_order,
  options,
  'likert_scale' as question_type,
  scoring_weights
FROM public.test_types,
(VALUES 
  (1, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de sentimente de nervozitate, anxietate sau tensiune?', 
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (2, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de incapacitatea de a opri sau controla grija?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (3, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de prea multă grijă față de lucruri diferite?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (4, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de dificultatea de a te relaxa?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (5, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de faptul că ești atât de agitat(ă) încât îți este greu să stai liniștit(ă)?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (6, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de faptul că devii ușor enervat(ă) sau iritabil(ă)?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb),
  (7, 'În ultimele 2 săptămâni, cât de des ai fost deranjat(ă) de sentimentul că s-ar putea întâmpla ceva rău?',
   '["Deloc", "Câteva zile", "Mai mult de jumătate din zile", "Aproape zilnic"]'::jsonb,
   '[0, 1, 2, 3]'::jsonb)
) AS questions(question_order, question_text, options, scoring_weights)
WHERE name = 'Evaluare Anxietate GAD-7';
