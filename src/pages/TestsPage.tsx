import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import Footer from '@/components/home/Footer';
import { getTestTranslation } from '@/utils/testTranslationMapping';
import HomeNavigation from '@/components/home/HomeNavigation';

interface TestType {
  id: string;
  name: string;
  description: string;
  estimated_duration: number;
  questions_count: number;
  subscription_required: 'basic' | 'professional' | 'premium';
  category_id: string;
}

const TestsPage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription } = useSubscription();
  const [showPremiumAlert, setShowPremiumAlert] = useState(false);

  const { data: tests, isLoading, error } = useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_types')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching tests:', error);
        throw error;
      }
      
      return data as TestType[];
    }
  });

  useEffect(() => {
    if (!canTakeTest() && subscription && !subscription.is_admin) {
      setShowPremiumAlert(true);
    }
  }, [subscription]);

  const canTakeTest = () => {
    if (!subscription) return false;
    if (subscription.is_admin) return true;
    
    const limit = subscription.subscription_type === 'premium' ? 999 : 
                  subscription.subscription_type === 'professional' ? 7 : 4;
    
    return (subscription.tests_taken_this_month || 0) < limit;
  };

  const handleStartTest = (testId: string, subscriptionRequired: string) => {
    if (!user) {
      toast({
        title: "Autentificare necesară",
        description: "Te rugăm să te autentifici pentru a începe testul.",
        variant: "destructive"
      });
      return;
    }

    if (!canTakeTest()) {
      toast({
        title: "Limită atinsă",
        description: "Ai atins limita de teste pentru luna aceasta. Upgrade la Premium pentru teste nelimitate.",
        variant: "destructive"
      });
      return;
    }

    if (requiresPremium(subscriptionRequired) && subscription?.subscription_type === 'basic') {
      toast({
        title: "Abonament Premium necesar",
        description: "Acest test necesită un abonament Premium sau Professional.",
        variant: "destructive"
      });
      return;
    }

    navigate(`/test/${testId}`);
  };

  const requiresPremium = (subscriptionRequired: string) => {
    return subscriptionRequired === 'professional' || subscriptionRequired === 'premium';
  };

  const personalityTests = tests?.filter(test => 
    test.name.toLowerCase().includes('big five') || 
    test.name.toLowerCase().includes('cattell') || 
    test.name.toLowerCase().includes('enneagram') || 
    test.name.toLowerCase().includes('hexaco')
  ) || [];

  const professionalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('disc') || 
    test.name.toLowerCase().includes('leadership') || 
    test.name.toLowerCase().includes('belbin') ||
    test.name.toLowerCase().includes('competențe manageriale') ||
    test.name.toLowerCase().includes('managerial') ||
    test.name.toLowerCase().includes('sjt') ||
    test.name.toLowerCase().includes('situational') ||
    test.name.toLowerCase().includes('orientare') ||
    test.name.toLowerCase().includes('cariera') ||
    test.name.toLowerCase().includes('career')
  ) || [];

  const emotionalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('emotional') || 
    test.name.toLowerCase().includes('emotiona') ||
    test.name.toLowerCase().includes('inteligenta') ||
    test.name.toLowerCase().includes('empatie') ||
    test.name.toLowerCase().includes('stres')
  ) || [];

  const clinicalTests = tests?.filter(test => 
    test.name.toLowerCase().includes('gad') || 
    test.name.toLowerCase().includes('beck') || 
    test.name.toLowerCase().includes('anxiety') ||
    test.name.toLowerCase().includes('anxietate') ||
    test.name.toLowerCase().includes('depresie')
  ) || [];

  const cognitiveTests = tests?.filter(test => 
    test.name.toLowerCase().includes('cognitive') || 
    test.name.toLowerCase().includes('cognitiv') ||
    test.name.toLowerCase().includes('watson') ||
    test.name.toLowerCase().includes('glaser') ||
    test.name.toLowerCase().includes('critical thinking') ||
    test.name.toLowerCase().includes('aptitudini cognitive')
  ) || [];

  const categoryDescriptions = {
    personality: {
      ro: "Testele de personalitate îți oferă o perspectivă profundă asupra trăsăturilor tale de personalitate.",
      en: "Personality tests provide deep insights into your personality traits."
    },
    professional: {
      ro: "Testele profesionale evaluează competențele și stilurile de lucru pentru dezvoltarea carierei.",
      en: "Professional tests evaluate competencies and work styles for career development."
    },
    emotional: {
      ro: "Testele emoționale măsoară inteligența emoțională și gestionarea stresului.",
      en: "Emotional tests measure emotional intelligence and stress management."
    },
    clinical: {
      ro: "Testele clinice oferă evaluări validate științific pentru aspecte de sănătate mentală.",
      en: "Clinical tests provide scientifically validated assessments for mental health aspects."
    },
    cognitive: {
      ro: "Testele cognitive evaluează abilitățile mentale și capacitățile de procesare.",
      en: "Cognitive tests evaluate mental abilities and processing capabilities."
    }
  };

  const TestCard = ({ test }: { test: TestType }) => {
    const translation = getTestTranslation(test.name, language);
    const isPremium = requiresPremium(test.subscription_required);
    const canAccess = !isPremium || subscription?.subscription_type !== 'basic';
    
    return (
      <Card className={`transition-all duration-200 hover:shadow-lg ${canAccess ? 'hover:shadow-blue-100' : 'opacity-75'}`}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2 line-clamp-2">
                {translation.name}
              </CardTitle>
              <CardDescription className="text-sm line-clamp-3">
                {translation.description || test.description}
              </CardDescription>
            </div>
            {isPremium && (
              <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {test.estimated_duration} min
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {test.questions_count} întrebări
            </div>
          </div>
          
          <Button 
            onClick={() => handleStartTest(test.id, test.subscription_required)}
            disabled={!canAccess || (!canTakeTest() && !subscription?.is_admin)}
            className="w-full"
            variant={canAccess ? "default" : "outline"}
          >
            {!canAccess ? (
              <>
                <Lock className="h-4 w-4 mr-2" />
                Premium necesar
              </>
            ) : (!canTakeTest() && !subscription?.is_admin) ? (
              "Limită atinsă"
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Începe testul
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const TestSection = ({ title, tests, description }: { title: string; tests: TestType[]; description: string }) => (
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HomeNavigation />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <HomeNavigation />
        <div className="text-center pt-24">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Eroare la încărcarea testelor</h2>
          <p className="text-gray-600">Te rugăm să încerci din nou mai târziu.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavigation />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ro' ? 'Teste de Personalitate și Aptitudini' : 'Personality and Aptitude Tests'}
          </h1>
          <p className="text-gray-600 text-lg">
            {language === 'ro' 
              ? 'Descoperă-ți personalitatea și aptitudinile prin testele noastre validate științific.'
              : 'Discover your personality and aptitudes through our scientifically validated tests.'
            }
          </p>
        </div>

        <div className="space-y-12">
          {personalityTests.length > 0 && (
            <TestSection 
              title={language === 'ro' ? 'Teste de Personalitate' : 'Personality Tests'}
              tests={personalityTests}
              description={categoryDescriptions.personality[language]}
            />
          )}

          {professionalTests.length > 0 && (
            <TestSection 
              title={language === 'ro' ? 'Teste Profesionale' : 'Professional Tests'}
              tests={professionalTests}
              description={categoryDescriptions.professional[language]}
            />
          )}

          {emotionalTests.length > 0 && (
            <TestSection 
              title={language === 'ro' ? 'Teste Emoționale' : 'Emotional Tests'}
              tests={emotionalTests}
              description={categoryDescriptions.emotional[language]}
            />
          )}

          {cognitiveTests.length > 0 && (
            <TestSection 
              title={language === 'ro' ? 'Teste Cognitive' : 'Cognitive Tests'}
              tests={cognitiveTests}
              description={categoryDescriptions.cognitive[language]}
            />
          )}

          {clinicalTests.length > 0 && (
            <TestSection 
              title={language === 'ro' ? 'Teste Clinice' : 'Clinical Tests'}
              tests={clinicalTests}
              description={categoryDescriptions.clinical[language]}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestsPage;
