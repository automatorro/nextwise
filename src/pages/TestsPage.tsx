
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
  subscription_required: 'basic' | 'professional' | 'premium';
}

const TestsPage = () => {
  const { user } = useAuth();
  const { subscription, canTakeTest, getRemainingTests } = useSubscription();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const { data: tests, isLoading, error } = useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching tests:', error);
        throw error;
      }
      return data as TestType[];
    }
  });

  useEffect(() => {
    if (!canTakeTest() && subscription && !subscription.is_admin) {
      toast({
        title: "Ai atins limita de teste!",
        description: `Abonamentul tău permite doar ${subscription.subscription_type === 'basic' ? '4' : '7'} teste pe lună.`,
        variant: "destructive"
      });
    }
  }, [canTakeTest, subscription, toast]);

  if (isLoading) {
    return <div>Se încarcă...</div>;
  }

  if (error) {
    return <div>Eroare la încărcarea testelor.</div>;
  }

  const isPremiumTest = (subscriptionRequired: string) => {
    return subscriptionRequired === 'professional' || subscriptionRequired === 'premium';
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Teste disponibile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests?.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <CardTitle>{test.name}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{test.estimated_duration} minute</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                <span>{test.questions_count} întrebări</span>
              </div>
              {isPremiumTest(test.subscription_required) && (
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="mr-2 h-4 w-4" />
                  <span>Premium</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <TestExplanations testName={test.name} />
                <Button asChild variant="secondary" disabled={isPremiumTest(test.subscription_required) && !canTakeTest()}>
                  <Link to={`/test/${test.id}`}>
                    {isPremiumTest(test.subscription_required) ? (canTakeTest() ? 'Începe testul' : `Necesită Premium (${getRemainingTests()} teste rămase)`) : 'Începe testul'}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestsPage;
