-- Add missing INSERT policies for recommendations tables to prevent unauthorized creation

-- Add INSERT policy for ai_recommendations table
CREATE POLICY "Users can create their own AI recommendations" 
ON public.ai_recommendations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add INSERT policy for career_recommendations table  
CREATE POLICY "Users can create their own career recommendations"
ON public.career_recommendations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update existing functions to use secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
);
$$;

-- Add additional security for subscription data by creating a view that limits exposure
CREATE OR REPLACE VIEW public.user_subscription_info AS
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
    -- Explicitly exclude stripe_customer_id and stripe_subscription_id from the view
FROM public.subscriptions
WHERE user_id = auth.uid();

-- Grant access to the view
GRANT SELECT ON public.user_subscription_info TO authenticated;

-- Add comment explaining the security measure
COMMENT ON VIEW public.user_subscription_info IS 'Secure view that exposes subscription data without sensitive Stripe identifiers';

-- Add a function to securely check if user can access subscription features
CREATE OR REPLACE FUNCTION public.get_user_subscription_access()
RETURNS TABLE(
    subscription_type subscription_type,
    status subscription_status,
    tests_remaining integer,
    is_admin boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    user_sub record;
    test_limit integer;
    is_user_admin boolean;
BEGIN
    -- Check if user is admin
    SELECT public.is_admin(auth.uid()) INTO is_user_admin;
    
    -- Get subscription info
    SELECT * INTO user_sub 
    FROM public.subscriptions 
    WHERE user_id = auth.uid();
    
    -- Calculate test limit
    SELECT public.get_user_test_limit(auth.uid()) INTO test_limit;
    
    -- Return secure subscription access info
    RETURN QUERY SELECT 
        COALESCE(user_sub.subscription_type, 'basic'::subscription_type),
        COALESCE(user_sub.status, 'active'::subscription_status),
        GREATEST(0, test_limit - COALESCE(user_sub.tests_taken_this_month, 0)),
        is_user_admin;
END;
$$;