
-- Create enum for subscription types
CREATE TYPE subscription_type AS ENUM ('basic', 'professional', 'premium');

-- Create enum for subscription status
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'past_due');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_type subscription_type NOT NULL DEFAULT 'basic',
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  tests_taken_this_month INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test categories table
CREATE TABLE public.test_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test types table
CREATE TABLE public.test_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.test_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  questions_count INTEGER NOT NULL DEFAULT 20,
  estimated_duration INTEGER NOT NULL DEFAULT 15, -- in minutes
  subscription_required subscription_type NOT NULL DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test results table
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type_id UUID NOT NULL REFERENCES public.test_types(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score JSONB NOT NULL,
  ai_analysis TEXT,
  recommendations TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career paths table
CREATE TABLE public.career_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  milestones JSONB,
  generated_by_ai BOOLEAN DEFAULT TRUE,
  progress_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for test_categories (public read)
CREATE POLICY "Anyone can view test categories" ON public.test_categories
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for test_types (public read)
CREATE POLICY "Anyone can view test types" ON public.test_types
  FOR SELECT TO authenticated USING (true);

-- Create RLS policies for test_results
CREATE POLICY "Users can view their own test results" ON public.test_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results" ON public.test_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for career_paths
CREATE POLICY "Users can view their own career paths" ON public.career_paths
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own career paths" ON public.career_paths
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own career paths" ON public.career_paths
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own career paths" ON public.career_paths
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscriptions (user_id, subscription_type, status)
  VALUES (NEW.id, 'basic', 'active');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert test categories
INSERT INTO public.test_categories (name, description, icon) VALUES
('Competențe Tehnice', 'Evaluări pentru competențe tehnice și profesionale specifice domeniului', '💻'),
('Inteligență Emoțională', 'Teste pentru evaluarea abilităților sociale și emoționale', '🧠'),
('Personalitate', 'Teste de personalitate și comportament în diverse situații', '👤'),
('Aptitudini Cognitive', 'Evaluări pentru capacități mentale și de procesare', '🎯'),
('Leadership & Echipă', 'Teste pentru roluri în echipă și abilități de leadership', '👥'),
('Wellness Psihologic', 'Evaluări pentru starea psihologică și wellbeing', '🌱'),
('Competențe Digitale', 'Teste pentru abilități digitale și analitice', '📊'),
('Percepție Senzorială', 'Evaluări pentru procesarea și percepția senzorială', '👁️');

-- Insert test types for each category
INSERT INTO public.test_types (category_id, name, description, questions_count, estimated_duration, subscription_required) VALUES
-- Inteligență Emoțională
((SELECT id FROM public.test_categories WHERE name = 'Inteligență Emoțională'), 'Test Inteligență Emoțională EQ', 'Evaluează capacitatea de a înțelege și gestiona emoțiile', 25, 20, 'basic'),

-- Personalitate
((SELECT id FROM public.test_categories WHERE name = 'Personalitate'), 'Big Five Personalitate', 'Test complet de personalitate bazat pe modelul Big Five', 50, 30, 'basic'),
((SELECT id FROM public.test_categories WHERE name = 'Personalitate'), 'Test DISC', 'Evaluează stilul de comportament în mediul profesional', 28, 25, 'professional'),
((SELECT id FROM public.test_categories WHERE name = 'Personalitate'), 'Enneagram', 'Descoperă tipul tău de personalitate Enneagram', 36, 25, 'professional'),
((SELECT id FROM public.test_categories WHERE name = 'Personalitate'), 'Test Cattell 16PF', 'Evaluare detaliată a personalității pe 16 factori', 185, 45, 'premium'),
((SELECT id FROM public.test_categories WHERE name = 'Personalitate'), 'HEXACO Personalitate', 'Test modern de personalitate pe 6 dimensiuni principale', 60, 35, 'premium'),

-- Leadership & Echipă
((SELECT id FROM public.test_categories WHERE name = 'Leadership & Echipă'), 'Roluri în Echipă Belbin', 'Identifică rolurile tale preferate în echipă', 27, 20, 'professional'),

-- Competențe Tehnice
((SELECT id FROM public.test_categories WHERE name = 'Competențe Tehnice'), 'Aptitudini Profesionale', 'Evaluează competențele generale pentru mediul de lucru', 30, 25, 'basic'),

-- Wellness Psihologic
((SELECT id FROM public.test_categories WHERE name = 'Wellness Psihologic'), 'Evaluare Anxietate GAD-7', 'Screening pentru nivelul de anxietate (educațional)', 7, 5, 'basic'),
((SELECT id FROM public.test_categories WHERE name = 'Wellness Psihologic'), 'Beck Depression Inventory', 'Evaluare educațională pentru starea de spirit', 21, 15, 'professional'),

-- Aptitudini Cognitive
((SELECT id FROM public.test_categories WHERE name = 'Aptitudini Cognitive'), 'Test Aptitudini Cognitive', 'Evaluează capacitățile de raționament și procesare', 40, 35, 'professional'),

-- Percepție Senzorială
((SELECT id FROM public.test_categories WHERE name = 'Percepție Senzorială'), 'Test Percepție Senzorială', 'Evaluează modul de procesare a informațiilor senzoriale', 32, 20, 'premium'),

-- Competențe Digitale
((SELECT id FROM public.test_categories WHERE name = 'Competențe Digitale'), 'Competențe Digitale & Analitice', 'Evaluează abilitățile digitale și de analiză', 35, 30, 'professional');
