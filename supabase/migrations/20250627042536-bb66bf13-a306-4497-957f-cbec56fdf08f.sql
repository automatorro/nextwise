
-- Create career_milestones table to replace JSON storage
CREATE TABLE public.career_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  career_path_id UUID REFERENCES public.career_paths(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  milestone_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create career_plan_templates table for predefined templates
CREATE TABLE public.career_plan_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  estimated_duration_months INTEGER NOT NULL DEFAULT 6,
  difficulty_level TEXT NOT NULL DEFAULT 'intermediate',
  required_skills JSONB,
  target_roles JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create template milestones table
CREATE TABLE public.career_template_milestones (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID REFERENCES public.career_plan_templates(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  milestone_order INTEGER NOT NULL DEFAULT 0,
  estimated_duration_weeks INTEGER NOT NULL DEFAULT 2,
  required_skills JSONB,
  resources JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add columns to career_recommendations for better action handling
ALTER TABLE public.career_recommendations 
ADD COLUMN IF NOT EXISTS action_type TEXT DEFAULT 'external_link',
ADD COLUMN IF NOT EXISTS action_data JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general',
ADD COLUMN IF NOT EXISTS estimated_time_minutes INTEGER DEFAULT 30;

-- Enable RLS on new tables
ALTER TABLE public.career_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_plan_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_template_milestones ENABLE ROW LEVEL SECURITY;

-- RLS policies for career_milestones
CREATE POLICY "Users can view milestones of their own career paths" 
  ON public.career_milestones 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.career_paths 
      WHERE id = career_milestones.career_path_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert milestones for their own career paths" 
  ON public.career_milestones 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.career_paths 
      WHERE id = career_milestones.career_path_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update milestones of their own career paths" 
  ON public.career_milestones 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.career_paths 
      WHERE id = career_milestones.career_path_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete milestones of their own career paths" 
  ON public.career_milestones 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.career_paths 
      WHERE id = career_milestones.career_path_id 
      AND user_id = auth.uid()
    )
  );

-- RLS policies for templates (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view active templates" 
  ON public.career_plan_templates 
  FOR SELECT 
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can view template milestones" 
  ON public.career_template_milestones 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.career_plan_templates 
      WHERE id = career_template_milestones.template_id 
      AND is_active = true
    )
  );

-- Insert sample templates
INSERT INTO public.career_plan_templates (title, description, category, estimated_duration_months, difficulty_level, required_skills, target_roles) VALUES
('Full Stack Developer', 'Comprehensive path to become a full-stack web developer with modern technologies', 'technology', 8, 'intermediate', 
 '["JavaScript", "React", "Node.js", "Database Design", "API Development"]'::jsonb,
 '["Junior Full Stack Developer", "Frontend Developer", "Backend Developer"]'::jsonb),
('Product Manager', 'Strategic leadership path for digital product development and management', 'management', 6, 'advanced',
 '["Product Strategy", "User Research", "Analytics", "Agile Methodology", "Stakeholder Management"]'::jsonb,
 '["Product Manager", "Senior Product Manager", "Product Owner"]'::jsonb),
('Data Scientist', 'Advanced analytics and machine learning career path', 'analytics', 12, 'advanced',
 '["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL"]'::jsonb,
 '["Data Scientist", "ML Engineer", "Data Analyst"]'::jsonb),
('UX/UI Designer', 'User experience and interface design specialization', 'design', 6, 'intermediate',
 '["User Research", "Prototyping", "Design Tools", "Information Architecture", "Visual Design"]'::jsonb,
 '["UX Designer", "UI Designer", "Product Designer"]'::jsonb),
('DevOps Engineer', 'Infrastructure and deployment automation expertise', 'technology', 10, 'advanced',
 '["Cloud Platforms", "CI/CD", "Containerization", "Infrastructure as Code", "Monitoring"]'::jsonb,
 '["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"]'::jsonb);

