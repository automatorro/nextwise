-- Final security fixes - remove any remaining security definer views and fix function paths
-- Check for and remove any remaining security definer views
DROP VIEW IF EXISTS public.safe_test_questions CASCADE;
DROP VIEW IF EXISTS public.safe_profiles CASCADE;

-- Fix all function search paths for security
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.calculate_career_plan_progress(uuid) SET search_path = public;
ALTER FUNCTION public.update_career_plan_progress() SET search_path = public;
ALTER FUNCTION public.get_user_test_limit(uuid) SET search_path = public;
ALTER FUNCTION public.can_take_test(uuid) SET search_path = public;
ALTER FUNCTION public.increment_tests_taken(uuid) SET search_path = public;
ALTER FUNCTION public.has_role(uuid, app_role) SET search_path = public;
ALTER FUNCTION public.is_admin(uuid) SET search_path = public;