
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
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
  subscription_required: 'basic' | 'professional' | 'premium';
  category?: string;
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
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Se încarcă testele...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Eroare la încărcarea testelor</h2>
            <p className="text-gray-600">Te rugăm să încerci din nou mai târziu.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isPremiumTest = (subscriptionRequired: string) => {
    return subscriptionRequired === 'professional' || subscriptionRequired === 'premium';
  };

  // Categorize tests
  const personalityTests = tests?.filter(test => 
    test.name.toLowerCase().includes('big five') || 
    test.name.toLowerCase().includes('cattell') || 
    test.name.toLowerCase().includes('hexaco') ||
    test.name.toLowerCase().includes('enneagram')
  ) || [];

  const professionalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('disc') || 
    test.name.toLowerCase().includes('belbin') ||
    test.name.toLowerCase().includes('aptitudini')
  ) || [];

  const emotionalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('emotional') || 
    test.name.toLowerCase().includes('inteligenta') ||
    test.name.toLowerCase().includes('emotiona')
  ) || [];

  const clinicalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('gad') || 
    test.name.toLowerCase().includes('anxietate') ||
    test.name.toLowerCase().includes('depresie') ||
    test.name.toLowerCase().includes('beck')
  ) || [];

  const cognitiveTests = tests?.filter(test => 
    test.name.toLowerCase().includes('cognitive') || 
    test.name.toLowerCase().includes('cognitiv')
  ) || [];

  const TestCard = ({ test }: { test: TestType }) => (
    <Card className="h-full transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{test.name}</CardTitle>
          {isPremiumTest(test.subscription_required) && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Star className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm text-gray-600">{test.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{test.estimated_duration} min</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{test.questions_count} întrebări</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <TestExplanations testName={test.name} />
          <Button 
            asChild 
            variant={isPremiumTest(test.subscription_required) && !canTakeTest() ? "outline" : "default"}
            disabled={isPremiumTest(test.subscription_required) && !canTakeTest()}
            className="flex-shrink-0"
          >
            <Link to={`/test/${test.id}`}>
              {isPremiumTest(test.subscription_required) && !canTakeTest() ? (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Necesită Premium
                </>
              ) : (
                'Începe testul'
              )}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const TestCategory = ({ title, tests, description }: { title: string; tests: TestType[]; description: string }) => (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teste Psihologice</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descoperă-ți personalitatea, aptitudinile și potențialul prin testele noastre validate științific.
            </p>
            {!canTakeTest() && subscription && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                  Ai rămas cu {getRemainingTests()} teste în această lună.
                </p>
              </div>
            )}
          </div>

          {personalityTests.length > 0 && (
            <TestCategory 
              title="Teste de Personalitate" 
              tests={personalityTests}
              description="Descoperă trăsăturile tale de personalitate și comportamentele caracteristice"
            />
          )}

          {professionalTests.length > 0 && (
            <TestCategory 
              title="Teste Profesionale" 
              tests={professionalTests}
              description="Evaluează-ți competențele profesionale și stilul de lucru în echipă"
            />
          )}

          {emotionalTests.length > 0 && (
            <TestCategory 
              title="Inteligența Emoțională" 
              tests={emotionalTests}
              description="Măsoară capacitatea ta de a înțelege și gestiona emoțiile"
            />
          )}

          {cognitiveTests.length > 0 && (
            <TestCategory 
              title="Aptitudini Cognitive" 
              tests={cognitiveTests}
              description="Testează abilitățile tale mentale și capacitatea de rezolvare a problemelor"
            />
          )}

          {clinicalTests.length > 0 && (
            <TestCategory 
              title="Evaluări Clinice" 
              tests={clinicalTests}
              description="Instrumente de screening pentru aspecte psihologice specifice"
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestsPage;
