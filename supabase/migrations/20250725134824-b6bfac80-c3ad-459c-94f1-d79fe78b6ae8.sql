
-- Fix database function security by adding SET search_path = '' to prevent search path manipulation attacks

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
);
$function$;

-- Update is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$function$;

-- Update get_user_test_limit function
CREATE OR REPLACE FUNCTION public.get_user_test_limit(_user_id uuid)
 RETURNS integer
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT CASE 
    WHEN public.is_admin(_user_id) THEN 999999
    WHEN s.subscription_type = 'premium' THEN 999
    WHEN s.subscription_type = 'professional' THEN 7
    ELSE 4
  END
  FROM public.subscriptions s
  WHERE s.user_id = _user_id
  UNION ALL
  SELECT CASE 
    WHEN public.is_admin(_user_id) THEN 999999
    ELSE 4
  END
  WHERE NOT EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = _user_id)
  LIMIT 1
$function$;

-- Update can_take_test function
CREATE OR REPLACE FUNCTION public.can_take_test(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
  SELECT CASE 
    WHEN public.is_admin(_user_id) THEN true
    ELSE COALESCE(s.tests_taken_this_month, 0) < public.get_user_test_limit(_user_id)
  END
  FROM public.subscriptions s
  WHERE s.user_id = _user_id
  UNION ALL
  SELECT CASE 
    WHEN public.is_admin(_user_id) THEN true
    ELSE true -- For users without subscription, allow basic tests
  END
  WHERE NOT EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = _user_id)
  LIMIT 1
$function$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscriptions (user_id, subscription_type, status)
  VALUES (NEW.id, 'basic', 'active');
  
  RETURN NEW;
END;
$function$;

-- Update calculate_career_plan_progress function
CREATE OR REPLACE FUNCTION public.calculate_career_plan_progress(plan_id uuid)
 RETURNS integer
 LANGUAGE sql
 STABLE
 SET search_path = ''
AS $function$
SELECT CASE 
    WHEN COUNT(*) = 0 THEN 0
    ELSE ROUND((COUNT(*) FILTER (WHERE is_completed = true) * 100.0) / COUNT(*))
END::INTEGER
FROM public.career_milestones 
WHERE career_path_id = plan_id;
$function$;

-- Update update_career_plan_progress function
CREATE OR REPLACE FUNCTION public.update_career_plan_progress()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  UPDATE public.career_paths 
  SET progress_percentage = public.calculate_career_plan_progress(NEW.career_path_id),
      updated_at = now()
  WHERE id = NEW.career_path_id;
  
  RETURN NEW;
END;
$function$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;
