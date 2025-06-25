
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { calculateCognitiveAbilitiesScore } from '@/utils/testResultFormatters';
import { isCognitiveAbilitiesTest } from '@/utils/testLabels';

export const useTestSubmission = (onSuccess?: (resultId: string) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const submitTest = async (testData: {
    test_type_id: string;
    answers: { [questionId: string]: number };
  }) => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      console.log('Submitting test with data:', testData);

      // Get test type to determine scoring method
      const { data: testType, error: testTypeError } = await supabase
        .from('test_types')
        .select('name')
        .eq('id', testData.test_type_id)
        .single();

      if (testTypeError) {
        console.error('Error fetching test type:', testTypeError);
        throw new Error('Nu s-a putut determina tipul testului');
      }

      console.log('Test type:', testType);

      // Calculate score based on test type
      let calculatedScore;
      
      if (isCognitiveAbilitiesTest(testType.name)) {
        console.log('Calculating cognitive abilities score...');
        calculatedScore = calculateCognitiveAbilitiesScore(testData.answers);
      } else {
        // Default scoring for other tests (placeholder)
        console.log('Using default scoring...');
        const totalAnswers = Object.keys(testData.answers).length;
        const totalScore = Object.values(testData.answers).reduce((sum, value) => sum + value, 0);
        const maxPossibleScore = totalAnswers * 4; // Assuming max score per question is 4
        
        calculatedScore = {
          overall: Math.round((totalScore / maxPossibleScore) * 100),
          raw_score: totalScore,
          max_score: maxPossibleScore,
          dimensions: {},
          interpretation: 'Rezultat calculat'
        };
      }

      console.log('Calculated score:', calculatedScore);

      // Submit to database
      const { data: result, error: submitError } = await supabase
        .from('test_results')
        .insert({
          user_id: user.id,
          test_type_id: testData.test_type_id,
          answers: testData.answers,
          score: calculatedScore
        })
        .select()
        .single();

      if (submitError) {
        console.error('Error submitting test:', submitError);
        throw new Error('Nu s-a putut salva rezultatul testului');
      }

      console.log('Test submitted successfully:', result);

      // Update subscription test count
      const { error: updateError } = await supabase.rpc('increment_tests_taken');
      
      if (updateError) {
        console.warn('Could not update test count:', updateError);
      }

      toast({
        title: "Test completat!",
        description: "Rezultatul tău a fost salvat cu succes."
      });

      if (onSuccess) {
        onSuccess(result.id);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'A apărut o eroare neașteptată';
      setError(errorMessage);
      
      toast({
        title: "Eroare",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitTest,
    isSubmitting,
    error
  };
};
