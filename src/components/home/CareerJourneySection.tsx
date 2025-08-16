
import React from 'react';
import { CheckCircle, Target, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const CareerJourneySection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: t('careerJourney.step1.title'),
      description: t('careerJourney.step1.description')
    },
    {
      id: 2,
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: t('careerJourney.step2.title'),
      description: t('careerJourney.step2.description')
    },
    {
      id: 3,
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: t('careerJourney.step3.title'),
      description: t('careerJourney.step3.description')
    },
    {
      id: 4,
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: t('careerJourney.step4.title'),
      description: t('careerJourney.step4.description')
    }
  ];

  const benefits = [
    t('careerJourney.benefits.benefit1'),
    t('careerJourney.benefits.benefit2'),
    t('careerJourney.benefits.benefit3'),
    t('careerJourney.benefits.benefit4')
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('careerJourney.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careerJourney.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out animate-slide-in-right hover:scale-105 hover:-translate-y-3 hover:shadow-indigo-200/30"
              style={{ 
                animationDelay: `${(step.id - 1) * 0.15}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4 mx-auto">
                {step.icon}
              </div>
              <div className="text-center">
                <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {step.id}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out animate-fade-in hover:scale-102"
          style={{ 
            animationDelay: '0.6s',
            animationFillMode: 'both'
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t('careerJourney.benefits.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerJourneySection;
