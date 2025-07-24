
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  calculateBigFiveScore, 
  calculateCattellScore, 
  calculateDISCScore, 
  calculateEmotionalIntelligenceScore, 
  calculateCognitiveScore, 
  calculateBelbinScore,
  calculateHexacoScore,
  calculateGADScore,
  calculateSJTScore
} from '@/utils/testCalculations';

export const useTestSubmission = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ testId, answers, questions }: {
      testId: string;
      answers: Record<string, number>;
      questions: any[];
    }) => {
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Submitting test with:', { testId, answers, questions });

      // Get test type info
      const { data: testType, error: testTypeError } = await supabase
        .from('test_types')
        .select('name')
        .eq('id', testId)
        .single();

      if (testTypeError) {
        console.error('Error fetching test type:', testTypeError);
        throw testTypeError;
      }

      // Calculate score based on test type
      let score;
      const testName = testType.name.toLowerCase();
      
      if (testName.includes('big five') || testName.includes('big-five')) {
        score = calculateBigFiveScore(answers, questions);
      } else if (testName.includes('cattell') || testName.includes('16pf')) {
        score = calculateCattellScore(answers);
      } else if (testName.includes('disc')) {
        score = calculateDISCScore(answers);
      } else if (testName.includes('emotional') || testName.includes('emotiona')) {
        score = calculateEmotionalIntelligenceScore(answers);
      } else if (testName.includes('cognitive') || testName.includes('cognitiv')) {
        score = calculateCognitiveScore(answers, questions);
      } else if (testName.includes('belbin')) {
        score = calculateBelbinScore(answers);
      } else if (testName.includes('hexaco')) {
        console.log('Calculating HEXACO score for answers:', answers);
        score = calculateHexacoScore(answers);
        console.log('HEXACO score calculated:', score);
      } else if (testName.includes('gad') || testName.includes('anxietate')) {
        score = calculateGADScore(answers);
      } else if (testName.includes('sjt') || testName.includes('situational judgment')) {
        console.log('Calculating SJT score for answers:', answers);
        score = calculateSJTScore(answers, questions);
        console.log('SJT score calculated:', score);
      } else {
        // Default scoring
        score = { overall: 0, interpretation: 'Scor calculat automat' };
      }

      console.log('Calculated score:', score);

      // Save test result
      const { data: result, error } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          test_type_id: testId,
          answers,
          score,
          completed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving test result:', error);
        throw error;
      }

      return result;
    },
    onSuccess: (result) => {
      toast({
        title: "Test completat!",
        description: "Rezultatele tale au fost salvate cu succes."
      });
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['testResults'] });
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      
      // Navigate to results page
      navigate(`/test-result/${result.id}`);
    },
    onError: (error) => {
      console.error('Test submission error:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la salvarea testului. Te rugăm să încerci din nou.",
        variant: "destructive"
      });
    }
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error
  };
};