-- Insert sample milestones for Full Stack Developer template
INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources) 
SELECT id, 'Master JavaScript Fundamentals', 'Deep understanding of JavaScript ES6+, async programming, and modern syntax', 1, 3, 
  '["JavaScript", "ES6+", "Async/Await", "Promises"]'::jsonb,
  '{"courses": ["JavaScript Complete Course"], "books": ["You Don''t Know JS"], "practice": ["HackerRank", "LeetCode"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Full Stack Developer';

INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'Learn React Framework', 'Build dynamic user interfaces with React, hooks, and state management', 2, 4,
  '["React", "JSX", "Hooks", "State Management"]'::jsonb,
  '{"courses": ["React Complete Guide"], "documentation": ["React Official Docs"], "projects": ["Todo App", "Weather App"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Full Stack Developer';

INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'Backend Development with Node.js', 'Create RESTful APIs and server-side applications', 3, 5,
  '["Node.js", "Express.js", "RESTful APIs", "Authentication"]'::jsonb,
  '{"courses": ["Node.js Complete Course"], "practice": ["Build REST API"], "tools": ["Postman", "MongoDB"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Full Stack Developer';

INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'Database Design & Management', 'Learn SQL, NoSQL databases and data modeling', 4, 3,
  '["SQL", "MongoDB", "Database Design", "Data Modeling"]'::jsonb,
  '{"courses": ["Database Design Course"], "practice": ["SQL Challenges"], "tools": ["PostgreSQL", "MongoDB"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Full Stack Developer';

INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'Full Stack Project Portfolio', 'Build and deploy complete applications showcasing all skills', 5, 6,
  '["Full Stack Development", "Deployment", "Version Control", "Testing"]'::jsonb,
  '{"projects": ["E-commerce App", "Social Media Clone"], "deployment": ["Vercel", "Heroku"], "tools": ["Git", "GitHub"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Full Stack Developer';

-- Add similar milestones for Product Manager template
INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'Product Strategy Fundamentals', 'Learn product vision, roadmapping, and strategic planning', 1, 4,
  '["Product Strategy", "Market Research", "Competitive Analysis"]'::jsonb,
  '{"courses": ["Product Management Fundamentals"], "books": ["Inspired by Marty Cagan"], "tools": ["ProductPlan", "Aha!"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Product Manager';

INSERT INTO public.career_template_milestones (template_id, title, description, milestone_order, estimated_duration_weeks, required_skills, resources)
SELECT id, 'User Research & Analytics', 'Master user research methods and data-driven decision making', 2, 3,
  '["User Research", "Analytics", "A/B Testing", "User Interviews"]'::jsonb,
  '{"courses": ["User Research Methods"], "tools": ["Google Analytics", "Mixpanel", "Hotjar"], "practice": ["Conduct User Interviews"]}'::jsonb
FROM public.career_plan_templates WHERE title = 'Product Manager';

-- Function to calculate career plan progress based on completed milestones
CREATE OR REPLACE FUNCTION calculate_career_plan_progress(plan_id UUID)
RETURNS INTEGER
LANGUAGE SQL
AS $$
  SELECT CASE 
    WHEN COUNT(*) = 0 THEN 0
    ELSE ROUND((COUNT(*) FILTER (WHERE is_completed = true) * 100.0) / COUNT(*))
  END::INTEGER
  FROM career_milestones 
  WHERE career_path_id = plan_id;
$$;

-- Trigger to automatically update career plan progress when milestones change
CREATE OR REPLACE FUNCTION update_career_plan_progress()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE career_paths 
  SET progress_percentage = calculate_career_plan_progress(NEW.career_path_id),
      updated_at = now()
  WHERE id = NEW.career_path_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_plan_progress_on_milestone_change
  AFTER INSERT OR UPDATE OR DELETE ON career_milestones
  FOR EACH ROW
  EXECUTE FUNCTION update_career_plan_progress();
