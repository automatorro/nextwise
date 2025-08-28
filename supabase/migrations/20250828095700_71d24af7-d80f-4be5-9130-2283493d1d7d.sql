-- Remove the problematic security definer view
DROP VIEW IF EXISTS public.user_subscription_info;

-- Create a secure function instead of a view to access subscription info
CREATE OR REPLACE FUNCTION public.get_user_subscription_info()
RETURNS TABLE(
    id uuid,
    subscription_type subscription_type,
    status subscription_status,
    current_period_end timestamp with time zone,
    tests_taken_this_month integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_admin_override boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    -- Return subscription info without sensitive Stripe identifiers
    RETURN QUERY 
    SELECT 
        s.id,
        s.subscription_type,
        s.status,
        s.current_period_end,
        s.tests_taken_this_month,
        s.created_at,
        s.updated_at,
        s.is_admin_override
    FROM public.subscriptions s
    WHERE s.user_id = auth.uid();
END;
$$;

-- Add comment explaining the security measure
COMMENT ON FUNCTION public.get_user_subscription_info() IS 'Secure function that exposes subscription data without sensitive Stripe identifiers';