
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSubscription } from '@/hooks/useSubscription';
import { useCareerPlans } from '@/hooks/useCareerPlans';
import { useLanguage } from '@/hooks/useLanguage';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';
import CareerDashboardReal from '@/components/career/CareerDashboardReal';
import CreateCareerPlanEnhanced from '@/components/career/CreateCareerPlanEnhanced';
import CareerPlanDetails from '@/components/career/CareerPlanDetails';
import AIMentoringWithLimits from '@/components/career/AIMentoringWithLimits';

const CareerPaths = () => {
  const { planId } = useParams();
  const { subscription } = useSubscription();
  const { careerPlans } = useCareerPlans();
  const { t } = useLanguage();

  // If we have a planId in the route, show the details page
  if (planId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavigation />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <CareerPlanDetails />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getSubscriptionFeatures = () => {
    if (!subscription) return { maxPlans: 1, hasAI: false };
    
    switch (subscription.subscription_type) {
      case 'premium':
        return { maxPlans: 999, hasAI: true };
      case 'professional':
        return { maxPlans: 999, hasAI: false };
      default:
        return { maxPlans: 1, hasAI: false };
    }
  };

  const features = getSubscriptionFeatures();

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavigation />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{t('careerPaths.title')}</h1>
            <p className="text-gray-600 mt-2">
              {t('careerPaths.subtitle')}
            </p>
          </div>

          <Tabs defaultValue="my-plans" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-plans">{t('careerPaths.tabs.dashboard')}</TabsTrigger>
              <TabsTrigger value="create-plan">{t('careerPaths.tabs.create')}</TabsTrigger>
              <TabsTrigger value="ai-mentoring">{t('careerPaths.tabs.mentoring')}</TabsTrigger>
            </TabsList>

            <TabsContent value="my-plans" className="space-y-6">
              <CareerDashboardReal />
            </TabsContent>

            <TabsContent value="create-plan" className="space-y-6">
              <CreateCareerPlanEnhanced 
                maxPlans={features.maxPlans}
                currentPlansCount={careerPlans.length}
              />
            </TabsContent>

            <TabsContent value="ai-mentoring" className="space-y-6">
              <AIMentoringWithLimits />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerPaths;
