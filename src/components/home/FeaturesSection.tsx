
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Target, Users } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('features.psychologicalEvaluations'),
      description: t('features.psychologicalEvaluationsDesc')
    },
    {
      icon: Target,
      title: t('features.personalizedCareerPlans'),
      description: t('features.personalizedCareerPlansDesc')
    },
    {
      icon: BarChart3,
      title: t('features.advancedAnalytics'),
      description: t('features.advancedAnalyticsDesc')
    },
    {
      icon: Users,
      title: t('features.aiMentoring'),
      description: t('features.aiMentoringDesc')
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featuresTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.featuresSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
