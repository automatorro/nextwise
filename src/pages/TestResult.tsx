
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTestCalculation } from '@/hooks/useTestCalculation';
import { TestResultDisplay } from '@/components/test-result/TestResultDisplay';
import { PageLoader } from '@/components/layout/PageLoader';

// Helper to check if a value is a Record (object with string keys)
function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function TestResult() {
  const { resultId } = useParams<{ resultId: string }>();

  const { data: result, isLoading } = useQuery({
    queryKey: ['test-result', resultId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_results')
        .select('*, test_types(name)')
        .eq('id', resultId)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!resultId,
  });

  // We ensure answers is a valid object before passing it to the hook
  const validAnswers = isRecord(result?.answers) ? result.answers : undefined;

  const calculatedScore = useTestCalculation(result?.test_types?.name, validAnswers);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <TestResultDisplay
        score={calculatedScore}
        testName={result?.test_types?.name}
      />
    </div>
  );
}
