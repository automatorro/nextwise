
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTestCalculation } from '@/hooks/useTestCalculation';
import TestResultDisplay from '@/components/test-result/TestResultDisplay';
import { useLanguage } from '@/hooks/useLanguage';
import { getResultLabels } from '@/utils/testResultTranslations';
import HomeNavigation from '@/components/home/HomeNavigation';
import Footer from '@/components/home/Footer';

interface TestResultData {
  id: string;
  test_type_id: string;
  answers: { [key: string]: number };
  completed_at: string;
  test_types: {
    name: string;
    description: string;
  };
}

const TestResult = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const labels = getResultLabels(language);

  // Fetch test result data
  const { data: result, isLoading, error } = useQuery({
    queryKey: ['test-result', resultId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          *,
          test_types (
            name,
            description
          )
        `)
        .eq('id', resultId)
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        answers: data.answers as unknown as { [key: string]: number }
      } as TestResultData;
    },
    enabled: !!resultId
  });

  // Fetch questions for calculation (if needed)
  const { data: questions } = useQuery({
    queryKey: ['test-questions', result?.test_type_id],
    queryFn: async () => {
      if (!result?.test_type_id) return [];
      
      const { data, error } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_type_id', result.test_type_id)
        .order('question_order');

      if (error) throw error;
      return data || [];
    },
    enabled: !!result?.test_type_id
  });

  // Calculate standardized score using the central hook
  const calculatedScore = useTestCalculation(result || null, questions || []);

  if (isLoading) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>{language === 'en' ? 'Loading...' : 'Se încarcă...'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !result || !calculatedScore) {
    return (
      <div>
        <HomeNavigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{labels.noResultsFound}</h2>
            <Button onClick={() => navigate('/tests')}>
              {labels.backToTests}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <HomeNavigation />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TestResultDisplay
            score={calculatedScore}
            testName={result.test_types.name}
            completedAt={result.completed_at}
            resultId={resultId!}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestResult;
