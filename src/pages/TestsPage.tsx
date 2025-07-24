import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Star, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TestExplanations } from '@/components/tests/TestExplanations';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import { getTestTranslation } from '@/utils/testTranslationMapping';
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
  const { language, t } = useLanguage();

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
      
      console.log('Fetched tests from database:', data);
      return data as TestType[];
    }
  });

  // Debug logging pentru a vedea ce teste sunt disponibile
  useEffect(() => {
    if (tests) {
      console.log('All tests:', tests);
      console.log('SJT test found:', tests.find(t => t.name.toLowerCase().includes('sjt')));
      console.log('Tests containing "orientare":', tests.filter(t => t.name.toLowerCase().includes('orientare')));
      console.log('Tests containing "career":', tests.filter(t => t.name.toLowerCase().includes('career')));
    }
  }, [tests]);

  useEffect(() => {
    if (!canTakeTest() && subscription && !subscription.is_admin) {
      toast({
        title: language === 'ro' ? "Ai atins limita de teste!" : "You've reached the test limit!",
        description: language === 'ro' 
          ? `Abonamentul tău permite doar ${subscription.subscription_type === 'basic' ? '4' : '7'} teste pe lună.`
          : `Your subscription allows only ${subscription.subscription_type === 'basic' ? '4' : '7'} tests per month.`,
        variant: "destructive"
      });
    }
  }, [canTakeTest, subscription, toast, language]);

  if (isLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">
              {language === 'ro' ? 'Se încarcă testele...' : 'Loading tests...'}
            </p>
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
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {language === 'ro' ? 'Eroare la încărcarea testelor' : 'Error loading tests'}
            </h2>
            <p className="text-gray-600">
              {language === 'ro' ? 'Te rugăm să încerci din nou mai târziu.' : 'Please try again later.'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isPremiumTest = (subscriptionRequired: string) => {
    return subscriptionRequired === 'professional' || subscriptionRequired === 'premium';
  };

  // Categorize tests with proper translation - updated to include more SJT variations
  const personalityTests = tests?.filter(test => 
    test.name.toLowerCase().includes('big five') || 
    test.name.toLowerCase().includes('cattell') || 
    test.name.toLowerCase().includes('hexaco') ||
    test.name.toLowerCase().includes('enneagram')
  ) || [];

  const professionalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('disc') || 
    test.name.toLowerCase().includes('belbin') ||
    test.name.toLowerCase().includes('aptitudini') ||
    test.name.toLowerCase().includes('sjt') ||
    test.name.toLowerCase().includes('situational') ||
    test.name.toLowerCase().includes('orientare') ||
    test.name.toLowerCase().includes('career')
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

  // Debug logging pentru categorii
  console.log('Professional tests:', professionalTests);
  console.log('Personality tests:', personalityTests);

  const TestCard = ({ test }: { test: TestType }) => {
    const translation = getTestTranslation(test.name, language);
    
    return (
      <Card className="h-full transition-all hover:shadow-lg flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg leading-tight">{translation.name}</CardTitle>
            {isPremiumTest(test.subscription_required) && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 flex-shrink-0">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <CardDescription className="text-sm text-gray-600 line-clamp-3">
            {translation.description || test.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{test.estimated_duration} {language === 'ro' ? 'min' : 'min'}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>{test.questions_count} {language === 'ro' ? 'întrebări' : 'questions'}</span>
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
                    {language === 'ro' ? 'Necesită Premium' : 'Requires Premium'}
                  </>
                ) : (
                  language === 'ro' ? 'Începe testul' : 'Start test'
                )}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const TestCategory = ({ title, tests, description }: { title: string; tests: TestType[]; description: string }) => (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-sm text-gray-500 mt-1">({tests.length} teste disponibile)</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );

  const categoryTitles = {
    personality: {
      ro: 'Teste de Personalitate',
      en: 'Personality Tests'
    },
    professional: {
      ro: 'Teste Profesionale',
      en: 'Professional Tests'
    },
    emotional: {
      ro: 'Inteligența Emoțională',
      en: 'Emotional Intelligence'
    },
    cognitive: {
      ro: 'Aptitudini Cognitive',
      en: 'Cognitive Abilities'
    },
    clinical: {
      ro: 'Evaluări Clinice',
      en: 'Clinical Assessments'
    }
  };

  const categoryDescriptions = {
    personality: {
      ro: 'Descoperă trăsăturile tale de personalitate și comportamentele caracteristice',
      en: 'Discover your personality traits and characteristic behaviors'
    },
    professional: {
      ro: 'Evaluează-ți competențele profesionale și stilul de lucru în echipă',
      en: 'Evaluate your professional skills and teamwork style'
    },
    emotional: {
      ro: 'Măsoară capacitatea ta de a înțelege și gestiona emoțiile',
      en: 'Measure your ability to understand and manage emotions'
    },
    cognitive: {
      ro: 'Testează abilitățile tale mentale și capacitatea de rezolvare a problemelor',
      en: 'Test your mental abilities and problem-solving capacity'
    },
    clinical: {
      ro: 'Instrumente de screening pentru aspecte psihologice specifice',
      en: 'Screening tools for specific psychological aspects'
    }
  };

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'ro' ? 'Teste Psihologice' : 'Psychological Tests'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'ro' 
                ? 'Descoperă-ți personalitatea, aptitudinile și potențialul prin testele noastre validate științific.'
                : 'Discover your personality, skills and potential through our scientifically validated tests.'}
            </p>
            {!canTakeTest() && subscription && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                  {language === 'ro' 
                    ? `Ai rămas cu ${getRemainingTests()} teste în această lună.`
                    : `You have ${getRemainingTests()} tests remaining this month.`}
                </p>
              </div>
            )}
          </div>

          {personalityTests.length > 0 && (
            <TestCategory 
              title={categoryTitles.personality[language]} 
              tests={personalityTests}
              description={categoryDescriptions.personality[language]}
            />
          )}

          {professionalTests.length > 0 && (
            <TestCategory 
              title={categoryTitles.professional[language]} 
              tests={professionalTests}
              description={categoryDescriptions.professional[language]}
            />
          )}

          {emotionalTests.length > 0 && (
            <TestCategory 
              title={categoryTitles.emotional[language]} 
              tests={emotionalTests}
              description={categoryDescriptions.emotional[language]}
            />
          )}

          {cognitiveTests.length > 0 && (
            <TestCategory 
              title={categoryTitles.cognitive[language]} 
              tests={cognitiveTests}
              description={categoryDescriptions.cognitive[language]}
            />
          )}

          {clinicalTests.length > 0 && (
            <TestCategory 
              title={categoryTitles.clinical[language]} 
              tests={clinicalTests}
              description={categoryDescriptions.clinical[language]}
            />
          )}

          {/* Debug section - doar pentru development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <p>Total tests: {tests?.length || 0}</p>
              <p>Professional tests: {professionalTests.length}</p>
              <p>All test names: {tests?.map(t => t.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestsPage;
