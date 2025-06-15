
-- Create user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Make lucian.cebuc@gmail.com admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'lucian.cebuc@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Update subscriptions table to handle unlimited tests for admins
ALTER TABLE public.subscriptions 
ADD COLUMN IF NOT EXISTS is_admin_override boolean DEFAULT false;

-- Create function to get test limit that considers admin status
CREATE OR REPLACE FUNCTION public.get_user_test_limit(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
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
$$;

-- Create function to check if user can take more tests
CREATE OR REPLACE FUNCTION public.can_take_test(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
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
$$;
