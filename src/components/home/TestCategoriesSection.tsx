
import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TestCategoriesSection = () => {
  const { t } = useLanguage();

  const testCategories = [
    {
      name: t('dashboard.categories.emotionalIntelligence'),
      icon: '🧠',
      count: 1
    },
    {
      name: t('dashboard.categories.personality'),
      icon: '👤',
      count: 5
    },
    {
      name: t('dashboard.categories.leadership'),
      icon: '👥',
      count: 1
    },
    {
      name: t('dashboard.categories.technicalSkills'),
      icon: '💻',
      count: 1
    },
    {
      name: t('dashboard.categories.wellness'),
      icon: '🌱',
      count: 2
    },
    {
      name: t('dashboard.categories.cognitive'),
      icon: '🎯',
      count: 1
    },
    {
      name: t('dashboard.categories.digital'),
      icon: '📊',
      count: 1
    },
    {
      name: t('dashboard.categories.sensory'),
      icon: '👁️',
      count: 1
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('home.categoriesTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('home.categoriesSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {testCategories.map((category, index) => (
            <Card 
              key={index} 
              className="text-center hover:shadow-xl transition-all duration-300 ease-in-out animate-scale-in hover:scale-110 hover:-translate-y-1 hover:shadow-blue-200/50"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <Badge variant="secondary">
                  {category.count} {category.count === 1 ? t('dashboard.categories.testLabel') : t('dashboard.categories.testsLabel')}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestCategoriesSection;
