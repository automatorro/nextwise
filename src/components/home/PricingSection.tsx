
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const { t } = useLanguage();

  // Helper function to ensure we get an array from translations
  const getFeatureArray = (translationKey: string, fallback: string[]) => {
    const result = t(translationKey);
    return Array.isArray(result) ? result : fallback;
  };

  const subscriptionPlans = [
    {
      name: t('plans.basic.name') || 'Basic',
      price: t('plans.basic.price') || '€19/lună',
      description: t('plans.basic.description') || 'Perfect for getting started',
      features: getFeatureArray('plans.basic.features', [
        '4 teste psihologice pe lună',
        'Plan de învățare scurt',
        'Rezultate de bază',
        'Suport email'
      ]),
      highlight: false,
      button: t('plans.basic.button') || 'Alege Basic'
    },
    {
      name: t('plans.professional.name') || 'Professional',
      price: t('plans.professional.price') || '€49/lună',
      description: t('plans.professional.description') || 'Most popular choice',
      features: getFeatureArray('plans.professional.features', [
        '7 teste psihologice pe lună',
        'Plan de învățare și dezvoltare extins',
        'Analize detaliate AI',
        'Recomandări personalizate',
        'Suport prioritar'
      ]),
      highlight: true,
      button: t('plans.professional.button') || 'Alege Professional'
    },
    {
      name: t('plans.premium.name') || 'Premium',
      price: t('plans.premium.price') || '€89/lună',
      description: t('plans.premium.description') || 'Everything you need',
      features: getFeatureArray('plans.premium.features', [
        'Acces complet nelimitat',
        'Toate testele disponibile',
        'Planuri de carieră avansate',
        'Consultanță personalizată',
        'Sesiuni video 1-la-1',
        'Suport 24/7'
      ]),
      highlight: false,
      button: t('plans.premium.button') || 'Alege Premium'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('home.pricingTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.pricingSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-500 ease-in-out animate-fade-in hover:scale-110 hover:-translate-y-4 hover:shadow-2xl ${
                plan.highlight 
                  ? 'border-2 border-blue-500 shadow-xl scale-105 animate-pulse hover:shadow-blue-300/50' 
                  : 'hover:shadow-gray-300/50'
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationFillMode: 'both'
              }}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-blue-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    {t('plans.mostPopular')}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900 mt-2">{plan.price}</div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth">
                  <Button 
                    className={`w-full ${plan.highlight ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`} 
                    variant={plan.highlight ? 'default' : 'outline'}
                  >
                    {plan.button}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
