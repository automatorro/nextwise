
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  subscription_type: 'basic' | 'professional' | 'premium';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  current_period_end: string | null;
  tests_taken_this_month: number;
  is_admin: boolean;
}

export const useSubscription = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    if (!user || !session) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Check if user is admin
      const { data: adminCheck } = await supabase.rpc('is_admin', { _user_id: user.id });
      const isAdmin = adminCheck === true;

      // First check local database
      const { data: localSub, error: localError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (localError && localError.code !== 'PGRST116') {
        console.error('Error fetching local subscription:', localError);
      }

      // Then check with Stripe (unless user is admin)
      if (!isAdmin) {
        const { data, error } = await supabase.functions.invoke('check-subscription', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) throw error;
      }

      // Update local state with fresh data from database
      const { data: updatedSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (updatedSub || isAdmin) {
        setSubscription({
          subscription_type: isAdmin ? 'premium' : (updatedSub?.subscription_type || 'basic'),
          status: 'active',
          current_period_end: updatedSub?.current_period_end || null,
          tests_taken_this_month: isAdmin ? 0 : (updatedSub?.tests_taken_this_month || 0),
          is_admin: isAdmin
        });
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut verifica statusul abonamentului.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (subscriptionType: 'basic' | 'professional' | 'premium') => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { subscriptionType },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut inițializa procesul de plată.",
        variant: "destructive"
      });
    }
  };

  const openCustomerPortal = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut deschide portalul de gestionare.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user, session]);

  const getTestsLimit = () => {
    if (!subscription) return 4; // basic default
    
    if (subscription.is_admin) return 999999; // unlimited for admins
    
    switch (subscription.subscription_type) {
      case 'basic':
        return 4;
      case 'professional':
        return 7;
      case 'premium':
        return 999; // unlimited
      default:
        return 4;
    }
  };

  const getRemainingTests = () => {
    if (!subscription) return 4;
    
    if (subscription.is_admin) return 999999; // unlimited for admins
    
    const limit = getTestsLimit();
    const taken = subscription.tests_taken_this_month || 0;
    return Math.max(0, limit - taken);
  };

  const canTakeTest = () => {
    if (!subscription) return true; // Allow basic tests for new users
    
    if (subscription.is_admin) return true; // Admins always can take tests
    
    return getRemainingTests() > 0;
  };

  return {
    subscription,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
    getTestsLimit,
    getRemainingTests,
    canTakeTest
  };
};
