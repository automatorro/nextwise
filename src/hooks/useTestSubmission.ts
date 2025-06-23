
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface TestSubmissionData {
  test_type_id: string;
  answers: { [key: string]: number };
}

export const useTestSubmission = (onSuccess?: (resultId: string) => void) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const submitTest = useMutation({
    mutationFn: async (data: TestSubmissionData) => {
      if (!user) throw new Error('User not authenticated');

      console.log('Submitting test with data:', data);

      // Call the analyze function
      const { data: analysisResult, error: analysisError } = await supabase.functions.invoke('analyze-test-result', {
        body: data
      });

      if (analysisError) {
        console.error('Analysis error:', analysisError);
        throw analysisError;
      }

      console.log('Analysis result:', analysisResult);

      // Save the test result with the complete analysis structure
      const { data: testResult, error: saveError } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          test_type_id: data.test_type_id,
          answers: data.answers,
          score: analysisResult, // Save the complete analysis result
        })
        .select()
        .single();

      if (saveError) {
        console.error('Save error:', saveError);
        throw saveError;
      }

      console.log('Test result saved:', testResult);

      // Update subscription usage - first get current count, then increment
      const { data: currentSub } = await supabase
        .from('subscriptions')
        .select('tests_taken_this_month')
        .eq('user_id', user.id)
        .single();

      const currentCount = currentSub?.tests_taken_this_month || 0;
      
      const { error: usageError } = await supabase
        .from('subscriptions')
        .update({ 
          tests_taken_this_month: currentCount + 1
        })
        .eq('user_id', user.id);

      if (usageError) {
        console.error('Usage update error:', usageError);
        // Don't throw here as the test was already saved successfully
      }

      return testResult;
    },
    onSuccess: (testResult) => {
      queryClient.invalidateQueries({ queryKey: ['test-results'] });
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast.success('Test completat cu succes!');
      
      // Call the navigation callback if provided
      if (onSuccess) {
        onSuccess(testResult.id);
      }
    },
    onError: (error: any) => {
      console.error('Test submission error:', error);
      toast.error('Eroare la salvarea testului: ' + (error?.message || 'Eroare necunoscută'));
    }
  });

  return {
    submitTest: submitTest.mutate,
    isSubmitting: submitTest.isPending,
    error: submitTest.error
  };
};
