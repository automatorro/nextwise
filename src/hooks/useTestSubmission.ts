
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TestSubmissionData {
  answers: { [questionId: string]: number };
  score: {
    total: number;
    average: number;
    answers_count: number;
  };
}

export const useTestSubmission = (userId: string | undefined, testId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (testData: TestSubmissionData) => {
      if (!userId || !testId) throw new Error('Missing required data');

      // For specific tests, call the analysis function
      let finalScore = testData.score;
      
      if (testId === 'f47ac10b-58cc-4372-a567-0e02b2c3d480' || 
          testId === 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' ||
          testId === 'b2c3d4e5-f6g7-8901-bcde-fg2345678901' ||
          testId === 'c3d4e5f6-g7h8-9012-cdef-gh3456789012' ||
          testId === 'd4e5f6g7-h8i9-0123-defg-hi4567890123') {
        console.log('Analyzing test results for:', testId);
        try {
          const { data: analysisResult, error: analysisError } = await supabase.functions.invoke('analyze-test-result', {
            body: { 
              answers: testData.answers, 
              test_type_id: testId 
            }
          });

          if (analysisError) {
            console.error('Analysis error:', analysisError);
            throw analysisError;
          }

          console.log('Analysis result:', analysisResult);
          finalScore = analysisResult;
        } catch (error) {
          console.error('Failed to analyze test results:', error);
          // Fall back to basic scoring if analysis fails
        }
      }

      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: userId,
          test_type_id: testId,
          answers: testData.answers,
          score: finalScore
        })
        .select()
        .single();

      if (error) throw error;

      // Update tests taken count using direct SQL update
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({
          tests_taken_this_month: 1
        })
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating test count:', updateError);
      }

      return data;
    },
    onSuccess: (data) => {
      navigate(`/test-result/${data.id}`);
    },
    onError: (error) => {
      console.error('Error submitting test:', error);
      toast({
        title: "Eroare",
        description: "Nu am putut salva rezultatul testului.",
        variant: "destructive"
      });
    }
  });
};
