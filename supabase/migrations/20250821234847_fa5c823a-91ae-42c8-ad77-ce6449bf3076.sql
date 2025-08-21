-- Create user_notes table for personal workspace
CREATE TABLE public.user_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  note_type TEXT NOT NULL DEFAULT 'ai_analysis',
  test_type TEXT,
  test_result_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tags JSONB DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own notes" 
ON public.user_notes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes" 
ON public.user_notes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" 
ON public.user_notes 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" 
ON public.user_notes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_user_notes_updated_at
BEFORE UPDATE ON public.user_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add AI insights column to career_paths
ALTER TABLE public.career_paths 
ADD COLUMN ai_insights JSONB DEFAULT '[]'::jsonb;

-- Create recommendations table for AI-generated recommendations
CREATE TABLE public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  source_type TEXT NOT NULL, -- 'ai_analysis', 'test_result', 'career_plan'
  source_id UUID,
  recommendation_text TEXT NOT NULL,
  action_items JSONB DEFAULT '[]'::jsonb,
  priority INTEGER DEFAULT 3,
  is_applied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS for recommendations
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- Create policies for recommendations
CREATE POLICY "Users can view their own AI recommendations" 
ON public.ai_recommendations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI recommendations" 
ON public.ai_recommendations 
FOR UPDATE 
USING (auth.uid() = user_id);