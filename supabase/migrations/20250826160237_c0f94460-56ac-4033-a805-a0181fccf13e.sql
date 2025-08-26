-- Fix the infinite recursion in user_roles policy and other issues
-- First, completely remove all policies from user_roles to fix the recursion
DROP POLICY IF EXISTS "Users can view their own roles only" ON user_roles;
DROP POLICY IF EXISTS "Only super admins can manage roles" ON user_roles;

-- Fix the infinite recursion issue by using the existing security definer function
CREATE POLICY "Users can view their own roles only" 
ON user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create safer admin management policy using the is_admin function
CREATE POLICY "Only admins can manage roles (except self)" 
ON user_roles 
FOR ALL 
TO authenticated
USING (
  public.is_admin(auth.uid()) AND auth.uid() != user_id
)
WITH CHECK (
  public.is_admin(auth.uid()) AND auth.uid() != user_id
);

-- Fix the function search path for can_view_full_profile  
CREATE OR REPLACE FUNCTION public.can_view_full_profile(profile_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin(auth.uid()) OR auth.uid() = profile_user_id
$$;