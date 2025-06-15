
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  subscription_type: 'basic' | 'professional' | 'premium';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  current_period_end: string | null;
  tests_taken_this_month: number;
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
      
      // First check local database
      const { data: localSub, error: localError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (localError && localError.code !== 'PGRST116') {
        console.error('Error fetching local subscription:', localError);
      }

      // Then check with Stripe
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      // Update local state with fresh data from database
      const { data: updatedSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (updatedSub) {
        setSubscription({
          subscription_type: updatedSub.subscription_type,
          status: updatedSub.status,
          current_period_end: updatedSub.current_period_end,
          tests_taken_this_month: updatedSub.tests_taken_this_month || 0
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
    const limit = getTestsLimit();
    const taken = subscription?.tests_taken_this_month || 0;
    return Math.max(0, limit - taken);
  };

  return {
    subscription,
    loading,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
    getTestsLimit,
    getRemainingTests
  };
};
