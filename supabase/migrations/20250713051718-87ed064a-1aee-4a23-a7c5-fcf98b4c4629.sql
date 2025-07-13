-- Create tables for the 4 new premium features

-- 1. AI Programs of 14 days
CREATE TABLE public.ai_programs_14_days (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  program_type TEXT NOT NULL, -- 'motivation_reset', 'leadership_transition', 'interview_training', 'career_clarity'
  current_day INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  daily_tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
  daily_reflections JSONB NOT NULL DEFAULT '{}'::jsonb,
  intermediate_feedback TEXT,
  final_feedback TEXT,
  final_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. AI Progress Sheets
CREATE TABLE public.ai_progress_sheets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  user_question TEXT NOT NULL,
  extracted_objective TEXT NOT NULL,
  ai_analysis TEXT NOT NULL,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,
  next_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_saved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. AI Simulations
CREATE TABLE public.ai_simulations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  simulation_type TEXT NOT NULL, -- 'job_interview', 'management_promotion', 'team_conflict', 'salary_negotiation'
  conversation_log JSONB NOT NULL DEFAULT '[]'::jsonb,
  user_responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  ai_feedback TEXT,
  clarity_score INTEGER,
  empathy_score INTEGER,
  conviction_score INTEGER,
  structure_score INTEGER,
  overall_score INTEGER,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 4. User Progress Tracking
CREATE TABLE public.user_progress_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tracking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  steps_completed INTEGER NOT NULL DEFAULT 0,
  milestones_reached INTEGER NOT NULL DEFAULT 0,
  tests_retaken INTEGER NOT NULL DEFAULT 0,
  achievement_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.ai_programs_14_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_progress_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_programs_14_days
CREATE POLICY "Users can view their own AI programs" 
ON public.ai_programs_14_days 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI programs" 
ON public.ai_programs_14_days 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI programs" 
ON public.ai_programs_14_days 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI programs" 
ON public.ai_programs_14_days 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for ai_progress_sheets
CREATE POLICY "Users can view their own progress sheets" 
ON public.ai_progress_sheets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress sheets" 
ON public.ai_progress_sheets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress sheets" 
ON public.ai_progress_sheets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress sheets" 
ON public.ai_progress_sheets 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for ai_simulations
CREATE POLICY "Users can view their own AI simulations" 
ON public.ai_simulations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI simulations" 
ON public.ai_simulations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI simulations" 
ON public.ai_simulations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own AI simulations" 
ON public.ai_simulations 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for user_progress_tracking
CREATE POLICY "Users can view their own progress tracking" 
ON public.user_progress_tracking 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress tracking" 
ON public.user_progress_tracking 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress tracking" 
ON public.user_progress_tracking 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress tracking" 
ON public.user_progress_tracking 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_ai_programs_user_id ON public.ai_programs_14_days(user_id);
CREATE INDEX idx_ai_programs_active ON public.ai_programs_14_days(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_progress_sheets_user_id ON public.ai_progress_sheets(user_id);
CREATE INDEX idx_ai_simulations_user_id ON public.ai_simulations(user_id);
CREATE INDEX idx_progress_tracking_user_date ON public.user_progress_tracking(user_id, tracking_date);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_ai_programs_updated_at
BEFORE UPDATE ON public.ai_programs_14_days
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_progress_sheets_updated_at
BEFORE UPDATE ON public.ai_progress_sheets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();