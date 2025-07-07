-- Add unique constraint on title for career_plan_templates
ALTER TABLE career_plan_templates ADD CONSTRAINT career_plan_templates_title_key UNIQUE (title);

-- Insert templates only if they don't exist
INSERT INTO career_plan_templates (title, description, category, difficulty_level, estimated_duration_months, required_skills, target_roles) 
SELECT 'Data Scientist', 'Plan complet pentru tranziția către Data Science cu focus pe Python, Machine Learning și analiză de date', 'analytics', 'intermediate', 8, '["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"]', '["Data Scientist", "ML Engineer", "Data Analyst"]'
WHERE NOT EXISTS (SELECT 1 FROM career_plan_templates WHERE title = 'Data Scientist');

INSERT INTO career_plan_templates (title, description, category, difficulty_level, estimated_duration_months, required_skills, target_roles) 
SELECT 'Senior Trainer', 'Plan de dezvoltare pentru rolul de Senior Trainer cu focus pe competențe de instruire și facilitare', 'management', 'intermediate', 6, '["Public Speaking", "Instructional Design", "Communication", "Facilitation", "Adult Learning"]', '["Senior Trainer", "Training Manager", "L&D Specialist"]'
WHERE NOT EXISTS (SELECT 1 FROM career_plan_templates WHERE title = 'Senior Trainer');

INSERT INTO career_plan_templates (title, description, category, difficulty_level, estimated_duration_months, required_skills, target_roles) 
SELECT 'Product Manager', 'Plan de carieră pentru Product Management cu focus pe strategie produse și management echipe', 'management', 'advanced', 10, '["Product Strategy", "User Research", "Data Analysis", "Agile", "Stakeholder Management"]', '["Product Manager", "Senior Product Manager", "Product Owner"]'
WHERE NOT EXISTS (SELECT 1 FROM career_plan_templates WHERE title = 'Product Manager');

INSERT INTO career_plan_templates (title, description, category, difficulty_level, estimated_duration_months, required_skills, target_roles) 
SELECT 'UX Designer', 'Plan pentru tranziția către UX Design cu focus pe research, prototyping și design thinking', 'design', 'beginner', 7, '["Design Thinking", "Prototyping", "User Research", "Figma", "Usability Testing"]', '["UX Designer", "Product Designer", "UI/UX Designer"]'
WHERE NOT EXISTS (SELECT 1 FROM career_plan_templates WHERE title = 'UX Designer');