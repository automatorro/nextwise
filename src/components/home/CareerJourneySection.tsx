import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Target, TrendingUp, Award } from 'lucide-react';

const CareerJourneySection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: '1',
      title: t('careerJourney.step1.title'),
      description: t('careerJourney.step1.description'),
      icon: CheckCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      number: '2',
      title: t('careerJourney.step2.title'),
      description: t('careerJourney.step2.description'),
      icon: Target,
      color: 'bg-green-100 text-green-600'
    },
    {
      number: '3',
      title: t('careerJourney.step3.title'),
      description: t('careerJourney.step3.description'),
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      number: '4',
      title: t('careerJourney.step4.title'),
      description: t('careerJourney.step4.description'),
      icon: Award,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const benefits = [
    t('careerJourney.benefits.benefit1'),
    t('careerJourney.benefits.benefit2'),
    t('careerJourney.benefits.benefit3'),
    t('careerJourney.benefits.benefit4')
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {t('careerJourney.title')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('careerJourney.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => (
            <Card key={step.number} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <Badge variant="outline" className="mb-3 text-sm font-semibold">
                  {step.number}
                </Badge>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            {t('careerJourney.benefits.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourneySection;