import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Users, Brain, Target, Heart, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/useSubscription';
import { useCattell16PFSetup } from '@/hooks/useCattell16PFSetup';

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
  // Set up Cattell 16PF test automatically
  useCattell16PFSetup();
  
  const { subscription, canTakeTest } = useSubscription();

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
      
      return validTests as TestType[];
    }
  });

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      'brain': Brain,
      'users': Users,
      'target': Target,
      'heart': Heart
    };
    return icons[iconName] || Brain;
  };

  const canUserTakeTest = (test: TestType) => {
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
  };

  const getSubscriptionBadgeColor = (required: string) => {
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
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Se încarcă testele...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Eroare la încărcarea testelor</h2>
          <p className="text-gray-600">Vă rugăm să încercați din nou mai târziu.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Teste Psihologice</h1>
          <p className="text-gray-600 mt-2">
            Descoperă-ți personalitatea și abilitățile prin testele noastre validate științific
          </p>
          {tests && (
            <p className="text-sm text-gray-500 mt-2">
              {tests.length} teste disponibile
            </p>
          )}
        </div>

        {Object.entries(groupedTests).map(([categoryName, categoryTests]) => (
          <div key={categoryName} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              {React.createElement(getIconComponent(categoryTests[0]?.test_categories.icon), {
                className: "w-6 h-6 mr-2 text-blue-600"
              })}
              {categoryName}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryTests.map((test) => {
                const userCanTake = canUserTakeTest(test);
                
                return (
                  <Card key={test.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{test.name}</CardTitle>
                          <CardDescription className="mt-2">
                            {test.description}
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
                          {test.estimated_duration} min
                        </div>
                        <Badge variant="secondary">
                          {test.actual_questions_count} întrebări
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <Badge 
                          variant="outline" 
                          className={getSubscriptionBadgeColor(test.subscription_required)}
                        >
                          {test.subscription_required === 'basic' && 'Gratuit'}
                          {test.subscription_required === 'professional' && 'Professional'}
                          {test.subscription_required === 'premium' && 'Premium'}
                        </Badge>
                      </div>

                      {userCanTake ? (
                        <Link to={`/test/${test.id}`}>
                          <Button className="w-full">
                            Începe Testul
                          </Button>
                        </Link>
                      ) : (
                        <div className="space-y-2">
                          <Button disabled className="w-full">
                            Necesită {test.subscription_required}
                          </Button>
                          <Link to="/abonament">
                            <Button variant="outline" size="sm" className="w-full">
                              Upgrade abonament
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
        ))}

        {Object.keys(groupedTests).length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nu sunt teste disponibile încă
            </h3>
            <p className="text-gray-600">
              Testele vor fi adăugate în curând. Vă mulțumim pentru răbdare!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsPage;
