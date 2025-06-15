
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

      const { data, error } = await supabase
        .from('test_results')
        .insert({
          user_id: userId,
          test_type_id: testId,
          answers: testData.answers,
          score: testData.score
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
