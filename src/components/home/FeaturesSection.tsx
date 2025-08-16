
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Target, Users } from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLanguage();

  // Define features with correct translation paths
  const features = [
    {
      icon: Brain,
      title: t('home.features.psychologicalEvaluations') || 'Psychological Evaluations',
      description: t('home.features.psychologicalEvaluationsDesc') || 'Comprehensive psychological assessments to understand your personality and strengths.'
    },
    {
      icon: Target,
      title: t('home.features.personalizedCareerPlans') || 'Personalized Career Plans',
      description: t('home.features.personalizedCareerPlansDesc') || 'AI-generated career development plans tailored to your unique profile.'
    },
    {
      icon: BarChart3,
      title: t('home.features.advancedAnalytics') || 'Advanced Analytics',
      description: t('home.features.advancedAnalyticsDesc') || 'Detailed insights and analytics to track your career development progress.'
    },
    {
      icon: Users,
      title: t('home.features.aiMentoring') || 'AI Mentoring',
      description: t('home.features.aiMentoringDesc') || 'Intelligent mentoring and guidance powered by artificial intelligence.'
    }
  ];

  // Ensure features is always an array and filter out any invalid entries
  const validFeatures = Array.isArray(features) ? features.filter(feature => 
    feature && 
    typeof feature === 'object' && 
    feature.icon && 
    feature.title && 
    feature.description
  ) : [];

  // If no valid features, return null or a fallback
  if (validFeatures.length === 0) {
    console.warn('No valid features found for FeaturesSection');
    return null;
  }

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
          {validFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out animate-fade-in hover:scale-105 hover:-translate-y-2"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
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
