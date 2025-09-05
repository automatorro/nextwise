-- Fix critical security issues (corrected)

-- 1. Secure profiles table - prevent cross-user access
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile or admins can view all" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id OR public.is_admin(auth.uid()));

-- 2. Add function to securely check profile viewing permissions
CREATE OR REPLACE FUNCTION public.can_view_profile(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT public.is_admin(auth.uid()) OR auth.uid() = profile_user_id;
$$;

-- 3. Add comprehensive audit logging for security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  details jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    user_id,
    action_type,
    table_name,
    new_values,
    user_agent
  ) VALUES (
    auth.uid(),
    event_type,
    'security_events',
    details,
    'API'
  );
EXCEPTION
  WHEN OTHERS THEN
    -- Fail silently to not break user operations
    NULL;
END;
$$;

-- 4. Enhance database functions with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.subscriptions (user_id, subscription_type, status)
  VALUES (NEW.id, 'basic', 'active');
  
  -- Log new user creation
  PERFORM public.log_security_event('USER_CREATED', jsonb_build_object('user_id', NEW.id));
  
  RETURN NEW;
END;
$$;