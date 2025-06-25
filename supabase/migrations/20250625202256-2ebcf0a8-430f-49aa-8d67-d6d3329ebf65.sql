
-- Add English columns for test questions and options
ALTER TABLE public.test_questions 
ADD COLUMN options_en JSONB;

-- Add comment to clarify the purpose
COMMENT ON COLUMN public.test_questions.options_en IS 'English version of question options - will fallback to options if null';
