
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useUserRole } from '@/hooks/useUserRole';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, CreditCard, User, Settings } from 'lucide-react';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';

const SubscriptionPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { isAdmin, loading: roleLoading } = useUserRole();

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  // Fetch subscription info
  const { data: subscription, isLoading: subscriptionLoading } = useQuery({
    queryKey: ['user-subscription', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  if (profileLoading || subscriptionLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const getSubscriptionBadge = () => {
    if (isAdmin()) {
      return (
        <Badge variant="destructive" className="flex items-center space-x-1">
          <Shield className="w-3 h-3" />
          <span>{t('subscription.administrator')}</span>
        </Badge>
      );
    }
    
    const typeMap = {
      basic: { label: 'Basic', variant: 'secondary' as const },
      professional: { label: 'Professional', variant: 'default' as const },
      premium: { label: 'Premium', variant: 'default' as const }
    };
    
    const subscriptionInfo = typeMap[subscription?.subscription_type as keyof typeof typeMap] || typeMap.basic;
    
    return (
      <Badge variant={subscriptionInfo.variant} className="flex items-center space-x-1">
        <CreditCard className="w-3 h-3" />
        <span>{subscriptionInfo.label}</span>
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{t('subscription.title')}</h1>
            {getSubscriptionBadge()}
          </div>
          <p className="text-gray-600">
            {t('subscription.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('subscription.profileSettings')}</h2>
            </div>
            
            <ProfileEditForm 
              initialData={{
                fullName: profile?.full_name || user?.user_metadata?.full_name || '',
                email: user?.email || '',
              }}
            />
            
            <PasswordChangeForm />
          </div>

          {/* Subscription Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">{t('nav.subscription')}</h2>
            </div>

            {/* Current Subscription Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t('subscription.currentSubscription')}</span>
                  {getSubscriptionBadge()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('subscription.subscriptionType')}</label>
                    <p className="text-gray-900 capitalize">
                      {isAdmin() ? t('subscription.unlimitedAccess') : subscription?.subscription_type || 'Basic'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">{t('subscription.status')}</label>
                    <p className="text-gray-900 capitalize">
                      {subscription?.status === 'active' ? t('subscription.active') : subscription?.status || t('subscription.active')}
                    </p>
                  </div>
                  {!isAdmin() && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">{t('subscription.testsThisMonth')}</label>
                      <p className="text-gray-900">
                        {subscription?.tests_taken_this_month || 0}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Plans */}
            {!isAdmin() && <SubscriptionPlans />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
