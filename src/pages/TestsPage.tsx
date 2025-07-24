import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SubscriptionType } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TestType {
  id: string;
  name: string;
  description: string;
  category_id: string;
  questions_count: number;
  estimated_duration: number;
  subscription_required: SubscriptionType;
  test_categories: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  actualQuestionCount?: number;
}

const TestsPage = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<TestType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestTypes = async (): Promise<TestType[]> => {
    try {
      console.log('Fetching test types...');
      
      // Fetch test types with categories
      const { data: testTypes, error } = await supabase
        .from('test_types')
        .select(`
          *,
          test_categories (
            id,
            name,
            description,
            icon
          )
        `);

      if (error) {
        console.error('Error fetching test types:', error);
        throw error;
      }
      
      console.log('Raw test types from database:', testTypes);
      
      // For each test type, count actual questions
      const testsWithQuestionCounts = await Promise.all(
        (testTypes || []).map(async (testType) => {
          const { count } = await supabase
            .from('test_questions')
            .select('*', { count: 'exact', head: true })
            .eq('test_type_id', testType.id);
          
          return {
            ...testType,
            actualQuestionCount: count || 0
          };
        })
      );
      
      // Filter tests that have questions
      const validTests = testsWithQuestionCounts.filter(test => {
        const hasQuestions = test.actualQuestionCount > 0;
        if (!hasQuestions) {
          console.log(`Test "${test.name}" has no questions, filtering out`);
        }
        return hasQuestions;
      });
      
      console.log('Valid tests with questions:', validTests);
      console.log('HEXACO test found:', validTests.find(t => t.name.includes('HEXACO')));
      
      return validTests as TestType[];
    }
    catch (error) {
      console.error('Error in fetchTestTypes:', error);
      throw error;
    }
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['tests'],
    queryFn: fetchTestTypes,
  });

  useEffect(() => {
    if (data) {
      setTests(data);
      setLoading(false);
    }
    if (error) {
      console.error("Error fetching tests:", error);
      setLoading(false);
    }
  }, [data, error]);

  if (isLoading) return <div>Loading tests...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      <Separator className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <span>Category:</span>
                <Badge variant="secondary">{test.test_categories.name}</Badge>
              </div>
              <div>
                <span>Questions:</span>
                <span>{test.questions_count}</span>
              </div>
              <div>
                <span>Estimated Duration:</span>
                <span>{test.estimated_duration} minutes</span>
              </div>
              <div>
                <span>Subscription:</span>
                <span>{test.subscription_required}</span>
              </div>
              <Link to={`/test/${test.id}`}>
                <Button>Take Test</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestsPage;
