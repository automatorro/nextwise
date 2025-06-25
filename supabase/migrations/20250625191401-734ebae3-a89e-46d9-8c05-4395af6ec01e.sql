
-- Redenumește coloana existentă question_text în question_text_ro
ALTER TABLE public.test_questions 
RENAME COLUMN question_text TO question_text_ro;

-- Adaugă o coloană nouă, de tip text, numită question_text_en
ALTER TABLE public.test_questions 
ADD COLUMN question_text_en TEXT;
