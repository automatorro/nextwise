
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';

const PricingSection = () => {
  const { t } = useLanguage();

  const subscriptionPlans = [
    {
      name: t('plans.basic.name'),
      price: t('plans.basic.price'),
      description: t('plans.basic.description'),
      features: t('plans.basic.features'),
      highlight: false,
      button: t('plans.basic.button')
    },
    {
      name: t('plans.professional.name'),
      price: t('plans.professional.price'),
      description: t('plans.professional.description'),
      features: t('plans.professional.features'),
      highlight: true,
      button: t('plans.professional.button')
    },
    {
      name: t('plans.premium.name'),
      price: t('plans.premium.price'),
      description: t('plans.premium.description'),
      features: t('plans.premium.features'),
      highlight: false,
      button: t('plans.premium.button')
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
            <Card key={index} className={`relative ${plan.highlight ? 'border-2 border-blue-500 shadow-xl scale-105' : ''}`}>
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
