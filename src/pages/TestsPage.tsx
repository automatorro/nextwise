import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Users, Brain, Target, Heart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useLanguage } from '@/hooks/useLanguage';
import { getCategoryTranslationKey, getTestNameTranslationKey, getTestDescriptionTranslationKey } from '@/utils/testTranslationMapping';

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
  subscription_required: string;
  test_categories: {
    name: string;
    icon: string;
  };
  actual_questions_count?: number;
}

const TestsPage = () => {
  const { subscription, canTakeTest } = useSubscription();
  const { t } = useLanguage();

  const { data: tests, isLoading, error } = useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      console.log('Fetching tests from database...');
      
      // First get all test types with their categories
      const { data: testTypes, error: testTypesError } = await supabase
        .from('test_types')
        .select(`
          *,
          test_categories (
            name,
            icon
          )
        `);
      
      if (testTypesError) {
        console.error('Error fetching test types:', testTypesError);
        throw testTypesError;
      }
      
      console.log('Raw test types from database:', testTypes);
      
      // Log specific test we're looking for
      const cognitiveTest = testTypes.find(test => 
        test.name.toLowerCase().includes('aptitudini cognitive')
      );
      console.log('Found cognitive abilities test:', cognitiveTest);
      
      // For each test type, count actual questions
      const testsWithQuestionCounts = await Promise.all(
        testTypes.map(async (testType) => {
          const { count, error: countError } = await supabase
            .from('test_questions')
            .select('*', { count: 'exact', head: true })
            .eq('test_type_id', testType.id);
          
          if (countError) {
            console.error(`Error counting questions for test ${testType.id}:`, countError);
          }
          
          console.log(`Test ${testType.name} (ID: ${testType.id}) has ${count} questions`);
          
          return {
            ...testType,
            actual_questions_count: count || 0
          };
        })
      );
      
      // Filter out tests with no questions
      const validTests = testsWithQuestionCounts.filter(test => 
        test.actual_questions_count > 0
      );
      
      console.log('Valid tests with questions:', validTests);
      console.log('Tests without questions:', testsWithQuestionCounts.filter(test => test.actual_questions_count === 0));
      
      // Special check for cognitive abilities test
      const cognitiveTestInValid = validTests.find(test => 
        test.name.toLowerCase().includes('aptitudini cognitive')
      );
      console.log('Cognitive abilities test in valid tests:', cognitiveTestInValid);
      
      return validTests as TestType[];
    }
  });

  function getIconComponent(iconName: string) {
    const icons: { [key: string]: React.ComponentType<any> } = {
      'brain': Brain,
      'users': Users,
      'target': Target,
      'heart': Heart
    };
    return icons[iconName] || Brain;
  }

  function canUserTakeTest(test: TestType) {
    if (!canTakeTest()) return false;
    
    // Check subscription requirements
    if (!subscription) return test.subscription_required === 'basic';
    
    if (subscription.is_admin) return true;
    
    switch (test.subscription_required) {
      case 'basic':
        return true;
      case 'professional':
        return ['professional', 'premium'].includes(subscription.subscription_type);
      case 'premium':
        return subscription.subscription_type === 'premium';
      default:
        return true;
    }
  }

  function getSubscriptionBadgeColor(required: string) {
    switch (required) {
      case 'basic':
        return 'bg-green-100 text-green-800';
      case 'professional':
        return 'bg-blue-100 text-blue-800';
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getSubscriptionLabel(required: string) {
    switch (required) {
      case 'basic':
        return t('plans.basic.price');
      case 'professional':
        return t('plans.professional.name');
      case 'premium':
        return t('plans.premium.name');
      default:
        return required;
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('common.error')}</h2>
          <p className="text-gray-600">{t('tests.noTests')}</p>
        </div>
      </div>
    );
  }

  const groupedTests = tests?.reduce((acc, test) => {
    const categoryName = test.test_categories.name;
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(test);
    return acc;
  }, {} as { [key: string]: TestType[] }) || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('tests.title')}</h1>
          <p className="text-gray-600 mt-2">
            {t('tests.subtitle')}
          </p>
          {tests && (
            <p className="text-sm text-gray-500 mt-2">
              {tests.length} {tests.length === 1 ? t('dashboard.categories.test') : t('dashboard.categories.tests')}
            </p>
          )}
        </div>

        {Object.entries(groupedTests).map(([categoryName, categoryTests]) => {
          const categoryTranslationKey = getCategoryTranslationKey(categoryName);
          const translatedCategoryName = t(categoryTranslationKey);
          
          return (
            <div key={categoryName} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                {React.createElement(getIconComponent(categoryTests[0]?.test_categories.icon), {
                  className: "w-6 h-6 mr-2 text-blue-600"
                })}
                {translatedCategoryName}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTests.map((test) => {
                  const userCanTake = canUserTakeTest(test);
                  const testNameTranslationKey = getTestNameTranslationKey(test.name);
                  const testDescriptionTranslationKey = getTestDescriptionTranslationKey(test.name);
                  const translatedTestName = t(testNameTranslationKey);
                  const translatedTestDescription = t(testDescriptionTranslationKey);
                  
                  return (
                    <Card key={test.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{translatedTestName}</CardTitle>
                            <CardDescription className="mt-2">
                              {translatedTestDescription}
                            </CardDescription>
                          </div>
                          <div className={`p-2 rounded-lg ${
                            test.subscription_required === 'basic' ? 'bg-green-100' :
                            test.subscription_required === 'professional' ? 'bg-blue-100' :
                            'bg-purple-100'
                          }`}>
                            {React.createElement(getIconComponent(test.test_categories.icon), {
                              className: `w-5 h-5 ${
                                test.subscription_required === 'basic' ? 'text-green-600' :
                                test.subscription_required === 'professional' ? 'text-blue-600' :
                                'text-purple-600'
                              }`
                            })}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {test.estimated_duration} {t('tests.minutes')}
                          </div>
                          <Badge variant="secondary">
                            {test.actual_questions_count} {t('tests.questions')}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <Badge 
                            variant="outline" 
                            className={getSubscriptionBadgeColor(test.subscription_required)}
                          >
                            {getSubscriptionLabel(test.subscription_required)}
                          </Badge>
                        </div>

                        {userCanTake ? (
                          <Link to={`/test/${test.id}`}>
                            <Button className="w-full">
                              {t('tests.takeTest')}
                            </Button>
                          </Link>
                        ) : (
                          <div className="space-y-2">
                            <Button disabled className="w-full">
                              {t('tests.upgradeRequired')}
                            </Button>
                            <Link to="/abonament">
                              <Button variant="outline" size="sm" className="w-full">
                                {t('subscription.upgradeSubscription')}
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}

        {Object.keys(groupedTests).length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('tests.noTests')}
            </h3>
            <p className="text-gray-600">
              {t('tests.noTestsDescription')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;
