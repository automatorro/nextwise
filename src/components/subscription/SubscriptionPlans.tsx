
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';

const SubscriptionPlans = () => {
  const { subscription, createCheckout, loading } = useSubscription();

  const plans = [
    {
      name: 'Basic',
      type: 'basic' as const,
      price: '19',
      icon: <Zap className="w-6 h-6" />,
      features: [
        '4 teste psihologice pe lună',
        'Plan de învățare scurt',
        'Rezultate de bază',
        'Suport email'
      ],
      popular: false
    },
    {
      name: 'Professional',
      type: 'professional' as const,
      price: '49',
      icon: <Star className="w-6 h-6" />,
      features: [
        '7 teste psihologice pe lună',
        'Plan de învățare și dezvoltare extins',
        'Analize detaliate AI',
        'Recomandări personalizate',
        'Suport prioritar'
      ],
      popular: true
    },
    {
      name: 'Premium',
      type: 'premium' as const,
      price: '89',
      icon: <Crown className="w-6 h-6" />,
      features: [
        'Acces complet nelimitat',
        'Toate testele disponibile',
        'Planuri de carieră avansate',
        'Consultanță personalizată',
        'Sesiuni video 1-la-1',
        'Suport 24/7'
      ],
      popular: false
    }
  ];

  const currentPlan = subscription?.subscription_type || 'basic';

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card 
          key={plan.type} 
          className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${
            currentPlan === plan.type ? 'ring-2 ring-green-500' : ''
          }`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
              Popular
            </Badge>
          )}
          
          {currentPlan === plan.type && (
            <Badge className="absolute -top-3 right-4 bg-green-500">
              Planul tău actual
            </Badge>
          )}

          <CardHeader className="text-center pb-4">
            <div className={`mx-auto p-3 rounded-full w-fit ${
              plan.popular ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
            }`}>
              {plan.icon}
            </div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold">€{plan.price}</span>
              <span className="text-gray-600">/lună</span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {Array.isArray(plan.features) && plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => createCheckout(plan.type)}
              disabled={loading || currentPlan === plan.type}
              className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
              variant={currentPlan === plan.type ? 'outline' : plan.popular ? 'default' : 'outline'}
            >
              {currentPlan === plan.type ? 'Plan Activ' : `Alege ${plan.name}`}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
