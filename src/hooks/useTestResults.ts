
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface TestResult {
  id: string;
  test_type_id: string;
  answers: any;
  score: any;
  completed_at: string;
  ai_analysis: string | null;
  recommendations: string | null;
  user_id: string;
}

export const useTestResults = () => {
  const { user } = useAuth();

  const {
    data: testResults,
    isLoading,
    error
  } = useQuery({
    queryKey: ['test-results', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('test_results')
        .select(`
          *,
          test_types (
            name,
            description
          )
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const getBigFiveResults = () => {
    return testResults?.filter(result => 
      result.test_type_id === 'f47ac10b-58cc-4372-a567-0e02b2c3d480'
    ) || [];
  };

  const getLatestTestResults = () => {
    const latest: { [key: string]: any } = {};
    testResults?.forEach(result => {
      if (!latest[result.test_type_id] || 
          new Date(result.completed_at) > new Date(latest[result.test_type_id].completed_at)) {
        latest[result.test_type_id] = result;
      }
    });
    return Object.values(latest);
  };

  return {
    testResults: testResults || [],
    bigFiveResults: getBigFiveResults(),
    latestResults: getLatestTestResults(),
    isLoading,
    error
  };
};
