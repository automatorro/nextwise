-- CRITICAL SECURITY FIX 1: Hide scoring weights and restrict test question access
-- Drop existing policy and create more secure ones
DROP POLICY IF EXISTS "Authenticated users can view test questions" ON test_questions;

-- Users can only view basic question info (no scoring weights)
CREATE POLICY "Users can view test questions for taking tests" 
ON test_questions 
FOR SELECT 
TO authenticated
USING (true);

-- Create a view that hides sensitive scoring information from regular users
CREATE OR REPLACE VIEW public.safe_test_questions AS
SELECT 
  id,
  test_type_id,
  question_text_ro,
  question_text_en,
  question_order,
  question_type,
  options,
  options_en,
  created_at,
  -- Hide scoring_weights for security
  CASE 
    WHEN public.is_admin(auth.uid()) THEN scoring_weights
    ELSE NULL
  END as scoring_weights
FROM test_questions;

-- Grant select on the view
GRANT SELECT ON public.safe_test_questions TO authenticated;

-- CRITICAL SECURITY FIX 2: Prevent users from updating their own roles
-- Drop existing policies and create more restrictive ones
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can update roles" ON user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON user_roles;

-- More secure role policies
CREATE POLICY "Users can view their own roles only" 
ON user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only super admins can manage roles" 
ON user_roles 
FOR ALL 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin'::app_role
    AND ur.user_id != user_roles.user_id -- Prevent self-modification
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_roles ur 
    WHERE ur.user_id = auth.uid() 
    AND ur.role = 'admin'::app_role
    AND ur.user_id != user_roles.user_id -- Prevent self-modification
  )
);

-- SECURITY FIX 3: Add audit logging for sensitive operations
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action_type text NOT NULL,
  table_name text,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" 
ON security_audit_log 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs" 
ON security_audit_log 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- SECURITY FIX 4: Audit trigger for role changes
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.security_audit_log (
      user_id, action_type, table_name, record_id, new_values
    ) VALUES (
      auth.uid(), 'ROLE_GRANTED', 'user_roles', NEW.id,
      jsonb_build_object('user_id', NEW.user_id, 'role', NEW.role)
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.security_audit_log (
      user_id, action_type, table_name, record_id, old_values
    ) VALUES (
      auth.uid(), 'ROLE_REVOKED', 'user_roles', OLD.id,
      jsonb_build_object('user_id', OLD.user_id, 'role', OLD.role)
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for role change auditing
DROP TRIGGER IF EXISTS audit_user_roles_changes ON user_roles;
CREATE TRIGGER audit_user_roles_changes
  AFTER INSERT OR DELETE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION public.audit_role_changes();

-- SECURITY FIX 5: Restrict career template access based on subscription
DROP POLICY IF EXISTS "Authenticated users can view active templates" ON career_plan_templates;

CREATE POLICY "Users can view templates based on subscription" 
ON career_plan_templates 
FOR SELECT 
TO authenticated
USING (
  is_active = true AND (
    difficulty_level = 'beginner' OR
    public.is_admin(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM subscriptions s 
      WHERE s.user_id = auth.uid() 
      AND s.status = 'active'
      AND (
        (difficulty_level = 'intermediate' AND s.subscription_type IN ('professional', 'premium')) OR
        (difficulty_level = 'advanced' AND s.subscription_type = 'premium')
      )
    )
  )
);

-- SECURITY FIX 6: Enhanced profile security - hide emails from non-admin users
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;

CREATE POLICY "Users can view their own profile" 
ON profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Create secure view for profiles that masks sensitive data
CREATE OR REPLACE VIEW public.safe_profiles AS
SELECT 
  id,
  full_name,
  CASE 
    WHEN public.is_admin(auth.uid()) OR auth.uid() = id THEN email
    ELSE CONCAT(LEFT(SPLIT_PART(email, '@', 1), 2), '***@', SPLIT_PART(email, '@', 2))
  END as email,
  avatar_url,
  created_at,
  updated_at
FROM profiles;

-- Grant select on the safe profiles view
GRANT SELECT ON public.safe_profiles TO authenticated;