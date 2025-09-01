
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, User, Briefcase, Stethoscope, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  testCount: number;
  color: string;
}

const TestCategoriesPreview = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories: TestCategory[] = [
    {
      id: 'personality',
      name: t('dashboard.testCategories.personality'),
      description: t('dashboard.testCategories.personalityDesc'),
      icon: User,
      testCount: 5,
      color: 'text-blue-600'
    },
    {
      id: 'cognitive',
      name: t('dashboard.testCategories.cognitive'),
      description: t('dashboard.testCategories.cognitiveDesc'),
      icon: Brain,
      testCount: 3,
      color: 'text-green-600'
    },
    {
      id: 'professional',
      name: t('dashboard.testCategories.professional'),
      description: t('dashboard.testCategories.professionalDesc'),
      icon: Briefcase,
      testCount: 4,
      color: 'text-purple-600'
    },
    {
      id: 'clinical',
      name: t('dashboard.testCategories.clinical'),
      description: t('dashboard.testCategories.clinicalDesc'),
      icon: Stethoscope,
      testCount: 2,
      color: 'text-red-600'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/tests?category=${categoryId}`);
  };

  const handleSeeAllTests = () => {
    navigate('/tests');
  };

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">{t('dashboard.testCategories.title')}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t('dashboard.testCategories.exploreCategories')}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleSeeAllTests}
          className="flex items-center gap-2"
        >
          {t('dashboard.testCategories.seeAllTests')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-200"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <IconComponent className={`h-8 w-8 ${category.color}`} />
                    <span className="text-sm text-muted-foreground">
                      {category.testCount} {category.testCount === 1 ? t('dashboard.categories.testLabel') : t('dashboard.categories.testsLabel')}
                    </span>
                  </div>
                  <h3 className="font-semibold mt-3 mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCategoriesPreview;
