
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useTestCalculation } from '@/hooks/useTestCalculation';
import { TestResultDisplay } from '@/components/test-result/TestResultDisplay';
import { PageLoader } from '@/components/layout/PageLoader';

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

  // Use our new central hook to get the calculated score
  const calculatedScore = useTestCalculation(result?.test_types?.name, result?.answers);

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
