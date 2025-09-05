-- Fix critical security issues

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

-- 3. Secure subscriptions table - hide sensitive Stripe data from client
CREATE OR REPLACE VIEW public.subscription_info AS
SELECT 
  id,
  user_id,
  subscription_type,
  status,
  current_period_end,
  tests_taken_this_month,
  created_at,
  updated_at,
  is_admin_override
FROM public.subscriptions;

-- Enable RLS on the view
ALTER VIEW public.subscription_info SET (security_barrier = true);

-- Create RLS policy for the view
CREATE POLICY "Users can view their own subscription info"
ON public.subscription_info
FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Add comprehensive audit logging for security events
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
    current_setting('request.headers', true)::json->>'user-agent'
  );
END;
$$;

-- 5. Enhance database functions with proper search_path
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

-- 6. Add trigger to log profile access attempts
CREATE OR REPLACE FUNCTION public.log_profile_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Only log if accessing another user's profile
  IF auth.uid() != OLD.id AND NOT public.is_admin(auth.uid()) THEN
    PERFORM public.log_security_event(
      'PROFILE_ACCESS_ATTEMPT',
      jsonb_build_object(
        'accessed_user_id', OLD.id,
        'accessor_user_id', auth.uid()
      )
    );
  END IF;
  
  RETURN OLD;
END;
$$;

-- Create trigger for profile access logging
DROP TRIGGER IF EXISTS log_profile_access_trigger ON public.profiles;
CREATE TRIGGER log_profile_access_trigger
  AFTER SELECT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_profile_access();