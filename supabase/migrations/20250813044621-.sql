-- Fix the remaining two functions without proper search_path configuration

-- Update calculate_career_plan_progress function
CREATE OR REPLACE FUNCTION public.calculate_career_plan_progress(plan_id uuid)
 RETURNS integer
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
SELECT CASE 
    WHEN COUNT(*) = 0 THEN 0
    ELSE ROUND((COUNT(*) FILTER (WHERE is_completed = true) * 100.0) / COUNT(*))
END::INTEGER
FROM career_milestones 
WHERE career_path_id = plan_id;
$function$;

-- Update has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
);
$function$;