
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock, Users, Brain, Target, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}

const TestsPage = () => {
  const { data: tests, isLoading, error } = useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      console.log('Fetching tests from database...');
      const { data, error } = await supabase
        .from('test_types')
        .select(`
          *,
          test_categories (
            name,
            icon
          )
        `);
      
      if (error) {
        console.error('Error fetching tests:', error);
        throw error;
      }
      
      console.log('Raw test data from database:', data);
      
      // Filter out any duplicates on the frontend as well
      const uniqueTests = data?.filter((test, index, self) => 
        index === self.findIndex(t => t.name === test.name && t.questions_count === test.questions_count)
      ) || [];
      
      console.log('Filtered unique tests:', uniqueTests);
      
      return uniqueTests as TestType[];
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
              Total teste găsite: {tests.length}
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
              {categoryTests.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <CardDescription className="mt-2">
                          {test.description}
                        </CardDescription>
                        <div className="text-xs text-gray-400 mt-1">
                          ID: {test.id}
                        </div>
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
                        {test.questions_count} întrebări
                      </Badge>
                    </div>

                    <Link to={`/test/${test.id}`}>
                      <Button className="w-full">
                        Începe Testul
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
